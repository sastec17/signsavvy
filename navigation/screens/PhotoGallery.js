import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, FlatList, Image, TouchableOpacity, Button, Alert } from 'react-native';
import PhotoDetail from './ImageView';
import {Video, ResizeMode } from 'expo-av'

export default function PhotoGallery({ navigation }) {
  const [allPhotos, setAllPhotos] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const albumName = "SignSavvy";

  const getAlbum = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to Camera Roll Denied', 'Please grant access to the media library');
        return;
      }
      const albums = await MediaLibrary.getAlbumsAsync();
      const album = albums.find((a) => a.title == albumName);
      if (!album) {
        Alert.alert('Album Not Found', `Album '${albumName}' not found in your media library.`);
        return;
      }

      const albumPhotos = await MediaLibrary.getAssetsAsync({
        first: 20,
        album: album,
        sortBy: ['creationTime'],
        mediaType: ['photo', 'video'],
      });
      setAllPhotos(albumPhotos.assets);
    } catch (error) {
      console.error('Error getting album/photos', error);
    }
  }

  React.useEffect(() => {
    getAlbum();
  }, []);

  const refreshPhotos = () => {
    getAlbum();
  }

  const handleItemPress = (item) => {
      setSelectedItem(item);
  }

  const closeDetail = () => {
      setSelectedItem(null);
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Refresh" onPress={refreshPhotos} />
      <FlatList
        data={allPhotos}
        keyExtractor={(item) => item.id}
        numColumns={4}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
               
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{ uri: item.uri }}
                    />
                
            
            </TouchableOpacity>
         
        )} 
      />
      {selectedItem == null ? 
        <Text></Text>
       : <PhotoDetail item={selectedItem} onClose={closeDetail}></PhotoDetail>
      }
       
    </View>
  );
}
