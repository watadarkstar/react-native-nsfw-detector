Pod::Spec.new do |s|
  s.name           = 'ReactNativeNsfwDetector'
  s.version        = '1.0.0'
  s.summary        = 'A sample project summary'
  s.description    = 'A sample project description'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '16.4',
    :tvos => '16.4'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # s.prepare_command = <<-CMD
  #   if [ ! -f NSFW.mlmodel ]; then
  #     curl -sL "https://github.com/lovoo/NSFWDetector/raw/master/NSFWDetector/Classes/NSFW.mlmodel" -o "NSFW.mlmodel"
  #   fi
  # CMD

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'COREML_CODEGEN_LANGUAGE' => 'Swift',
  }

  s.source_files = "*.{h,m,mm,swift,hpp,cpp}"
  s.resources = ["NSFW.mlmodelc"]
end
