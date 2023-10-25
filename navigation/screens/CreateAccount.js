import * as React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateAccount = ({ navigation }) => {
  const [FirstName, updateFirstName] = React.useState("");
  const [LastName, updateLastName] = React.useState("");
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const [verifyPassword, updateVerifyPassword] = React.useState("");

  const onPressCreate = async () => {
    if (username == "") {
      alert("Enter a username");
    } else if (password == "") {
      alert("Enter a password");
    } else if (verifyPassword == "") {
      alert("Enter password confirmation");
    } else if (verifyPassword !== password) {
      alert("Passwords do not match.");
    }
    // TODO - SAVE USERNAME AND PASSWORD IN DB AND LOGIN AS USER
    else {
      try {
        var data = JSON.stringify({
          Password: password,
          Username: username,
          FirstName: FirstName,
          LastName: LastName,
        });
        await AsyncStorage.setItem(username, data);
        await AsyncStorage.setItem("login", username);
        navigation.navigate("SignSavvy");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        style={styles.input}
        onChangeText={updateFirstName}
        value={FirstName}
        placeholder="First Name"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={updateLastName}
        value={LastName}
        placeholder="Last Name"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={updateUsername}
        value={username}
        placeholder="Username"
      ></TextInput>

      <TextInput
        style={styles.input}
        onChangeText={updatePassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      ></TextInput>

      <TextInput
        style={styles.input}
        onChangeText={updateVerifyPassword}
        secureTextEntry={true}
        value={verifyPassword}
        placeholder="Confirm Password"
      ></TextInput>

      <TouchableOpacity onPress={onPressCreate} style={styles.loginButton}>
        <Text style={styles.loginText}>Create Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    backgroundColor: "silver",
    color: "black",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
  },
  loginButton: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    marginTop: 40,
    marginBottom: 10,
    height: 45,
    justifyContent: "center",
  },
});

export default CreateAccount;
