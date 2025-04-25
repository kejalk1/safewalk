import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { useNavigation } from '@react-navigation/native';
import {auth} from "../config/firebaseConfig"
import { signInWithEmailAndPassword } from 'firebase/auth';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      // const response = await api.post('/login', { email, password });
      // const { token } = response.data;

      // await AsyncStorage.setItem('token', token);

    signInWithEmailAndPassword(auth, email, password).then((userCreds)=>{
        const user = userCreds.user;
    
       navigation.navigate('Dashboard');
      }).catch(err=>console.log(err))
    } catch (err) {
      console.log(err)
      setError(err.message || 'Authentication failed');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Title>Login</Title>

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

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button mode="contained" onPress={()=>{navigation.navigate("Signup")}} style={styles.button}>
        SignUp
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

export default LoginScreen;
