import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

const { height, width } = Dimensions.get("window");

export default function Shopdetails({ navigation }) {
  const [shopname, setShopname] = useState("");
  const [shopgst, setShopgst] = useState("");
  const [shopDescription, setShopdescription] = useState("");
  const [shopShortDescription, setShopshortdescription] = useState("");
  const [Error, SetError] = useState("");

  const validation = () => {
    if (
      shopname === "" &&
      shopgst === "" &&
      shopDescription === "" &&
      shopShortDescription === ""
    ) {
      SetError("All fields are empty!");
    } else if (shopname === "") {
      SetError("Enter your Shop Name");
    } else if (shopname.length <= 5) {
      SetError("Shop Name not valid");
    } else if (shopgst.length != 15) {
      SetError("Enter valid GST Number");
    } else if (shopgst.length == "") {
      SetError("Enter GST Number");
    } else if (shopDescription.length == "") {
      SetError("Enter Shop Description");
    } else if (shopShortDescription.length == "") {
      SetError("Enter a Short Description of your Shop");
    } else {
      navigation.navigate("Location", {
        sname: shopname,
        ssdes: shopShortDescription,
        sdes: shopDescription,
        sgst: shopgst,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Create Account</Text>
      <Text style={styles.text2}>
        Sign up to post new jobs and get items delivered
      </Text>
      <TextInput
        placeholder="Enter Shop Name"
        mode="outlined"
        theme={{ roundness: 14 }}
        value={shopname}
        keyboardType="default"
        activeOutlineColor="red"
        onChangeText={(value) => setShopname(value)}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Enter Shop Description"
        mode="outlined"
        theme={{ roundness: 14 }}
        value={shopDescription}
        keyboardType="default"
        activeOutlineColor="red"
        onChangeText={(value) => setShopdescription(value)}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Enter a Short Description of your Shop"
        mode="outlined"
        theme={{ roundness: 14 }}
        value={shopShortDescription}
        keyboardType="default"
        activeOutlineColor="red"
        onChangeText={(value) => setShopshortdescription(value)}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Enter Shop GST"
        mode="outlined"
        theme={{ roundness: 14 }}
        value={shopgst}
        keyboardType="default"
        activeOutlineColor="red"
        onChangeText={(value) => setShopgst(value)}
        style={styles.textinput}
      />
      <Text style={styles.Allert}>{Error}</Text>
      <TouchableOpacity style={styles.Button} onPress={() => validation()}>
        <Text style={styles.NextBtn}>NEXT</Text>
      </TouchableOpacity>
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
  Button: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.3,
    height: width / 8,
  },
  textinput: {
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 50,
    margin: 10,
    top: -50,
  },
  text1: {
    top: -80,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    color: "red",
  },
  text2: {
    top: -80,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 15,
    color: "grey",
  },
  NextBtn: {
    color: "white",
    fontSize: 20,
  },
  Allert: {
    color: "red",
    textDecorationLine: "underline",
    fontWeight: "bold",
    top: -20,
  },
});
