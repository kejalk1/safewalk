import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Button, Text, Title } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { db } from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const storage = getStorage();

const RecordScreen = () => {
  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Microphone permission is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Start recording error:', err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setRecordedUri(uri);
      setIsRecording(false);
    } catch (err) {
      console.error('Stop recording error:', err);
    }
  };

  const playRecording = async () => {
    if (!recordedUri) return;
    const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
    setSound(sound);
    await sound.playAsync();
  };

  const uploadRecording = async () => {
    try {
      if (!recordedUri) return;
      const user = auth.currentUser;
      const blob = await FileSystem.readAsStringAsync(recordedUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const fileBuffer = Uint8Array.from(atob(blob), c => c.charCodeAt(0));

      const audioRef = ref(storage, `audio/${user?.uid}_${Date.now()}.m4a`);
      const uploadTask = uploadBytesResumable(audioRef, fileBuffer);

      uploadTask.on('state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadStatus(`Upload is ${progress.toFixed(0)}% done`);
        },
        error => {
          console.error('Upload error:', error);
          setUploadStatus('❌ Upload failed');
        },
        () => {
          setUploadStatus('✅ Upload complete!');
        }
      );
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Title>🎤 Audio Recorder</Title>

      <Button
        icon={isRecording ? 'stop' : 'record'}
        mode="contained"
        onPress={isRecording ? stopRecording : startRecording}
        style={{ marginVertical: 10 }}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>

      {recordedUri && (
        <>
          <Button icon="play" mode="outlined" onPress={playRecording}>
            ▶️ Play
          </Button>
          <Button icon="upload" mode="contained" onPress={uploadRecording} style={{ marginTop: 10 }}>
            ⬆️ Upload to Firebase
          </Button>
          <Text style={{ marginTop: 10 }}>{uploadStatus}</Text>
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
    backgroundColor: '#fff',
  },
});

export default RecordScreen;
