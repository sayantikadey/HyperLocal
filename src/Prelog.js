import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");

export default function Prelog({ navigation }) {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "Andriod" ? "padding" : "height"}
        style={styles.container}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/delivery-man-riding-red-scooter-illustration_9845-14.jpg?w=2000",
          }}
          style={styles.image}
        />

        <Text style={styles.Job}>Find the right job for you </Text>

        <Text style={styles.delivertext}>
          Make your products delivered from anytime anywhere
        </Text>

        <Text style={styles.account}>
          Already have an account?{" "}
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("login")}
          >
            Login
          </Text>
        </Text>

        <TouchableOpacity
          style={styles.CreateAccount}
          onPress={() => navigation.navigate("mobileOTPreg")}
        >
          <Text style={styles.textStyle}>Create Account</Text>
          <StatusBar style="auto" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: height / 2,
    width: width,
    bottom: width / 4,
    //marginBottom: 300,
  },
  Job: {
    //position: "absolute",
    bottom: width / 3.5,
    fontWeight: "bold",
    fontSize: 31,
    fontFamily: "notoserif",
    textAlign: "center",
    letterSpacing: -0.085,
    lineHeight: 58,
    fontStyle: "normal",
    width: width,
    left: 4,
  },
  delivertext: {
    width: width / 1,
    //position: "absolute",
    //left: 2,
    top: -80,
    fontFamily: "sans-serif-light",
    //fontStyle: "normal",
    fontWeight: "400",
    fontSize: 18,
    //alignItems: "center",
    textAlign: "center",
    letterSpacing: -0.085,
  },
  account: {
    color: "#9C9A9A",
    fontFamily: "sans-serif-light",
    fontSize: 16,
    top: -40,
    right: 10,
    textAlign: "center",
    width: width / 1.6,
  },
  login: {
    position: "absolute",
    color: "red",
    textDecorationLine: "underline",
  },
  view2: {
    top: 10,
    justifyContent: "center",
    alignContent: "center",
    right: -18,
    width: width / 2,
    textAlign: "center",
  },
  CreateAccount: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    width: width / 1.4,
    height: height / 15,
  },
  textStyle: {
    color: "white",
    fontSize: 21,
    fontFamily: "Roboto",
    textAlign: "center",
  },
});
