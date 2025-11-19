//-----------------------------------------Import Modules-----------------------------------------
import MIDIengine from "./midi.js";

//-----------------------------------------Function Definitions-----------------------------------------
const mtof = function (midiNum) {
  return 440 * 2 ** ((midiNum - 69) / 12);
};

//  * This function ignores octave information and returns only the
//  * pitch class by taking the MIDI number modulo 12.
//  */
const midiNum2NoteName = function (midiNum) {
  // List of the 12 pitch classes in order.
  // Index 0 corresponds to MIDI numbers that are multiples of 12 (C).
  const pitchClasses = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  // Use modulo 12 to wrap the MIDI number into the 0–11 range.
  // Example: 60 % 12 → 0 → "C"
  return pitchClasses[midiNum % 12];
};

//-----------------------------------------Game Code-----------------------------------------
var myGamePiece;
var myObstacles = [];
var myScore;
var myNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
//make this array connect to midi note values
//if midi.onNoteon = note in obstacle, continue, else stop game

function startGame() {
  myGamePiece = new component(30, 30, "purple", 150, 300);
  myGamePiece.gravity = 0.5;
  myScore = new component("30px", "Consolas", "orange", 777, 40, "text");
  myNotes = new component("30px", "Consolas", "white");
  myGameArea.start();
}

function randomIndex(min, max) {
  //let randomIndex = Math.floor(Math.random()); // * myNotes);
  min = Math.ceil(150);
  max = Math.floor(300);
  return Math.floor(Math.random() * (max - min + 1)) + min; //myNotes[randomIndex];
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = screen.width - 100;
    this.canvas.height = screen.height - 200;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.myNotes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  this.text = this.myNotes[Math.floor(Math.random() * this.myNotes.length)];
  //this.gravity = 0;
  //this.gravitySpeed = 0;
  this.update = function () {
    let ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.crashWith = function (otherobj) {
      var myleft = this.x;
      var myright = this.x + this.width;
      var mytop = this.y;
      var mybottom = this.y + this.height;
      var otherleft = otherobj.x;
      var otherright = otherobj.x + otherobj.width;
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + otherobj.height;
      var crash = true;
      if (
        mybottom < othertop ||
        mytop > otherbottom ||
        myright < otherleft ||
        myleft > otherright
      ) {
        crash = false;
      }
      return crash;
    };
  };
  this.newPos = function () {
    //this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY; //+ this.gravitySpeed;
    this.hitBottom();
  };
  this.hitBottom = function () {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      // this.gravitySpeed = 0;
    }
  };
}

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  // for (let i = 0; i < myObstacles.length; i += 1) {}

  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(randomIndex())) {
    x = myGameArea.canvas.width;
    var velocity = 5;
    const minWidth = 50;
    const maxWidth = 300;
    const randomWidth = Math.floor(
      Math.random() * (maxWidth - minWidth + 1) + minWidth
    );

    const minGap = myObstacles.width + "10px";
    const maxGap = 400;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(randomWidth + 10, 1400, "red", x, 0, gap));
    myObstacles.push(new component(randomWidth, 1400, "green", x, 0, gap));
    myObstacles.push(
      new component(randomWidth, "Consolas", "orange", x + 20, 250, "text", gap)
    );
  }
  for (let i = 0; i < myObstacles.length; i += 1) {
    //HOW TO MAKE THIS GRANDUALLY GET FASTER?????
    myObstacles[i].x += -1; //velocity

    // velocity *= 1.05;
    myObstacles[i].update();
  }
  // if (myGamePiece.crashWith(myObstacles)) {
  //   console.log("crash");
  // } else {
  //   console.log("no crash");
  //   // myGameArea.clear();
  //   // myObstacle.update();
  //   // myGamePiece.newPos();
  //   // myGamePiece.update();
  // }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
  myNotes.text = myNotes;
  myNotes.update();
}

function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

//need own function to accelerate?
// function accelerate() {
//  myObstacles[i].x =
// }

// if (myMidiNotes.onNoteOn[ch][pitch] touches "red" and != myObstacles.myNotes) {
//     return stopMove();
// else {
// }
//   }

document.body.onload = startGame;

//-----------------------------------------Create Web Audio Graph-----------------------------------------
const myAudContext = new AudioContext();

const fader = new GainNode(myAudContext);
fader.gain.value = 0.25;
fader.connect(myAudContext.destination);
myAudContext.resume();

//make a storage array for notes

//array with 16 elements 1 for each channel
const myMidiNotes = new Array(16);

