
import React, {useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native'
import  Circle  from './Components/Sound'
import { cScale, cPentatonic} from './Samples'; //2 arrays with samples and 1 map containg samples for each key in pentatonic scale
import { forEach, intersection, random } from "lodash"


export default function App() {
   //state variables to allow us to change the sate of the app
   const [settingsVisible, setSettingsVisibility] = useState(false)
   const [infoVisible, setInfoVisibility] = useState(false)
   const [ isRandom, setIsRandom ] = useState(false)
   const [circleArray, setCircleArray] = useState(createNoteCircles(cPentatonic))
   const [scale, setScale] = useState('C Major Pentatonic Scale')
   const [ randomBtnTxt, setRandomBtnTxt ] = useState('Off')

  //local function that takes in a 2dArray of samples
  function createNoteCircles(sample2DArray) {
    const arrayOfCircles = [] //declare array to store Circle Components
    //for each index in sample2DArray.length push a new Circle component to the array
    for(let i = 0; i < sample2DArray.length; i++) {
      let sampleArrayLength = 0;
      sampleArrayLength += sample2DArray[i].length;
      console.log(sampleArrayLength);
      arrayOfCircles.push(<Circle key={i} height={ 100 / sample2DArray.length + "%"} sampleList={sample2DArray[i]} colour={'#'+random(16777215).toString(16)}></Circle>)
    }
    return arrayOfCircles
  }
  
  //array to create circles that will play a random note in the scale when pressed
  function createRandomCircles(sample2DArray, numOfCircles) {
    const allSamples = [] //create array to store all samples 
    //loops through each array of samples in sample2DArray
    sample2DArray.forEach(samples => { 
        //loops through each sample in the array of samples
        samples.forEach(sample => {
          //pushes the current sample being accessed to the allSamples Array
          allSamples.push(sample);
        })
      })

      console.log(allSamples.length)
    //creates an array to hold the circles  
    const randomCircles = [];
    //loops as many times as the second argument passed in
    for(let i = 0; i < numOfCircles; i++) {
      //each time loop runs a Circle is added with an array of all the samples in the 2DArray passed in as a value for the sampleList Prop
      
      randomCircles.push(<Circle key={i} height={100 / numOfCircles + "%"}  sampleList={allSamples} colour={'#'+random(16777215).toString(16)}></Circle>)
    }

    return randomCircles //returns the randomCircles array
  }
  

  //function to update the programs state by returning array 
  function updateState() {
    

    //Note there seems to be some sort of strange problem with my app where when the buttons on settings page are tapped things aren't updated properly

    //if isRandom is set to true and scale is C Major then the return of createNoteCirlces function with cscale passed in is returned
    
    if(isRandom === true && scale === 'C Major Scale') {
      return createNoteCircles(cScale); //this function will create an array of Circles on for each note in the C Major scale
      //if isRandom is set to true and scale is C Major then the return of createNoteCirlces function with cscale passed in is returned
    } else if (isRandom === true && scale === 'C Major Pentatonic Scale') {
      return createNoteCircles(cPentatonic); //this function will create an array of Circles on for each note in the C Major Pentatonic scale
    } else  if(isRandom === false && scale === 'C Major Scale') {
      
      return createRandomCircles(cScale, 8);//This function will return an array of 8 circles each of which will play a random note in the C Major Scale
    } else if (isRandom === false && scale === 'C Major Pentatonic Scale') {
      return createRandomCircles(cPentatonic, 6); //This function will return an array of 6 circles each of which will play a random note in the C Major Pentatonic Scale;
    }

    //
    if(isRandom === false ) {
      setRandomBtnTxt('Off')
    } else {
      setRandomBtnTxt('On')
    }
  }
  
 /*
 Note: Strangely This is how I would have imagined the function to look with if IsRandom is equal to Off then createNoteCircles is called and returned otherwise if isRandom is 'On'
 then createRandomCircles would be called. This doesn't seem to work for some reason and will only work if when isRandom is set to On createNoteCircles is called and if  
 */

 /*
  if(isRandom === false && scale === 'C Major Scale') {
    return createNoteCircles(cscale); //this function will create an array of Circles on for each note in the C Major scale
    //if isRandom is set to off and scale is C Major then the return of createNoteCirlces function with cscale passed in is returned
  } else if (isRandom === false && scale === 'C Major Pentatonic Scale') {
    return createNoteCircles(cPentatonic); //this function will create an array of Circles on for each note in the C Major Pentatonic scale
  } else  if(isRandom === true && scale === 'C Major Scale') {
    
    return createRandomCircles(cScale, 8);//This function will return an array of 8 circles each of which will play a random note in the C Major Scale
  } else if (isRandom === true && scale === 'C Major Pentatonic Scale') {
    return createRandomCircles(cPentatonic, 6); //This function will return an array of 6 circles each of which will play a random note in the C Major Pentatonic Scale;
  }
}
*/ 

 

  
  
  
  
  
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.buttonsContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => {setInfoVisibility(true)}} 
        >
          <Text>i</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => { 
            setSettingsVisibility(true)
          }}
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
      

      <Modal style={styles.settings} visible={settingsVisible} animationType="slide" transparent={false}>
        
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //if 
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
            onPress={ 
              () => {
                
                //if random button is pressed and isRandom is set to On
                if (isRandom === false) {
                  //then isRandom is set to Off
                setIsRandom(true)
                setRandomBtnTxt("On")
                //otherwise isRandom is set to On
                } else {
                  setIsRandom(false)
                  setRandomBtnTxt("Off")
                }
                setCircleArray(updateState());
               
              }
            }
          >
            <Text>Random: {randomBtnTxt}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button} 
            onPress={() => {
              //when apply button is tapped then the settingsVisibilty variable is set to false which closes the modal
              setSettingsVisibility(false)
            }}
          >
            <Text>Apply</Text>
          </TouchableOpacity>
          
        
      </Modal>

    </SafeAreaView>
  );
}
//stylesheet so I can style components
const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  circleContainer: {
    flex: 6,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7777ffee",
  },

  settingsView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#7777ffee",
  },

  settings: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    
  },

  button: {
    borderWidth: 1,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
    borderColor: "#7777ffee",
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
