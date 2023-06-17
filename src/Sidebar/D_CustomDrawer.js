import { View, Text, Image, ImageBackground, Dimensions } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useContext } from "react";
import { Authcontext } from "../../api/Authcontext";

const { height, width } = Dimensions.get("window");

const D_CustomDrawer = (props) => {
  const { logout, userInfo } = useContext(Authcontext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <ImageBackground
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKnYRJPoOuxcyeD2_drXDUs5QuYuLiY4-dnA&usqp=CAU",
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
          <Text style={{ color: "#FCF5E5", fontSize: 18, fontWeight: "700", left: 10 }}>
            {userInfo.data.first_name}{" "}{userInfo.data.last_name}
          </Text>
        </ImageBackground>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 40 }}>
        <TouchableOpacity
          style={{
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
};

export default D_CustomDrawer;
