export default class Board {
    public static CELL_WIDTH = 20

    constructor(private ctx: CanvasRenderingContext2D) { }

    public drawCell(x: number, y: number, color: string) {
        this.ctx.beginPath();
        this.ctx.rect(x * Board.CELL_WIDTH, y * Board.CELL_WIDTH, Board.CELL_WIDTH, Board.CELL_WIDTH);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}