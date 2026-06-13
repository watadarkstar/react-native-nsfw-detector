import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { check } from 'react-native-nsfw-detector';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const analyzeImage = async (imageUri: string) => {
    setLoading(true);
    setError(null);
    setConfidence(null);

    try {
      setImage(imageUri);

      const res = await check(imageUri);
      setConfidence(res);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    setLoading(true);
    setError(null);
    setConfidence(null);

    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Permission to access the media library is required.');
        return;
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 1,
      });

      if (!imageResult.canceled) {
        await analyzeImage(imageResult.assets[0].uri);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();

      if (!permission.granted) {
        Alert.alert('Permission required', 'Camera permission is required.');
        return;
      }
    }

    setShowCamera(true);
  };

  const takePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      });

      if (!photo?.uri) {
        return;
      }

      setShowCamera(false);
      await analyzeImage(photo.uri);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
      console.error(e);
    }
  };

  if (showCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
          <View style={styles.cameraControls}>
            <Button
              title={`Switch to ${facing === 'back' ? 'Front' : 'Back'} Camera`}
              onPress={toggleCameraFacing}
            />
            <Button title="Take Photo" onPress={takePhoto} />
            <Button title="Cancel" onPress={() => setShowCamera(false)} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}>NSFW Module API Example</Text>

          {image ? <Image source={image} style={styles.image} contentFit="cover" /> : null}

          <Button title="Choose Image" onPress={pickImage} disabled={loading} />

          <View style={styles.buttonSpacing} />

          <Button title="Take Photo" onPress={openCamera} disabled={loading} />

          {loading ? <ActivityIndicator style={styles.spinner} /> : null}

          {confidence != null ? (
            <Text style={styles.result}>NSFW: {(confidence * 100).toFixed(1)}%</Text>
          ) : null}

          {error != null ? <Text style={styles.error}>{error}</Text> : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    margin: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 280,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  spinner: {
    marginTop: 16,
  },
  result: {
    margin: 20,
    fontSize: 16,
  },
  error: {
    margin: 20,
    fontSize: 16,
    color: '#c00',
  },
  buttonSpacing: {
    height: 12,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    padding: 20,
    gap: 12,
  },
});
