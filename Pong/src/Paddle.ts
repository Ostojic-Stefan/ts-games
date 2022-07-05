import { canvas } from "./constants.js";

interface MoveKeys {
    up: "ArrowUp" | "w";
    down: "ArrowDown" | "s";
}

export default class Paddle {
    public static PADDLE_HEIGHT = 150;
    public static PADDLE_WIDTH = 10;
    private velocity = 3;

    private upPressed = false;
    private downPressed = false;

    constructor(
        public xPos: number,
        public yPos: number,
        private moveType: MoveKeys
    )
    {}

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.xPos, this.yPos, Paddle.PADDLE_WIDTH, Paddle.PADDLE_HEIGHT);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.upPressed) {
            this.yPos -= this.velocity;
            this.yPos = Math.max(0, this.yPos);
        }
        if (this.downPressed) {
            this.yPos += this.velocity;
            this.yPos = Math.min(this.yPos, canvas.height - Paddle.PADDLE_HEIGHT);
        }
    }

    keyDownHandler = (e: KeyboardEvent) => {
        if(e.key == this.moveType.up) {
            this.upPressed = true;
        }
        else if(e.key == this.moveType.down) {
            this.downPressed = true;
        }
    }

    keyUpHandler = (e: KeyboardEvent) => {
        if(e.key == this.moveType.up) {
            this.upPressed = false;
        }
        else if(e.key == this.moveType.down) {
            this.downPressed = false;
        }
    }
}