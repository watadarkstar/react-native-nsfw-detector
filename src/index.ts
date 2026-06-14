// Reexport the native module. On web, it will be resolved to ReactNativeNsfwDetectorModule.web.ts
// and on native platforms to ReactNativeNsfwDetectorModule.ts
import ReactNativeNsfwDetectorModule from './ReactNativeNsfwDetectorModule';

export function checkNSFW(imageUri: string): Promise<number> {
  return ReactNativeNsfwDetectorModule.check(imageUri);
}

export * from './ReactNativeNsfwDetector.types';
