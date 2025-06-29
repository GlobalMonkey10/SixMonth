let userChoice = null;
let botChoice = null;
let resultText = "";
let compliments = ["U Got lucky", "Pretty amazing or Pretty shermaine muahahah", "HAPPY 6 months", "Still cant place a fireball tho"];

let LoseImage = "shermainetounge.png"; 
let imageNames = [
  "paper.PNG", "rock.PNG", "scissor.PNG",
];
let randomImage = []

function preload() {
  LoseImage = loadImage("RPS/images/shermainetounge.png");
  for (let name of imageNames) {
    randomImage[name] = loadImage("RPS/images/" + name);
  }
}

function setup() {
  createCanvas(800, 600);
  enter();
}

function enter() {
  userChoice = null;
  botChoice = null;
  resultText = "";
  gameOver = false;
}

function mousePressed(){
    if (gameOver) return;

    //check if user clicked on image
    for (let i=0; i<imageNames.length; i++){
        let x = 50 + i * 150
        let y = height / 2 - 50;
        if (
            mouseX > x &&
            mouseX < x + 100 &&
            mouseY > y &&
            mouseY < y + 100
        ) {
            userChoice = imageNames[i];
            botChoice = random(imageNames);
            evaluateResult(userChoice, botChoice);
        }
    }
}

function evaluateResult(user,bot){
    if (user===bot) {
        resultText = "Draw, go again";
        return;
    }

    const winMap = {
        "rock.PNG": "scissor.PNG",
        "paper.PNG": "rock.PNG",
        "scissor.PNG": "paper.PNG"
    };

    if (winMap[user] === bot) {
        resultText = random(compliments);
    } else {
        resultText = "LOL GET BETTER KID";
        gameOver = true;
    }
}

function draw() {
    background('#e4eef2');
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text("Choose Rock, Paper, or Scissors", width / 2, 50);
  text("(refresh after losing)", width / 2, 80);


  // Draw user choices
  for (let i = 0; i < imageNames.length; i++) {
    let x = 50 + i * 150;
    let y = height / 2 - 50;
    image(randomImage[imageNames[i]], x, y, 100, 100);
  }

  // Draw bot choice
  if (botChoice) {
    text("Bot chose:", width - 200, height / 2 - 70);
    image(randomImage[botChoice], width - 250, height / 2 - 20, 100, 100);
  }

  // Show result
  text(resultText, width / 2, height - 75);

  // If lost, show lose image
  if (gameOver) {
    image(LoseImage, width / 2 - 195, 95, 400, 400);
  }
}
