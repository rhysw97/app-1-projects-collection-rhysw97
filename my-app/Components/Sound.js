import React, {useEffect} from 'react';
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import { Audio } from 'expo-av';
import { random } from 'lodash';
import { Dimensions } from 'react-native';

//allows me to get the windows dimensions so I can create responsive circles by multipling by 0.25 and using this to set the circles height and width
const window = Dimensions.get('window').width * 0.25;

//function for  circle which can have colour and sample list;
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
  <View style={{width: "50%", height: props.height, marginTop: "5%" }}>
    <View style={styles.circleContainer}>
      <TouchableOpacity style={{width: window, height: window, borderRadius: 200, backgroundColor: props.colour}} onPress={playSound}>
      </TouchableOpacity>
    </View>
  </View>
 
  );
}

const styles = StyleSheet.create({
 
  circleContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
