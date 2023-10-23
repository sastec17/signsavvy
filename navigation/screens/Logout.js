import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = () => {
  const logout = () => {
    AsyncStorage.removeItem("token");
  };
  return (
    <View>
      <TouchableOpacity onPress={() => logout()} style={styles.logout_box}>
        <Text style={styles.logout_text}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
