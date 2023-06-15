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
    timerDiv: document.getElementById('timer'),
    seconds: 0,
    savesDiv: document.getElementById('saves'),
    saves: 0,
    goalsDiv: document.getElementById('goals'),
    goals: 0,

    time() {
        if (seconds >= 0) {
            this.timerDiv.innerHTML = "Timer: " + this.seconds;
            seconds++;
        }
        if (points === 50) {
            clearInterval(timer);
        }
    },
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

    draw() {
        this.jump();
        this.kick();
        this.catch();
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
        if (input.v) {
            for (let t = 0; t < 5; t++) {
                this.imageNum = 1;
            }
        }
    },

    catch() {
        if (input.c) this.imageNum = 0;
    },

    getHitbox() {
        return {
            x: this.x + 30,
            y: this.y + 5,
            w: this.w - 30,
            h: this.h - 15
        }
    }
};

function createBall() {
    let rand = Math.random() * -0.45
    let ball = {
        x: 100,
        y: 615,
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
            if (this.x > 1100) {
                play.goals++;
                this.x = 100;
                this.y = 625;
                this.vx = 0;
                this.vy = 0;
            }
            this.x += this.vx * this.speed;
            this.y += this.vy * this.speed;
        },
    };
    balls.push(ball);
}

let balls = [];

let net = {
    x: 1055,
    y: 150,
    width: 140,
    height: 515
};

function isInNet(ball, net) {
    return (
        ball.x + ball.w > net.x &&
        ball.x < net.x + net.width &&
        ball.y + ball.h > net.y &&
        ball.y < net.y + net.height
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

        if (checkCollision(ball, goalie.getHitbox())) {

        } else if (isInNet(ball, net)) {
            // Handle the ball being in the net
            play.goals++;

            // Remove the ball from the list
            balls.splice(i, 1);

            i--; // Decrement i to account for the removed ball
        }

        ball.draw();
    }

    ctx.strokeRect(net.x, net.y, net.width, net.height)

    // Create a new ball if enough time has passed since the last creation
    let currentTime = Date.now();
    if (currentTime - lastBallCreationTime >= ballCreationDelay) {
        createBall();
        lastBallCreationTime = currentTime;
    }

    requestAnimationFrame(loop);
}