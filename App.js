import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeStackNavigation from "./components/navigation/HomeStackNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigation/>
    </NavigationContainer>
  );
}
