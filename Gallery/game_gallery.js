let characterX = 150;
let bgImages = [];
let bgX = [];
let numPanels = 10;
let lily;
// Store scaled sizes for each bg image
let bgScaledSizes = [];

function preload() {
    // Load hallway images
    for (let i = 0; i < numPanels; i++) {
        bgImages[i] = loadImage(`Gallery/images/hall_${i}.jpg`,
            () => {}, 
            () => console.error(`Failed to load: hall_${i}.jpg`)
        );
    }

    // Load character image
    lily = loadImage("Gallery/images/lily.jpg");
}

function setup() {
    createCanvas(800, 570);

    // Once all images are loaded, stack them properly
    let currentX = 0;
    for (let i = 0; i < bgImages.length; i++) {
        let img = bgImages[i];
        let scale = 400 / img.height; // 400 is the initial canvas height
        let newW = img.width * scale;
        let newH = img.height * scale;
        bgX[i] = currentX;
        bgScaledSizes[i] = { w: newW, h: newH };
        currentX += newW + 50; // include gap
    }
}

function draw() {

    background(255);
    // Scroll control
    if (keyIsDown(RIGHT_ARROW)) {
        for (let i = 0; i < bgX.length; i++) {
            bgX[i] -= 5;
        }
    }

    if (keyIsDown(LEFT_ARROW)) {
        for (let i = 0; i < bgX.length; i++) {
            bgX[i] += 5;
        }
    }

    // Draw hallway
    imageMode(CORNER);
    for (let i = 0; i < bgImages.length; i++) {
        if (bgImages[i]) {
            let img = bgImages[i];
            let size = bgScaledSizes[i];
            image(img, bgX[i], 0, size.w, size.h); // use stored size
        }
    }

    // Draw Lily
    imageMode(CENTER);
    if (lily) {
        image(lily, characterX, height - 100, 100, 120);
    }
}
