let puzzleImg;
let pieces = [];
let cols = 5;
let rows = 5;
let pieceWidth, pieceHeight;

function preload(){
    puzzleImg = loadImage('Puzzle/images/puzzleimg.jpg');
}

function setup(){
    createCanvas(600,800);
    pieceWidth = puzzleImg.width / cols;
    pieceHeight = puzzleImg.height / rows;

    for (let y=0; y<rows; y++){
        for (let x=0; x<cols; x++){
            let img = puzzleImg.get(x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight);
            pieces.push({
                img: img,
                correctX: x * pieceWidth,
                correctY: y*pieceHeight,
                x: random(width - pieceWidth),
                y: random(height - pieceHeight),
                dragging: false
            });
        }
    }
}

let selectedPiece = null;

function mousePressed(){
    for (let p of pieces) {
        if (
            mouseX > p.x && mouseX < p.x + pieceWidth &&
            mouseY > p.y && mouseY < p.y + pieceHeight
        ) {
            selectedPiece = p;
            break;
        }
    }
}

function mouseDragged(){
    if (selectedPiece){
        selectedPiece.x = mouseX - pieceWidth/2;
        selectedPiece.y = mouseY - pieceHeight/2;
    }
}

function mouseReleased(){
    selectedPiece=null;
}

function draw(){
  background('#e4eef2');

  for (let p of pieces) {
    image(p.img, p.x, p.y, pieceWidth, pieceHeight);
  }
}