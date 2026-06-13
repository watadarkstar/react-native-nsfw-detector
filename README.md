<p align="center">
  <img src="https://github.com/user-attachments/assets/7d1df9b9-bafb-4e0e-a9cd-cecd499484a6" alt="example" height="150"/>
</p>

<h3 align="center">
  React Native NSFW Detector
</h3>

<p align="center">
  A fast on device AI image safety detector for React Native / Expo using a CoreML model<br/>
  to detect nudity and unsafe visual content in images.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-nsfw-detector">
    <img alt="npm version" src="https://badge.fury.io/js/react-native-nsfw-detector.svg"/>
  </a>
  <a title="License" href="https://github.com/your-repo/react-native-nsfw-detector/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
</p>

<p align="center">
  <a href="https://x.com/icookandcode" target="_blank">
    Need help building your React Native app? Connect with Adrian on X
  </a>
</p>

## Requirements

- React Native 0.70+
- iOS 13+
- CoreML enabled environment
- Physical iOS device strongly recommended for accurate inference (Simulator results are unreliable)

## Features

- On device inference using CoreML
- Detects NSFW and safe for work content
- Fast and lightweight
- No network calls required
- Works with React Native and Expo native modules
- Simple promise based API

> ⚠️ Important: Running on the iOS Simulator results in significantly reduced accuracy. For reliable results, always test on a physical device.

## Installation

Using npm

```bash
npm install react-native-nsfw-detector
```

Using yarn

```bash
yarn add react-native-nsfw-detector
```

## Usage

```jsx
import { check } from 'react-native-nsfw-detector';

/**
 * IMPORTANT:
 * Simulator runs will produce significantly reduced accuracy.
 * Always test on a physical iOS device for reliable results.
 */

async function checkImage(imageUri: string) {
  const confidence = await check(imageUri);

  if(confidence > 0.9) {
    console.log("Not safe for work 🤦‍♂️🤦‍♀️")
  } else {
    console.log("Safe! ✅")
  }
}
```

See the full working example app here:

- [/example](/example/) directory in this repo
- Run it locally to test real CoreML inference on device

## License

[MIT](LICENSE)

## Author

Feel free to ask me questions on Twitter [@icookandcode](https://www.twitter.com/icookandcode)!

## Credits

Work is based on the amazing work of
[NSFWDetector](https://github.com/lovoo/NSFWDetector/tree/master) by the LOVOO
org. See copyright notices in [LICENSE](LICENSE).

## Contributors

Submit a PR to contribute :)

## Release

We use `release-it`, to release do the following:

```
yarn run release:dry
yarn run release
```

---

<div align="center">

**Ready to build a React Native app or CoreML model?**

⭐ **Star this repo** • 💬 **[Contact Adrian to Build It](https://x.com/icookandcode)**

_Built with ❤️ by [Adrian](https://x.com/icookandcode)_

</div>

---

**Keywords:** react-native, react, CoreML, AI, nsfw, inference, typescript,
react-native-nsfw-detector, swift
