import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { Authcontext } from "../../api/Authcontext";
import Spinner from "react-native-loading-spinner-overlay";

const { height, width } = Dimensions.get("window");

export default function ResetPassword({ navigation }) {
  const [otp, enterOtp] = useState("");
  const [pass, setPass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [isSecureEntry, isSetSecureEntry] = useState(true);
  const [isconfirmSecureEntry, isSetConfirmSecureEntry] = useState(true);
  const [Error, SetError] = useState("");
  const { resetpass, isLoading } = useContext(Authcontext);
  const validation = () => {
    if (otp === "" && pass === "" && newpass === "") {
      SetError("All fields are empty!");
    } else if (otp === "") {
      SetError("Enter your otp");
    } else if (otp.length != 6) {
      SetError("otp not valid");
    } else if (pass === "") {
      SetError("Enter your password");
    } else if (pass.length < 6) {
      SetError("Password should be more than 6 digit ");
    } else if (newpass === "") {
      SetError("Enter the confirm password");
    } else if (pass != newpass) {
      SetError("Passwords do not match");
    } else {
      navigation.navigate("login");
      resetpass(otp, pass);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>New Password</Text>
      <Text style={styles.Allert}>{Error}</Text>
      <Spinner color="red" visible={isLoading} />
      <TextInput
        style={styles.input1}
        mode="outlined"
        outlineColor="red"
        theme={{ roundness: 20 }}
        keyboardType="default"
        placeholder="Enter OTP"
        value={otp}
        activeOutlineColor="red"
        onChangeText={(value) => enterOtp(value)}
      />

      {/* <TextInput
        style={styles.input1}
        mode="outlined"
        outlineColor="red"
        theme={{ roundness: 20 }}
        keyboardType="default"
        placeholder="Mobile Number"
        value={mobileNumber}
        activeOutlineColor="red"
        onChangeText={(value) => setMobilenumber(value)}
      /> */}

      <TextInput
        style={styles.input1}
        outlineColor="red"
        mode="outlined"
        theme={{ roundness: 20 }}
        secureTextEntry={isSecureEntry}
        keyboardType="default"
        placeholder="New Password"
        activeOutlineColor="red"
        value={pass}
        onChangeText={(value) => setPass(value)}
        right={
          <TextInput.Icon
            icon={isSecureEntry ? "eye" : "eye-off"}
            onPress={() => isSetSecureEntry(!isSecureEntry)}
          />
        }
      />

      <TextInput
        style={styles.input1}
        outlineColor="red"
        mode="outlined"
        theme={{ roundness: 20 }}
        secureTextEntry={isconfirmSecureEntry}
        keyboardType="default"
        placeholder="Confirm Password"
        activeOutlineColor="red"
        value={newpass}
        onChangeText={(value) => setNewpass(value)}
        right={
          <TextInput.Icon
            icon={isconfirmSecureEntry ? "eye" : "eye-off"}
            onPress={() => isSetConfirmSecureEntry(!isconfirmSecureEntry)}
          />
        }
      />
      <TouchableOpacity onPress={validation} style={styles.Button}>
        <Text style={styles.nextStyle}>Reset Password</Text>
      </TouchableOpacity>

      <Text style={styles.text1}>
        Not recieved your OTP?{" "}
        <Text
          onPress={() => navigation.navigate("1")}
          style={styles.underlineTextStyle1}
        >
          Resend OTP
        </Text>
      </Text>
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
  Text: {
    color: "red",
    fontSize: 25,
    fontWeight: "bold",
    bottom: 40,
  },
  input1: {
    backgroundColor: "white",
    padding: 8,
    width: 350,
    height: 50,
    margin: 10,
    top: -20,
  },
  Button: {
    borderRadius: 20,
    borderColor: "red",
    backgroundColor: "red",
    margin: 8,
    alignItems: "center",
    width: width / 1.2,
    height: 60,
    bottom: -30,
  },
  nextStyle: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    padding: 15,
  },
  text1: {
    fontSize: 16,
    bottom: -100,
    flexDirection: "column",
    width: width / 1.2,
    right: -60,
  },
  underlineTextStyle1: {
    color: "#EE4E4E",
    textDecorationLine: "underline",
  },
  Allert: {
    color: "red",
    textDecorationLine: "underline",
    fontWeight: "bold",
    top: 400,
  },
});
