import type { ProviderExtension, ProviderModule } from '../storage/extensionStorage';
import { bundledData } from './builtinProvidersData';

export const builtinProviders: ProviderExtension[] = (bundledData.providers as any) || [];
export const builtinProviderModules: Record<string, ProviderModule> = (bundledData.modules as any) || {};

// Backwards compatibility for any legacy references to builtinAirflix
export const builtinAirflix = {
  manifest: JSON.stringify(builtinProviders),
  ...(builtinProviderModules.airflix ? builtinProviderModules.airflix.modules : {}),
};

export default builtinProviders;
