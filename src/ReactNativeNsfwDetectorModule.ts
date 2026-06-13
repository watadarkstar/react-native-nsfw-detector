import { NativeModule, requireNativeModule } from 'expo';

declare class ReactNativeNsfwDetectorModule extends NativeModule<{}> {
  check(imageUri: string): Promise<number>;
}

export default requireNativeModule<ReactNativeNsfwDetectorModule>('ReactNativeNsfwDetector');
