import { canvas } from "./constants.js";
import Paddle from "./Paddle.js";
import { getRandomFloat } from "./utils.js";

export default class Ball {
    public static BALL_HEIGHT = 15;
    public static BALL_WIDTH = 15;

    public dx: number;
    public dy: number;

    constructor(
        public xPos: number,
        public yPos: number,
    )
    {
        this.dy = getRandomFloat(-1, 1);
        this.dx = Math.random() < 0.5 ? getRandomFloat(1.5, 2) : -getRandomFloat(1.5, 2);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, Ball.BALL_WIDTH, Ball.BALL_HEIGHT);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
    }

    update(callback: () => void) {
        this.xPos += this.dx;
        this.yPos += this.dy;
        this.bounceOffOfWalls(callback);
    }

    collides(paddle: Paddle) {
        if (this.xPos > paddle.xPos + Paddle.PADDLE_WIDTH || paddle.xPos > this.xPos + Ball.BALL_WIDTH) 
            return false;

        if (this.yPos > paddle.yPos + Paddle.PADDLE_HEIGHT || paddle.yPos > this.yPos + Ball.BALL_HEIGHT)
            return false

        return true;
    }

    leavesLeft(): boolean {
        return this.xPos < 0;
    }

    leavesRight(): boolean {
        return this.xPos + Ball.BALL_WIDTH > canvas.width;
    }

    reset() {
        this.xPos = canvas.width / 2;
        this.yPos = canvas.height / 2;

        this.dy = getRandomFloat(-1, 1);
        this.dx = Math.random() < 0.5 ? getRandomFloat(1, 2) : -getRandomFloat(1, 2);
    }

    private bounceOffOfWalls(callback: () => void) {
        if (this.yPos < 0) {
            this.yPos = 0
            this.dy = -this.dy;
            callback();
        }
        if (this.yPos >= canvas.height - Ball.BALL_HEIGHT) {
            this.yPos = canvas.height - Ball.BALL_HEIGHT;
            this.dy = -this.dy;
            callback();
        }
    }
}