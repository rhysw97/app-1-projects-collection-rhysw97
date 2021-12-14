
import React, {useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native'
import  Sound  from './Components/Sound'
import { cScale, cPentatonic} from './Samples'; //2 arrays with samples and 1 map containg samples for each key in pentatonic scale
import { forEach, intersection, random, sample } from "lodash"
import { setIsEnabledAsync } from 'expo-av/build/Audio';

export default function App() {
  

  function createNoteCircles(sampleArray) {
    const arrayOfCircles = []
    for(let i = 0; i < sampleArray.length; i++) {
      arrayOfCircles.push(<Sound height={sampleArray.length} sampleList={sampleArray[i]} colour={'#'+random(16777215).toString(16)}></Sound>)
    }
    return arrayOfCircles
  }
  
  function createRandomCircles(sampleArray, numOfCircles) {
    const allSamples = []
    sampleArray.forEach(samples => {
      samples.forEach(sample => {
        allSamples.push(sample)
      })
    })
    const randomCircles = []
    for(let i = 0; i < numOfCircles; i++) {
      randomCircles.push(<Sound key={i} sampleList={allSamples} colour={'#'+random(16777215).toString(16)}></Sound>)
    }
    return randomCircles
  }
  
const [circleArray, setCircleArray] = useState(createNoteCircles(cPentatonic));

function updateState() {
  let circles = [];

  //this is a little strange but the on and off seem to work the wrong way round but I can't figure out why so I have switched them in the if block and it seems to work fine
  if(isRandom === 'On' && scale === 'C Major Pentatonic Scale') {
    circles = createNoteCircles(cPentatonic);
  } else if (isRandom === 'On' && scale === 'C Major Scale') {
    circles = createNoteCircles(cScale);
  } else  if(isRandom === 'Off' && scale === 'C Major Pentatonic Scale') {
    circles = createRandomCircles(cPentatonic, 6);
  } else if (isRandom === 'Off' && scale === 'C Major Scale') {
    circles = createRandomCircles(cScale, 8);
  }
  return circles
}
  
  
  const [settingsVisible, setSettingsVisibility] = useState(false)
  const [infoVisible, setInfoVisibility] = useState(false)

  const [scale, setScale] = useState('C Major Pentatonic Scale')
  const [isRandom, setIsRandom] = useState('Off')
  
  
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.buttonsContainer}>
        <TouchableOpacity
        style={styles.infoButton}
        onPress={() => {setInfoVisibility(true)}} 
        >
          <Text>i</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => { setSettingsVisibility(true)}} 
        >
          <Text style={{color: "white"}}>Settings</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.circleContainer}>
      {circleArray}
      </View>
      <Modal style={styles.info} visible={infoVisible} animationType="slide" transparent={false}>
        <SafeAreaView>
          <Text>Melody Creator</Text>
          <Text>This App Was Created by Rhys White</Text>
          <Text>
            To use this app tap the circle to play a sample. If you tap the i button then this information screen will popup.
            Also if you press the menu icon you can change the scale between c major and cmajor pentatonic, whether the notes 
            will play randomly or the circle will play the same note and how many notes there are (this setting is for random only) 
          </Text>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => { setInfoVisibility(false)}}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      

      <Modal style={styles.info} visible={settingsVisible} animationType="slide" transparent={false}>
        <SafeAreaView>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if(scale === 'C Major Pentatonic Scale') {
                setScale('C Major Scale')
              } else {
                setScale('C Major Pentatonic Scale')
              }
              setCircleArray(updateState());

            }}
          >
            <Text>{scale}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button} 
            onPress={() => {
              if (isRandom === 'On') {
                setIsRandom('Off')
          
              } else {
                setIsRandom('On')
              }
              setCircleArray(updateState());
            }}
          >
            <Text>Random: {isRandom}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button} 
            onPress={() => { setSettingsVisibility(false)}}
          >
            <Text>Apply</Text>
          </TouchableOpacity>
          
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  circleContainer: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7777ffee",
  },

  button: {
    borderWidth: 1,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
    borderColor: "#ffffff",
    alignSelf: "flex-end",
    margin: 50,
  },
  buttonsContainer: {
    flex: 1,
    
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  infoButton: {
    borderWidth: 1,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
    borderColor: "#ffffff",
    alignSelf: "flex-end",
    margin: 50,
  },
  

});
