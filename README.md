<p align="center">
  <img src="https://user-images.githubusercontent.com/3059371/49334754-3c9dfe00-f5ab-11e8-8885-0192552d12a1.gif" alt="example" height="150"/>
</p>

<h3 align="center">
  🔎 React Native NSFW Detector
</h3>

<p align="center">
  A fast on device image safety detector for React Native / Expo using a CoreML model<br/>
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
    Need help building your React Native app? Connect with Adrian on X 🚀
  </a>
</p>

## Features

- On device inference using CoreML
- Detects NSFW and safe for work content
- Fast and lightweight
- No network calls required
- Works with React Native and Expo native modules
- Simple promise based API

## Installation

Using npm

```bash
npm install react-native-nsfw-detector
```

Using yarn

```bash
yarn add react-native-nsfw-detector
```

## Example

```jsx
import { check } from 'react-native-nsfw-detector';

async function checkImage(imageUri: string) {
  const result = await check(imageUri);

  console.log(result);
}
```

## License

- [MIT](LICENSE)

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

**Ready to build a React Native chat app at scale?**

⭐ **Star this repo** • 💬 **[Contact Adrian to Build It](https://x.com/icookandcode)**

_Built with ❤️ by [Adrian](https://x.com/icookandcode)_

</div>

---

**Keywords:** react-native, react, chat, nsfw, conversation, typescript, react-native-nsfw-detector
