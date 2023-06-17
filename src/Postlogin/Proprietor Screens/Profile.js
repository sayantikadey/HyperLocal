import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { Authcontext } from "../../../api/Authcontext";
//import { API_URl } from "@env";
import axios from "axios";
const { height, width } = Dimensions.get("window");

export default function Profile({ navigation }) {
  const { userInfo, DeleteAcc } = useContext(Authcontext);
  const [shopinfo, setShopinfo] = useState(null);
  const shopid = userInfo.data.id;
  const shoptoken = userInfo.token.access;
  const apicall = () => {
    axios
      .get(`API_URl/shopdata/?search=${shopid}`, {
        headers: {
          Authorization: `Bearer ${shoptoken}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        let shopinfo = res.data;
        setShopinfo(shopinfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteAccount = () => {
    DeleteAcc();
  };
  useEffect(() => {
    apicall();
  }, []);
  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        iconColor="black"
        mode="contained"
        size={35}
        style={styles.nav}
        onPress={() => navigation.openDrawer()}
      />

      <IconButton
        icon="delete"
        iconColor="black"
        mode="contained"
        size={20}
        style={styles.delete}
      />
      <Text style={styles.text1}>Hey</Text>
      <Text style={styles.text2}>{userInfo.data.first_name}</Text>
      {userInfo.data.profile_pic ? (
        <Image
          style={styles.Dprofilepic}
          source={{ uri: userInfo.data.profile_pic }}
        />
      ) : (
        <Image
          style={styles.Dprofilepic}
          source={{
            uri: "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
          }}
        />
      )}
      <Text style={styles.text3}>
        Logged in Via {userInfo.data.mobile_number}
      </Text>
      <View style={styles.round1}>
        <Text style={styles.text4}>Default Address</Text>
        {shopinfo && shopinfo.count === 1 ? (
          <Text style={styles.text5}>{shopinfo.results[0].shop_address}</Text>
        ) : (
          <Text style={styles.text5}>No shop information available</Text>
        )}
      </View>
      <View style={styles.round2}>
        <Text style={styles.text6}>Shop Details</Text>

        {shopinfo && shopinfo.count === 1 ? (
          <>
            <Text style={styles.text7}>{shopinfo.results[0].shop_name}</Text>
            <Text style={styles.text9}>
              {shopinfo.results[0].shop_shortdescribtion}{" "}
            </Text>
            <Text style={styles.text10}>Shop GST: </Text>
            <Text style={styles.text11}>{shopinfo.results[0].shop_gst} </Text>
            <Text style={styles.text12}>Located In </Text>
            <Text style={styles.text13}>
              {shopinfo.results[0].shop_address}
            </Text>
          </>
        ) : (
          <Text style={styles.text8}>No Shop information available</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => handleDeleteAccount()}
      >
        <Text style={styles.buttontext}>Delete Account</Text>
      </TouchableOpacity>
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
  text1: {
    bottom: height / 19,
    right: width / 3.1,
    fontSize: 21,
  },
  text2: {
    bottom: height / 18,
    right: width / 4,
    fontSize: 27,
    fontWeight: "bold",
  },
  Dprofilepic: {
    position: "absolute",
    width: 75,
    height: 75,
    right: width / 6.2,
    top: height / 10,
    borderRadius: 50,
  },
  delete: {
    position: "absolute",
    right: width / 15,
    top: height / 40,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 1,
    borderRadius: 50,
    alignItems: "center",
  },
  text3: {
    bottom: height / 18,
    right: width / 6.5,
    fontSize: 16,
  },
  text4: {
    top: height / 48,
    left: width / 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  text5: {
    top: height / 50,
    left: width / 20,
    fontSize: 16,
    width: 300,
  },
  text6: {
    top: height / 85,
    left: width / 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  text7: {
    top: height / 100,
    left: width / 20,
    fontSize: 23,
    fontWeight: "bold",
  },
  rectangle: {
    width: 100 * 2,
    height: 100,
    backgroundColor: "white",
    borderWidth: 100,
  },
  text8: {
    top: height / 80,
    left: width / 20,
    fontSize: 18,
  },
  text9: {
    top: height / 100,
    left: width / 20,
    width: 320,
  },
  text10: {
    top: height / 40,
    left: width / 20,
    fontWeight: "bold",
    fontSize: 15,
  },
  text11: {
    top: height / 250,
    left: width / 5,
  },
  text12: {
    top: height / 120,
    left: width / 22,
    fontWeight: "bold",
    fontSize: 18,
  },
  text13: {
    top: height / 70,
    left: width / 22,
    width: 320,
  },
  round1: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    bottom: height / 30,
    width: 350,
    height: 120,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  round2: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    top: height / 20,
    width: 350,
    height: 200,
    borderRadius: 20,
    borderWidth: 0.5,
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
    top: height / 10,
  },
  buttontext: {
    color: "white",
  },
});
