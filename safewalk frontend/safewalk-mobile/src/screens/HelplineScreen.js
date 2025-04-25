import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { Text, Title, Button } from 'react-native-paper';

const helplines = [
  { name: 'Women Helpline', number: '1091'},
  { name: 'Child Helpline', number: '1098' },
  { name: 'Police', number: '100' },
  { name: 'Ambulance', number: '102'},
  { name: 'Disaster Mgmt', number: '108'},
  { name: 'Mental Health', number: '08046110007' },
];

const HelplineScreen = ({ navigation }) => {
  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.heading}>National Helplines - India 🇮🇳</Title>

      {helplines.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => callNumber(item.number)}
        >
          <Image source={item.icon} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>Tap to call {item.number}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Button
        mode="contained"
        style={styles.backBtn}
        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
        onPress={() => navigation.goBack()}
      >
        Back
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  subtitle: {
    color: '#555',
    marginTop: 4,
    fontSize: 13,
  },
  backBtn: {
    marginTop: 30,
    backgroundColor: 'black',
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 30,
  },
});

export default HelplineScreen;
