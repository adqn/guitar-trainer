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
import { AudioPanel } from './Components/AudioPanel';

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

const Screen1 = ({ navigation }) => { 
  const [counter, setCounter] = useState<number>(0);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>
          {counter}
        </Text>
        <Button onPress={() => setCounter(counter + 1)} title="increment" />
        <Button 
          title="Go to screen 2"
          onPress={() => {
            navigation.navigate('Screen2')
          }}
        />
        <AudioPanel />
      </View>
    </SafeAreaView>
  )
}

const Screen2 = ({ navigation }) => 
  <SafeAreaView>
    <Text>
      This is screen 2
    </Text>
      <Button 
        title="Go to screen 1"
        onPress={() => {
          navigation.navigate('Screen1')
        }}
      />
  </SafeAreaView>

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ title: 'Screen 1'}}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ title: 'Screen 2'}}
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
