import Board from "./Board";

export default abstract class Entity {
    static dims = 20;
    constructor(protected brd: Board, public x: number, public y: number) { }
    abstract draw(): void;
    // abstract update(): void;
}