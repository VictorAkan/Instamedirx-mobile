import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import * as ImagePicker from 'expo-image-picker';

export interface UploadImagesData {
  images: {
    front?: string;
    side?: string;
    back?: string;
  };
}

interface UploadImagesProps {
  data: UploadImagesData;
  onUpdate: (data: UploadImagesData) => void;
}

export const UploadImages: React.FC<UploadImagesProps> = ({ data, onUpdate }) => {
  const [images, setImages] = useState(data.images || {});

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
      return false;
    }
    return true;
  };

  const pickImage = async (type: 'front' | 'side' | 'back') => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newImages = {
          ...images,
          [type]: result.assets[0].uri,
        };
        setImages(newImages);
        onUpdate({ images: newImages });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const removeImage = (type: 'front' | 'side' | 'back') => {
    const newImages = { ...images };
    delete newImages[type];
    setImages(newImages);
    onUpdate({ images: newImages });
  };

  const ImageUploadBox = ({ 
    type, 
    label 
  }: { 
    type: 'front' | 'side' | 'back'; 
    label: string;
  }) => {
    const hasImage = images[type];

    return (
      <View style={{
        flex: 1,
        height: 140,
        borderWidth: 2,
        borderColor: '#CEE0FF',
        borderStyle: 'dashed',
        borderRadius: 8,
        backgroundColor: '#FAFAFA',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {hasImage ? (
          <>
            <Image
              source={{ uri: images[type] }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 6,
              }}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => removeImage(type)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 12,
                width: 24,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialIcons name="close" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => pickImage(type)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16,
            }}
          >
            <MaterialIcons name="add" size={24} color="#9CA3AF" style={{ marginBottom: 8 }} />
            <Text style={{
              color: '#6B7280',
              fontSize: 14,
              fontFamily: 'OpenSans_400Regular',
              textAlign: 'center',
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ marginBottom: 24 }}>
        <ThemedText style={{
          fontSize: 20,
          fontFamily: 'OpenSans_700Bold',
          color: '#0544AA',
          marginBottom: 8,
        }}>
          Upload Images
        </ThemedText>
        <ThemedText style={{
          fontSize: 16,
          fontFamily: 'OpenSans_400Regular',
          color: '#6B7280',
          lineHeight: 24,
        }}>
          Add product images - front, back, and side shots.
        </ThemedText>
      </View>

      {/* Upload Area */}
      <View style={{
        borderWidth: 2,
        borderColor: '#CEE0FF',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 20,
        backgroundColor: '#FAFAFA',
        marginBottom: 24,
      }}>
       
        <View style={{
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <View style={{
            width: 48,
            height: 48,
            
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#0544AA" style={{transform:[{scaleX:-1}]}} />
          </View>
          <Text style={{
            color: '#6B7280',
            fontSize: 14,
            fontFamily: 'OpenSans_400Regular',
            textAlign: 'center',
          }}>
            Click on the boxes to choose a file.
          </Text>
        </View>

      
        <View style={{
          flexDirection: 'row',
          gap: 12,
          marginBottom: 12,
        }}>
          <ImageUploadBox type="front" label="Front" />
          <ImageUploadBox type="side" label="Side" />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <View style={{ flex: 1, maxWidth: '48%' }}>
            <ImageUploadBox type="back" label="Back" />
          </View>
        </View>
      </View>

      
      <View style={{ 
        flexDirection: 'row', 
        gap: 16,
        justifyContent: 'space-between',
      }}>

      
      </View>
    </View>
  );
};