import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
} from 'react-native';
import { Audio } from 'expo-av';

export const AudioPanel = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [info, setInfo] = useState<string | undefined>(undefined);
  const playButtonRef = useRef(null);
  const infoRef = useRef(null);

  async function startRecording() {
    try {
      console.log('Requesting permissions');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording");
      setInfo("Starting recording");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
        setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording");
      setInfo("Failed to start recording");
    }
  }

  async function stopRecording() {
    console.log("Stopping recording");
    setInfo("Stopping recording");
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    console.log("Recording stopped and stored at", uri);
    setInfo(`Recording stopped and stored at: ${uri}`);
  }

  useEffect(() => {
  })

  return (
    <View>
      <Button 
        title={recording ? "Stop" : "Record"}
        onPress={recording ? stopRecording : startRecording}
      />
      {info ? <Text>{info}</Text> : undefined}
    </View>
  )
}