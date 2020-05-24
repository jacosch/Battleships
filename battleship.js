// ##############  Setup board #########################
var ships = [[2],[4],[3]];


function getRandom (roof) {
  return Math.floor(Math.random() * Math.floor(roof));
}

function matrix(i){
  for ( var x = 0; x < ships[0].length; x++){
    for (var y = 0; y < ships[1].length; y++){
      for (var z = 0; z < ships[2].length; z++){
        if (ships[0][x] === ships[1][y] || ships[0][x] === ships[2][z] || 
            ships[1][y] === ships[2][z]){
          return (i - 1);
        }
        // console.log(ships[0][x] + " " + ships[1][y] + " " + ships[2][z]  + " " + (ships[0][x] === ships[1][y] || ships[0][x] === ships[2][z] || 
        //     ships[1][y] === ships[2][z]));
      }
    }
  }
  return i;
}

// 0: (3) [2, "01", "11"]
// 1: (5) [4, "22", "32", "42", "52"]
// 2: (4) [3, "11", "21", "31"]


function shipLocation () {
  console.log(ships);
  var countme = 0;
  for (var i = 0; i < 3; i++) {
    countme++;
    var direction = getRandom(2);
    if (direction === 0) {
      var rowStart = getRandom(8 - ships[i][0]);
      var columnStart = getRandom(7);
      for (var j = 0; j < ships[i][0]; j++){
        ships[i][j+1] = String(rowStart + j) + String(columnStart);
      }   
    } else {
        var rowStart = getRandom(7);
        var columnStart = getRandom(8 - ships[i][0]);
        for (var j = 0; j < ships[i][0]; j++){
          ships[i][j+1] = String(rowStart) + String(columnStart + j);
        }
      }
    i = matrix(i);
    console.log("After the matrix: " + i);
    if (countme > 10) {
      console.log("I had to break!!! " + countme);
      break;
    }
    if (i === 2){
     for (var i = 0; i < 3; i++){
      ships[i].splice(0,1);
      }
    }
  }
}

shipLocation();

console.log(ships)

// ##############  Get information #########################

var enter = document.getElementById("fireButton");
var position;
var msg = document.getElementById("messageBox");
var countHit = 0;
var numberGuesses = 0;
var inputHistory = [];

function switchToDec(){
  switch(position[0]){
    case "A": 
      position = "0" + position[1];
      break;
    case "B": 
      position = "1" + position[1];
      break;
    case "C": 
      position = "2" + position[1];
      break;
    case "D": 
      position = "3" + position[1];
      break;
    case "E": 
      position = "4" + position[1];
      break;
    case "F": 
      position = "5" + position[1];
      break;
    case "G": 
      position = "6" + position[1];
      break;
    default: 
      break;
  }
}


function getInfo(event) {
  msg.innerText = "";
  position = document.getElementById("guessInput").value.toUpperCase();
  // msg.innerText = position;
  if (position.length !== 2 || position.toUpperCase().match(/^[A-G][0-6]$/) === null) {
    msg.innerText = "Please provide a correct input.";
  } else if (inputHistory.includes(position)) {
      msg.innerText = "You have already guessed this position.";
  } else{
    msg.innerText = ("Your input was: " + position);
    inputHistory.push(position);
    switchToDec();
    checkHit();
  }
  if (countHit === 9){
     msg.innerText = "You won!!";
     document.getElementById("messageBox2").innerText = ("\nNumber of guesses: " + numberGuesses +
                                                        "\nHit rate: " + (100*countHit/numberGuesses)+ "%");
  }
  document.getElementById("guessInput").value = "";
}

// ############## play the game  #########################

function checkHit(){
  var gotHit = false;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < ships[i].length; j++) {
      if (ships[i][j] === position){
        document.getElementById(position).classList.add('hit');
        gotHit = true;
        countHit++;
        numberGuesses++ ;
      }
    }
  }
  if (!gotHit){
    document.getElementById(position).classList.add('miss');
    document.getElementById(position).innerText = "Miss!";
    numberGuesses++;
  }
}

enter.addEventListener("click", getInfo);
document.addEventListener("keypress", function (event) {
  if (event.key ==="Enter") {
    window.event.preventDefault();
    getInfo();
   }
});

// ##############   #########################
// && position.charAt(0).toUpperCase().match(/\w/)