import ExpoModulesCore
import UIKit

public class ReactNativeNsfwDetectorModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ReactNativeNsfwDetector")

    AsyncFunction("check") { (imageUri: String, promise: Promise) in
      guard #available(iOS 12.0, *) else {
        promise.reject(
          "ERR_UNAVAILABLE",
          "NSFW detection requires iOS 12.0 or later"
        )
        return
      }

      guard let image = Self.loadImage(from: imageUri) else {
        promise.reject(
          "ERR_IMAGE_LOAD",
          "Could not load or decode image from URI: \(imageUri)"
        )
        return
      }

      guard let cgImage = image.cgImage else {
        promise.reject(
          "ERR_IMAGE_INVALID",
          "Image could not be converted to CGImage (Vision requires CGImage-backed images)"
        )
        return
      }

      // Normalize orientation for Vision consistency
      let normalizedImage = UIImage(cgImage: cgImage, scale: image.scale, orientation: .up)

      NSFWDetector.shared.check(image: normalizedImage) { result in
        switch result {
        case .success(let nsfwConfidence):
          promise.resolve(Double(nsfwConfidence))

        case .error(let error):
          promise.reject("ERR_DETECTION", error.localizedDescription)
        }
      }
    }
  }

  private static func loadImage(from uri: String) -> UIImage? {

    // Handle file:// URIs properly
    if let url = URL(string: uri), url.isFileURL {
      guard FileManager.default.fileExists(atPath: url.path),
            let data = try? Data(contentsOf: url),
            let image = UIImage(data: data) else {
        return nil
      }
      return image
    }

    // Fallback for raw paths
    guard let data = try? Data(contentsOf: URL(fileURLWithPath: uri)),
          let image = UIImage(data: data) else {
      return nil
    }

    return image
  }
}