let moleImages = [];
let currentMoleImg;
let moleX, moleY;
let moleSize = 100;
let score = 0;
let moleVisible = false;
let gameTimer = 15;
let lastSpawnTime = 0;

let hammerImg; // 🔨 hammer image

function preload() {
  moleImages[0] = loadImage("Whack/images/V1.jpg");
  moleImages[1] = loadImage("Whack/images/V2.jpg");
  hammerImg = loadImage("Whack/images/hammer.png"); // your hammer image
}

function setup() {
  createCanvas(800, 600);
  noCursor(); // 👈 hide system cursor
  textAlign(CENTER, CENTER);
  textSize(24);
  frameRate(60);
  spawnMole();
  setInterval(() => {
    if (gameTimer > 0) gameTimer--;
  }, 1000);
}

function draw() {
  background('#e4eef2');
  fill(0);

   fill(0);
  textSize(24);

  // 👇 Text above the score (e.g. a title)
  text("🔨 Whack-a-Mole", width / 2, 20); // y = 10 (top of screen)
  
  text(`Score: ${score}`, width / 2, 60);
  text(`Time Left: ${gameTimer}s`, width / 2, 90);

  // Draw mole
  if (moleVisible && gameTimer > 0 && currentMoleImg) {
    imageMode(CENTER);
    image(currentMoleImg, moleX, moleY, moleSize, moleSize);
  }

  // Game over
  if (gameTimer <= 0) {
    fill(255, 0, 0);
    textSize(36);
    text("⏰ TIME'S UP!", width / 2, height / 2 - 40);
    textSize(28);
    text(`Final Score: ${score}`, width / 2, height / 2);
    noLoop();
  }

  // Spawn every 0.5s
  if (millis() - lastSpawnTime > 500 && gameTimer > 0) {
    spawnMole();
  }

  // 🔨 Draw hammer cursor
  if (hammerImg) {
    imageMode(CENTER);
    image(hammerImg, mouseX, mouseY, 80, 80); // resize as needed
  }
}

function mousePressed() {
  if (moleVisible && dist(mouseX, mouseY, moleX, moleY) < moleSize / 2) {
    score++;
    moleVisible = false;
  }
}

function spawnMole() {
  moleX = random(100, width - 100);
  moleY = random(100, height - 100);
  currentMoleImg = random(moleImages);
  moleVisible = true;
  lastSpawnTime = millis();
}
