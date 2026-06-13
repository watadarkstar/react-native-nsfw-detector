# react-native-nsfw-detector Example

Example Expo application demonstrating how to use `react-native-nsfw-detector` to classify images for NSFW content directly on device using CoreML.

## Features

- Select an image from the photo library
- Capture a photo using the device camera
- Run on device NSFW detection
- Display the NSFW confidence score
- No server required

## Prerequisites

Before running the example app, make sure you have:

- Node.js
- npm
- Xcode (for iOS)
- Android Studio (for Android)
- Expo CLI tools

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running the Example

### iOS

```bash
npm run ios
```

This will:

- Generate native iOS project files if needed
- Install CocoaPods dependencies
- Build and launch the app in the iOS Simulator or on a connected device

### Android

```bash
npm run android
```

This will build and launch the app on an Android emulator or connected device.

### Start Metro

```bash
npm start
```

### Web

```bash
npm run web
```

## Important Notes

### iOS Detection Accuracy

For the most accurate NSFW detection results, run the example on a physical iPhone or iPad.

The iOS Simulator may produce significantly reduced accuracy because CoreML performance differs from real hardware.

### Camera Permissions

The example app requests permission to:

- Access the photo library
- Access the device camera

These permissions are required to select or capture images for classification.

## Project Structure

```text
example/
├── App.tsx
├── package.json
└── ...
```

The example uses local Expo autolinking to load the native module from the parent directory:

```json
{
  "expo": {
    "autolinking": {
      "nativeModulesDir": ".."
    }
  }
}
```

## Learn More

For full installation instructions and API documentation, see the main `react-native-nsfw-detector` README in the root of the repository.
