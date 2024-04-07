import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeStackNavigation from "./components/HomeStackNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigation/>
    </NavigationContainer>
  );
}
