import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
//import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button, TextInput } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_URl } from "@env";
import { Authcontext } from "../../../api/Authcontext";

const { height, width } = Dimensions.get("window");

export default function Livelocation({ navigation, route }) {
  const { DeliveryAccess } = useContext(Authcontext);
  const [mapRegion, setMapRegion] = useState({});
  const [lat, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [shopAddress, setShopaddress] = useState("");
  const [error, SetError] = useState("");
  const [photoFront, SetPhotoFront] = useState(null);
  const [isloading, Setloading] = useState(false);

  const validation = () => {
    if (shopAddress == "" && lat == "") {
      SetError("All fields are empty");
    } else if (shopAddress == "") {
      SetError("Enter your Shop Address");
    } else if (lat == "") {
      SetError("Please tap the current location button to put your address");
    } else if (longitude === "" && lat === "") {
      SetError("Press Current Location Button to get Location");
    } else {
      // RegisterShopData(
      //   route.params.sname,
      //   route.params.ssdes,
      //   route.params.sdes,
      //   shopAddress,
      //   route.params.sgst,
      //   longitude,
      //   lat
      // );
      UploadData(longitude, lat);
      return true;
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
      Alert.alert("Shop Photo Uploaded!");
    }
  };

  const Handlenavigation = () => {
    if (validation) {
      navigation.navigate("login");
    } else {
      SetError("Registration Failed!! Try Again");
    }
  };

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    } else {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.000918,
        longitudeDelta: 0.000418,
      });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      Alert.alert("Check your Location Now!");
    }
  };

  const UploadData = async (longitude, lat) => {
    let formDataShop = new FormData();
    const locate = `POINT(${longitude} ${lat})`;
    console.log(locate);
    formDataShop.append("shop_name", route.params.sname);
    formDataShop.append("shop_shortdescribtion", route.params.ssdes);
    formDataShop.append("shop_describtion", route.params.sdes);
    formDataShop.append("shop_address", shopAddress);
    formDataShop.append("shop_gst", route.params.sgst);
    formDataShop.append("location", locate);
    formDataShop.append("shop_photo", {
      uri:
        Platform.OS === "android"
          ? photoFront
          : photoFront.replace("file://", ""),
      name: "shopPhoto.jpg",
      type: "image/jpeg",
    });
    Setloading(true);
    axios
      .post(`API_URl/shopdata/`, formDataShop, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${DeliveryAccess}`,
        },
      })
      .then((res) => {
        console.log(res.data.status.detail);
        alert("Shop Registered!");
        Setloading(false);
        Handlenavigation();
      })
      .then((err) => {
        console.log(err);
      });
  };
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <Spinner color="red" visible={isloading} />
      <Text style={styles.text1}>Create Account</Text>
      <Text style={styles.text2}>
        Sign up to post new jobs and get items delivered
      </Text>
      <Text style={styles.Allert}>{error}</Text>
      {error === "Press Current Location Button to get Location" ? (
        <Text style={styles.Allert}>Check Your Location Now</Text>
      ) : (
        <Text></Text>
      )}
      <TextInput
        placeholder="Enter Shop Address"
        mode="outlined"
        theme={{ roundness: 14 }}
        value={shopAddress}
        keyboardType="default"
        activeOutlineColor="red"
        onChangeText={(value) => setShopaddress(value)}
        style={styles.textinput}
      />

      <TouchableOpacity
        style={styles.Shopphoto}
        onPress={() => pickImageFront()}
      >
        <Text style={styles.ButtonText}>Add a Shop Photo</Text>
      </TouchableOpacity>
      <Button
        style={{ margin: 10, bottom: width / 10 }}
        onPress={userLocation}
        icon="map-marker-radius-outline"
        buttonColor="red"
        textColor="white"
      >
        Current Location
      </Button>
      {/* <Mapbox.MapView reg></Mapbox.MapView> */}
      {/* <MapView
        style={styles.map}
        region={mapRegion}
        initialRegion={{
          latitude: 20.5937,
          longitude: 78.9629,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
      >
        {lat && <Marker coordinate={mapRegion} title="Hi, there" />}
      </MapView> */}
      <TouchableOpacity
        style={styles.Dropbutton}
        onPress={() => openGoogleMaps(lat, longitude)}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "700",
            fontSize: 20,
          }}
        >
          Check your Location Here
        </Text>
      </TouchableOpacity>
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

  textinput: {
    backgroundColor: "white",
    padding: 8,
    width: 320,
    height: 40,
    margin: 10,
    bottom: width / 5,
  },

  text1: {
    bottom: height / 5,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    color: "red",
  },

  text2: {
    bottom: height / 6,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 15,
    color: "grey",
  },

  map: {
    height: "50%",
    width: "100%",
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
    top: height / 6,
  },
  ButtonText: {
    color: "white",
  },

  Allert: {
    color: "red",
    textDecorationLine: "underline",
    bottom: height / 10,
    fontWeight: "bold",
  },
  Shopphoto: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.2,
    height: width / 8,
    bottom: height / 15,
  },
  Dropbutton: {
    justifyContent: "center",
    //padding: 10,
    borderRadius: 10,
    backgroundColor: "#F02121",
    height: width / 7,
    width: width / 1.2,
    marginTop: 5,
    marginBottom: 5,
    right: height / 150,
    bottom: width / 20,
  },
});
