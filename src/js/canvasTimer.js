
class CanvasTimer extends CanvasObject {

    constructor(x, y, width, height, text, value = 60) {
        super(x, y, width, height);
        this.default = value;
        this.current = this.default;
        this.text = text;
    }

    tick() {
        --this.current;
    }

    reset() {
        this.current = this.default;
    }

    getTextFormat() {
        return ("0"+Math.floor(this.current/60)).slice(-2) + ':' + ("0"+this.current%60).slice(-2);
    }

    draw(canvasCtx) {

        canvasCtx.fillStyle = "#000000";

        canvasCtx.beginPath();
        canvasCtx.rect(this.x,this.y, this.width, this.height);
        canvasCtx.fill();

        canvasCtx.fillStyle = "#FFFFFF";

        canvasCtx.beginPath();
        canvasCtx.rect(this.x+2,this.y+2, this.width-4, this.height-4);
        canvasCtx.fill();

        canvasCtx.fillStyle = "#000000";

        canvasCtx.font = "25px Courier New bold";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="bottom"; 

        canvasCtx.fillText(this.getTextFormat(),this.x+this.width/2,this.y+this.height);

        canvasCtx.font = "12px Tahoma";
        canvasCtx.textAlign="left";
        canvasCtx.textBaseline="middle"; 

        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x+4,this.y, canvasCtx.measureText(this.text).width+3, 2);

        canvasCtx.fillStyle = "#000000";
        canvasCtx.fillText(this.text,this.x+5,this.y);        
    }

}