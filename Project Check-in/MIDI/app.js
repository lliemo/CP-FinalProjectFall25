//-----------------------------------------Import Modules-----------------------------------------
import MIDIengine from "./midi.js";

//-----------------------------------------Function Definitions-----------------------------------------
const mtof = function (midiNum) {
  return 440 * 2 ** ((midiNum - 69) / 12);
};

//-----------------------------------------Game Code-----------------------------------------
var myGamePiece;
var myObstacles = [];
var myScore;
var myNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

function startGame() {
  myGamePiece = new component(30, 30, "purple", 10, 300);
  myGamePiece.gravity = 0.5;
  myScore = new component("30px", "Consolas", "orange", 777, 40, "text");
  myNotes = new component("30px", "Consolas", "white");
  myGameArea.start();
}

function randomNote() {
  let randomIndex = Math.floor(Math.random() * myNotes.length);
  return myNotes[randomIndex];
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

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (let i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 50;
    maxGap = 400;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(
      new component(
        30,
        1400,
        "green",
        x,
        0,
        (myNotes[randomNote()], 30, 50, "white")
      )
    );
  }
  for (let i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
  myNotes.text = myNotes;
  myNotes.update();
}
function component(width, height, color, x, y, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 1;
  this.speedY = 0;
  this.x = x;
  this.y = y;
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
}
function moveUp() {
  myGamePiece.speedY = -1;
}

function moveDown() {
  myGamePiece.speedY = +1;
}

function moveLeft() {
  myGamePiece.speedX -= 1;
}

function moveRight() {
  myGamePiece.speedX += 1;
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

// function accelerate(n) {
//  myGamePiece.gravity = n;
// }

function midiMoves(n) {
  myGamePiece.y = n;
}

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

console.log(myMidiNotes[4][60]);

//-----------------------------------------initialize our MIDI engine-----------------------------------------

const myMIDIstuff = new MIDIengine();

myMIDIstuff.onNoteOn = (pitch, velocity, ch) => {
  myMidiNotes[ch][pitch] = new OscillatorNode(myAudContext);
  myMidiNotes[ch][pitch].frequency.value = mtof(pitch);
  myMidiNotes[ch][pitch].connect(fader);
  myMidiNotes[ch][pitch].start();
  console.log("Note On:", pitch, velocity, ch);
};

myMIDIstuff.onNoteOff = (pitch, velocity, ch) => {
  myMidiNotes[ch][pitch].frequency.value = mtof(pitch);
  myMidiNotes[ch][pitch].connect(fader);
  myMidiNotes[ch][pitch].stop();
  console.log("Note Off:", pitch, velocity, ch);
};

document.body.onload = startGame;

//-----------------------------------------add event listeners-----------------------------------------

let UpButton = document.querySelector("#UpButton");
UpButton.onclick = moveUp;
UpButton.onmouseup = stopMove;

let DownButton = document.querySelector("#DownButton");
DownButton.onclick = moveDown;
DownButton.onmouseup = stopMove;

let LeftButton = document.querySelector("#LeftButton");
LeftButton.onclick = moveLeft;
LeftButton.onmouseup = stopMove;

let RightButton = document.querySelector("#RightButton");
RightButton.onclick = moveRight;
RightButton.onmouseup = stopMove;

//-----------------------------------------connect MIDI to movement-----------------------------------------
