import React, { useState } from 'react';
import { 
  SafeAreaView,
  Text,
  Button,
  Image,
  View
} from 'react-native';
import { chordList } from '../static/img/';

const notes = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
]
const modes = [
  'Ionian', 
  'Dorian', 
  'Phrygian', 
  'Lydian', 
  'Mixolydian', 
  'Aeolian', 
  'Locrian'
]
const accidentals = ['#', 'b', '']
const qualities = ['maj', 'm', 'aug', 'dim']
const inversions = ['1st', '2nd']
const suspends = ['sus2', 'sus', 'sus6']
const degrees = 7
const accs = 3
const invs = 3

const chooseDegree = (callback) => {
}

const chooseChord = (inverted: boolean, suspended: boolean) => {
  const chord: string = notes[Math.floor(Math.random() * notes.length)];
  const quality: string = qualities[Math.floor(Math.random() * qualities.length)];
  const accidental: string = accidentals[Math.floor(Math.random() * accidentals.length)];
  let suspend: string = "";
  let inversion: string = "";

  if (inverted) {
    inversion = inversions[Math.floor(Math.random() * 2)] + " inversion";
  }

  return `${chord}${accidental}${quality} ${inversion}`
}


export const Chords = ({ navigation }) => {
  const [currentChord, setCurrentChord] = useState(0);

  const handleNextChord = () => {

  }

  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: 'black',
            fontSize: 24
          }}
        >
          {chordList[currentChord].name}
        </Text>
      </View>
        <Image
          source={chordList[currentChord].notes}
          style={{
            width: undefined,
            resizeMode: 'contain',
            height: 300,
          }}
        />
    </SafeAreaView>
  )
}