<p align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/3059371/607506546-712a4238-c1b8-4b07-9fbe-c075e07c6d82.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260613%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260613T150914Z&X-Amz-Expires=300&X-Amz-Signature=b007f402244433f43798bcb3cf1db2b963f5af9f440c6e98361e0adf2c9530e8&X-Amz-SignedHeaders=host&response-content-type=image%2Fpng" alt="example" height="150"/>
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
    <img alt="npm version" src="https://badge.fury.io/js/react-native-nsfw-detector.svg?icon=si%3Anpm"/>
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
- **Xcode 10+** Because the model was trained with CreateML, you need Xcode 10 and above to compile the project
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
import { checkNSFW } from 'react-native-nsfw-detector';

/**
 * IMPORTANT:
 * Simulator runs will produce significantly reduced accuracy.
 * Always test on a physical iOS device for reliable results.
 */

async function checkImage(imageUri: string) {
  const confidence = await checkNSFW(imageUri);

  if(confidence > 0.9) {
    console.log("Not safe for work 🤦‍♂️🤦‍♀️")
  } else {
    console.log("Safe! ✅")
  }
}
```

See the full working example Expo app here:

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

Built with [create expo module](https://docs.expo.dev/modules/get-started/).

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
