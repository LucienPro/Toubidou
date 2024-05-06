import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase/configfire";
import { verifyBeforeUpdateEmail, updatePassword } from "firebase/auth";
function UserParam() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const user = auth.currentUser;
  if (!user) {
    // Utilisateur non authentifié
    Alert.alert(
      "Erreur",
      "Vous devez être connecté pour effectuer cette action."
    );
    return;
  }
  const handleChangeEmail = () => {
    verifyBeforeUpdateEmail(user, newEmail)
      .then(() => {
        Alert.alert(
          "Succès",
          "Un mail a été envoyé à votre nouvelle adresse email pour la confirmer."
        );
        console.log(auth.currentUser.email);
      })
      .catch((error) => {
        Alert.alert(
          "Erreur",
          `Erreur lors de la mise à jour de l'adresse email : ${error.message}`
        );
      });
  };
  const handleChangePassW = () => {
    updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
        Alert.alert("Succès", "Mot de passe update.");
      })
      .catch((error) => {
        Alert.alert(
          "Erreur",
          `Erreur lors de la mise à jour du mot de passe : ${error.message}`
        );
        // ...
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.title}> Une envie de changement ? 📑</Text>

        <Text style={styles.subtitle}>
          Modifie les informations de ton compte ici si nécessaire
        </Text>
        <Text style={styles.boxtitle}>Modifier votre adresse mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Nouvelle adresse email"
          onChangeText={(text) => setNewEmail(text)}
          value={newEmail}
        />
        {/* <Button title="Changer l'adresse email" onPress={handleChangeEmail} /> */}
        
        <TouchableOpacity style={styles.button} onPress={handleChangePassW}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>

        <Text style={styles.boxtitle}>Modifier votre mot de passe</Text>

        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe"
          onChangeText={(text) => setPassword(text)}
          value={newPassword}
        />
        
        {/* <Button
          style={styles.button}
          title="Changer le mot de passe"
          onPress={handleChangePassW}
        /> */}
        
        <TouchableOpacity style={styles.button} onPress={handleChangePassW}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },

  formGroup: {
    marginBottom: 20,
  },

  input: {
    height: 52,
    width: "100%",
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  boxtitle: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    color: "#262626",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#262626",
  },

  subtitle: {
    color: "#A6A6A6",
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#47A920",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    marginBottom:20,
    width : '50%',
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default UserParam;
