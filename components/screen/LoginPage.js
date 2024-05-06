import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "../firebase/configfire";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Le nom d'utilisateur est requis"),
  password: Yup.string().required("Le mot de passe est requis"),
});

export default function LoginPage({ navigation }) {
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    navigation.navigate("ResetPassword");
  };

  const handleLogin = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.username, values.password);
      navigation.reset({
        index: 0,
        routes: [{ name: "DrawerNavigator" }],
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salut, de retour ? 👋</Text>
      
      <Text style={styles.subtitle}>Heureux de te revoir, tu peux te connecter ci-dessous</Text>
      
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Text style={styles.boxtitle}>Adresse Email</Text>
            <TextInput
              style={styles.input}
              placeholder="chuck.norris@mail.com"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <Text style={styles.boxtitle}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="**************"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={handleResetPassword}>
        <Text style={styles.mentions}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
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