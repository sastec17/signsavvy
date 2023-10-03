import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RealTimeTranslateScreen() {
    // [<value>, <functionName>]
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [audioPermission, requestAudioPermission] = Camera.useMicrophonePermissions();
    const [record, setRecord] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);

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

    return (
        <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={(ref) => {setCameraRef(ref)}}>
            <View style={styles.buttonContainer}>
            {record? 
                    <TouchableOpacity style={styles.button} onPress={stopVideo}> 
                        <Text style={styles.text}>Stop Recording</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.button} onPress={takeVideo}>
                        <Text style={styles.text}>Start Recording</Text>
                    </TouchableOpacity> 
                }
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camera</Text>
                <Ionicons name={"camera"} color={'white'} size={26}  />
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
