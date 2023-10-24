import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout() {
  const logout = () => {
    AsyncStorage.removeItem("token");
  };
  return (
    <View>
      <TouchableOpacity
        onPress={(logout) => logout()}
        style={styles.logoutButton}
      >
        <Text style={styles.logout_text}>LogOut</Text>
      </TouchableOpacity>
    </View>
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
  logoutButton: {
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
//export default Logout;
