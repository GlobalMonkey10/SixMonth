let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let currentPlayer = "X"; // Human is X
let cellSize = 200;
let gameOver = false;
let rockImg, paperImg;

function preload() {
  rockImg = loadImage("TTT/images/shermaine.jpg");   // X
  paperImg = loadImage("TTT/images/jeff.jpg"); // O
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
}

function draw() {
  background('#e4eef2');
  drawGrid();
  drawSymbols();

  let winner = checkWinner();
  if (winner && !gameOver) {
    gameOver = true;
    noLoop();
    setTimeout(() => {
      alert(winner === "Tie" ? "It's a tie!" : `${winner} wins!`);
    }, 100);
  }
}

function drawGrid() {
  strokeWeight(4);
  for (let i = 1; i < 3; i++) {
    line(i * cellSize, 0, i * cellSize, height);
    line(0, i * cellSize, width, i * cellSize);
  }
}

function drawSymbols() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = j * cellSize + cellSize / 2;
      let y = i * cellSize + cellSize / 2;
      if (board[i][j] === "X") {
        image(rockImg, x, y, 120, 120);
      } else if (board[i][j] === "O") {
        image(paperImg, x, y, 120, 120);
      }
    }
  }
}

function mousePressed() {
  if (gameOver || currentPlayer !== "X") return;

  let row = floor(mouseY / cellSize);
  let col = floor(mouseX / cellSize);

  if (row < 3 && col < 3 && board[row][col] === "") {
    board[row][col] = "X";
    currentPlayer = "O";

    // Let bot make a move after short delay
    setTimeout(botMove, 300);
  }
}

function botMove() {
  if (gameOver) return;

  let available = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        available.push({ i, j });
      }
    }
  }

  if (available.length > 0) {
    let move = random(available);
    board[move.i][move.j] = "O";
    currentPlayer = "X";
  }
}

function checkWinner() {
  let lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ];

  for (let line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }

  let openSpots = 0;
  for (let row of board) {
    for (let cell of row) {
      if (cell === "") openSpots++;
    }
  }

  if (openSpots === 0) return "Tie";
  return null;
}
