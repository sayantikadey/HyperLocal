import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { Authcontext } from "../../api/Authcontext";
import Spinner from "react-native-loading-spinner-overlay";
import { TextInput } from "react-native-paper";
const { height, width } = Dimensions.get("window");

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [isSecureEntry, isSetSecureEntry] = useState(true);
  const { isLoading, login } = useContext(Authcontext);

  return (
    <View style={styles.container}>
      <Spinner color="red" visible={isLoading} />
      <Text style={styles.text2}>Login</Text>
      <Text style={styles.text5}>Mobile Number</Text>
      <TextInput
        style={styles.input1}
        mode="outlined"
        outlineColor="red"
        theme={{ roundness: 20 }}
        keyboardType="default"
        placeholder="Mobile Number"
        value={username}
        activeOutlineColor="red"
        onChangeText={(value) => setUsername(value)}
      />
      <Text style={styles.text5}>Enter Password</Text>

      <TextInput
        style={styles.input2}
        outlineColor="red"
        mode="outlined"
        theme={{ roundness: 20 }}
        secureTextEntry={isSecureEntry}
        keyboardType="default"
        placeholder="Enter Password"
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
      <TouchableOpacity
        style={styles.nextBtn2}
        onPress={() => navigation.navigate("otplogin")}
      >
        <Text style={styles.nextStyle}>Request OTP</Text>
      </TouchableOpacity>
      {username == "" || pass == "" ? (
        <TouchableOpacity style={styles.nextBtndisable} disabled={true}>
          <Text style={styles.nextStyle}>LOGIN</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.nextBtn1}
          onPress={() => login(username, pass)}
        >
          <Text style={styles.nextStyle}>LOGIN</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.text7}>Or</Text>
      <Text style={styles.text3}>
        <Text
          onPress={() => navigation.navigate("forgetpass")}
          style={styles.underlineTextStyle1}
        >
          Forgot Password
        </Text>
      </Text>

      <Text style={styles.text4}>
        Don't have an account?{" "}
        <Text
          onPress={() => navigation.navigate("mobileOTPreg")}
          style={styles.underlineTextStyle1}
        >
          Signup
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
  input1: {
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 50,
    margin: 10,
    top: -50,
  },
  input2: {
    backgroundColor: "white",
    padding: 10,
    width: 280,
    height: 50,
    top: -50,
    margin: 10,
  },
  nextBtn1: {
    borderRadius: 20,
    borderColor: "red",
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    width: width / 1.4,
    height: 60,
    bottom: -30,
  },
  nextBtn2: {
    borderRadius: 20,
    borderColor: "red",
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    width: width / 1.4,
    height: 60,
    bottom: -30,
  },
  text3: {
    fontSize: 13,
    top: -225,
    textAlign: "center",
    right: -80,
  },
  underlineTextStyle1: {
    color: "#EE4E4E",
    textDecorationLine: "underline",
  },

  nextStyle: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },

  text2: {
    color: "red",
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Roboto",
    bottom: 60,
  },
  text4: {
    fontSize: 13,
    top: 120,
    flexDirection: "column",
    width: width / 1.2,
    right: -100,
  },
  nextBtndisable: {
    borderRadius: 20,
    backgroundColor: "#EE4E4E",
    padding: 10,
    margin: 8,
    alignItems: "center",
    width: width / 1.4,
    height: 60,
    bottom: -30,
  },
  text5: {
    right: 100,
    top: -50,
  },
  text8: {
    top: 10,
    fontSize: 20,
  },
  text7: {
    top: -180,
    fontSize: 20,
  },
  nextBtn3: {
    borderRadius: 20,
    borderColor: "red",
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    width: width / 1.4,
    height: 60,
    bottom: -30,
  },
});
