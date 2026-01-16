//Interactive Album Sketch 2
//Anna Stewart
//01/12/25
//Sketch.js is an interactive album cover where users can click on different circles to play various drum sounds. The circles pulse to create a dynamic visual effect.
//Make sure to have the sound files and image in the project folder for this to work properly.You can find the sound files here: https://freesound.org/people/pjcohen/sounds/144413/, https://freesound.org/people/freakshitor669/sounds/318331/, https://freesound.org/people/mathan24/sounds/384680/, https://freesound.org/people/josefpres/sounds/679131/, https://freesound.org/people/johnthewizar/sounds/264800/, https://freesound.org/people/sassaby/sounds/511275/
//Image source "SLS_Artwork.png" by Anna Stewart with permission of use by Joe Sharples (Artist/Designer for SLS).

let MySound0;
let MySound1;
let MySound2;
let MySound3;
let MySound4;
let MySound5;
let circles = [];

// variables used for sin to make shape pulse 
let angle = 0;
let pulseSpeed = 0.05;
let pulseAmount = 5;

// Add this with your other global variables
let backgroundImg;

function preload() {
  soundFormats("WAV");
  MySound0 = loadSound("144413__pjcohen__phatlofidrumkitkickbass.wav");
  MySound1 = loadSound("318331__freakshitor669__snare-drums-oneshot-lord-lokus.wav");
  MySound2 = loadSound("384680__mathan24__drum-r-8.wav");
  MySound3 = loadSound("679131__josefpres__drum-kit-001-bass-drum-1.wav");
  MySound4 = loadSound("264800__johnthewizar__snare-3.wav");
  MySound5 = loadSound("511275__sassaby__alfaia-hit-combined.wav");
  // Add this line to load your image
  backgroundImg = loadImage('SLS_Artwork.png');
}

function setup() {
  createCanvas(400, 400);

  // Define circle properties and associated sounds
  circles = [
    { x: 122, y: 228, diameter: 22, r: 168, g: 142, b: 140, a: 200, sound: MySound0 },
    { x: 162, y: 245, diameter: 22, r: 181, g: 145, b: 126, a: 200, sound: MySound1 },
    { x: 188, y: 240, diameter: 22, r: 208, g: 142, b: 121, a: 200, sound: MySound2 },
    { x: 221, y: 231, diameter: 22, r: 182, g: 138, b: 136, a: 200, sound: MySound3 },
    { x: 321, y: 229, diameter: 16, r: 173, g: 165, b: 170, a: 150, sound: MySound4 },
    { x: 32, y: 246, diameter: 20, r: 147, g: 138, b: 151, a: 150, sound: MySound5 }

  ];
}



function draw() {
  // Replace background(220) with this
  image(backgroundImg, 0, 0, width, height);

  // Update the angle for the pulsing effect
  angle += pulseSpeed;

  for (let i = 0; i < circles.length; i++) {// Draw each circle using its properties
    noStroke();
    fill(circles[i].r, circles[i].g, circles[i].b, circles[i].a);

    // Calculate pulsating diameter using sin()
    let pulsatingDiameter = circles[i].diameter + sin(angle) * pulseAmount;

    circle(circles[i].x, circles[i].y, pulsatingDiameter);
  }
}

function mousePressed() {
  // ensure audio context is resumed on user gesture
  userStartAudio();

  for (let i = 0; i < circles.length; i++) { // Check if mouse is inside the circle
    let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
    if (d < circles[i].diameter / 2) {
      if (circles[i].sound && !circles[i].sound.isPlaying()) circles[i].sound.play();
    } else {
      if (circles[i].sound && circles[i].sound.isPlaying()) circles[i].sound.stop();
    }
  }
}