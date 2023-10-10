import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';

export default function PhotoGallery({ navigation }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from your data source or API and update the "images" state.
    // Replace the following line with your actual data fetching logic.
    fetchImagesFromApi();
  }, []);

  const fetchImagesFromApi = () => {
    // Simulate fetching images from an API.
    const mockImages = [
      { id: '1', image: 'image_url_1', title: 'Image 1' },
      { id: '2', image: 'image_url_2', title: 'Image 2' },
      { id: '3', image: 'image_url_3', title: 'Image 3' },
      // Add more image data as needed
    ];
    setImages(mockImages);
  };

  const addImageToGallery = async () => {
    const cameraRollPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);

    if (cameraRollPermission === 'granted') {
      const options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          // User canceled the image picker
          Alert.alert('Image Picker', 'Image selection canceled');
        } else if (response.error) {
          // Handle any errors from the image picker
          console.error('ImagePicker Error: ', response.error);
          Alert.alert('Image Picker', 'An error occurred while selecting the image.');
        } else {
          // Image selected, add it to the gallery
          const newImage = {
            id: `image_${images.length + 1}`,
            image: response.uri,
            title: `Image ${images.length + 1}`,
          };
          setImages([...images, newImage]);
        }
      });
    } else {
      // Handle the case where the user denied permission
      Alert.alert('Permission Denied', 'Camera roll permission denied');
    }
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ImageDetail', { item })}
    >
      <View style={{ margin: 10 }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Button title="Add Image" onPress={addImageToGallery} />
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        numColumns={3} // Adjust as needed for your layout
      />
    </View>
  );
}
