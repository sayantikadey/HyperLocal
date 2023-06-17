import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import { Authcontext } from "../../api/Authcontext";
import axios from "axios";
//import { API_URl } from "@env";
const { height, width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const { userInfo } = useContext(Authcontext);
  const [shopinfo, setShopinfo] = useState(null);
  const [livejob, SetLiveJob] = useState(null);
  const [jobid, Setjobid] = useState("");
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
        //console.log(res.data.count);
        let shopinfo = res.data;
        setShopinfo(shopinfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showLiveJob = () => {
    axios
      .get(`API_URl/live-jobsuser/`, {
        headers: {
          Authorization: `Bearer ${shoptoken}`,
        },
      })
      .then((res) => {
        let livejob = res.data;
        //console.log(livejob);
        SetLiveJob(livejob);
        Setjobid(livejob.data.job_id);
        //console.log(livejob.data.job_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CancelJob = () => {
    //console.log(jobid);
    axios
      .post(
        `API_URl/cancel-job/`,
        {
          job_id: jobid,
        },
        {
          headers: {
            Authorization: `Bearer ${shoptoken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status.code === 403) {
          alert("You can not delete if your job is in process");
        } else {
          alert("Job Cancelled!");
        }
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    apicall();
  }, []);

  useEffect(() => {
    showLiveJob();
    const interval = setInterval(() => {
      showLiveJob();
    }, 5000);

    return () => clearInterval(interval);
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
      {/* <IconButton
        icon="bell"
        iconColor="white"
        mode="contained"
        size={14}
        style={styles.notification}
      /> */}
      <Text style={styles.name}>
        {userInfo.data.first_name} {userInfo.data.last_name}
      </Text>
      {shopinfo && shopinfo.count === 1 ? (
        <>
          <Text style={styles.SName}>
            Owner of
            <Text style={styles.S2name}> {shopinfo.results[0].shop_name}</Text>
          </Text>
          {/* <Text style={styles.Sdetail}>
            Medicine Store{"    "}
            <Text>In Kudghat</Text>
          </Text> */}
        </>
      ) : (
        <Text style={styles.SName}>No Shop</Text>
      )}

      {userInfo.data.profile_pic ? (
        <Image
          style={styles.profilepic}
          source={{ uri: userInfo.data.profile_pic }}
        />
      ) : (
        <Image
          style={styles.profilepic}
          source={{
            uri: "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
          }}
        />
      )}

      <Text style={styles.CurrentPost}>Current Post</Text>
      <View style={styles.livejobContainer}>
        {livejob && livejob.data ? (
          <>
            <Image
              source={{ uri: livejob.data.photo_1 }}
              style={styles.livejobImage}
            />
            <View style={{ bottom: 10 }}>
              <Text style={styles.Descriptionlivejob}>
                Deliverable : {livejob.data.name}
              </Text>
              <Text style={styles.Descriptionlivejob}>
                Description : {livejob.data.description}
              </Text>
              {livejob.data.shop_data ? (
                <Text style={styles.Descriptionlivejob}>
                  Shop Name : {livejob.data.shop_data.shop_name}
                </Text>
              ) : (
                <Text style={styles.Descriptionlivejob}>
                  Your Name : {livejob.data.pickup_contact_name}
                </Text>
              )}
              <Text style={styles.Descriptionlivejob}>
                Customer Name : {livejob.data.delivery_contact_name}
              </Text>
              {livejob.data.status === "Picking" ||
              livejob.data.status === "Delivering" ? (
                <>
                  <Text style={styles.Descriptionlivejob}>
                    Delivery Person Name :{" "}
                    {livejob.data.delivery_person.first_name}{" "}
                    {livejob.data.delivery_person.last_name}
                    {"\n"}
                    <Text style={styles.Descriptionlivejob}>
                      Phone Number :{" "}
                      {livejob.data.delivery_person.mobile_number}
                    </Text>
                  </Text>
                </>
              ) : (
                <Text></Text>
              )}
              <Text
                style={[
                  styles.statusText,
                  livejob.data.status === "Processing"
                    ? styles.processing
                    : livejob.data.status === "Picking"
                    ? styles.picking
                    : livejob.data.status === "Delivering"
                    ? styles.picking
                    : styles.completed,
                ]}
              >
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Status{" "}
                </Text>
                : {livejob.data.status}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.CancelJob}
              onPress={() => CancelJob()}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cancel Job
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.currentdetail}>No posts yet</Text>
        )}
      </View>
      {livejob && livejob.data ? (
        <Text></Text>
      ) : (
        <Button
          icon="pencil"
          mode="elevated"
          textColor="white"
          style={styles.postjob}
          onPress={() => navigation.navigate("Job Details")}
        >
          Post
        </Button>
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
  notification: {
    position: "absolute",
    right: width / 20,
    top: height / 40,
    backgroundColor: "red",
    justifyContent: "center",
    padding: 1,
    borderRadius: 50,
    alignItems: "center",
  },
  name: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 3.3,
    top: width / 2.3,
    fontSize: 18,
    color: "#0F0F0F",
    fontWeight: "900",
  },
  SName: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 3.35,
    top: width / 2,
    fontSize: 18,
    color: "#5C5C5C",
    fontWeight: "400",
  },
  S2name: {
    color: "#241E20",
    fontWeight: "600",
  },
  Sdetail: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 3.33,
    top: width / 1.82,
    fontSize: 14,
    color: "#5C5C5C",
    fontWeight: "300",
  },
  profilepic: {
    position: "absolute",
    width: 60,
    height: 60,
    left: width / 10,
    top: width / 2.3,
    borderRadius: 50,
    //borderColor: "red",
  },
  CurrentPost: {
    position: "absolute",
    alignItems: "center",
    display: "flex",
    left: width / 11,
    top: width / 1.5,
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
  currentdetail: {
    position: "relative",
    alignItems: "center",
    display: "flex",
    left: width / -25,
    bottom: height / 20,
    fontSize: 20,
    color: "#5C5C5C",
    fontWeight: "200",
  },
  postjob: {
    position: "absolute",
    //height:142
    width: width / 4.5,
    height: width / 9.5,
    right: width / 12,
    bottom: width / 2.6,
    borderRadius: 7,
    elevation: 50,
    backgroundColor: "#FF0606",
  },
  livejobImage: {
    resizeMode: "contain",
    height: height / 3,
    width: width / 3,
    bottom: -25,
  },
  livejobContainer: {
    top: 25,
  },
  Descriptionlivejob: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 3,
    textAlign: "left",
    width: width / 1.3,
  },
  statusText: {
    fontSize: 16,
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
  CancelJob: {
    //justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F02121",
    height: width / 10,
    width: width / 4,
    marginTop: 5,
    marginBottom: 5,
    right: width / 150,
  },
});
