import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from './firebase/configfire';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage({ navigation }) {
  const [userCredential, setUserCredential] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');


  const handleLogin = () => {
    console.log('user' + userCredential.username);
    console.log('password' + userCredential.password);
    setError('');
    signInWithEmailAndPassword(auth, userCredential.username, userCredential.password)
    .then(() => {
      // login was successful 
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabNavigator' }],
      })
    })
    .catch((error) => {
      const errorMessage = error.message;
      setError(errorMessage);
    });
  };
  const handleInputChange = (name, value) => { 
    setUserCredential({...userCredential, [name]: value});  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userCredential.username}
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={userCredential.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4ECDC4',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});