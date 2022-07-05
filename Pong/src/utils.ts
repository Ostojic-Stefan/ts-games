export function getRandomFloat(min: number, max: number): number {
    return Math.random() * (min - max) + max;
}

export function distanceBetween(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}