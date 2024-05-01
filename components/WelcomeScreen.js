import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "./Button";
const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/background_green.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_toubidou.png")}
          resizeMode="contain"
        />
        <Text style={styles.textlogo}>TOUBIDOU</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={"Connexion"}
          color="#D1F19E"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title={"Inscription"}
          color="#47A920"
          onPress={() => navigation.navigate("Register")}
        />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 125, // Adjust marginBottom based on screen height
    // paddingHorizontal: width * 0.05, // Add horizontal padding based on screen width
  },
  logo: {
    height: "50%",
    marginTop: 150,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: height * 0.1, // Adjust paddingTop based on screen height
    alignItems: "center",
  },
  textlogo: {
    fontSize: width * 0.06, // Adjust font size based on screen width
    fontWeight: "800",
    paddingVertical: height * 0.02, // Adjust padding based on screen height
    color: "white",
  },
});
