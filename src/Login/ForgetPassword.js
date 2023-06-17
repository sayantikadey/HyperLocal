import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { Authcontext } from "../../api/Authcontext";
const { height, width } = Dimensions.get("window");

export default function ForgetPassword({ navigation }) {
  const [mobile, SetMobile] = useState("");
  const [Error, Seterror] = useState("");
  const { GetOtp, mobilenum } = useContext(Authcontext);

  const validation = () => {
    if (mobile === "") {
      Seterror("Enter Mobile number");
    } else {
      navigation.navigate("resetpass");
      mobilenum(mobile);
      GetOtp(mobile);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login</Text>
      <View style={styles.content}>
        <Text style={styles.mobileText}>Mobile Number</Text>
        <TextInput
          placeholder="Mobile number"
          mode="outlined"
          theme={{ roundness: 10 }}
          value={mobile}
          onChangeText={(value) => SetMobile(value)}
          activeOutlineColor="red"
          outlineColor="red"
          style={styles.mobileinput}
        />
        <TouchableOpacity style={styles.Button} onPress={() => validation()}>
          <Text style={styles.ButtonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    //width: 97,
    //left: 180,
    bottom: width / 2.2,
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
    top: width / 7,
    height: width / 7,
  },
  ButtonText: {
    fontWeight: "600",
    fontSize: 20,
    color: "#F02121",
  },
});
