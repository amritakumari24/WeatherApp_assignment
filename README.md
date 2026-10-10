# Weather App

A professional, real-time weather intelligence application built with React Native and Expo.

## Features

- **Real-time Data**: Fetch live weather updates using the OpenWeatherMap API.
- **Location Search**: Search for weather conditions by city name globally.
- **Detailed Metrics**: View temperature, humidity, wind speed, and atmospheric pressure.
- **Responsive Design**: Modern, dark-themed UI optimized for both iOS and Android.

## Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: React Native StyleSheet
- **API**: [OpenWeatherMap API](https://openweathermap.org/api)

## Getting Started

### Prerequisites

- Node.js (LTS)
- [Expo Go](https://expo.dev/go) app on your mobile device or an emulator.

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

Create a `.env` file in the root directory and add your OpenWeatherMap API key:

```env
EXPO_PUBLIC_API_KEY=your_api_key_here
```

### Running the App

Start the development server:

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS) to open the app.

## License

This project is licensed under the MIT License.
