import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  setSelected,
  ScrollView,
  TextInput,
  Modal,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
// /import { showDatePicker, DateTimePickerModal, handleConfirm, hideDatePicker } from "@react-native-community/datetimepicker";/
import React, { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
//import { API_TOKEN, API_URL } from "@env";
import { Authcontext } from "../../../api/Authcontext";
import Spinner from "react-native-loading-spinner-overlay";
const { height, width } = Dimensions.get("window");

export default function Jobpost({ navigation }) {
  const { userInfo } = useContext(Authcontext);
  const data1 = [
    { key: "TW", value: "2 wheeler" },
    { key: "THW", value: "3 wheeler" },
    { key: "FW", value: "4 wheeler" },
    { key: "others", value: "other" },
  ];
  const data2 = [
    { key: "908c63a4-9df3-4269-909d-ace6992ea9ee", value: "Heavy" },
    { key: "f8c097c8-fcaa-4914-9a87-135f280b4675", value: "Light" },
    { key: "e70e9340-276d-49bf-8078-37c1d0e669e3", value: "Heavy,Fragile" },
    { key: "4ef5fdc1-c383-44f6-95cb-642cfd71eb1b", value: "Light,Fragile" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [mapRegion, setMapRegion] = useState({});
  const [selected, setSelected] = useState(null);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [photoFront, SetPhotoFront] = useState(null);
  const [photoBack, SetPhotoBack] = useState(null);
  const [lat, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latDel, setDelLatitude] = useState("");
  const [longitudeDel, setDelLongitude] = useState("");
  const [productname, SetproductName] = useState(null);
  const [jobtitle, SetJobTitle] = useState(null);
  const [jobDesc, SetjobDesc] = useState(null);
  const [pickup, Setpickup] = useState(null);
  const [drop, SetDrop] = useState(null);
  const [name, Setname] = useState(null);
  const [Phone, SetPhone] = useState(null);
  const [quantity, SetQuantity] = useState(null);
  const [pickupname, SetpickupName] = useState(null);
  const [pickupphone, SetpickupPhone] = useState(null);
  const [isloading, SetIsloading] = useState(false);
  const [error, Seterror] = useState("");

  const handleDayPress = (date) => {
    setSelectedDate(date);
    setShowModal(false);
  };
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleTimeChange = (event, time) => {
    if (time) {
      setSelectedTime(time);
      setShowPicker(false);
      //console.log("Selected Time: ", time.toLocaleTimeString());
    }
  };
  const PickImage1 = async () => {
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
      Alert.alert("Image 1 Uploaded");
    }
  };

  //Pick Image Back
  const PickImage2 = async () => {
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
      Alert.alert("Image 2 Uploaded");
    }
  };
  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }
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
    Alert.alert("We Got Your Location!");
  };

  const LatLong = (drop) => {
    axios({
      method: "get",
      url: `https://geocode.search.hereapi.com/v1/geocode?q=${drop}&apiKey=oCb4sxN80Fxq7v7oI1K3w5_rOLE4ix4WyoLF2FZoMfo`,
    })
      .then((response) => {
        setDelLatitude(response.data.items[0].position.lat);
        setDelLongitude(response.data.items[0].position.lng);
        Alert.alert("We Got Drop Location!");
        // console.log(latDel);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handlepost = () => {
  // console.log(productname);
  // console.log(photoFront, photoBack);
  // console.log(jobtitle);
  // console.log(jobDesc);
  // console.log(quantity);
  // console.log(pickupname);
  // console.log(pickupphone);
  // console.log(lat, longitude);
  // console.log(pickup);
  // console.log(latDel, longitudeDel);
  // console.log(drop);
  // console.log(selectedDate.dateString);
  // console.log(selectedTime.toLocaleTimeString());
  // console.log(selectedproduct);
  // console.log(selected);
  // console.log(name);
  // console.log(Phone);
  // };

  const Validation = (lat, latDel, longitude, longitudeDel, date, time) => {
    if (
      lat === "" &&
      longitude === "" &&
      latDel === "" &&
      longitudeDel === ""
    ) {
      Seterror("Press Button for Location!");
    } else if (lat === "" && longitude === "") {
      Seterror("Please Press Get Pickup Location Button");
    } else if (latDel === "" && longitudeDel === "") {
      Seterror("Please Press Get Pickup Location Button");
    } else {
      Seterror("We Got The Location");
      SubmitJobPost(lat, latDel, longitude, longitudeDel, date, time);
    }
  };

  const SubmitJobPost = (lat, latDel, longitude, longitudeDel, date, time) => {
    const bearertoken = userInfo.token.access;
    const formData = new FormData();
    const pickupPoint = `POINT(${longitude} ${lat})`;
    const deliveryPoint = `POINT(${longitudeDel} ${latDel})`;
    const dateTime = `${date} ${time}`;
    // const propphone = "+91" + pickupphone;
    // const custphone = "+91" + Phone;
    formData.append("name", productname);
    formData.append("description", jobDesc);
    formData.append("category", selectedproduct);
    formData.append("quantity", quantity);
    formData.append("photo_1", {
      uri:
        Platform.OS === "android"
          ? photoFront
          : photoFront.replace("file://", ""),
      name: "photo1.jpg",
      type: "image/jpeg",
    });
    formData.append("photo_2", {
      uri:
        Platform.OS === "android"
          ? photoBack
          : photoBack.replace("file://", ""),
      name: "photo2.jpg",
      type: "image/jpeg",
    });
    formData.append("pickup_address", pickup);
    formData.append("pickup_location", pickupPoint);
    formData.append("pickup_contact_name", pickupname);
    formData.append("pickup_contact_phone", "+91" + pickupphone);
    formData.append("delivery_address", drop);
    formData.append("delivery_location", deliveryPoint);
    formData.append("delivery_contact_name", name);
    formData.append("delivery_contact_phone", "+91" + Phone);
    formData.append("preferred_vehicle_type", selected);
    formData.append("title", jobtitle);
    formData.append("expected_delivery_datetime", dateTime);
    SetIsloading(true);
    axios
      .post(`API_URl/live-jobs/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${bearertoken}`,
        },
      })
      .then((res) => {
        if (res.data.status.code === 403) {
          alert(res.data.status.message);
          SetIsloading(false);
        } else {
          alert("Job Added!");
          navigation.navigate("home");
          SetIsloading(false);
        }
      })
      .catch((err) => {
        alert("You cannot send job");
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Spinner visible={isloading} color="red" />
        <Text style={styles.Heading}>Product Name</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Product Name"
          value={String}
          onChangeText={(value) => SetproductName(value)}
        />
        <Text style={styles.Heading}>Product Image</Text>
        <TouchableOpacity onPress={PickImage1} style={styles.ImageButton1}>
          <Text style={{ color: "white" }}>Image 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={PickImage2} style={styles.ImageButton2}>
          <Text style={{ color: "white" }}>Image 2</Text>
        </TouchableOpacity>
        <Text style={styles.Heading}>Job Title</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Job Title"
          value={jobtitle}
          onChangeText={(value) => SetJobTitle(value)}
        />
        <View style={{ bottom: -10 }}>
          <Text style={styles.Heading}>Job Description</Text>
          <TextInput
            style={styles.input1}
            keyboardType="default"
            placeholder="Job Description"
            value={jobDesc}
            onChangeText={(value) => SetjobDesc(value)}
          />
        </View>
        <View style={{ bottom: -10 }}>
          <Text style={styles.Heading}>Total Quantity</Text>
          <TextInput
            style={styles.input4}
            keyboardType="default"
            placeholder="Quantity"
            value={quantity}
            onChangeText={(value) => SetQuantity(value)}
          />
        </View>
        <View style={{ bottom: -10 }}>
          <Text style={styles.Heading}>Your Name</Text>
          <TextInput
            style={styles.input4}
            keyboardType="default"
            placeholder="Name"
            value={pickupname}
            onChangeText={(value) => SetpickupName(value)}
          />
        </View>
        <View style={{ bottom: -10 }}>
          <Text style={styles.Heading}>Your Mobile Number</Text>
          <TextInput
            style={styles.input4}
            keyboardType="default"
            placeholder="Mobile Number"
            value={pickupphone}
            onChangeText={(value) => SetpickupPhone(value)}
          />
        </View>
        <View style={{ bottom: -20 }}>
          <Text style={styles.Heading}>Location</Text>
          <TouchableOpacity
            onPress={() => userLocation()}
            style={styles.PickupButton}
          >
            <Text style={{ color: "white" }}>Get PickUp Location</Text>
          </TouchableOpacity>
          <Text>Full Address</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Full Address"
            value={pickup}
            onChangeText={(value) => Setpickup(value)}
          />
          <Text>Drop Location Address</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Full Address"
            value={drop}
            onChangeText={(value) => SetDrop(value)}
          />
          <TouchableOpacity
            style={styles.DropButton}
            onPress={() => LatLong(drop)}
          >
            <Text style={{ color: "white" }}>Get Drop Location</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25, bottom: -50 }}>
          <Text style={styles.Heading1}>Time</Text>

          <View style={styles.dropdown}>
            <Text style={styles.Text1}>Select Time</Text>
            {/* <Button title="Select Time" onPress={togglePicker} /> */}
            <TouchableOpacity onPress={togglePicker} style={styles.Button3}>
              <Text style={{ color: "white" }}>Select Time</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                mode="time"
                is24Hour={false}
                value={selectedTime || new Date()}
                onChange={handleTimeChange}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.Button2}
          >
            <Text
              style={{ color: "white", fontSize: 15, alignItems: "center" }}
            >
              {" "}
              Select Date
            </Text>
          </TouchableOpacity>

          <Modal visible={showModal} animationType="slide" transparent={true}>
            <Calendar
              onDayPress={handleDayPress}
              style={{
                borderRadius: 10,
                elevation: 40,
                margin: 40,
                top: 200,
              }}
            />
          </Modal>
          <Text style={styles.error}>{error}</Text>
          <View style={styles.dropdown2}>
            <Text style={{ top: 35, height: 17, right: 95 }}>Vehicle</Text>
            <SelectList
              maxHeight={100}
              search={false}
              placeholder=" "
              setSelected={(val) => setSelected(val)}
              data={data1}
              save="key"
            />
          </View>

          <View style={styles.dropdow3}>
            <Text style={{ top: 28, height: 17, right: 95 }}>Product Type</Text>
            <SelectList
              maxHeight={100}
              search={false}
              placeholder=" "
              setSelected={(val) => setSelectedproduct(val)}
              data={data2}
              save="key"
            />
          </View>
        </View>
        <Text style={{ top: -100 }}>
          -------------------------------------------------------------------------
        </Text>
        <View style={{ bottom: 50 }}>
          <Text style={styles.heading2}>Customer Details</Text>
          <Text style={{ right: -10 }}>Full Name</Text>
          <TextInput
            style={styles.input3}
            keyboardType="default"
            placeholder="Full Name"
            value={name}
            onChangeText={(value) => Setname(value)}
          />
          <Text style={{ right: -10 }}>Phone Number</Text>
          <TextInput
            style={styles.input3}
            keyboardType="default"
            placeholder="Phone Number"
            value={Phone}
            onChangeText={(value) => SetPhone(value)}
          />
          <TouchableOpacity
            style={styles.Button}
            onPress={() =>
              Validation(
                lat,
                latDel,
                longitude,
                longitudeDel,
                selectedDate.dateString,
                selectedTime.toLocaleTimeString()
              )
            }
          >
            <Text style={styles.nextStyle}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  Heading: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 50,
    marginTop: 15,
    margin: 10,
    right: 10,
  },
  input1: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 100,
    margin: 10,
    right: 10,
  },
  input2: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 120,
    height: 40,
    margin: 10,
    right: 10,
  },
  scroll: {
    marginHorizontal: 0,
  },
  Button: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 15,
    margin: 8,
    color: "white",
    alignItems: "center",
    height: 50,
    width: 300,
    top: 40,
    right: 1,
  },
  dropdown: {
    width: 120,
    margin: 10,
    padding: 5,
    top: -40,
    left: -10,
  },
  Button1: {
    borderRadius: 12,
    backgroundColor: "red",
    padding: 10,
    margin: 8,
    alignItems: "center",
    height: 40,
    width: 100,
    left: 150,
    top: -60,
  },
  nextStyle: {
    color: "white",
  },
  Heading1: {
    fontSize: 25,
    fontStyle: "normal",
    top: -40,
    fontWeight: "bold",
  },
  Text1: {
    top: -10,
    height: 18,
  },
  Text2: {
    top: -10,
    height: 17,
    right: -10,
  },
  dropdown1: {
    bottom: 128,
    right: -140,
    width: 120,
    margin: 10,
    borderColor: "red",
    //padding: 5,
  },
  dropdown2: {
    top: -180,
    right: -100,
    width: 120,
  },
  dropdow3: {
    top: -150,
    right: -100,
    width: 140,
  },
  heading2: {
    fontSize: 20,
    fontStyle: "normal",
    bottom: 30,

    fontWeight: "bold",
  },
  input3: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 50,
    marginTop: 15,
    margin: 10,
    right: -3,
    marginHorizontal: "auto",
  },
  Calendar: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    transparent: "true",
    justifyContent: "center",
    transparent: "true",
  },
  Button2: {
    backgroundColor: "red",
    borderRadius: 10,
    margin: 40,
    padding: 15,
    height: 50,
    width: 120,
    top: -195,
    left: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  Button3: {
    backgroundColor: "red",
    borderRadius: 10,
    margin: 40,
    padding: 15,
    height: 50,
    width: 120,
    top: -10,
    left: -40,
    alignItems: "center",
    justifyContent: "center",
  },
  ImageButton1: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 15,
    height: 50,
    width: 120,
    top: 30,
    left: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ImageButton2: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 15,
    height: 50,
    width: 120,
    top: -20,
    left: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  PickupButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 15,
    height: 50,
    width: 200,
    top: -1,
    left: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  DropButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 15,
    height: 50,
    width: 200,
    top: -1,
    left: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  input4: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 280,
    height: 50,
    marginTop: 15,
    margin: 10,
    right: -3,
    marginHorizontal: "auto",
  },
  error: {
    color: "red",
    top: height / -4,
    textAlign: "center",
  },
});
