import Ball from "./Ball.js";
import { canvas, ctx } from "./constants.js";
import Paddle from "./Paddle.js";
import { getRandomFloat } from "./utils.js";

enum State {
    START,
    PLAY
}

const paddleSound = document.querySelector('audio[data-type="paddle"]') as HTMLAudioElement;
const wallSound = document.querySelector('audio[data-type="wall"]') as HTMLAudioElement;
const scoreSound = document.querySelector('audio[data-type="score"]') as HTMLAudioElement;

const player1 = new Paddle(
        5,
        canvas.height / 2 - Paddle.PADDLE_HEIGHT / 2,
        { up: "w", down: "s" }
     );

const player2 = new Paddle(
        canvas.width - 5 - Paddle.PADDLE_WIDTH,
        canvas.height / 2 - Paddle.PADDLE_HEIGHT / 2,
        { up: "ArrowUp", down: "ArrowDown" }
    );

const ball = new Ball(canvas.width / 2, canvas.height / 2);

let P1_SCORE = 0;
let P2_SCORE = 0;

let state: State = State.START;

document.addEventListener("keydown", player1.keyDownHandler, false);
document.addEventListener("keyup", player1.keyUpHandler, false);

document.addEventListener("keydown", player2.keyDownHandler, false);
document.addEventListener("keyup", player2.keyUpHandler, false);

document.addEventListener('keyup', (e: KeyboardEvent) => {

    if (e.key === 'Enter') {
        state = State.PLAY;
    }
}, false)

function drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = '64px sans-serif';
    ctx.fillText(`${P1_SCORE} - ${P2_SCORE}`, canvas.width / 2 - 64, 100);

    if (state === State.START) {
        ctx.font = '24px sans-serif';
        ctx.fillText('Press enter to start', canvas.width / 2 - 93, 200);
    }
}


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
}

function update() {
    player1.update();
    player2.update();

    if (state == State.PLAY) {
        ball.update(() => wallSound.play());
    
        if (ball.collides(player1)) {
            paddleSound.play();
            ball.dx = -ball.dx * 1.1;
            ball.xPos = player1.xPos + Paddle.PADDLE_WIDTH;
            if (ball.dy < 0) ball.dy = -getRandomFloat(-1, 1);
            else ball.dy = getRandomFloat(-1, 1);
        }
    
        if (ball.collides(player2)) {
            paddleSound.play();
            ball.dx = -ball.dx * 1.1;
            ball.xPos = player2.xPos - Ball.BALL_WIDTH;
            if (ball.dy < 0) ball.dy = -getRandomFloat(-1, 1);
            else ball.dy = getRandomFloat(-1, 1);
        }
    
        if (ball.leavesLeft()) {
            scoreSound.play();
            P2_SCORE++;
            ball.reset();
            state = State.START;
        } else if (ball.leavesRight()) {
            scoreSound.play();
            P1_SCORE++;
            ball.reset();
            state = State.START;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore(ctx);
    player1.render(ctx);
    player2.render(ctx);
    ball.render(ctx);
}

setInterval(loop, 1 / 60);