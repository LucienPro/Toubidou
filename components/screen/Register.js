import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase/configfire";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/configfire";
import { doc, setDoc } from "firebase/firestore";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string()
    .required("Mot de passe requis")
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export default function RegisterPage({ navigation }) {
  const handleRegister = async (values, { setSubmitting, setFieldError }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.username,
        values.password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "DrawerNavigator" }],
      });
    } catch (error) {
      const errorMessage = error.message;
      setFieldError("general", errorMessage);
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Salut, bienvenue 👋</Text>
      
      <Text style={styles.subtitle}>C'est parti, crée ton compte ci-dessous</Text>
      
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            <Text style={styles.boxtitle}>Adresse Email</Text>
            <TextInput
              style={styles.input}
              placeholder="jeanclaude.vandamme@mail.com"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              keyboardType="email-address"
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <Text style={styles.boxtitle}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="*************"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            {errors.general && (
              <Text style={styles.error}>{errors.general}</Text>
            )}
            <Text style={styles.mentions}>En t'inscrivant, tu acceptes nos conditions d'utilisation et notre politique de confidentialité</Text>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
    textAlign: 'center',
    fontWeight: 'bold',
  },

  mentions: {
    color: "#A6A6A6",
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center'
  },
});
