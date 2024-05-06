import React, { useState } from 'react';
import { auth } from '../firebase/configfire';
import { sendPasswordResetEmail } from 'firebase/auth';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu as perdu ton mot de passe ? 😨</Text>
      
      <Text style={styles.subtitle}>C'est pas grave ! Saisi ton email ci-dessous et nous allons t'envoyer un lien pour réinitialiser ton mot de passe</Text>
      
      {/* <Text style={styles.header}>Réinitialiser le mot de passe</Text> */}
      <Text style={styles.boxtitle}>Adresse Email</Text>
      <TextInput
        style={styles.input}
        placeholder="will.smith@mail.com"
        value={email}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Envoyer le lien de réinitialisation</Text>
      </TouchableOpacity>
      {resetSent && (
        <Text style={styles.success}>
          Un email a été envoyé à l'adresse {email}. Veuillez suivre les instructions pour réinitialiser votre mot de passe.
        </Text>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
    alignSelf:'flex-start',
    color: "#262626",
  },

  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#262626",
  },

  subtitle:{
    color: "#A6A6A6",
    fontSize: 16,
    marginBottom: 20,
  },
  
  boxtitle:{
    fontWeight: "bold",
    marginTop : 20,
    marginBottom : 10,
    fontSize: 16,
    color: "#262626",
  },
  
  input: {
    height: 52,
    width: "100%",
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  error: {
    color: "#ff0033",
    marginTop: 5,
    fontSize: 14,
  },

  button: {
    backgroundColor: '#47A920',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },

  mentions: {
    color: "#A6A6A6",
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center'
  },
});

export default ResetPassword;