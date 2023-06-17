import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Authcontext } from "../../../api/Authcontext";
import axios from "axios";
//import { API_URl } from "@env";

const { height, width } = Dimensions.get("window");

export default function History({ navigation }) {
  const { userInfo } = useContext(Authcontext);
  const [apidata, setApidata] = useState([]);
  const walletToken = userInfo.token.access;
  const TransactionHistory = () => {
    axios
      .get(`API_URl/wallet-details/`, {
        headers: {
          Authorization: `Bearer ${walletToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.transactions);
        let apidata = res.data.data.transactions;
        setApidata(apidata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    TransactionHistory();
  }, []);
  function splitDateTime(dateTime) {
    const parts = dateTime.split(" ");
    const date = parts[0];
    const time = parts[1];
    const ampm = parts[2];

    return { date, time, ampm };
  }

  return (
    <View style={styles.container}>
      {apidata ? (
        <View style={{ width: "95%", marginTop: 50 }}>
          <FlatList
            data={apidata}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ borderBottomWidth: 1 }}>
                <Text
                  style={{
                    textAlign: "right",
                    top: 20,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {"\u20B9"}
                  {item.amount}
                </Text>
                {/* <Text>{item.transaction_id}</Text> */}
                <Text>{splitDateTime(item.date).date}</Text>
                <Text>
                  {splitDateTime(item.date).time}{" "}
                  {splitDateTime(item.date).ampm}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.Nodata}>No Previous Transactions Available</Text>
      )}
      <StatusBar hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
  },
  Nodata: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    top: width,
  },
});
