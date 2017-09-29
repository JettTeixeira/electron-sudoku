
class Game {

    constructor(canvas) {
        
        this.canvas = canvas;
        this.screen = new MainScreen();
    }

    draw() {

        let canvasCtx = this.canvas.getContext("2d");
        
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(0,0,800,600);

        this.screen.draw(canvasCtx);
    }

    handleEvent(event, x, y) {
        console.log(event, x, y);

        this.screen.handleEvent(event, x, y);
    }

    setMainScreen() {
        this.screen = new MainScreen();
    }

    setSudokuScreen() {
        this.screen = new SudokuScreen();
    }
}