// Soccer Goalie Game JavaScript by Xander

// Setup canvas
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1200;
cnv.height = 800;

// ctx.font = "70px Arial, Helvetica, sans-serif";
// ctx.fillStyle = "#8B008B";
// ctx.fillText("Play", 320, 310);

// Global Variables
let mouseIsPressed = false;
let upIsPressed = false;
let spaceIsPressed = false;
let background = document.getElementById("background");
let ballImg = document.getElementById("soccer-ball");
let goalieImg = document.getElementById('goalie');
let goalie = {
    x: 900,
    y: 500,
    w: 200,
    h: 200,
    gravity: 0,
    standing: true,
};
let ball = {
    x: 100,
    y: 575,
    w: 150,
    h: 150,
}

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
    // if (mouseIsPressed = true) {
    //     ballMove();
    // }
    // Draw background, goalie, and ball
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);
    ctx.drawImage(goalieImg, goalie.x, goalie.y, goalie.w, goalie.h);
    ctx.drawImage(ballImg, ball.x, ball.y, ball.w, ball.h);

    // Gravity
    goalie.y += goalie.gravity;
    if (goalie.gravity < 21) {
        goalie.gravity += 0.65;
    }
    if (upIsPressed && goalie.standing) {
        goalie.standing = false;
        goalie.y -= 20
        goalie.gravity = -20;
    }
    if (goalie.y >= 500) {
        goalie.gravity = 0;
        goalie.standing = true;
    }

    // // Ball movement
    // function ballMove() {
    //     for (let n = 0; n < 1;) {
    //         random = randomInt(1, 5);
    //     }
    //     if (random = 1 && ball.y < 500) {
    //         ball.y++;
    //         ball.x++;
    //     } else {
    //         ball.x = 0;
    //         ball.y = 0;
    //     }
    // }
    requestAnimationFrame(start);
}