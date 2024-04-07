import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Champ obligatoire'),
  password: Yup.string().required('Champ obligatoire').min(8, 'Le mot de passe doit contenir au moins 8 caractères')
});

const LoginForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Nom d'utilisateur"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <Button onPress={handleSubmit} title="Se connecter" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default LoginForm;
