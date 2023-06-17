import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
const { height, width } = Dimensions.get("window");

export default function Helep({ navigation }) {
  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        iconColor="black"
        mode="contained"
        size={35}
        style={styles.nav}
        onPress={() => navigation.openDrawer()}
      />
      <ScrollView style={{ top: width / 4.5, flex: 1, flexGrow: 1 }}>
        <View style={styles.AccountContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", right: width / 20 }}>
            Q. How do I create an account?
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 15,
              fontFamily: "sans-serif-light",
            }}
          >
            To Create an Account:
            {"\n"}
          </Text>
          <Text style={styles.AccountCreateSteps}>
            1. Tap The Create Account Button{"\n"}
            2. Submit Your Phone Number To Get the OTP{"\n"}3. Fill Up the
            Details.{"\n"}4. Select The User Type Correctly{" "}
            <Text>
              {"\n"}
              5. If you are a Shopkeeper select{" "}
              <Text style={{ fontWeight: "bold" }}>Propreitor</Text> else select
              <Text style={{ fontWeight: "bold" }}> Delivery Person</Text>
            </Text>
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 13,
              textAlign: "left",
              width: width / 1.25,
              fontFamily: "sans-serif-light",
            }}
          >
            {" "}
            If you are a ShopOwner, redirect to next screen and fill up the
            Required Details
          </Text>
        </View>

        <View style={styles.AccountContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", right: width / 20 }}>
            Q. How do I reset my password?
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 15,
              fontFamily: "sans-serif-light",
            }}
          >
            To Reset Your Password :{"\n"}
          </Text>
          <Text style={styles.ResetPassSteps}>
            1. In Login Screen Tap
            <Text style={{ fontWeight: "bold" }}> Forgot Password</Text>
            {"\n"}2. Enter Your Phone Number to get The OTP{"\n"}3. Insert the
            OTP and Enter your New Password{"\n"}4. Tap The Reset Password
            Button and your Password is Changed Successfully{"\n"}
            5. Now Login With Your New Credentials
          </Text>
        </View>

        <View style={styles.AccountContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", right: width / 20 }}>
            Q. How do I delete my account?
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 15,
              fontFamily: "sans-serif-light",
            }}
          >
            To Delete Your Account:{"\n"}
          </Text>
          <Text style={styles.DeletAccountSteps}>
            1. Login With your Credentials{"\n"}2. Goto Profile{"\n"}3. Select{" "}
            <Text style={{ fontWeight: "bold" }}>Delete Account</Text>
          </Text>
        </View>
        <View style={styles.AccountContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", right: width / 20 }}>
            Q. How do I contact customer support?
          </Text>
          <Text style={styles.CustomerSupport}>
            You Can Call Us at 080-6872 7374 or Email Us At
            <Text style={{ fontWeight: "bold" }}> support@HyperLocal.com</Text>
          </Text>
        </View>
        <View style={styles.AccountContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", right: width / 20 }}>
            Q. Can I use the app offline?
          </Text>
          <Text style={styles.CustomerSupport}>
            No, You Cannot Use Our App Offline.
          </Text>
        </View>
        <View style={styles.AccountContainer}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", right: width / 20 }}
            s
          >
            Q. What do I do if I forget my password?
          </Text>
          <Text
            style={{
              marginTop: 15,
              fontSize: 15,
              fontFamily: "sans-serif-light",
            }}
          >
            If You Have Forgotten Your Password :{"\n"}
          </Text>
          <Text style={styles.ResetPassSteps}>
            1. In Login Screen Tap
            <Text style={{ fontWeight: "bold" }}> Forgot Password</Text>
            {"\n"}2. Enter Your Phone Number to get The OTP{"\n"}3. Insert the
            OTP and Enter your New Password{"\n"}4. Tap The Reset Password
            Button and your Password is Changed Successfully{"\n"}
            5. Now Login With Your New Credentials
          </Text>
        </View>
        <View style={styles.AccountContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", right: width / 20 }}>
            Q. As a Delivery Person Can I Use This Account As A Propreitor?
          </Text>
          <Text style={styles.AccountChange}>
            No,you cannot do that. You Need To Create A New Account If You Want
            to Be a Proprietor
          </Text>
        </View>
        <View style={{ height: width / 5 }} />
      </ScrollView>
      <StatusBar hidden={false} />
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
    right: width / 1.25,
    bottom: height / 1.1,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
  },
  AccountContainer: {
    marginLeft: 25,
    marginBottom: 20,
    padding: 2,
  },
  AccountCreateSteps: {
    fontSize: 18,
    textAlign: "auto",
    fontFamily: "sans-serif-light",
    width: width / 1.15,
  },
  ResetPassSteps: {
    fontSize: 18,
    textAlign: "auto",
    fontFamily: "sans-serif-light",
    width: width / 1.05,
  },
  DeletAccountSteps: {
    fontSize: 18,
    textAlign: "auto",
    fontFamily: "sans-serif-light",
    width: width / 1.05,
  },
  CustomerSupport: {
    fontSize: 18,
    textAlign: "auto",
    fontFamily: "sans-serif-light",
    width: width / 1.18,
    marginTop: 15,
  },
  AccountChange: {
    fontSize: 18,
    textAlign: "auto",
    fontFamily: "sans-serif-light",
    width: width / 1.1,
    marginTop: 15,
  },
});
