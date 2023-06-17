import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
//import { API_URl } from "@env";
import axios from "axios";
import { Authcontext } from "../../../api/Authcontext";
const { height, width } = Dimensions.get("window");

export default function Feed({ navigation }) {
  const { userInfo } = useContext(Authcontext);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const token = userInfo.token.access;
  const feedapicall = () => {
    axios
      .get(`API_URl/live-jobs/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("api called");
        setData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    feedapicall();
    setRefreshing(false);
  };

  useEffect(() => {
    feedapicall();
    let interval = setInterval(() => {
      feedapicall();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function getFormattedDuration(duration) {
    const parts = duration.split(", ");
    const hours = parts[0].split(" ")[0];
    const minutes = parts[1].split(" ")[0];
    return `${hours} hours and ${minutes} mins`;
  }

  return (
    <View style={styles.container}>
      <IconButton
        onPress={() => navigation.openDrawer()}
        icon="menu"
        iconColor="black"
        mode="contained"
        size={30}
        style={styles.menu}
      />
      {data && data.length > 0 ? (
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
                {item.shop_data ? (
                  <Text style={{ fontSize: 15, left: 10 }}>
                    Shop name: {item.shop_data.shop_name}
                  </Text>
                ) : (
                  <Text style={{ fontSize: 15, left: 10 }}>
                    Customer name: {item.delivery_contact_name}
                  </Text>
                )}
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
                <Text style={{ fontSize: 15, left: 10 }}>
                  Delivery Fee : {"\u20B9"} {item.delivery_boy_fee}
                </Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "#F02121",
                    height: 45,
                    width: 100,
                    marginTop: 5,
                    marginBottom: 5,
                    left: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("Delivery Details", {
                      paramKey: item.job_id,
                    })
                  }
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                    Job Details
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      ) : (
        <Text
          style={{
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          No job available right now
        </Text>
      )}
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "white",
    left: width / 25,
    top: height / 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistc: {
    width: "100%",
    bottom: width / 3,
    left: width / 12,
  },
  product: {
    position: "absolute",
    width: 100,
    height: 100,
    right: 25,
    top: 45,
    resizeMode: "contain",
  },
});
