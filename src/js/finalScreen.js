
class FinalScreen {
    
    constructor(eventManager, message) {
        
        this.eventManager = eventManager;
        this.message = message;
    }

    draw(canvasCtx) {

        canvasCtx.fillStyle = "#000000";
        canvasCtx.font = "200px Tahoma";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 

        canvasCtx.fillText(this.message,400,300);
    }

    handleEvent(event, x, y) {

        if (event == "up")
            this.eventManager.fire('showMain');
    }

}