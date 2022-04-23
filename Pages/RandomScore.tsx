import React, { useState } from 'react';
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

const Stack = createNativeStackNavigator();

import * as scores from "../static/img";
export const RandomScore = ({ navigation }) => {
  const [randomScore, setRandomScore] = useState(Math.floor(Math.random() * Object.values(scores).length))

  // make async
  const handleNextScore = () => {
    let nextScore = Math.floor(Math.random() * Object.values(scores).length);
    while (nextScore === randomScore) {
      nextScore = Math.floor(Math.random() * Object.values(scores).length);
    }
    setRandomScore(nextScore);
  }

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image 
          source={Object.values(scores)[randomScore]} 
          style={{
            width: 950,
          }}
          />
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