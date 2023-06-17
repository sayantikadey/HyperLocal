import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
// import { color, not, set } from "react-native-reanimated";
// import { useNavigation } from "@react-navigation/native";
import { Authcontext } from "../../../api/Authcontext";
import axios from "axios";
//import { API_URl } from "@env";

const { height, width } = Dimensions.get("window");

export default function Dprofile({ navigation }) {
  const { userInfo, DeleteAcc, message } = useContext(Authcontext);
  const [cInfo, setcInfo] = useState(null);
  const [wheelType, setwheelType] = useState(null);
  const vToken = userInfo.token.access;
  const vId = userInfo.data.id;
  const vType = () => {
    if (cInfo && cInfo.results && cInfo.results.length > 0) {
      const wheel = cInfo.results[0].vehicle_type;
      if (wheel == "TW") {
        setwheelType("2");
      } else if (wheel == "THW") {
        setwheelType("3");
      } else if (wheel == "FW") {
        setwheelType("4");
      } else {
        setwheelType("other");
      }
    }
  };

  const handleDeleteAccount = () => {
    DeleteAcc();
  };
  const vInfo = () => {
    axios
      .get(`API_URl/vehicledata/?search=${vId}`, {
        headers: {
          Authorization: `Bearer ${vToken}`,
        },
      })
      .then((res) => {
        //console.log(res.data)
        let cInfo = res.data;
        setcInfo(cInfo);
        console.log(cInfo.results[0].user.profile_pic);
      })
      .catch((err) => {
        //console.log(err)
        alert("not found");
      });
  };
  useEffect(() => {
    vInfo();
  }, []);
  useEffect(() => {
    vType();
  }, [cInfo]);

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
      <Text style={styles.Dtext}>Hey</Text>
      <Text style={styles.Dname}>{userInfo.data.first_name}</Text>

      {cInfo &&
      cInfo.results &&
      cInfo.results[0] &&
      cInfo.results[0].user &&
      cInfo.results[0].user.profile_pic ? (
        <Image
          style={styles.Dprofilepic}
          source={{ uri: cInfo.results[0].user.profile_pic }}
        />
      ) : (
        <Image
          style={styles.Dprofilepic}
          source={{
            uri: "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
          }}
        />
      )}

      <IconButton
        icon="delete"
        iconColor="black"
        mode="contained"
        size={21}
        style={styles.delete}
      />

      <Text style={styles.Dlog}>
        Logged in via {userInfo.data.mobile_number}
      </Text>

      <View style={styles.roundedrect}>
        <Text style={styles.Dstatus}>Delivery Status</Text>
        {cInfo && cInfo.results ? (
          <>
            <Text style={styles.Dstatusn}>
              Total{" "}
              <Text style={{ fontWeight: "800" }}>
                {" "}
                {cInfo.results[0].total_delivery_completed}{" "}
              </Text>
              deliveries till now
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.Dstatusn}>No Information Available</Text>
          </>
        )}
      </View>

      <View style={styles.roundedrect2}>
        <Text style={styles.Vdetails}>Vehicle Details</Text>
        {cInfo && cInfo.results && cInfo.results.length > 0 ? (
          <>
            <Text style={styles.Vmodel}>{cInfo.results[0].vehicle_name}</Text>
            <Text style={styles.wheel}>{wheelType} wheeler</Text>
            <Text style={styles.Vnumber}>
              Vehicle Number
              <Text style={{ fontWeight: "400" }}>
                {" "}
                {cInfo.results[0].vehicle_number}
              </Text>
            </Text>
          </>
        ) : (
          <Text style={styles.Vdetails}>No vehicle information available</Text>
        )}
      </View>

      <View style={{ padding: 40 }}>
        {message === "You don't have any vehicle" ? (
          <Text></Text>
        ) : (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              padding: 10,
              borderRadius: 7,
              backgroundColor: "#F02121",
              height: 60,
              bottom: -55,
              //left: -70,
            }}
            onPress={() => handleDeleteAccount()}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Delete Account
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
  Dtext: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    width: 182,
    height: 25,
    left: 50,
    top: 100,
    fontSize: 18,
    color: "#5C5C5C",
    fontWeight: "500",
  },
  Dname: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    width: 300,
    height: 100,
    left: 50,
    top: 125,
    fontSize: 30,
    color: "#0F0F0F",
    fontWeight: "800",
  },
  Dprofilepic: {
    position: "absolute",
    width: 80,
    height: 80,
    left: 270,
    top: 105,
    borderRadius: 80,
  },
  delete: {
    position: "absolute",
    right: 30,
    top: 80,
    bottom: 88,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 50,
    alignItems: "center",
  },
  Dlog: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    width: 500,
    height: 25,
    left: 50,
    top: 170,
    fontSize: 13,
    color: "#5C5C5C",
    fontWeight: "400",
  },
  roundedrect: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    bottom: -20,
    width: 350,
    height: 90,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  Dstatus: {
    left: 25,
    top: 15,
    fontSize: 16,
    fontWeight: "500",
  },
  Dstatusn: {
    left: 25,
    top: 20,
    fontSize: 22,
    fontWeight: "300",
  },
  roundedrect2: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    bottom: -55,
    width: 350,
    height: 190,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  Vdetails: {
    left: 25,
    top: 15,
    fontSize: 16,
    fontWeight: "500",
  },
  Vmodel: {
    left: 25,
    top: 25,
    fontSize: 25,
    fontWeight: "800",
  },
  wheel: {
    left: 25,
    top: 30,
    fontSize: 16,
    fontWeight: "400",
  },
  Vnumber: {
    left: 25,
    top: 60,
    fontSize: 16,
    fontWeight: "500",
  },
});
