import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Text, Title } from 'react-native-paper';

import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const auth = getAuth();


const DashboardScreen = ({ navigation }) => {
  const logAction = async (type) => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      await addDoc(collection(db, 'actions'), {
        userId: user.uid,
        actionType: type, // 'sms' or 'call'
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error('Error logging action:', err);
    }
  };

  const handlePress = (label, screen, action) => {
    if (screen) {
      navigation.navigate(screen);
    } else if (action === 'sms') {
      Linking.openURL('sms:112?body=🚨 This is an emergency!');
      logAction('sms');
    } else if (action === 'call') {
      Linking.openURL('tel:9022130171');
      logAction('call');
    } else {
      Alert.alert(`${label}`, `You tapped ${label}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/profile.jpg')}
          style={styles.avatar}
        />
        <Title style={styles.welcome}>Welcome back user</Title>
      </View>

      <View style={styles.grid}>
        {gridItems.map(({ label, icon, background, screen, action }, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, { backgroundColor: background }]}
            onPress={() => handlePress(label, screen, action)}
          >
            <Image source={icon} style={styles.icon} />
            <Text style={styles.cardLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const gridItems = [
  {
    label: 'SOS',
    icon: require('../../assets/sos.jpg'),
    background: '#FFF',
  },
  {
    label: 'Emergency SMS',
    icon: require('../../assets/sms.jpg'),
    background: '#FFF',
    screen: 'EmergencySms',  // ✅ Add this
  },
  {
    label: 'Helpline',
    icon: require('../../assets/helpline.png'),
    background: '#FFF',
    screen: 'Helpline', // 🔁 navigate to new screen
  },
  {
    label: 'Record',
    icon: require('../../assets/record.jpg'),
    background: '#FFF',
    screen: 'Record', // ✅ This tells navigation to route to RecordScreen
  },
  {
    label: 'Track Me (Advanced)',
    icon: require('../../assets/location.png'),
    background: '#FFF',
    screen: 'TrackMe',
  },
  {
    label: 'Support',
    icon: require('../../assets/support.png'),
    background: '#FFF',
    screen: 'Support', // ✅ Route to chatbot
  },
  
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#c6dbf7',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcome: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  card: {
    width: 140,
    height: 130,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardLabel: {
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default DashboardScreen;
