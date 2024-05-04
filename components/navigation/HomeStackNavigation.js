import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import WelcomeScreen from "../screen/WelcomeScreen";
import LoginPage from "../screen/LoginPage";
import Home from "../screen/Home";
import RegisterPage from "../screen/Register";
import Logout from "../tools/Logout";
import ResetPassword from "../screen/ResetPassword";
import UserParam from '../screen/UserParam';
import ChatBot from "../screen/Bot";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Accueil" component={MainTabNavigator} />
      <Drawer.Screen name="UserParam" component={UserParam}/>
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="DrawerNavigator" component={HomeDrawerNavigator} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        screenOptions={{ headerShown: false }}
      />
      <Tab.Screen
        name="Support"
        component={ChatBot}
        screenOptions={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const HomeStackNavigation = () => {
  return <StackNavigator />;
};

export default HomeStackNavigation;
