import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import  Sound  from './Sound';
import { samples } from './Samples';
import Circle  from './Circle';
import Ripple from './Ripple'

export default function App() {
  
  return (
    <View style={styles.container}>
      <Text>{samples[0]}</Text>
      <Circle clr="#ffff77"></Circle>
      <Sound></Sound>
      <Ripple></Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
