import Board from "./Board.js";
import Entity from "./Entity.js";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Fruit extends Entity {
    constructor(brd: Board, public x: number, public y: number) {
        super(brd, x, y);
        this.spawn();
    }

    draw(): void {
        this.brd.drawCell(this.x, this.y, "#0f0");
    }

    spawn() {
        this.x = getRandomInt(0, 1280 / Board.CELL_WIDTH - 1);
        this.y = getRandomInt(0, 720 / Board.CELL_WIDTH - 1);
    }

}