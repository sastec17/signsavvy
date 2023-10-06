import * as React from 'react';
import { View, Text, Button }  from 'react-native';
import axios from 'axios';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const PhotoGallery = ({ navigation}) => {
    const [videos, setVideos] = React.useState([]);

    React.useEffect(() => {
        // Fetch a list of random videos using the Youtube Data API
        axios
            .get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCOl3ygvle4b3yPw_SPKpbfWniKuecKfuk&part=snippet&type=video&maxResults=1`
            )
            .then((responses) => {
                const videoData = response.data.items;
                setVideos(videoData);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const renderVideoItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                // Naviagate to a video details screen when a video is taped
                navigation.navigation('VideoDetails', { videoID: item.id.videoID });
            }}
        >
            <View style={{ margin: 10}}>
                <Image
                    source={{ uri: item.snippet.thumbnails.medium.url }}
                    style={{ width: 160, height: 90 }}
                />
                <Text>{item.snippet.title}</Text> 
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={videos}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id.videoID}
                numColumns={2}  // Adjust as needed
            />
        </View>
    );
};

/*
export default function DetailsScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Video Gallery</Text>
        </View>
    )
}
*/

export default withNavigation(PhotoGallery);