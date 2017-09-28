
class Game {

    constructor(canvas) {
        
        this.sudoku = new Sudoku();
        this.canvas = canvas;
        // TODO: make screens? make an scoreboard ^^! ¿?
        // TODO: dificult?
    }

    draw() {

        this.sudoku.drawChess(canvas.getContext("2d"));

    }

}