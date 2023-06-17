import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Help from "../Postlogin/Proprietor Screens/Help";
import Home from "../Proprietor/Home";
import CustomDrawer from "./CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
//import JobApplicants from "../Postlogin/Proprietor Screens/JobApplicants";
import PostedJobs from "../Postlogin/Proprietor Screens/PostedJobs";
import Profile from "../Postlogin/Proprietor Screens/Profile";

const Drawer = createDrawerNavigator();

const Sidebar = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
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
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={color}
              style={{ left: 10 }}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Job Applicants"
        component={JobApplicants}
        options={{
          drawerIcon: ({ color }) => (
            <Fontisto
              name="persons"
              size={24}
              color={color}
              style={{ left: 10 }}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Posted jobs"
        component={PostedJobs}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="post"
              size={24}
              color={color}
              style={{ left: 10 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name="person"
              size={24}
              color={color}
              style={{ left: 10 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ color }) => (
            <Feather
              name="help-circle"
              size={24}
              color={color}
              style={{ left: 10 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Sidebar;
