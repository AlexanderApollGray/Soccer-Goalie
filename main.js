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

    // goals() {
    //     this.goalsDiv.innerHTML = "Goals: " + this.goals;
    // },

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
};

let ball = {
    x: 100,
    y: 615,
    w: 50,
    h: 50,
    img: document.getElementById("soccer-ball"),
    speed: 10,
    vx: 0,
    vy: 0,
    draw() {
        this.move();
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    },
    move() {
        if (input.mouse) {
            let random = randomInt(1, 4);
            if (random === 1) {
                ball.vy = -0.5;
                ball.vx = 1.2;
            } else if (random === 2) {
                ball.vy = -0.25;
                ball.vx = 1.2;
            } else if (random === 3) {
                ball.vy = 0;
                ball.vx = 1.2;
            }
            console.log(random);

        }
        if (ball.x > 1100) {
            play.goals++;
            ball.x = 100;
            ball.y = 625;
            ball.vx = 0;
            ball.vy = 0;
        }
        this.x += this.vx * this.speed;
        this.y += this.vy * this.speed;
    },
}

let net = {
    x: 1000,
    y: 400,
    width: 200,
    height: 200
};

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

// Main Program
loop();
function loop() {
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);

    goalie.draw();
    ball.draw();

    // Check for collision between the ball and the goalie
    if (checkCollision(ball, goalie)) {
        // Update Saves
        play.saves++;

        // Reset the ball's position and velocities
        ball.x = 100;
        ball.y = 625;
        ball.vx = 0;
        ball.vy = 0;
    }

    requestAnimationFrame(loop);
}