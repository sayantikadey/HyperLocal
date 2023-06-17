import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import D_CustomDrawer from "./D_CustomDrawer";
import Dhome from "../Delivery Person/Dhome";
import Feed from "../Postlogin/Delivery Person Screens/Feed";
import Deliveries from "../Postlogin/Delivery Person Screens/Deliveries";
//import Lang from "../Postlogin/Delivery Person Screens/Lang";
//import Setting from "../Postlogin/Delivery Person Screens/Setting";
import Helep from "../Postlogin/Delivery Person Screens/Helep";
import Dprofile from "../Postlogin/Delivery Person Screens/Dprofile";
//import { Octicons } from "@expo/vector-icons";
//import { MaterialIcons } from "@expo/vector-icons";
import Wallet from "../Postlogin/Delivery Person Screens/Wallet";

const D_Sidebar = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <D_CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "red",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: { marginLeft: 25, fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Dhome}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Dprofile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-circle-sharp" size={23} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feed"
        component={Feed}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" size={20} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Verify your Pickup"
        component={Setting}
        options={{
          drawerIcon: ({ color }) => (
            <Octicons name="verified" size={20} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Verify Your Delivery"
        component={Lang}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="verified-user" size={20} color="black" />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="My Deliveries"
        component={Deliveries}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="cubes" size={18} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={Wallet}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="wallet" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Helep}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="question-circle-o" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default D_Sidebar;
