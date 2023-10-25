import * as React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    const [newPassword, updateNewPassword] = React.useState('');
    const [confirmPassword, updateConfirmPassword] = React.useState('');

    const onPressSave = () => {
        if (newPassword == "" && confirmPassword == "") {
            alert('No changes have been made.');
        } else if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please make sure you have entered the same password in both fields.');
        } else {
            alert('Your new password has been saved.');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Your Account</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={"signsavvyuser@gmail.com"}
                placeholder="Current Username"
            />
            <Text style={styles.label}>New Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={updateNewPassword}
                secureTextEntry={true}
                value={newPassword}
                placeholder="New Password"
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={updateConfirmPassword}
                secureTextEntry={true}
                value={confirmPassword}
                placeholder="Confirm Password"
            />
            <TouchableOpacity
                onPress={onPressSave}
                style={styles.saveButton}>
                <Text style={styles.loginText}>SAVE CHANGES</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 100,
        justifyContent: 'center',
    },
    input: {
        width: "80%",
        backgroundColor: "silver",
        color: 'black',
        borderRadius: 25,
        height: 45,
        marginBottom: 20,
        justifyContent: "center",
        paddingLeft: 20, 
        paddingRight: 20, 
    },
    label: {
        fontSize: 15,
        marginBottom: 10,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 40
    },
    saveButton: {
        width: "35%",
        alignItems: "center",
        screenLeft: 50,
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 10,
        height: 45,
        justifyContent: "center",
    }
})

export default SettingsScreen;
