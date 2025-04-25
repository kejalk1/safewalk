import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { Text, Title, ActivityIndicator, Button } from 'react-native-paper';
import * as Location from 'expo-location';

import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const TrackMeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const saveLocation = async (coords) => {
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'locations'), {
        userId: user?.uid || 'anonymous',
        latitude: coords.latitude,
        longitude: coords.longitude,
        speed: coords.speed,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.error('🔥 Firestore error:', err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        await saveLocation(loc.coords);
        setLoading(false);

        const interval = setInterval(async () => {
          const updatedLoc = await Location.getCurrentPositionAsync({});
          setLocation(updatedLoc);
          await saveLocation(updatedLoc.coords);
        }, 10000);

        return () => clearInterval(interval);
      } catch (err) {
        setErrorMsg('Location error: ' + err.message);
      }
    })();
  }, []);

  const openInMaps = async () => {
    if (!location) return;

    const { latitude, longitude } = location.coords;

    const url = Platform.select({
      ios: `maps://maps.apple.com/?ll=${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`,
    });

    const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL(fallbackUrl); // fallback to browser
      }
    } catch (err) {
      Alert.alert('Error', 'Could not open map: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Title>📍 Live Location</Title>

      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : loading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <>
          <Text>Latitude: {location.coords.latitude.toFixed(6)}</Text>
          <Text>Longitude: {location.coords.longitude.toFixed(6)}</Text>
          <Text>Speed: {location.coords.speed?.toFixed(2) || 0} m/s</Text>

          <Button
            mode="contained"
            onPress={openInMaps}
            style={{ marginTop: 30 }}
          >
            📍 Open in Maps
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default TrackMeScreen;
