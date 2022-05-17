import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { Audio } from 'expo-av';

export const AudioPanel = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [sound, setSound] = useState<Audio.Sound>();
  const [info, setInfo] = useState<string | undefined>(undefined);
  const [recordingEnded, setRecordingEnded] = useState<boolean | undefined>();
  const [lastRecordingUri, setLastRecordingUri] = useState<string | null | undefined>();
  const [looping, setLooping] = useState<boolean>();
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
      setRecordingEnded(false);
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
    console.log("Recording stored at", uri);
    setInfo(`Recording stored at: ${uri}`);
    if (uri) setLastRecordingUri(uri);
    setRecordingEnded(true);
  }

  async function play(uri: string, loop?: boolean) {
    try {
      const { sound } = await Audio.Sound.createAsync({uri: uri});
      setInfo(`Playing ${uri}`)
      setSound(sound);
      await sound.playFromPositionAsync(0);
    } catch {
      setInfo(`Unable to play sound`);
    }

    if (!loop) await sound?.unloadAsync()
      // .then(() => sound._onPlaybackStatusUpdate);
    ;
  }

  // millis: loop duration
  // 2400ms = 1 measure at 100 BPM
  async function playLoop(uri: string, millis: number) {
    const interval = setInterval(() => {
      if (!looping) {
        clearInterval(interval);
      } else {
        play(uri, true);
      }
    }, millis);
  }

  async function playLastRecording() {
    if (lastRecordingUri) {
      await play(lastRecordingUri);
    } else return;
  }

  // Takes measures in 4/4
  function recordMeasures(measures: number, bpm: number) {}

  useEffect(() => {
  }, [])

  return (
    <View>
      <Button 
        title={recording ? "Stop" : "Record"}
        onPress={recording ? stopRecording : startRecording}
      />
      {lastRecordingUri ? 
      <View style={styles.container}>
          <Button 
            title={"Play"}
            onPress={playLastRecording}
          />
          <Button 
            title={looping ? "Stop loop" : "Loop"}
            onPress={() => {
              if (looping) {
                setLooping(false);
              } else {
                setLooping(true);
                playLoop(lastRecordingUri, 2400);
              }
            }}
          />
        </View>
        : undefined
      }
      {info ? <Text>{info}</Text> : undefined}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row"
  }
})