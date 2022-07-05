import Board from "./Board.js";
import Entity from "./Entity.js";


export class Head extends Entity {
    private body: Body[] = [];
    public deltaX = 1; 
    public deltaY = 0; 

    constructor(brd: Board, public x: number, public y: number) {
        super(brd, x, y);
    }

    draw() {
        this.brd.drawCell(this.x, this.y, "#fff");
        this.body.forEach(b => b.draw());
    }

    update() {
        this.follow();
        this.x += this.deltaX;
        this.y += this.deltaY;
    }

    grow() {
        this.body.push(new Body(this.brd, this.x, this.y));
    }

    collides(): boolean {
        let returnVal = false;
        this.body.forEach(b => {
            if (this.x === b.x && this.y === b.y) 
                returnVal = true;
        });
        return returnVal;
    }

    follow() {
        for (let i = this.body.length - 1; i > 0; --i) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        if (this.body[0]) {
            this.body[0].x = this.x;
            this.body[0].y = this.y;
        }
    }

}


export class Body extends Entity {
    constructor(brd: Board, public x: number, public y: number) {
        super(brd, x, y);
    }
    draw() {
        this.brd.drawCell(this.x, this.y, "#fff");
    }
}