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
//import { openDatabase } from "react-native-sqlite-storage";
//import SQLite from "react-native-sqlite-storage";
//import { openDatabase } from "react-native-sqlite-storage";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase(
  { name: "myDatabase.db", location: "default" },
  () => {
    // Database opened successfully
  },
  (error) => {
    console.error("Error opening database:", error);
  }
);

// Later in your code, you can use the 'db' instance to perform database operations.

const LoginPage = ({ navigation }) => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
    );
  });
  const [username, updateUsername] = React.useState("");
  const [password, updatePassword] = React.useState("");
  const onPressLogin = () => {
    if (username == "") {
      alert("Enter a username");
    } else if (password == "") {
      alert("Enter a password");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users WHERE username = ? AND password = ?",
          [username, password],
          (_, { rows }) => {
            const user = rows.item(0);
            callback(user);
          }
        );
      });
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
};

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

export default LoginPage;
