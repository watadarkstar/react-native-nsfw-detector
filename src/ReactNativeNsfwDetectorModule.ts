import { NativeModule, requireNativeModule } from 'expo';

declare class ReactNativeNsfwDetectorModule extends NativeModule<{}> {
  setValueAsync(value: string): Promise<void>;
}

export default requireNativeModule<ReactNativeNsfwDetectorModule>('ReactNativeNsfwDetector');
