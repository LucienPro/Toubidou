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
import { Button } from "../tools/Button";
const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {

  return (
    <ImageBackground
      source={require("../../assets/background_green.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo_toubidou.png")}
          resizeMode="contain"
        />
        <Text style={styles.title}>TOUBIDOU</Text>
        <Text style={styles.subtitle}>
          L'application qui booste ta productivité et te simplifie la vie
        </Text>
        <Image
          style={styles.logo_down}
          source={require("../../assets/sens.png")}
          resizeMode="contain"
        />
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
    marginBottom: 125,
  },
  logo: {
    height: "50%",
    marginTop: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: height * 0.1,
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    fontSize: 64,
    color: "#D9F2D0",
    fontWeight:'bold',
  },
  subtitle: {
    fontSize: 22,
    color: "#D9F2D0",
    textAlign: "center",
    fontWeight:"bold",
    paddingHorizontal: 20,
    marginTop:35,
  },
  logo_down:{
    marginTop: 50,
    height: "5%",
  },
});
