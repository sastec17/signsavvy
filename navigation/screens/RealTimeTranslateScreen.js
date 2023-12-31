import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import PhotoDetail from './ImageView';


export default function RealTimeTranslateScreen() {
    // [<value>, <functionName>]
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [audioPermission, requestAudioPermission] = Camera.useMicrophonePermissions();
    const [record, setRecord] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [photo, setPhoto] = useState();
    const [video, setVideo] = useState(null);

    if (!permission) {
      // Camera permissions are still loading
    return <Text>Camera permissions still loading...</Text>;
    } 

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
        // Set Permissions
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    if (!audioPermission && permission.granted) {
        return <Text>Audio permissions still loading...</Text>;
    }

    if (!audioPermission.granted && permission.granted) {
        // audio permissions are not granted yet - required for recording
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to access audio</Text>
                <Button onPress={requestAudioPermission} title="grant permission"></Button>
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function takeVideo () {
        try {
            if (cameraRef) {
                setRecord(true);
                let rec_video = await cameraRef.recordAsync();
                console.log('video', rec_video);
                setVideo(rec_video);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async function stopVideo () {
        // stop video and save to camera roll
        try {
            if (cameraRef) {
                await cameraRef.stopRecording();
                console.log('end video');
                setRecord(false);
                if (video) {
                    try {
                        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
                        if (mediaLibraryPermission.status == 'granted') {
                            // get album or create album if DNE
                            const albumName = "SignSavvy"
                            const albums = await MediaLibrary.getAlbumsAsync();
                            let album = albums.find((a) => a.title == albumName);
                            if (!album) {
                                album = await MediaLibrary.createAlbumAsync(albumName);
                            }
                                  // Ensure the album variable is updated
                            album = await MediaLibrary.getAlbumsAsync();
                            album = album.find((a) => a.title === albumName);
        
                            // create an asset 
                            const asset = await MediaLibrary.createAssetAsync(video.uri);
                            if (album && asset) {
                                console.log(asset)
                                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                                console.log('here')
                            }
                        }
                    }
                    catch (error) {
                        console.log('ERROR:', error)
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    async function takePicture () {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        }
        let newPhoto = await cameraRef.takePictureAsync(options);
        setPhoto(newPhoto);
        // save to camera roll
        if (photo) {
            try {
                const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
                if (mediaLibraryPermission.status == 'granted') {
                    // get album or create album if DNE
                    const albumName = "SignSavvy"
                    const albums = await MediaLibrary.getAlbumsAsync();
                    let album = albums.find((a) => a.title == albumName);
                    if (!album) {
                        album = await MediaLibrary.createAlbumAsync(albumName);
                    }
                          // Ensure the album variable is updated
                    album = await MediaLibrary.getAlbumsAsync();
                    album = album.find((a) => a.title === albumName);

                    // create an asset 
                    const asset = await MediaLibrary.createAssetAsync(photo.uri);
                    if (album && asset) {
                        console.log('Photo saved to camera roll')
                        const waiting = await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                        if (waiting) {
                            console.log('moved to signsavvy')
                        }
                        console.log('here')
                    }
                }
            }
            catch (error) {
                console.log('ERROR:', error)
            }
        }
    };

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={(ref) => setCameraRef(ref)}>
                <View style={styles.buttonContainer}>
                    {record ? (
                        <TouchableOpacity style={styles.button} onPress={stopVideo}>
                            <Text style={styles.text}>Stop Recording</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                        <Pressable style={styles.button} onPress={takePicture}>
                            <Text style={styles.text}> Take Picture</Text>
                            <Ionicons name={'camera'} color={'white'} size={26} />
                        </Pressable>
                        <Pressable style={styles.button} onPress={takeVideo}>
                            <Text style={styles.text}>Record Video</Text>
                            <Ionicons name={'videocam-outline'} color={'white'} size={26} />
                        </Pressable>
                        </>
                    )}
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                        <Ionicons name={'camera-reverse-outline'} color={'white'} size={26} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>

    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    camera: {
        flex: 1,
        width: '100%'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        maxHeight: 50,
        backgroundColor: 'black',
        margin: 10,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});
