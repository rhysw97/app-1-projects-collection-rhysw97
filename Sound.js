import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import { samples } from './Samples';

export default function Sound(props) {
  const [sound, setSound] = React.useState();
   //creates promise to require a sound file
  async function playSound() {

    //lets me know sound is being loaded
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./c-scale/A1_Low.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