for (let i = 0; i < myMidiNotes.length; i++) {
  //each element (ch) has an array of
  myMidiNotes[i] = new Array(128);
  console.log(i);
}
//myMidiNotes[channel][pitch]
myMidiNotes[4][60];

console.log(myMidiNotes[4][60], midiNum2NoteName());

//-----------------------------------------initialize our MIDI engine-----------------------------------------

const myMIDIstuff = new MIDIengine();

myMIDIstuff.onNoteOn = (pitch, velocity, ch) => {
  myMidiNotes[ch][pitch] = new OscillatorNode(myAudContext);
  myMidiNotes[ch][pitch].frequency.value = mtof(pitch);
  let now = myAudContext.currentTime;
  fader.gain.linearRampToValueAtTime(1, now + 0.25);
  myMidiNotes[ch][pitch].connect(fader);
  myMidiNotes[ch][pitch].start();
  console.log("Note On:", pitch, velocity, ch, midiNum2NoteName(pitch));

  if (myMIDIstuff.onNoteOn.pitch == midiNum2NoteName(60)) {
    myReaction.text = "Nice!";
  } else {
    myReaction.text = "YUCK!";
  }

  if (
    midiNum2NoteName(pitch) == myObstacles.myNotes &&
    (myMIDIstuff.onNoteOn == true) == true
  ) {
    console.log("correct note played, continue game");
  } else {
    stopMove();
  }
};

myMIDIstuff.onNoteOff = (pitch, velocity, ch) => {
  myMidiNotes[ch][pitch].frequency.value = mtof(pitch);
  // let now = myAudContext.currentTime;
  // fader.gain.linearRampToValueAtTime(0, now + 2);
  myMidiNotes[ch][pitch].connect(fader);
  myMidiNotes[ch][pitch].stop();
  console.log("Note Off:", pitch, velocity, ch);
};

//-----------------------------------------Game Connection to MIDI-----------------------------------------
// if myMidiNotes[ch][pitch] != null, move game piece to pitch
// myMIDIstuff.onNoteOn = (pitch, velocity, ch) => {
//   myMidiNotes[ch][pitch] = new OscillatorNode(myAudContext);
//   myMidiNotes[ch][pitch].frequency.value = mtof(pitch);
//   let now = myAudContext.currentTime;
//   fader.gain.linearRampToValueAtTime(1, now + 0.25);
//   myMidiNotes[ch][pitch].connect(fader);
//   myMidiNotes[ch][pitch].start();
//   console.log("Note On:", pitch, velocity, ch);
//   midiMoves(600 - pitch * 5); //map midi pitch to y position
// }

//FYI I MADE UP noteText and gamePieceInGreen, you need to replace with those values
if (midiNum2NoteName(pitch) == myObstacles.text && myGamePiece == true) {
  //then do stuff
} else {
  stopMove();
}

//-----------------------------------------MIDI Sound-----------------------------------------

// //Step 1 new audio context
// const myAudio = new AudioContext();

// //Step 2 gain node
// const masterGain = new GainNode(myAudio);
// masterGain.gain.value = 0.5;

// //Step 3 connect gain node to destination
// masterGain.connect(myAudio.destination);

// //Step 4
// const synthSound = function () {
//   let osc = new OscillatorNode(myAudio);

//   let adsr = new GainNode(myAudio);
//   adsr.gain.value = 0;

//   osc.connect(adsr);
//   adsr.connect(masterGain);

//   osc.frequency.value = mtof(pitch);

//   osc.start();

//   let now = myAudio.currentTime;

//   adsr.gain.linearRampToValueAtTime(1, now + 0.25);
//   adsr.gain.linearRampToValueAtTime(0, now + 3);
// };

//-----------------------------------------add event listeners-----------------------------------------

let ResumeButton = document.querySelector("#ResumeButton");
ResumeButton.onclick = function () {
  myAudio.resume().then(() => {
    console.log("Playback resumed successfully");
  });
};

// let UpButton = document.querySelector("#UpButton");
// UpButton.onclick = moveUp;
// UpButton.onmouseup = stopMove;

// let DownButton = document.querySelector("#DownButton");
// DownButton.onclick = moveDown;
// DownButton.onmouseup = stopMove;

// let LeftButton = document.querySelector("#LeftButton");
// LeftButton.onclick = moveLeft;
// LeftButton.onmouseup = stopMove;

// let RightButton = document.querySelector("#RightButton");
// RightButton.onclick = moveRight;
// RightButton.onmouseup = stopMove;
