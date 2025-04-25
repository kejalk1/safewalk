// src/screens/EmergencySmsScreen.js
import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Button, Title } from 'react-native-paper';
import * as SMS from 'expo-sms';

const contacts = [
  { name: 'Mother', phone: '9890843111', avatar: require('../../assets/mother.jpg') },
  { name: 'Father', phone: '9423483948', avatar: require('../../assets/father.jpg') },
  { name: 'Brother', phone: '8010656811', avatar: require('../../assets/brother.jpg') },
  { name: 'sister', phone: '9834650682', avatar: require('../../assets/sister.png') },
];

const EmergencySmsScreen = ({ navigation }) => {
  const sendSMS = async (contact) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Error', 'SMS service not available');
      return;
    }

    const message = `🚨 Emergency Alert from SafeWalk!\nPlease check on me ASAP.`;
    await SMS.sendSMSAsync([contact.phone], message);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Emergency SMS</Title>
      <Text style={styles.subtitle}>Your safety is our mission. Who do you want to SMS?</Text>

      {contacts.map((contact, idx) => (
        <Button
          key={idx}
          mode="outlined"
          icon={() => <Image source={contact.avatar} style={styles.avatar} />}
          onPress={() => sendSMS(contact)}
          style={styles.contactBtn}
          labelStyle={styles.label}
        >
          {contact.name}
        </Button>
      ))}

      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
        labelStyle={{ color: 'white' }}
      >
        Back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  contactBtn: {
    marginVertical: 8,
    backgroundColor: '#d4f9e5',
    borderRadius: 30,
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
  backBtn: {
    marginTop: 40,
    backgroundColor: '#000',
    borderRadius: 6,
  },
});

export default EmergencySmsScreen;
