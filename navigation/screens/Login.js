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

export default function LoginPage({ navigation }) {
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const onPressLogin = async () => {
    if (username == "") {
      alert("Enter a username");
    } else if (password == "") {
      alert("Enter a password");
    } else {
      try {
        /*var data = JSON.stringify({
          Password: password,
          Username: username,
        });*/

        //alert(username);
        const details = await AsyncStorage.getItem(username);
        if (details == null) {
          alert("User does not exist");
        }
        const json = JSON.parse(details);
        const temp = json.Password;
        if (temp !== password) {
          alert("Invalid password");
        } else {
          await AsyncStorage.setItem("login", username);
          navigation.navigate("SignSavvy");
        }
        //await AsyncStorage.setItem(username, password);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onPressSignUp = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>SignSavvy Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={updateUsername}
        value={username}
        placeholder="Username"
      ></TextInput>
      <TextInput
        style={styles.input}
        onChangeText={updatePassword}
        secureTextEntry={true}
        value={password}
        placeholder="Password"
      ></TextInput>
      <TouchableOpacity onPress={onPressLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  text: {
    fontSize: 18,
    marginTop: 20,
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

//export default LoginPage;
