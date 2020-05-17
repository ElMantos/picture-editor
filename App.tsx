import React from "react";
import { StyleSheet, Text, View } from "react-native";
import App from "./src";

export default function RNApp() {
  return (
    <View style={styles.container}>
      <App />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
