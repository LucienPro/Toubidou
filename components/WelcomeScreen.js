import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Image,StyleSheet, Text, View,ImageBackground,Dimensions,TouchableOpacity } from 'react-native';
import { Button } from './Button';
const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({navigation}) { 
    return (
        <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo-red.png")} />
                <Text style={styles.textlogo}>Sell What You Don't Need</Text>
            </View>
            <View style={styles.buttonContainer}>    
              <Button  title={'Login'} color = '#fc5c65' onPress={() => navigation.navigate('Login')} />
                <Button title={'Register'} color = '#4ECDC4' onPress={() => navigation.navigate('Register')}/>
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: height * 0.1, // Adjust marginBottom based on screen height
      paddingHorizontal: width * 0.05, // Add horizontal padding based on screen width
    },
    logo: {
      width: width * 0.4, // Adjust logo width based on screen width
      height: height * 0.2, // Adjust logo height based on screen height
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: height * 0.1, // Adjust paddingTop based on screen height
      alignItems: 'center',
    },
    textlogo: {
      fontSize: width * 0.06, // Adjust font size based on screen width
      fontWeight: '800',
      paddingVertical: height * 0.02, // Adjust padding based on screen height
    },
  });