import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase/configfire';
import { verifyBeforeUpdateEmail,updatePassword } from "firebase/auth";
function UserParam() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  const user = auth.currentUser;
  if (!user) {
    // Utilisateur non authentifié
    Alert.alert('Erreur', 'Vous devez être connecté pour effectuer cette action.');
    return;
  }
  const handleChangeEmail = () => {
    verifyBeforeUpdateEmail(user,newEmail)
      .then(() => {
        Alert.alert('Succès', 'Un mail a été envoyé à votre nouvelle adresse email pour la confirmer.');
        console.log(auth.currentUser.email);
      })
      .catch((error) => {
        Alert.alert('Erreur', `Erreur lors de la mise à jour de l'adresse email : ${error.message}`);
      });
  };
  const handleChangePassW = () => {
    updatePassword(user, newPassword).then(() => {
        // Update successful.
        Alert.alert('Succès', 'Mot de passe update.');

      }).catch((error) => {
        Alert.alert('Erreur', `Erreur lors de la mise à jour du mot de passe : ${error.message}`);
        // ...
      });
  };

  return (
    <View>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Nouvelle adresse email"
          onChangeText={(text) => setNewEmail(text)}
          value={newEmail}
        />
        <Button title="Changer l'adresse email" onPress={handleChangeEmail} />
        <TextInput
          style={styles.input}
          placeholder="Changer le mot de passe"
          onChangeText={(text) => setPassword(text)}
          value={newPassword}
        />
         <Button title="Changer le mot de passe" onPress={handleChangePassW} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default UserParam;
