import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import { Authcontext } from "../../../api/Authcontext";

const { height, width } = Dimensions.get("window");

export default function DRegister({ navigation }) {
  const [VehicleNumber, SetVehicleNumber] = useState("");
  const [VehicleName, SetVehicleName] = useState("");
  const [selected, setSelected] = useState("");
  const [Error, SetError] = useState("");
  const { DeliveryPersonRegister } = useContext(Authcontext);

  const data = [
    { key: "TW", value: "Two Wheeler" },
    { key: "THW", value: "Three Wheeler" },
    { key: "FW", value: "Four Wheeler" },
    { key: "OT", value: "Others" },
  ];

  //validation
  const validation = () => {
    if (selected === "" && VehicleName === "" && VehicleNumber === "") {
      SetError("All Fields Are Empty");
    } else if (selected === "TW" && VehicleNumber === "") {
      SetError("Enter Your Two Wheeler Vehicle Number");
    } else if (selected === "THW" && VehicleNumber === "") {
      SetError("Enter Your Three Wheeler Vehicle Number");
    } else if (selected === "FW" && VehicleNumber === "") {
      SetError("Enter Your Four Wheeler Vehicle Number");
    } else {
      handlenavigation();
    }
  };

  //handle navigation
  const handlenavigation = () => {
    navigation.navigate("login");
    DeliveryPersonRegister(VehicleName, selected, VehicleNumber);
    //call api
  };

  return (
    <View style={styles.container}>
      <View style={styles.textcontainer}>
        <Text style={styles.text1}>Create Account</Text>
        <Text style={styles.text2}>
          Sign up to post new jobs and get items delivered
        </Text>
        <Text style={styles.ErrorText}>{Error}</Text>
      </View>
      <Text style={styles.text3}>Vehicle Details</Text>
      <View style={styles.dropdown}>
        <SelectList
          placeholder="Vehicle Type"
          search={false}
          maxHeight={100}
          data={data}
          save="key"
          setSelected={(val) => setSelected(val)}
        />
      </View>
      <View style={{ bottom: width / 5.5 }}>
        {selected === "OT" ? (
          <TextInput
            disabled
            placeholder="Vehicle Number"
            mode="outlined"
            theme={{ roundness: 14 }}
            style={styles.textinput}
          />
        ) : (
          <TextInput
            placeholder="Vehicle Number"
            mode="outlined"
            theme={{ roundness: 14 }}
            value={VehicleNumber}
            keyboardType="default"
            activeOutlineColor="red"
            onChangeText={(value) => SetVehicleNumber(value)}
            style={styles.textinput}
          />
        )}

        <TextInput
          placeholder="Vehicle Name"
          mode="outlined"
          theme={{ roundness: 14 }}
          value={VehicleName}
          keyboardType="default"
          activeOutlineColor="red"
          onChangeText={(value) => SetVehicleName(value)}
          style={styles.textinput}
        />
      </View>

      <TouchableOpacity style={styles.Button} onPress={() => validation()}>
        <Text style={styles.ButtonText}>Create Account</Text>
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
  textcontainer: {
    bottom: width / 2,
  },
  text1: {
    top: 20,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    color: "red",
  },
  text2: {
    top: 40,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 15,
    color: "grey",
  },
  ErrorText: {
    textAlign: "center",
    color: "red",
    textDecorationLine: "underline",
    top: width / 6,
    fontSize: 16,
  },
  textinput: {
    //borderWidth: 1,

    borderColor: "#777",
    padding: 2,
    margin: 14,
    width: width / 1.2,
    height: 50,
    //elevation: 5,
    backgroundColor: "white",
  },
  dropdown: {
    padding: 3,
    width: width / 1.2,
    bottom: width / 5,
  },
  text3: {
    fontSize: 16,
    fontWeight: "400",
    bottom: width / 4.5,
    right: width / 3.8,
  },
  Button: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.2,
    height: width / 8,
    top: width / 2,
  },
  ButtonText: {
    color: "white",
  },
});
