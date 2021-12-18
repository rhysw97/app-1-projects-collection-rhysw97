
const circles = {
  c1: [], 
  d1: [], 
  f1: [], 
  g1: [], 
  a1: [], 
  c2: []
};

const [display, setDisplay] = React.useState();



//function to show 
function showCircle(newValue) {
  for(const [key, value] of Object.entries(circles)) {
      const indexToShow = random(value.length=1)
     for(let i = 0; i < value.length; i++) {
      if(i !== indexToShow) {
          value[i].display = 'false'
      } else {
          value[i].display = 'true';
      }
     }
  }
}

let i = 0;
for(const [cPentkey, cPentValue] of Object.entries(cPentatonicMap)) {
  for (const [circleKey, circleValue] of Object.entries(circles)){

  
    cPentValue.forEach(sample => {
      //ads a sound
      circleValue.push(<Sound key={i} display='false' samples={cPentValue} colour={'#'+random(16777215).toString(16)} onclick={showCircle}></Sound>)
      i++;
    })
  }
}
for(const [key, value] of Object.entries(circles)) {
  value[random(value.length - 1)].display = 'true' 
}
