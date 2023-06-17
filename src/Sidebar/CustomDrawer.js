import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Authcontext } from "../../api/Authcontext";
const { height, width } = Dimensions.get("window");

export default function CustomDrawer(props) {
  const { userInfo, logout } = useContext(Authcontext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <ImageBackground
          source={{
            uri: "https://loveshayariimages.in/wp-content/uploads/2021/10/New-Red-Wallpaper-photo-images-download-scaled.jpg",
          }}
          style={{ padding: 15 }}
        >
          {userInfo.data.profile_pic ? (
            <Image
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                marginBottom: 10,
              }}
              source={{ uri: userInfo.data.profile_pic }}
            />
          ) : (
            <Image
              style={{
                height: 80,
                width: 80,
                borderRadius: 50,
                marginBottom: 10,
              }}
              source={{
                uri: "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
              }}
            />
          )}
          <Text style={{ color: "white", fontSize: 18, fontWeight: "700", left: 10 }}>
            {userInfo.data.first_name}{" "}{userInfo.data.last_name}
          </Text>
        </ImageBackground>

        <View
          style={{ flex: 1, backgroundColor: "white", paddingTop: 20, top: 10 }}
        >
          <DrawerItemList {...props} />
        </View>

        <View
          style={{ backgroundColor: "white", height: 150, width: 150, top: 10 }}
        />
      </DrawerContentScrollView>
      <View style={{ padding: 40 }}>
        <TouchableOpacity
          style={{
            //position: "relative",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderWidth: 1,
            borderRadius: 7,
            borderColor: "#F02121",
            height: 50,
          }}
          onPress={() => logout()}
        >
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 16,
              fontWeight: "900",
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
