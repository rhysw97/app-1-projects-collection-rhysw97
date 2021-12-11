import React from 'react';
import { View } from 'react-native';

export default function Circle(props){
  return (
    <View style={{width: 50, height: 50, borderRadius: 200, backgroundColor: props.clr}}></View>
  );
}


