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
import { score_list } from "../static/img";

const Stack = createNativeStackNavigator();


const ScoreMenu = () => {
  return (
    <View>

    </View>
  )
}

export const RandomScore = ({ navigation }) => {
  const [currentScore, setCurrentScore] = useState(Math.floor(Math.random() * score_list.length))

  // make async
  const handleNextScore = async () => {
    let nextScore = Math.floor(Math.random() * score_list.length);
    while (nextScore === currentScore) {
      nextScore = await Math.floor(Math.random() * score_list.length);
    }
    setCurrentScore(nextScore);
  }
  
  useEffect(() => {
    Orientation.lockToLandscapeRight();
  }, [])

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          top: 20,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            fontStyle: "italic"
          }}
        >
          {score_list[currentScore].name}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Image 
          source={score_list[currentScore].score} 
          style={{
            // position: "relative",
            // left: 0,
            // width: 950,
            width: undefined,
            resizeMode: 'contain',
            height: 150,
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