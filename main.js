// Soccer Goalie Game JavaScript by Xander

// Setup canvas
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 650;

ctx.font = "70px Arial, Helvetica, sans-serif";
ctx.fillStyle = "#8B008B";
ctx.fillText("Play", 320, 310);

// Global Variables
let mouseIsPressed = false;
let upIsPressed = false;
let spaceIsPressed = false;
let goalieX = 400;
let goalieY = 300;

// Event Listeners
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);

function mousedownHandler() {
    mouseIsPressed = true;
}

function mouseupHandler() {
    mouseIsPressed = false;
}

function keydownHandler(event) {
    if (event.code === "ArrowUp") {
        upIsPressed = true;
    } if (event.code === "Space") {
        spaceIsPressed = true;
    }
}

function keyupHandler(event) {
    if (event.code === "ArrowUp") {
        upIsPressed = false;
    } if (event.code === "Space") {
        spaceIsPressed = false;
    }
}

// Main Program
requestAnimationFrame(start);
function start() {
    if (upIsPressed) {
        goalieY -= 5;
    }
    ctx.fillStyle = "aqua";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(document.getElementById('goalie-default'), goalieX, goalieY, 200, 200);
    requestAnimationFrame(start);
}