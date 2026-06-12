import { registerWebModule, NativeModule } from 'expo';

// ReactNativeNsfwDetectorModule is not available on the web platform.
class ReactNativeNsfwDetectorModule extends NativeModule<{}> {}

export default registerWebModule(ReactNativeNsfwDetectorModule, 'ReactNativeNsfwDetectorModule');
