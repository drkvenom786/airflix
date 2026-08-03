import * as FileSystem from 'expo-file-system/legacy';
import type {SafDownloadLocation} from '../downloadLocation';
import {getSafEntryName} from '../downloadLocation';
import {
  parseSyncManifest,
  AIRFLIX_SYNC_DIRECTORY,
  type AirFlixSyncManifest,
} from './manifest';

const MANIFEST_MIME_TYPE = 'application/json';

const findChild = async (directoryUri: string, name: string) => {
  const entries =
    await FileSystem.StorageAccessFramework.readDirectoryAsync(directoryUri);
  return entries.find(entry => getSafEntryName(entry) === name);
};

const getSyncDirectory = async (
  location: SafDownloadLocation,
  create: boolean,
): Promise<string | null> => {
  const existing = await findChild(location.uri, AIRFLIX_SYNC_DIRECTORY);
  if (existing) {
    return existing;
  }
  if (!create) {
    return null;
  }
  return FileSystem.StorageAccessFramework.makeDirectoryAsync(
    location.uri,
    AIRFLIX_SYNC_DIRECTORY,
  );
};

export const readMobileSyncManifests = async (
  location: SafDownloadLocation,
): Promise<AirFlixSyncManifest[]> => {
  const directory = await getSyncDirectory(location, false);
  if (!directory) {
    return [];
  }
  const entries =
    await FileSystem.StorageAccessFramework.readDirectoryAsync(directory);
  const manifests = await Promise.all(
    entries
      .filter(entry => getSafEntryName(entry).endsWith('.json'))
      .map(async entry => {
        const content =
          await FileSystem.StorageAccessFramework.readAsStringAsync(entry);
        return parseSyncManifest(content);
      }),
  );
  return manifests.filter(
    (manifest): manifest is AirFlixSyncManifest => manifest !== null,
  );
};

export const writeMobileSyncManifest = async (
  location: SafDownloadLocation,
  manifest: AirFlixSyncManifest,
): Promise<void> => {
  const directory = await getSyncDirectory(location, true);
  if (!directory) {
    throw new Error('Unable to create AirFlix sync directory');
  }
  const fileName = `airflix-${manifest.deviceId}.json`;
  const existing = await findChild(directory, fileName);
  if (existing) {
    await FileSystem.StorageAccessFramework.deleteAsync(existing);
  }
  const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
    directory,
    fileName,
    MANIFEST_MIME_TYPE,
  );
  const content = JSON.stringify(manifest);
  await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, content);
  const written =
    await FileSystem.StorageAccessFramework.readAsStringAsync(fileUri);
  if (!parseSyncManifest(written)) {
    await FileSystem.StorageAccessFramework.deleteAsync(fileUri).catch(
      () => undefined,
    );
    throw new Error('AirFlix sync manifest verification failed');
  }
};

export const resolveMobileSyncFile = async (
  location: SafDownloadLocation,
  relativePath: string,
): Promise<string | null> => {
  const segments = relativePath
    .replace(/\\/g, '/')
    .split('/')
    .filter(segment => segment && segment !== '.' && segment !== '..');
  let current = location.uri;
  for (const segment of segments) {
    const child = await findChild(current, segment);
    if (!child) {
      return null;
    }
    current = child;
  }
  if (current !== location.uri) {
    return current;
  }
  return null;
};

export const resolveMobileSyncFileWithLegacyFallback = async (
  location: SafDownloadLocation,
  relativePath: string,
): Promise<string | null> => {
  const resolved = await resolveMobileSyncFile(location, relativePath);
  if (resolved) {
    return resolved;
  }
  const segments = relativePath.replace(/\\/g, '/').split('/').filter(Boolean);
  const fileName = segments.pop();
  if (!fileName) {
    return null;
  }
  if (segments.length > 1) {
    const legacyShowPath = [...segments.slice(0, 1), fileName].join('/');
    const legacyShowFile = await resolveMobileSyncFile(
      location,
      legacyShowPath,
    );
    if (legacyShowFile) {
      return legacyShowFile;
    }
  }
  return (await findChild(location.uri, fileName)) || null;
};
