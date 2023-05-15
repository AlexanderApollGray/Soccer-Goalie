// Soccer Goalie Game JavaScript by Xander

// Setup canvas
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 650;

// ctx.font = "70px Arial, Helvetica, sans-serif";
// ctx.fillStyle = "#8B008B";
// ctx.fillText("Play", 320, 310);

// Global Variables
let mouseIsPressed = false;
let upIsPressed = false;
let spaceIsPressed = false;
let background = document.getElementById("background");
let goalie = {
    x: 400,
    y: 390,
    w: 300,
    h: 300,
    gravity: 0,
    standing: true,
};

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
    // Draw background and character
    ctx.drawImgae(background, 0, 0, cnv.width, cnv.height);
    ctx.drawImage(document.getElementById('goalie-default'), goalie.x, goalie.y, goalie.w, goalie.h);

    // Gravity
    goalie.y += goalie.gravity;
    if (goalie.gravity < 20) {
        goalie.gravity += 0.65;
    }
    if (upIsPressed && goalie.standing) {
        goalie.standing = false;
        goalie.y -= 20
        goalie.gravity = -20;
    }
    if (goalie.y >= 390) {
        goalie.gravity = 0;
        goalie.standing = true;
    }
    requestAnimationFrame(start);
}