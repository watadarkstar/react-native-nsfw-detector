import { BlurView } from 'expo-blur';
import { Image, ImageProps } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  ImageStyle,
} from 'react-native';
import { checkNSFW } from 'react-native-nsfw-detector';

export interface NSFWImageProps extends Omit<ImageProps, 'source'> {
  source:
    | {
        uri: string;
      }
    | string;
  blurIntensity?: number;
  revealOnPress?: boolean;
  fallbackBlur?: boolean;
  showLoadingIndicator?: boolean;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onDetectionResult?: (confidence: number) => void;
}

export function NSFWImage({
  source,
  blurIntensity = 100,
  revealOnPress = false,
  fallbackBlur = true,
  showLoadingIndicator = true,
  style,
  containerStyle,
  onDetectionResult,
  ...imageProps
}: NSFWImageProps): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [isNSFW, setIsNSFW] = useState<boolean>(false);
  const [revealed, setRevealed] = useState<boolean>(false);
  const uri = typeof source === 'object' ? source.uri : source;

  useEffect(() => {
    let mounted = true;

    async function detect(): Promise<void> {
      try {
        const confidence = await checkNSFW(uri);
        const isNSFW = confidence > 0.5;

        if (!mounted) {
          return;
        }

        setIsNSFW(isNSFW);
        onDetectionResult?.(confidence);
      } catch (error) {
        console.warn('[NSFWImage] Detection failed', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void detect();

    return () => {
      mounted = false;
    };
  }, [uri, onDetectionResult]);

  const shouldBlur = (loading && fallbackBlur) || (isNSFW && !revealed);

  const content = (
    <View style={[styles.container, containerStyle]}>
      <Image source={uri} style={style} {...imageProps} />

      {shouldBlur && <BlurView intensity={blurIntensity} style={StyleSheet.absoluteFill} />}

      {loading && showLoadingIndicator && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );

  if (revealOnPress && isNSFW) {
    return <Pressable onPress={() => setRevealed((current) => !current)}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
