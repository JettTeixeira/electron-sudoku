
class Game {

    constructor(canvas) {
        
        this.canvas = canvas;
        this.eventManager = new EventManager();
        this.screen = new MainScreen(this.eventManager);

        this.setEvents();
    }

    setEvents() {

        this.eventManager.on('showMain', () => {
            this.screen = new MainScreen(this.eventManager);
        });

        this.eventManager.on('showSudoku', (dificulty) => {
            this.screen = new SudokuScreen(this.eventManager, dificulty);
        });

        this.eventManager.on('showFinal', (message) => {
            this.screen = new FinalScreen(this.eventManager, message);
        });
    }

    draw() {

        let canvasCtx = this.canvas.getContext("2d");
        
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(0,0,800,600);

        this.screen.draw(canvasCtx);
    }

    handleEvent(event, x, y) {
        //console.log(event, x, y);

        this.screen.handleEvent(event, x, y);
    }
}