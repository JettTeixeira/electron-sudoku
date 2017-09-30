
class MainScreen {

    constructor(eventManager) {
        this.eventManager = eventManager;
        this.btnEasy = new CanvasButton(300, 250, 200, 50, "Easy", "30px Tahoma");
        this.btnNormal = new CanvasButton(300, 350, 200, 50, "Normal", "30px Tahoma");
        this.btnHard = new CanvasButton(300, 450, 200, 50, "Hard", "30px Tahoma");

        this.setEvents();
    }

    setEvents() {
        
        this.btnEasy.onMouseUp = () => {
            this.eventManager.fire('showSudoku', {
                timer:1200,
                blockUpTimer:60,
                blockUpPowerDuration:15,
                clues:40,
                errores:true
            });
        };

        this.btnNormal.onMouseUp = () => {
            this.eventManager.fire('showSudoku', {
                timer:600,
                blockUpTimer:60,
                blockUpPowerDuration:30,
                clues:30,
                errores:false
            });
        };

        this.btnHard.onMouseUp = () => {
            this.eventManager.fire('showSudoku', {
                timer:1200,
                blockUpTimer:30,
                blockUpPowerDuration:30,
                clues:30,
                errores:false
            });
        };

    }

    draw(canvasCtx) {
        
        canvasCtx.fillStyle = "#000000";
        canvasCtx.font = "100px Tahoma";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 

        canvasCtx.fillText("SuDoKu",400,120);

        this.btnEasy.draw(canvasCtx);
        this.btnNormal.draw(canvasCtx);
        this.btnHard.draw(canvasCtx);
    }

    handleEvent(event, x, y) {

        this.btnEasy.handleEvent(event, x, y);
        this.btnNormal.handleEvent(event, x, y);
        this.btnHard.handleEvent(event, x, y);

    }
}