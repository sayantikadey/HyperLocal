import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API_URl } from "@env";
import axios from "axios";
import { Authcontext } from "../../api/Authcontext";
import Spinner from "react-native-loading-spinner-overlay";

const { height, width } = Dimensions.get("window");
export default function Deliveryjobdetails({ route }) {
  const {
    userInfo,
    JobId,
    GetPropOTP,
    GetDelOTP,
    ValidatePickup,
    ValidateDelivery,
    isLoading,
  } = useContext(Authcontext);
  const jobtoken = userInfo.token.access;
  //const pickuplat = data.data.pickup_location.coordinates[0];
  //const pickuplong = data.data.pickup_location.coordinates[1];
  const [propotp, SetPropotptoken] = useState(null);
  const [data, setData] = useState(null);
  const [otp, setOtp] = useState(null);
  const [DelOTP, SetDelOTP] = useState(null);
  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url);
  };
  const jobD = () => {
    axios
      .get(`API_URl/jobs-details/${route.params.paramKey}/`, {
        headers: { Authorization: `Bearer ${jobtoken}` },
      })
      .then((res) => {
        setData(res.data);
        JobId(route.params.paramKey);
        //console.log(res.data.data.name);
      })
      .catch((err) => {
        alert("No data found");
      });
  };
  useEffect(() => {
    jobD();
    const interval = setInterval(() => {
      jobD();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  function getFormattedDuration(duration) {
    const parts = duration.split(", ");
    const hours = parts[0].split(" ")[0];
    const minutes = parts[1].split(" ")[0];
    return `${hours} hours and ${minutes} mins`;
  }

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} color="red" />
      <ScrollView>
        <View style={{ top: 20 }}>
          <Text style={styles.JobdetailText}>Job Details</Text>
        </View>
        <View style={{ height: 50, wid: 50 }} />
        {data ? (
          <>
            <Text style={styles.AllDetailText}>
              Product Name : <Text>{data.data.name}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Description : <Text>{data.data.description}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Product Category:{" "}
              <Text style={styles.AllDetailText}>
                {data.data.category === "908c63a4-9df3-4269-909d-ace6992ea9ee"
                  ? "Heavy"
                  : data.data.category ===
                    "f8c097c8-fcaa-4914-9a87-135f280b4675"
                  ? "Light"
                  : data.data.category ===
                    "e70e9340-276d-49bf-8078-37c1d0e669e3"
                  ? "Heavy, Fragile"
                  : "Light, Fragile"}
              </Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Quantity : <Text>{data.data.quantity}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Pickup Location : <Text>{data.data.pickup_address}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Drop Location : <Text>{data.data.delivery_address}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Owner Name : <Text>{data.data.pickup_contact_name}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Conatact Owner : <Text>{data.data.pickup_contact_phone}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Customer Name : <Text>{data.data.delivery_contact_name}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Contact Customer : <Text>{data.data.delivery_contact_phone}</Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Delivery Fee :{" "}
              <Text>
                {"\u20B9"} {data.data.delivery_boy_fee}
              </Text>
            </Text>
            <Text style={styles.AllDetailText}>
              Estimated Completion Time:{" "}
              <Text>{getFormattedDuration(data.data.estimated_duration)}</Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
                left: width / 12,
                margin: 10,
                width: width / 1.26,
                fontWeight: "bold",
              }}
            >
              Product Images:
            </Text>
            <Image
              style={styles.product1}
              source={{
                uri: data.data.photo_1,
              }}
            />
            <Image
              style={styles.product2}
              source={{
                uri: data.data.photo_2,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                left: width / 12,
                margin: 10,
                width: width / 1.2,
                fontWeight: "bold",
              }}
            >
              View Pickup And Drop Location in Google Maps:
            </Text>
            <TouchableOpacity
              style={styles.Pickupbutton}
              onPress={() =>
                openGoogleMaps(
                  data.data.pickup_location.coordinates[1],
                  data.data.pickup_location.coordinates[0]
                )
              }
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                View Pickup
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Pickupbutton}
              onPress={() =>
                openGoogleMaps(
                  data.data.delivery_location.coordinates[1],
                  data.data.delivery_location.coordinates[0]
                )
              }
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                View Drop
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Enter Otp"
              value={otp}
              onChangeText={(value) => setOtp(value)}
            />

            {data.data.status === "Picking" ? (
              <>
                <TouchableOpacity
                  style={styles.sendotp}
                  onPress={() => GetPropOTP(data.data.pickup_contact_phone)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "700",
                      fontSize: 20,
                    }}
                  >
                    Send OTP to Proprietor
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.sendotp}
                  onPress={() => GetDelOTP(data.data.delivery_contact_phone)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "700",
                      fontSize: 20,
                    }}
                  >
                    Send OTP to Customer
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {data.data.status === "Picking" ? (
              <TouchableOpacity
                style={styles.Validatepickup}
                onPress={() => ValidatePickup(otp)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  Validate Pickup
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.Validatepickup}
                onPress={() => ValidateDelivery(otp)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  Validate Delivery
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text>No job details available</Text>
        )}

        <View style={{ height: 20, width: 20 }} />
      </ScrollView>
      <StatusBar hidden={false} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  product1: {
    width: width / 1.2,
    height: width / 1.2,
    left: width / 10,
    resizeMode: "contain",
  },
  product2: {
    width: width / 1.2,
    height: width / 1.2,
    left: width / 10,
    resizeMode: "contain",
  },
  JobdetailText: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  AllDetailText: {
    fontSize: 16,
    left: width / 12,
    margin: 10,
    width: width / 1.26,
  },
  Pickupbutton: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F02121",
    height: width / 7,
    width: width / 1.2,
    marginTop: 5,
    marginBottom: 5,
    left: width / 10,
  },
  sendotp: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F02121",
    height: width / 9,
    width: width / 1.5,
    marginTop: 5,
    marginBottom: 5,
    left: width / 5.12,
  },
  Validatepickup: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F02121",
    height: width / 9,
    width: width / 2,
    marginTop: 5,
    marginBottom: 5,
    left: width / 3.65,
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "white",
    padding: 8,
    width: 350,
    height: 65,
    marginTop: 15,
    margin: 10,
    left: width / 14,
    justifyContent: "center",
  },
});
