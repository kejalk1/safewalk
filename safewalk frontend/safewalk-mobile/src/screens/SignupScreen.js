import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      // const response = await api.post('/signup', { name, email, password });
      // const { token } = response.data;

      // await AsyncStorage.setItem('token', token);
      console.log("Signup Started")

      createUserWithEmailAndPassword(auth, email, password).then((userCreds)=>{
        const user = userCreds.user;
       
      navigation.navigate('Login');

      }).catch((err)=>{
        console.log(err)
      })

    } catch (err) {
      console.log(err)
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Title>Sign Up</Title>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Sign Up
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default SignupScreen;
