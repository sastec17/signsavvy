import React from 'react';
import { View, Image, Text, Button, Modal } from 'react-native';
import {Video, ResizeMode } from 'expo-av'

export default function PhotoDetail({ item, onClose }) {
    const [videoRef, setVideoRef] = React.useState(null);
    console.log(item)
    const playVideo = async () => {
        if (videoRef) {
            await videoRef.replayAsync();
        }
    };
    return (
        <Modal visible={!!item} animationType="slide">
            <View>
                {item.mediaType === 'video' ?
                <Video
                   ref={videoRef}
                   source={{ uri: item.uri }}
                   style={{ width: '100%', height: '80%'}} 
                   useNativeControls
                   isLooping
                ></Video>
                 : 
                <Image
                    style={{ width: '100%', height: '80%' }}
                    source={{ uri: item.uri }}
                />
                }
                {item.mediaType === 'video' && (
                    <Button title="Play Video" onPress={playVideo} />
                )}
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
}
