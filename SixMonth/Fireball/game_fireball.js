let noBalloons = 20;
let balloons = [];
let hit = 0;
let missed = 0;
let score = 0;
let gameOver = false;

let targetImageName = "grandma.png"; // The image to click to score
let balloonImages = [];
let fireballImg;
let imageNames = [
  "king.png", "minion.png", "pekka.png", "prince.png",
  "grandma.png", "grandma.png", "grandma.png", "grandma.png",
];

function preload() {
  fireballImg = loadImage("Fireball/images/fireball.png");
  for (let name of imageNames) {
    balloonImages[name] = loadImage("Fireball/images/" + name);
  }
}

function setup() {
  createCanvas(800, 600);
  enter();
}

function enter() {
  balloons = [];
  hit = 0;
  missed = 0;
  score = 0;
  gameOver = false;

  for (let i = 0; i < noBalloons; i++) {
    let imgName = random(imageNames);
    let balloon = {
      x: random(50, width - 50),
      y: random(-height * (noBalloons / 10), 0),
      r: 30,
      imgName: imgName,
      img: balloonImages[imgName],
      speed: random(1, 1.5),
      hit: false,
      missed: false
    };
    balloons.push(balloon);
  }
}

function draw() {
  background("#cbe6ff");

  if (gameOver) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text("Game Over! Score: " + score, width / 2, height / 2);
    return;
  }

  updateBalloons();
  drawBalloons();
  displayStats();
  checkFinish();
}

function drawBalloons() {
  for (let b of balloons) {
    if (b.r > 0 && !b.hit) {
      imageMode(CENTER);
      image(b.img, b.x, b.y, b.r * 2, b.r * 2);
    }
  }
}

function updateBalloons() {
  for (let b of balloons) {
    b.y += b.speed;

    if (!b.missed && !b.hit && b.y >= height) {
      b.missed = true;
      missed++;
    }
  }
}

function mousePressed() {
  if (gameOver) return;

  let clickedAny = false;

  for (let b of balloons) {
    if (!b.hit && dist(mouseX, mouseY, b.x, b.y) < b.r) {
      clickedAny = true;
      b.hit = true;

      if (b.imgName === targetImageName) {
        hit++;
        score += 10;
      } else {
        score = 0;
        gameOver = true;
      }
      break;
    }
  }

  if (!clickedAny) {
    score = 0;
    gameOver = true;
  }
}

function checkFinish() {
  if (hit >= noBalloons / 2 || missed >= noBalloons / 2) {
    gameOver = true;
  }
}

function displayStats() {
  textSize(16);
  textAlign(LEFT, TOP);
  fill(0);
  text("Score: " + score, 10, 10);
  text("Hit: " + hit, 10, 30);
  image(fireballImg, width - 770, 70, 32, 32);
  text("< < THIS IS YOU", 55, 65)
  text("HIT WHAT U THINK IS RIGHT", 10, 100);
}