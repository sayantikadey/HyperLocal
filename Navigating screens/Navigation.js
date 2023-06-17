import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Prelog from "../src/Prelog";
import Login from "../src/Login/Login";
import React, { useContext } from "react";
import { Authcontext } from "../api/Authcontext";
//import Home from "../src/Postlogin/Home";
import Jobpost from "../src/Postlogin/Proprietor Screens/Jobpost";
import Sidebar from "../src/Sidebar/Sidebar";
import D_Sidebar from "../src/Sidebar/D_Sidebar";
import ForgetPassword from "../src/Login/ForgetPassword";
import OtpRegister from "../src/Register/OtpRegister";
import CommonRegister from "../src/Register/CommonRegister";
import DRegister from "../src/Register/DeliveryPerson/DRegister";
import ResetPassword from "../src/Login/ResetPassword";
import Shopdetails from "../src/Register/Proprietor/Shopdetails";
import Livelocation from "../src/Register/Proprietor/Livelocation";
import JobDetails from "../src/Postlogin/Delivery Person Screens/JobDetails";
import OTPLogin from "../src/Login/OTPLogin";
import History from "../src/Postlogin/Delivery Person Screens/History";
import Deliveryjobdetails from "../src/Delivery Person/Deliveryjobdetails";



export default function Navigation() {
  const Stack = createNativeStackNavigator();
  const { userToken, userInfo } = useContext(Authcontext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken !== null ? (
          <>
            {userInfo.data.user_type === "PR" ? (
              <Stack.Screen
                name="home"
                component={Sidebar}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Dhome"
                component={D_Sidebar}
                options={{ headerShown: false }}
              />
            )}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Prelogin"
              component={Prelog}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="mobileOTPreg"
              component={OtpRegister}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CommonRegister"
              component={CommonRegister}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShopDetails"
              component={Shopdetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Location"
              component={Livelocation}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="DeliveryRegister"
              component={DRegister}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="otplogin"
              component={OTPLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="forgetpass"
              component={ForgetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="resetpass"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
          </>
        )}
        <Stack.Screen
          name="Job Details"
          component={Jobpost}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Delivery Details"
          component={JobDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transaction History"
          component={History}
          />
          <Stack.Screen
          name="Delivery Jobdetails"
          component={Deliveryjobdetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
