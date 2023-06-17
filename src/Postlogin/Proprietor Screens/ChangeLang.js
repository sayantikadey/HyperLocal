import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
const { height, width } = Dimensions.get("window");

export default function ChangeLang({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <IconButton
          icon="menu"
          iconColor="black"
          mode="contained"
          size={35}
          style={styles.nav}
        />
      </TouchableOpacity>
      <Text>Change Language</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    position: "absolute",
    right: width / 3.5,
    bottom: height / 2.56,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
  },
});
