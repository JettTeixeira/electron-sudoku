
class MainScreen {

    constructor() {
        this.btnEasy = new CanvasButton(300, 250, 200, 50, "Easy", "30px Tahoma");
        this.btnNormal = new CanvasButton(300, 350, 200, 50, "Normal", "30px Tahoma");
        this.btnHard = new CanvasButton(300, 450, 200, 50, "Hard", "30px Tahoma");

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