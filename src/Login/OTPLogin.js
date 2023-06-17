import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { IconButton, TextInput } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Authcontext } from "../../api/Authcontext";

const { height, width } = Dimensions.get("window");

export default function OTPLogin({ navigation }) {
  const [Error, Seterror] = useState("");
  const [mobile, SetMobile] = useState("");
  const [otp, setOtp] = useState("");
  const { isLoading, GetOtp, mobilenum, OTPlogin } = useContext(Authcontext);

  const validation = () => {
    if (isNaN(mobile)) {
      Seterror("Enter a Number");
    } else if (mobile === "") {
      Seterror("Enter Mobile Number");
    } else if (mobile.length != 10) {
      Seterror("Enter 10 Digit Mobile Number");
    } else {
      mobilenum(mobile);
      GetOtp(mobile);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner color="red" visible={isLoading} />
      <Text style={styles.login}>Login</Text>
      <View style={styles.content}>
        <TextInput
          placeholder="Put Your Mobile Number"
          mode="outlined"
          theme={{ roundness: 10 }}
          value={mobile}
          onChangeText={(value) => SetMobile(value)}
          activeOutlineColor="red"
          outlineColor="red"
          style={styles.mobileinput}
        />
        <Text style={{ color: "red" }}>{Error}</Text>

        <TouchableOpacity style={styles.Button} onPress={() => validation()}>
          <Text style={styles.ButtonText}>Send OTP</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Put Your OTP"
          mode="outlined"
          theme={{ roundness: 10 }}
          value={otp}
          onChangeText={(value) => setOtp(value)}
          activeOutlineColor="red"
          outlineColor="red"
          style={styles.otpinput}
        />

        <TouchableOpacity
          style={styles.Button2}
          onPress={() => OTPlogin(mobile, otp)}
        >
          <Text style={styles.ButtonText2}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "white",
    left: width / 25,
    top: height / 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    //width: 97,
    //left: 180,
    bottom: height / 6,
    fontWeight: "900",
    fontSize: 36,
    alignItems: "center",
    textAlign: "center",
    color: "#F02121",
  },
  content: {
    bottom: width / 3,
  },
  mobileinput: {
    width: width / 1.3,
    backgroundColor: "white",
    elevation: 50,
    top: height / 10,
  },
  otpinput: {
    width: width / 1.3,
    backgroundColor: "white",
    elevation: 50,
    top: height / 4,
  },
  mobileText: {
    fontWeight: "400",
    fontSize: 16,
    top: -2,
  },
  Button: {
    width: width / 1.3,
    borderWidth: 1,
    borderColor: "#F02121",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    top: height / 7,
    height: width / 7,
  },
  ButtonText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#F02121",
  },
  Button2: {
    width: width / 1.3,
    borderWidth: 1,
    borderColor: "#F02121",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    top: height / 3,
    height: width / 7,
  },
  ButtonText2: {
    fontWeight: "600",
    fontSize: 20,
    color: "#F02121",
  },
  Buttondisable: {
    width: width / 1.3,
    borderWidth: 1,
    borderColor: "#F02121",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    top: width / 7,
    height: width / 7,
  },
});
