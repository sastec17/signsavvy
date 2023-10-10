import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';


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
                let video = await cameraRef.recordAsync();
                console.log('video', video);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async function stopVideo () {
        try {
            if (cameraRef) {
                await cameraRef.stopRecording();
                console.log('end video');
                setRecord(false);
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
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);

        //TODO: this is a function that needs to take pictures that and send to mediaPipe player using the python code scripts
        if (photo) {
            const { uri, width, height, fileSize } = photo;
            const fileType = uri.split('.').pop(); // Extract the file extension

            console.log('Captured image URI:', uri);
            console.log('this is the image URI', photo.uri)
            console.log('Image dimensions (width x height):', width, 'x', height);
            console.log('File size:', fileSize, 'bytes');
            console.log('File type:', fileType);
            const customFilePath = `/Users/fisherwojtas/eecs495/signsavvy/scripts/pictures/my_custom_image.jpg`;

            try {
                // Copy the captured image to the custom location
                await RNFS.copyFile(photo.uri, customFilePath);
                console.log(`Image saved to: ${customFilePath}`);
            } catch (error) {
                console.error('Error saving image:', error);
            }
            // Send the captured image to the Flask API
            sendImageToAPI(photo);
        }
    };
    async function sendImageToAPI (photo) {
        try {
            const apiURL = 'http://10.0.0.147:6000/recognize_gestures'; // Replace with your API URL
            const formData = new FormData();
            formData.append('image', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });
            const response = await fetch(apiURL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                // Handle the response data here
                console.log('Gesture Result:', responseData.gesture_result);
                console.log('Annotated Image:', responseData.annotated_image);

                // Set the captured image and result in your component state
                setCapturedImage(responseData.annotated_image);
            } else {
                console.error('Failed to send image to API');
            }
        } catch (error) {
            console.error('Error sending image to API:', error);
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
                            <TouchableOpacity style={styles.button} onPress={takeVideo}>
                                <Text style={styles.text}>Start Recording</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={takePicture}>
                                <Text style={styles.text}>Take Picture</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                        <Ionicons name={'camera'} color={'white'} size={26} />
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
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
