import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
//import { API_URl } from "@env";
import { Authcontext } from "../../../api/Authcontext";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
const { height, width } = Dimensions.get("window");

export default function PostedJobs({ navigation }) {
  const { userInfo } = useContext(Authcontext);
  const posttoken = userInfo.token.access;
  const [loading, SetLoading] = useState(false);
  const [data, setData] = useState([]);

  const postedJobAPI = () => {
    SetLoading(true);
    axios
      .get(`API_URl/job-history/`, {
        headers: {
          Authorization: `Bearer ${posttoken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.results);
        setData(res.data.results);
        SetLoading(false);
      })
      .catch((err) => {
        console.log(err);
        SetLoading(false);
      });
  };

  function getFormattedDuration(duration) {
    const parts = duration.split(", ");
    const hours = parts[0].split(" ")[0];
    const minutes = parts[1].split(" ")[0];
    return `${hours} hours and ${minutes} mins`;
  }
  useEffect(() => {
    postedJobAPI();
  }, []);

  const makePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} color="red" />
      <IconButton
        icon="menu"
        iconColor="black"
        mode="contained"
        size={35}
        style={styles.nav}
        onPress={() => navigation.openDrawer()}
      />

      {data !== "Job history not found" ? (
        <View style={styles.flatlistc}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  marginBottom: 20,
                  borderWidth: 1,
                  width: 350,
                }}
              >
                <Image
                  style={styles.product}
                  source={{
                    uri: item.photo_1,
                  }}
                />
                <Text style={{ fontSize: 20, fontWeight: "600", left: 10 }}>
                  Deliverable : {item.name}
                </Text>
                <Text style={{ fontSize: 15, left: 10 }}>
                  Shop name:{" "}
                  {item.shop_data ? item.shop_data.shop_name : "No Shop"}
                </Text>
                {/* <Text>Owner: {item.shop_data.user.first_name} {item.shop_data.user.last_name}</Text> */}
                <Text style={{ fontSize: 15, left: 10 }}>
                  Item Quantity: {item.quantity}
                </Text>
                <Text style={{ fontSize: 15, left: 10 }}>
                  Delivery Distance: {item.delivery_distance}km
                </Text>

                <Text style={{ fontSize: 15, left: 10, width: 200 }}>
                  Estimated Duration:{" "}
                  {getFormattedDuration(item.estimated_duration)}
                </Text>
                {item.status === "Completed" ? (
                  <>
                    <Text style={{ fontSize: 15, left: 10 }}>
                      Delivery Person Name : {item.delivery_boy_name}
                    </Text>
                    <Text
                      style={{ fontSize: 15, left: 10 }}
                      onPress={() => makePhoneCall(item.delivery_boy_number)}
                    >
                      Phone Number :{" "}
                      <Text
                        style={{
                          textDecorationLine: "underline",
                          color: "#106ead",
                        }}
                      >
                        {item.delivery_boy_number}
                      </Text>
                    </Text>
                  </>
                ) : (
                  <Text></Text>
                )}
                <Text
                  style={[
                    styles.statusText,
                    item.status === "Cancelled"
                      ? styles.processing
                      : item.status === "Picking"
                      ? styles.picking
                      : styles.completed,
                  ]}
                >
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Status{" "}
                  </Text>
                  : {item.status}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text>Job History Not Found</Text>
      )}
      {/* <View style={styles.flatlistc}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View>
              <Text>{item.id}</Text>
            </View>
          )}
        />
      </View> */}
      <StatusBar hidden={false} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nav: {
    position: "absolute",
    right: width / 1.25,
    bottom: height / 1.1,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
  },
  flatlistc: {
    width: "100%",
    left: width / 14,
  },
  product: {
    position: "absolute",
    width: 100,
    height: 100,
    right: 25,
    top: width / 45,
    resizeMode: "contain",
  },
  statusText: {
    fontSize: 16,
    left: 10,
  },
  processing: {
    color: "red",
  },
  picking: {
    color: "#ebc934",
  },
  completed: {
    color: "green",
  },
});
