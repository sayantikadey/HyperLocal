import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
//import { API_URl } from "@env";
import axios from "axios";
import { Authcontext } from "../../../api/Authcontext";

const { height, width } = Dimensions.get("window");
export default function JobDetails({ route, navigation }) {
  const { userInfo, JobId } = useContext(Authcontext);
  const jobtoken = userInfo.token.access;
  //const pickuplat = data.data.pickup_location.coordinates[0];
  //const pickuplong = data.data.pickup_location.coordinates[1];

  const [data, setData] = useState(null);
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
        console.log(res.data.data.name);
      })
      .catch((err) => {
        alert("No data found");
      });
  };
  useEffect(() => {
    jobD();
  }, []);
  function getFormattedDuration(duration) {
    const parts = duration.split(", ");
    const hours = parts[0].split(" ")[0];
    const minutes = parts[1].split(" ")[0];
    return `${hours} hours and ${minutes} mins`;
  }
  const acceptjob = () => {
    axios
      .post(
        `API_URl/job-accept/`,
        {
          job_id: route.params.paramKey,
        },
        {
          headers: {
            Authorization: `Bearer ${jobtoken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status.code === 403) {
          alert(res.data.status.message);
        } else {
          console.log(res.data);
          alert(
            "You Have Accepted The Job, Go To Home Screen For More Details"
          );
          navigation.navigate("Dhome");
        }
      })
      .catch((err) => {
        alert("This Job Has Been Accepted Already");
      });
  };
  return (
    <View style={styles.container}>
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
              style={styles.Dropbutton}
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
          </>
        ) : (
          <Text>No job details available</Text>
        )}
        <View style={{ height: 20, width: 20 }} />
        <TouchableOpacity
          style={styles.AccrptButton}
          onPress={() => acceptjob()}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Accept This Job
          </Text>
        </TouchableOpacity>
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
    width: width / 2.5,
    marginTop: 5,
    marginBottom: 5,
    left: width / 14,
    bottom: width / -10,
  },
  Dropbutton: {
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F02121",
    height: width / 7,
    width: width / 2.5,
    marginTop: 5,
    marginBottom: 5,
    left: width / 1.8,
    bottom: width / 14,
  },
  AccrptButton: {
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
});
