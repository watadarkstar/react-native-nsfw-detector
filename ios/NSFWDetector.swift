import Foundation
import CoreML
import Vision
import UIKit

@available(iOS 12.0, *)
public class NSFWDetector {

    public static let shared = NSFWDetector()

    private let model: VNCoreMLModel

    public init() {
        do {
            let bundle = Bundle(for: Self.self)

            guard let modelURL = bundle.url(forResource: "NSFW", withExtension: "mlmodelc") else {
                fatalError("NSFW.mlmodelc not found in bundle")
            }

            let mlModel = try MLModel(contentsOf: modelURL)
            self.model = try VNCoreMLModel(for: mlModel)

        } catch {
            fatalError("Failed to load NSFW model: \(error)")
        }
    }

    // MARK: - Result type

    public enum DetectionResult {
        case error(Error)
        case success(nsfwConfidence: Float)
    }

    // MARK: - Public API

    public func check(image: UIImage, completion: @escaping (DetectionResult) -> Void) {

        guard let cgImage = image.cgImage else {
            completion(.error(NSError(
                domain: "NSFWDetector",
                code: 0,
                userInfo: [NSLocalizedDescriptionKey: "Missing CGImage"]
            )))
            return
        }

        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        run(handler: handler, completion: completion)
    }

    public func check(cvPixelbuffer: CVPixelBuffer, completion: @escaping (DetectionResult) -> Void) {

        let handler = VNImageRequestHandler(cvPixelBuffer: cvPixelbuffer, options: [:])
        run(handler: handler, completion: completion)
    }

    // MARK: - Core execution

    private func run(handler: VNImageRequestHandler,
                     completion: @escaping (DetectionResult) -> Void) {

        let request = VNCoreMLRequest(model: self.model) { request, error in

            if let error {
                completion(.error(error))
                return
            }

            guard let results = request.results as? [VNClassificationObservation] else {
                completion(.error(NSError(
                    domain: "NSFWDetector",
                    code: 0,
                    userInfo: [NSLocalizedDescriptionKey: "No classification results"]
                )))
                return
            }

            // Debug logs (keep for now)
            print("------ NSFW DETECTION ------")
            for r in results {
                print("🔎 \(r.identifier): \(r.confidence)")
            }

            guard let nsfw = results.first(where: { $0.identifier == "NSFW" }),
                  let sfw = results.first(where: { $0.identifier == "SFW" }) else {
                completion(.error(NSError(
                    domain: "NSFWDetector",
                    code: 0,
                    userInfo: [NSLocalizedDescriptionKey: "Missing SFW/NSFW labels"]
                )))
                return
            }

            print("⭐ SFW:", sfw.confidence)
            print("⭐ NSFW:", nsfw.confidence)

            // Return NSFW score (primary signal)
            completion(.success(nsfwConfidence: nsfw.confidence))
        }

        request.imageCropAndScaleOption = .centerCrop

        #if targetEnvironment(simulator)
        request.usesCPUOnly = true
        #endif

        do {
            try handler.perform([request])
        } catch {
            completion(.error(error))
        }
    }
}