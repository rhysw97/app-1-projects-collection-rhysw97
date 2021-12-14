import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { cScale, cPentatonic, cPentatonicMap } from '../Samples';
import { random } from 'lodash';

//function for  circle whjich can have colour and sample list;
export default function Circle(props) {
  //this creates a sound state variable for the program that we can use to set the sound when it needs to be played using the setSound function
  const [sound, setSound] = React.useState();
  

  //creates a function that returns a promise as we want to load sound when user clicks
  async function playSound() {
  
    //creates a variable sound that waits until a sample is loaded in to initalised
    const { sound } = await Audio.Sound.createAsync(
      //selects a random sample from sample list passed to be played
       props.sampleList[random(props.sampleList.length-1)]
    );
    //sets the sound state varaible to equal the sample path passed in as a prop
    setSound(sound);
    //waits to playSound till promise is resolved
    await sound.playAsync(); }
  
  //uses effect hook to allow us to unload the sound
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  //won't return anything if display is set to false
  

  //returns what the component will render to the screen
  // in this case we want a touchable opacity that displays as a circle of the colour passed in as prop which when pressed calls the play sound function
  return (
  <View style={{width: "50%", height: props.height }}>
    <View style={styles.circle}>
      <TouchableOpacity style={{width: 100, height: 100, borderRadius: 200, backgroundColor: props.colour}} onPress={playSound}>
      </TouchableOpacity>
    </View>
  </View>
 
  );
}

const styles = StyleSheet.create({
 
  circle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
