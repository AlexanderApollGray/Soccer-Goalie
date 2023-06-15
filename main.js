// Soccer Goalie Game JavaScript by Xander

// Setup canvas
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1200;
cnv.height = 800;

// Global Variables
let background = document.getElementById("background");
let input = {};

let play = {
    saves: 0,
    goals: 0,
};

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
    kicking: false,
    swatting: false,
    cooldown: 0,

    draw() {
        this.jump();
        this.kick();
        this.swat();

        if (this.cooldown > 0) {
            this.cooldown++;
            if (this.cooldown % 40 === 0) {
                this.cooldown = 0;
            } else if (this.cooldown % 20 === 0) {
                this.imageNum = 2;
                this.kicking = 0;
                this.swatting = false;
            }
        }

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
        if (input.v && this.cooldown === 0) {
            this.kicking = true;
            this.cooldown++;
            for (let t = 0; t < 5; t++) {
                this.imageNum = 1;
            }
        }
    },

    swat() {
        if (input.c && this.cooldown === 0) {
            this.swatting = true;
            this.cooldown++;
            this.imageNum = 0;
        }
    },

    getHandHitbox() {
        return {
            x: this.x + 20,
            y: this.y + 50,
            w: this.w - 60,
            h: this.h - 160
        }
    },

    getFootHitbox() {
        return {
            x: this.x + 30,
            y: this.y + 160,
            w: this.w - 60,
            h: this.h - 170
        }
    },
};

function createBall() {
    let y = Math.random() * 620;
    let min = (net.y + net.h - 50 - y) / Math.sqrt((net.y + net.h - 50 - y) ** 2 + cnv.width ** 2);
    let max = (net.y - y) / Math.sqrt((net.y - y) ** 2 + cnv.width ** 2);
    let rand = Math.random() * (max - min) + min;
    let ball = {
        x: -50,
        y: y,
        w: 50,
        h: 50,
        img: document.getElementById("soccer-ball"),
        speed: 10,
        vy: rand,
        vx: Math.sqrt(1 - rand ** 2),

        draw() {
            this.move();
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        },
        move() {
            this.x += this.vx * this.speed;
            this.y += this.vy * this.speed;
        },
    };
    balls.push(ball);
}

let balls = [];

let net = {
    y: 200,
    h: 465
};

function isInNet(ball, net) {
    return (
        ball.x > cnv.width &&
        ball.y + ball.h > net.y &&
        ball.y < net.y + net.h
    );
}

function checkCollision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.w &&
        obj1.x + obj1.w > obj2.x &&
        obj1.y < obj2.y + obj2.h &&
        obj1.y + obj1.h > obj2.y
    );
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

let ballCreationDelay = 1000; // Delay between ball creations (in milliseconds)
let lastBallCreationTime = 0; // Time of the last ball creation


// Main Program
loop();
function loop() {
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);

    goalie.draw();

    // Loop through the balls and update/draw each ball
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        if (goalie.swatting && checkCollision(ball, goalie.getHandHitbox())) {
            ball.vx *= -1;
            play.saves++;
            goalie.swatting = false;
        } else if (goalie.kicking && checkCollision(ball, goalie.getFootHitbox())) {
            ball.vx *= -1;
            play.saves++;
            goalie.kicking = false;
        } else if (ball.y + ball.h > 665) {
            ball.vy *= -1;
        } else if (ball.x + ball.w < 0) {
            balls.splice(i, 1);
            i--;
        } else if (isInNet(ball, net)) {
            // Handle the ball being in the net
            play.goals++;

            // Remove the ball from the list
            balls.splice(i, 1);

            i--; // Decrement i to account for the removed ball
        }

        ball.draw();
    }
    // Display Saves and Goals
    document.getElementById('saves').innerHTML = `Saves: ${play.saves}`
    document.getElementById('goals').innerHTML = `Goals: ${play.goals}`

    // Create a new ball if enough time has passed since the last creation
    let currentTime = Date.now();
    if (currentTime - lastBallCreationTime >= ballCreationDelay) {
        createBall();
        lastBallCreationTime = currentTime;
    }
    requestAnimationFrame(loop);
}
