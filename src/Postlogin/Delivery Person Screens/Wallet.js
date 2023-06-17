import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { Authcontext } from "../../../api/Authcontext";
import axios from "axios";
//import { API_URl } from "@env";

const { height, width } = Dimensions.get("window");

export default function Wallet({ navigation }) {
  const { userInfo } = useContext(Authcontext);
  const [apidata, setApidata] = useState(null);
  const walletToken = userInfo.token.access;
  const walletApi = () => {
    axios
      .get(`API_URl/wallet-details/`, {
        headers: {
          Authorization: `Bearer ${walletToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.transactions);
        let apidata = res.data;
        setApidata(apidata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    walletApi();
  }, []);
  return (
    <View style={styles.container}>
      <IconButton
        onPress={() => navigation.openDrawer()}
        icon="menu"
        iconColor="#fff"
        mode="contained"
        size={30}
        style={styles.menu}
      />
      {apidata ? (
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "400",
            fontSize: 12,
            right: -160,
            top: -35,
          }}
        >
          ID: {apidata.data.wallet_id}
        </Text>
      ) : (
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "400",
            fontSize: 12,
            right: -120,
            top: -25,
          }}
        >
          {" "}
        </Text>
      )}

      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "400",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Currect Transaction
      </Text>
      {apidata ? (
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "700",
            fontSize: 24,
          }}
        >
          {"\u20B9"} {apidata.data.last_payment}
        </Text>
      ) : (
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "700",
            fontSize: 24,
          }}
        >
          No information
        </Text>
      )}
      <View style={styles.bottom}>
        <Text
          style={{
            textAlign: "center",
            color: "Black",
            fontWeight: "700",
            top: 15,
            height: 30,
            fontSize: 25,
            marginBottom: 10,
          }}
        >
          E-wallet Balance
        </Text>
        {apidata ? (
          <Text
            style={{
              textAlign: "center",
              color: "Black",
              fontWeight: "700",
              top: 15,
              height: 50,
              fontSize: 35,
            }}
          >
            {"\u20B9"} {apidata.data.total_payment}
          </Text>
        ) : (
          <Text
            style={{
              textAlign: "center",
              color: "Black",
              fontWeight: "700",
              top: 15,
              height: 50,
              fontSize: 35,
            }}
          >
            No information
          </Text>
        )}
        <TouchableOpacity
          style={{
            justifyContent: "center",
            padding: 10,
            borderRadius: 50,
            bottom: -95,
            borderWidth: 2,
            height: 60,
            width: 200,
            marginTop: 25,
            marginBottom: 5,
          }}
          onPress={() => navigation.navigate("Transaction History")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            Transaction History
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    alignItems: "center",
    backgroundColor: "#F02121",
    left: width / 25,
    top: height / 40,
  },
  container: {
    flex: 1 / 3.5,
    backgroundColor: "#F02121",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    flex: 1 / 6,
    top: height / 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
