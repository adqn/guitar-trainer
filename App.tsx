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

import { RandomScore } from './Pages/RandomScore';
import { Chords } from './Pages/Chords';

const Stack = createNativeStackNavigator();

const Section: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Home = ({ navigation }) => { 
  const [didChangeScreen, setDidChangeScreen] = useState(false);
  const [counter, setCounter] = useState<number>(0);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Orientation.lockToPortrait();
    });
    
    return unsubscribe;
  }, [navigation])

  return (
    <SafeAreaView >
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Button 
          title="Practice random scores"
          onPress={() => {
            navigation.navigate('RandomScore');
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Guitar Trainer'}}
        />
        <Stack.Screen
          name="RandomScore"
          component={RandomScore}
          options={{ title: 'Practice random scores'}}
        />
        <Stack.Screen
          name="Chords"
          component={Chords}
          options={{ title: 'Practice chords'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
