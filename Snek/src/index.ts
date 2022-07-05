import { Head } from "./Head.js";
import Board from "./Board.js";
import Fruit from "./Fruit.js";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

let score = 0;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const brd = new Board(ctx);
const head = new Head(brd, 1, 1);
const fruit = new Fruit(brd, 3, 3);

document.addEventListener("keydown",(e) => {
    switch (e.key) {
        case 'ArrowDown':
            if (head.deltaY != -1) {
                head.deltaX = 0;
                head.deltaY = 1;
            }
            break;
        case 'ArrowUp':
            if (head.deltaY != 1) {
                head.deltaX = 0;
                head.deltaY = -1;
            }
            break;
        case 'ArrowLeft':
            if (head.deltaX != 1) {
                head.deltaX = -1;
                head.deltaY = 0;
            }
            break;
        case 'ArrowRight':
            if (head.deltaX != -1) {
                head.deltaX = 1;
                head.deltaY = 0;
            }
            break;
    }
}, false);

function drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = '64px sans-serif';
    ctx.fillStyle = "#fff";
    ctx.fillText(score.toString(), canvas.width / 2 - 64, 100);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    head.draw();
    fruit.draw();
    drawScore(ctx);
}

function evaluateIfGameOver(): boolean {
    return head.x >= CANVAS_WIDTH / Board.CELL_WIDTH ||
        head.x < 0 ||
        head.y < 0 ||
        head.y >= CANVAS_HEIGHT / Board.CELL_WIDTH ||
        head.collides();
}

function update() {
    head.update();
    if (evaluateIfGameOver()) {
        console.log('Game Over');
        clearInterval(interval);
    }

    if (head.x == fruit.x && head.y == fruit.y) {
        score++;
        head.grow();
        fruit.spawn();
    }
}

function loop() {
    draw();
    update();
}

const interval = setInterval(() => loop(), 50);