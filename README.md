<div align="center">

  <img src="assets/icon.png" alt="AirFlix Logo" width="120" height="120" style="border-radius: 28px;" />

  # AirFlix 🍿
  
  **The Ultimate Modern Streaming Experience for Android**

  [![GitHub Release](https://img.shields.io/github/v/release/drkvenom786/airflix?style=for-the-badge&color=8A2BE2)](https://github.com/drkvenom786/airflix/releases)
  [![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/drkvenom786/airflix/releases)
  [![License](https://img.shields.io/github/license/drkvenom786/airflix?style=for-the-badge&color=blue)](LICENSE)
  [![Developer](https://img.shields.io/badge/Developer-VENOM-FF4500?style=for-the-badge&logo=github)](https://drkvenom786.github.io/webpage/)

  ---

  [📥 **Download Latest APK**](https://github.com/drkvenom786/airflix/releases) • [🌐 **Developer Website**](https://drkvenom786.github.io/webpage/) • [✨ **Features**](#-features)

</div>

---

## 🌟 About AirFlix

**AirFlix** is a premium, open-source Android application designed for streaming movies, TV series, and anime with a fast, modern, and customizable interface. Built using **React Native**, **Expo**, and native Android C++ modules, AirFlix offers smooth video playback, dynamic color extraction, in-app updates, and torrent streaming support.

---

## ✨ Features

- 🎨 **State-of-the-Art Material You Design**: Sleek dark mode aesthetics with dynamic accent color extraction based on poster artwork.
- ⚡ **Lightning Fast Engine**: Powered by Hermes JS engine and C++ native modules for peak performance.
- 🎬 **Multi-Source Provider Support**: Seamless integration with pre-seeded provider sources for instant catalog access.
- 📺 **Advanced Video Player**: Built-in ExoPlayer supporting HLS, DASH, MP4, and smooth streaming with custom subtitle search.
- 📥 **In-App Auto Updates**: Built-in update detector that fetches the latest `.apk` directly from GitHub Releases.
- 🔖 **Watchlist & History**: Keep track of your favorite movies and unwatched episodes locally on your device.
- 🛡️ **Privacy-First**: No ads, no account requirement, zero tracking.

---

## 📱 Screenshots & Preview

<div align="center">
  <img src="assets/adaptive_icon.png" alt="AirFlix App Preview" width="180" style="border-radius: 20px; margin: 10px;" />
</div>

---

## 📥 Installation

1. Go to the [**Releases**](https://github.com/drkvenom786/airflix/releases) page.
2. Download the latest **`AirFlix-v4.0.2-universal.apk`**.
3. Open the downloaded file on your Android device and install it (allow installation from unknown sources if prompted).
4. Launch **AirFlix** and start enjoying your favorite movies and shows!

---

## 🛠️ Building from Source

### Prerequisites
- Node.js (v18 or higher)
- OpenJDK 17
- Android SDK & NDK (r27)

### Steps
```bash
# Clone the repository
git clone https://github.com/drkvenom786/airflix.git
cd airflix

# Install dependencies
npm install --legacy-peer-deps

# Generate sandbox runtime
npm run build:sandbox

# Build Release APK locally
cd android
./gradlew assembleRelease
```

---

## 👨‍💻 Developer & Maintainer

<div align="center">
  <a href="https://drkvenom786.github.io/webpage/">
    <img src="https://avatars.githubusercontent.com/u/241423835?v=4" width="80" height="80" style="border-radius: 50%;" />
    <br />
    <b>VENOM</b>
  </a>
  <br />
  <a href="https://drkvenom786.github.io/webpage/">🌐 drkvenom786.github.io/webpage</a>
</div>

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Made with ❤️ by <b>VENOM</b></sub>
</div>
