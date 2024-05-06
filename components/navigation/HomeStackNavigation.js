import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Image,
} from "react-native";

import WelcomeScreen from "../screen/WelcomeScreen";
import LoginPage from "../screen/LoginPage";
import Home from "../screen/Home";
import RegisterPage from "../screen/Register";
import Logout from "../tools/Logout";
import ResetPassword from "../screen/ResetPassword";
import UserParam from '../screen/UserParam';
import ChatBot from "../screen/Bot";
import Legal from "../screen/Legal";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Accueil" component={MainTabNavigator} />
      <Drawer.Screen name="Paramètres" component={UserParam}/>
      <Drawer.Screen name="Déconnexion" component={Logout} />
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
      <Stack.Screen name="Legal" component={Legal} />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>

      <Tab.Screen
        name="Listes"
        component={Home}
        screenOptions={{ headerShown: false }}
        options={{
          tabBarIcon: ({size}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/list-text.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Support"
        component={ChatBot}
        screenOptions={{ headerShown: false }}
        options={{
          tabBarIcon: ({size}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/help.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackNavigation = () => {
  return <StackNavigator />;
};

export default HomeStackNavigation;
