
import React, {useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from 'react-native'
import  Circle  from './Components/Sound'
import { cScale, cPentatonic} from './Samples'; //2 arrays with samples and 1 map containg samples for each key in pentatonic scale
import { random } from "lodash"

//Please let it be known that I hate expo as it constantly crashes and won't always reload causing me to have to stop the server and restart which has slowed down my work flow.
//I have also had to uninstall expo mulitple times on my PC's as sometimes it will not be able to find the expo install. I have however found it is slightly more reliable when using
//yarn to install. Also for some reason I seem to be unable to update expo so I am stuck using an outdated version even when trying both npm and yarn to update using
// (yarn global add / npm install -g) expo-cli

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

      
    //creates an array to hold the circles  
    const randomCircles = [];
    //loops as many times as the second argument passed in
    for(let i = 0; i < numOfCircles; i++) {
      //each time loop runs a Circle is added with an array of all the samples in the 2DArray passed in as a value for the sampleList Prop
      const circleHeight = 100 / numOfCircles

      let circleColour = '#'+random(16777215).toString(16);
      while(circleColour === '#000000') {
        circleColour = '#'+random(16777215).toString(16);
      }
      randomCircles.push(<Circle key={i} height={circleHeight.toString() + "%"}  sampleList={allSamples} colour={circleColour}></Circle>)
    }

    return randomCircles //returns the randomCircles array
  }
  

  //function to update the programs state by returning array 
  function updateState() {
    

    //Note there seems to be some sort of strange problem with my app where when the buttons on settings page are tapped things aren't updated properly

    //if isRandom is set to false and scale is C Major then the return of createNoteCirlces function with cscale passed in is returned
    
    if(isRandom === false && scale === 'C Major Scale') {
      return createNoteCircles(cScale); //this function will create an array of Circles on for each note in the C Major scale
      
    } 
    //if isRandom is set to false and scale is C Major Pentatonic then the return of createNoteCirlces function with cPentatonic passed in is returned
    else if (isRandom === false && scale === 'C Major Pentatonic Scale') {
      return createNoteCircles(cPentatonic); //this function will create an array of Circles on for each note in the C Major Pentatonic scale
    } 

    //if isRandom is set to true and scale is C Major then the return of createRandomCirlces function with cscale passed in and 8 to represent the amount of
    //circles we want to create is returned
    else  if(isRandom === true && scale === 'C Major Scale') {
      return createRandomCircles(cScale, 8);//This function will return an array of 8 circles each of which will play a random note in the C Major Scale
    }

      //otherwise if isRandom is set to true and scale is C Major Pentatonic then create random circles is called with cPentatonic and 6 as the arguments
      //the returned array of circles from this function is then returned
    else if (isRandom === true && scale === 'C Major Pentatonic Scale') {
      return createRandomCircles(cPentatonic, 6); //This function will return an array of 6 circles each of which will play a random note in the C Major Pentatonic Scale;
    }
   
 
  }
  
  //return statement to allow us to write JSX so components can be rendered on screen
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.buttonsContainer}>
        <TouchableOpacity
        style={styles.mainViewButton}
        //if this button is pressed then setInfoVisibility is set to true so that the info modal will display
        onPress={() => {setInfoVisibility(true)}} 
        >
          <Text style={styles.title}>Info</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mainViewButton}
          onPress={() => { 
            //if this is tapped then settingsVisibility is set to true which will display the settings modal
            setSettingsVisibility(true)
          }}
        >
          
          <Text style={styles.title}>Settings</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.circleContainer}>
      {circleArray}
      </View>
      <Modal style={styles.info} visible={infoVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={{flex: 1, justifyContent: "space-between", alignItems: "center"}}>
          <Text style={styles.title}>Melody Creator</Text>
          <Text style={{textAlign: "center", margin: "5%"}}>This App Was Created by Rhys White</Text>
          <Text style={{margin: "5%", fontSize: 25}}>
            To use this app tap the circle to play a sample. If you tap the info button then this information screen will popup.
            Also if you press the menu icon you can change the scale between c major and cmajor pentatonic and whether the circles 
            will play random notes or the same note
          </Text>

          <TouchableOpacity 
            style={styles.button}
            //when close button is tapped infoVisibility is set to false so that 
            onPress={() => { setInfoVisibility(false)}}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      

      <Modal style={styles.settings} visible={settingsVisible} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.settingsView}>
            <Text style={styles.title} >Settings</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                //if 
                if(scale === 'C Major Pentatonic Scale') {
                  setScale('C Major Scale')
                } else {
                  setScale('C Major Pentatonic Scale')
                }
                
              }}
            >
              <Text>Scale: {scale}</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.button} 
              onPress={ 
                () => {
                  
                  //if random button is pressed and isRandom is set to false when this button is tapped
                  if (isRandom === false) {
                    //then isRandom is set to true
                  setIsRandom(true)
                  //randomBtnText is set to On
                  setRandomBtnTxt("On")
                  //otherwise isRandom is set to false and buttons text is set to off if this is tapped and isRandom is not false
                  } else {
                    setIsRandom(false)
                    setRandomBtnTxt("Off")
                  }
                
                
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
                //when apply is tapped then the circle array is set to the return of the update state function
                setCircleArray(updateState());

              }}
            >
              <Text>Apply</Text>
            </TouchableOpacity>
          
          </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

//stylesheet so I can style components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  title:{
    marginTop: "5%",
    textAlign: 'center',
    fontSize: 30,
  },

  circleContainer: {
    width: "100%",
    height: "80%",
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
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: "#f8f8f8",
  },

  settings: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    
  },

  mainViewButton: {
    borderWidth: 1,
    width: "30%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
    borderColor: "#ffffff",
    backgroundColor: "#7777ffee",
    margin: 50,
  },

  button: {
    borderWidth: 1,
    width: "60%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: "#000000",
    backgroundColor: "#7777ffee",
    marginTop: "20%",
  },
  buttonsContainer: {
    flex: 1,
    
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  infoButton: {
    borderWidth: 1,
    width: "30%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
    color: "#ffffff",
    borderColor: "#ffffff",
    alignSelf: "flex-end",
    margin: 50,
  },
});
