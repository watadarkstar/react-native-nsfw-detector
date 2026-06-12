import ExpoModulesCore

public class ReactNativeNsfwDetectorModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ReactNativeNsfwDetector")

    AsyncFunction("setValueAsync") { (value: String) in
    }
  }
}
