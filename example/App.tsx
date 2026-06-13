import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { check } from 'react-native-nsfw-detector';

export default function App() {
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    setLoading(true);
    setError(null);
    setConfidence(null);

    try {
      // No permissions request is necessary for launching the image library.
      // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
      // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
      // so the app users aren't surprised by a system dialog after picking a video.
      // See "Invoke permissions for videos" sub section for more details.
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Permission to access the media library is required.');
        return;
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!imageResult.canceled) {
        const imageUri = imageResult.assets[0].uri;
        setImage(imageUri);
        console.log('image', image);

        const res = await check(imageUri);
        setConfidence(res);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.header}>NSFW Module API Example</Text>
          <Image source={image} style={styles.image} contentFit="cover" />
          <Button title="Choose Image" onPress={pickImage} disabled={loading} />
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
  header: { fontSize: 30, margin: 20 },
  container: { flex: 1, backgroundColor: '#eee' },
  content: { paddingBottom: 40 },
  image: { width: '100%', height: 280, marginHorizontal: 20, borderRadius: 10 },
  spinner: { marginTop: 16 },
  result: { margin: 20, fontSize: 16 },
  error: { margin: 20, fontSize: 16, color: '#c00' },
});
