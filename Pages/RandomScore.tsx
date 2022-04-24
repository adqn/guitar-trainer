import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  Image,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import Orientation from 'react-native-orientation';

import * as scores from "../static/img";

const Stack = createNativeStackNavigator();


const ScoreMenu = () => {
  return (
    <View>

    </View>
  )
}

export const RandomScore = ({ navigation }) => {
  const [currentScore, setCurrentScore] = useState(Math.floor(Math.random() * Object.values(scores).length))

  // make async
  const handleNextScore = () => {
    let nextScore = Math.floor(Math.random() * Object.values(scores).length);
    while (nextScore === currentScore) {
      nextScore = Math.floor(Math.random() * Object.values(scores).length);
    }
    setCurrentScore(nextScore);
  }
  
  useEffect(() => {
    Orientation.lockToLandscapeRight();
  }, [])

  return (
    <SafeAreaView>
      <View>
        <Image 
          source={Object.values(scores)[currentScore]} 
          style={{
            // position: "relative",
            // left: 0,
            width: 950,
          }}
          />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button 
          title="Next" 
          onPress={handleNextScore}
          />
        <Text
          style={{ color: 'black' }}
        >
          Hit 'Next' for a new score!
        </Text>
      </View>
    </SafeAreaView>
  )
}