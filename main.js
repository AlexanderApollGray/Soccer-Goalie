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
let background = document.getElementById("background");
let input = {};

let goalie = {
    x: 900,
    y: 445,
    imageNum: 2,
    sw: 35,
    sh: 81,
    w: 100,
    h: 100 * 81 / 35,
    vy: 0,
    img: document.getElementById('goalie'),
    gravity: 1,
    standing: true,

    draw() {
        this.jump();
        this.kick();
        ctx.drawImage(this.img, this.imageNum * this.sw, 0, this.sw, this.sh, this.x, this.y, this.w, this.h);
    },

    jump() {
        this.y += this.vy;
        if (!this.standing) {
            this.vy += this.gravity;
        }
        if ((input.up || input.w) && this.standing) {
            this.standing = false;
            this.vy = -25;
        }
        if (this.y > 445) {
            this.standing = true;
            this.y = 445;
            this.vy = 0;
        }
    },

    kick() {
        if (input.c) this.imageNum = 1;
    }
};

let ball = {
    x: 100,
    y: 575,
    w: 150,
    h: 150,
    img: document.getElementById("soccer-ball"),
    speed: 5,
    vx: 0,
    vy: 0,
    draw() {
        this.move();
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    },
    move() {
        if (input.mouse) {
            let random = randomInt(1, 1);
            if (random === 1) {
                ball.vy = -0.5;
                ball.vx = 1;
            }
        }
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
    },
}

// Event Listeners
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);

function mousedownHandler() {
    input.mouse = true;
}

function mouseupHandler() {
    input.mouse = false;
}

function keydownHandler(event) {
    let key = event.key;
    if (event.key.includes('Arrow')) {
        key = key.slice(5).toLowerCase();
    }
    input[key] = true;
}

function keyupHandler(event) {
    let key = event.key;
    if (key.includes('Arrow')) {
        key = key.slice(5).toLowerCase();
    }
    input[key] = false;
}

// Main Program
loop();
function loop() {
    // Draw background, goalie, and ball
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);
    goalie.draw();
    ball.draw();

    requestAnimationFrame(loop);
}