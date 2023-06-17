import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { RadioButton, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { Authcontext } from "../../api/Authcontext";
import Spinner from "react-native-loading-spinner-overlay/lib";

const { height, width } = Dimensions.get("window");

export default function CommonRegister({ navigation, route }) {
  const [Error, SetError] = useState("");
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Pass, SetPass] = useState("");
  const [confirmPass, SetConfirmPass] = useState("");
  const [OTP, SetOTP] = useState("");
  const [selected, setSelected] = useState("");
  const [isSecureEntry, isSetSecureEntry] = useState(true);
  const [isSecureEntryConfirm, isSetSecureEntryConfirm] = useState(true);
  const [photoFront, SetPhotoFront] = useState(null);
  const [photoBack, SetPhotoBack] = useState(null);
  const [shopSelected, SetShopSelected] = useState("");
  const [profilepic, SetProfilePic] = useState(null);

  const { CommonRegister, otptoken, isLoading, DeliveryAccess } =
    useContext(Authcontext);

  //Dropdown Data
  const data = [
    { key: "PR", value: "Proprietor" },
    { key: "DP", value: "Delivery Person" },
  ];

  //validators
  const validation = () => {
    if (OTP === "" && Name === "" && Pass === "" && confirmPass === "") {
      SetError("All Fields are Empty");
    } else if (Name === "") {
      SetError("Name Should Not Be Empty");
    } else if (Name.length < 3) {
      SetError("Invalid Name");
    } else if (Pass.length === 0) {
      SetError("Password is empty");
    } else if (Pass.indexOf(" ") >= 0) {
      SetError("Password should not have whitespace");
    } else if (Pass != confirmPass) {
      SetError("Password Does Not Match");
    } else if (selected === "") {
      SetError("Please select an User Type");
    } else if (photoFront === null) {
      SetError("Please Upload Your Aadhaar Front Photo");
    } else if (photoBack === null) {
      SetError("Please Upload Your Aadhaar Back Photo");
    } else if (profilepic === null) {
      SetError("Please Upload Your Profile Photo");
    } else if (selected === "PR" && shopSelected === "") {
      SetError("Please Select that You Own a Shop or Not");
    } else {
      Upload();
      handlenavigation();
    }
  };

  //if validation is true then it will naviagte to either proprietor or Delivery Person
  const handlenavigation = () => {
    if (
      selected === "PR" &&
      shopSelected === "False" &&
      DeliveryAccess !== null
    ) {
      navigation.navigate("login");
    } else if (
      selected === "PR" &&
      shopSelected === "True" &&
      DeliveryAccess !== null
    ) {
      navigation.navigate("ShopDetails");
    } else if (selected === "DP" && DeliveryAccess !== null) {
      navigation.navigate("DeliveryRegister");
      //call the api
    } else {
      SetError("Registration failed!");
    }
  };

  //Pick Image Front
  const pickImageFront = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      SetPhotoFront(result.uri);
    }
  };

  //Pick Image Back
  const pickImageBack = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      SetPhotoBack(result.uri);
    }
  };

  //Profile pic
  const ProfileAdd = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      SetProfilePic(result.uri);
      Alert.alert("Profile Picture Uploaded");
    }
  };

  //If user type is Delievry Person then Upload all the details excluding is_Shop. Otherwise Send all the neccessary Details
  const Upload = async () => {
    const nameArray = Name.split(" ");
    const first_name = nameArray[0];
    const last_name = nameArray[1];
    if (selected === "DP") {
      let formDataDelivery = new FormData();
      formDataDelivery.append("email", Email);
      formDataDelivery.append("user_type", selected);
      formDataDelivery.append("password", Pass);
      formDataDelivery.append("mobile_number", "+91" + route.params.paramKey);
      formDataDelivery.append("first_name", first_name);
      formDataDelivery.append("last_name", last_name);
      formDataDelivery.append("profile_pic", {
        uri:
          Platform.OS === "android"
            ? profilepic
            : profilepic.replace("file://", ""),
        name: "profile.jpg",
        type: "image/jpeg",
      });
      formDataDelivery.append("token", otptoken);
      formDataDelivery.append("otp", OTP);
      formDataDelivery.append("adhar_photo_front", {
        uri:
          Platform.OS === "android"
            ? photoFront
            : photoFront.replace("file://", ""),
        name: "frontphoto.jpg",
        type: "image/jpeg",
      });
      //console.log(Frontformdata);
      formDataDelivery.append("adhar_photo_back", {
        uri:
          Platform.OS === "android"
            ? photoBack
            : photoBack.replace("file://", ""),
        name: "backphoto.jpg",
        type: "image/jpeg",
      });
      //console.log(otptoken);
      CommonRegister(formDataDelivery);
      handlenavigation();
    } else {
      let formDataProprietor = new FormData();
      formDataProprietor.append("email", Email);
      formDataProprietor.append("user_type", selected);
      formDataProprietor.append("password", Pass);
      formDataProprietor.append("mobile_number", "+91" + route.params.paramKey);
      formDataProprietor.append("is_shop", shopSelected);
      formDataProprietor.append("first_name", first_name);
      formDataProprietor.append("last_name", last_name);
      formDataProprietor.append("profile_pic", {
        uri:
          Platform.OS === "android"
            ? profilepic
            : profilepic.replace("file://", ""),
        name: "profile.jpg",
        type: "image/jpeg",
      });
      formDataProprietor.append("token", otptoken);
      formDataProprietor.append("otp", OTP);
      formDataProprietor.append("adhar_photo_front", {
        uri:
          Platform.OS === "android"
            ? photoFront
            : photoFront.replace("file://", ""),
        name: "frontphoto.jpg",
        type: "image/jpeg",
      });
      //console.log(Frontformdata);
      formDataProprietor.append("adhar_photo_back", {
        uri:
          Platform.OS === "android"
            ? photoBack
            : photoBack.replace("file://", ""),
        name: "backphoto.jpg",
        type: "image/jpeg",
      });
      console.log(otptoken);
      CommonRegister(formDataProprietor);
      handlenavigation();
    }
  };

  //all data put then it is calling handlenav function. handlenav navigates to proprie reg or delp reg.
  //in else part of validation put imageupload function first then put handlenav

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Spinner color="red" visible={isLoading} />
      <ScrollView>
        <View styles={styles.container}>
          <Text style={styles.text1}>Create Account</Text>
          <Text style={styles.text2}>
            Sign up to post new jobs and get items delivered
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            top: height / 15,
            color: "red",
            textDecorationLine: "underline",
          }}
        >
          {Error}
        </Text>
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 50 }}
        >
          <TextInput
            placeholder="Enter OTP"
            mode="outlined"
            theme={{ roundness: 14 }}
            value={OTP}
            keyboardType="default"
            activeOutlineColor="red"
            onChangeText={(value) => SetOTP(value)}
            style={styles.textinput}
          />
          <TextInput
            placeholder="Full Name"
            mode="outlined"
            theme={{ roundness: 14 }}
            value={Name}
            keyboardType="default"
            activeOutlineColor="red"
            onChangeText={(value) => SetName(value)}
            style={styles.textinput}
          />
          <TextInput
            placeholder="Email"
            mode="outlined"
            theme={{ roundness: 14 }}
            value={Email}
            keyboardType="email-address"
            activeOutlineColor="red"
            onChangeText={(value) => SetEmail(value)}
            style={styles.textinput}
          />
          <TextInput
            placeholder="Password"
            mode="outlined"
            theme={{ roundness: 14 }}
            value={Pass}
            secureTextEntry={isSecureEntry}
            keyboardType="default"
            activeOutlineColor="red"
            onChangeText={(value) => SetPass(value)}
            style={styles.textinput}
            right={
              <TextInput.Icon
                icon={isSecureEntry ? "eye" : "eye-off"}
                onPress={() => isSetSecureEntry(!isSecureEntry)}
              />
            }
          />
          <TextInput
            placeholder="Confirm Password"
            mode="outlined"
            theme={{ roundness: 14 }}
            value={confirmPass}
            secureTextEntry={isSecureEntryConfirm}
            keyboardType="default"
            activeOutlineColor="red"
            onChangeText={(value) => SetConfirmPass(value)}
            style={styles.textinput}
            right={
              <TextInput.Icon
                icon={isSecureEntryConfirm ? "eye" : "eye-off"}
                onPress={() => isSetSecureEntryConfirm(!isSecureEntryConfirm)}
              />
            }
          />
        </View>
        <View style={{ bottom: 5 }}>
          <Text style={styles.userType}>User Type</Text>
          <View style={styles.dropdown}>
            <SelectList
              search={false}
              maxHeight={100}
              data={data}
              save="key"
              setSelected={(val) => setSelected(val)}
            />
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.ShopChoice}>Do you Have a Shop?</Text>
          {selected === "" || selected === "DP" ? (
            <RadioButton.Group
              onValueChange={(nvalue) => SetShopSelected(nvalue)}
              value={""}
            >
              <View
                style={{
                  alignItems: "center",
                  top: width / 12,
                  left: width / 6,
                }}
              >
                <Text
                  style={{ top: width / 15, right: width / 12, color: "red" }}
                >
                  Yes
                </Text>
                <RadioButton value="True" color="green" disabled />
              </View>
              <View
                style={{
                  alignItems: "center",
                  top: width / 18,
                  left: width / 6,
                }}
              >
                <Text
                  style={{ top: width / 15, right: width / 12, color: "red" }}
                >
                  No
                </Text>
                <RadioButton value="False" color="green" disabled />
              </View>
            </RadioButton.Group>
          ) : (
            <RadioButton.Group
              onValueChange={(nvalue) => SetShopSelected(nvalue)}
              value={shopSelected}
            >
              <View
                style={{
                  alignItems: "center",
                  top: width / 12,
                  left: width / 6,
                }}
              >
                <Text
                  style={{ top: width / 15, right: width / 12, color: "red" }}
                >
                  Yes
                </Text>
                <RadioButton value="True" color="green" />
              </View>
              <View
                style={{
                  alignItems: "center",
                  top: width / 18,
                  left: width / 6,
                }}
              >
                <Text
                  style={{ top: width / 15, right: width / 12, color: "red" }}
                >
                  No
                </Text>
                <RadioButton value="False" color="green" />
              </View>
            </RadioButton.Group>
          )}
          <View>
            <TouchableOpacity
              style={styles.Profile}
              onPress={() => ProfileAdd()}
            >
              <Text style={{ color: "white" }}>Add a Profile Picture</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: height / 2.3,
              width: width / 1.02,
              top: width / 5.5,
              borderWidth: 1,
              borderRadius: 30,
              borderStyle: "dashed",
            }}
          >
            <Image
              source={{ uri: photoFront }}
              style={{
                height: height / 6.8,
                width: width / 2.2,
                left: width / 80,
                top: height / 15,
                resizeMode: "contain",
              }}
            />
            <TouchableOpacity
              style={styles.aadharButton}
              onPress={pickImageFront}
            >
              <Text style={styles.NextBtn}>Front Aadhaar Photo</Text>
            </TouchableOpacity>
            <Image
              source={{ uri: photoBack }}
              style={{
                height: height / 6.8,
                width: width / 2.2,
                left: width / 1.95,
                bottom: height / 6.3,
                resizeMode: "contain",
              }}
            />
            <TouchableOpacity
              style={styles.aadharButton2}
              onPress={pickImageBack}
            >
              <Text style={styles.NextBtn}>Back Aadhar Photo</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: 100,
              width: 100,
              top: 100,
            }}
          />
          <TouchableOpacity style={styles.Button} onPress={() => validation()}>
            <Text style={styles.NextBtn}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    bottom: 2,
  },
  text1: {
    top: 20,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    color: "red",
  },
  text2: {
    top: 20,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 15,
    color: "grey",
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
  userType: {
    left: width / 12,
    top: width / 5.5,
  },
  dropdown: {
    padding: 3,
    width: width / 1.6,
    left: width / 3.5,
    top: width / 10,
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
  NextBtn: {
    color: "white",
  },
  aadharButton: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 2.5,
    height: width / 8,
    top: width / 2.5,
  },
  aadharButton2: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 2.5,
    height: width / 8,
    bottom: width / 14,
    left: width / 2,
  },
  ShopChoice: {
    right: height / 9,
    top: width / 4,
    fontSize: 16,
    fontWeight: "400",
  },
  Profile: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.3,
    height: width / 8,
    top: width / 10,
  },
});
