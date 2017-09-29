
class CanvasButton extends CanvasObject {

    constructor(x, y, width, height, text, font) {
        super(x, y, width, height);
        this.text = text;
        this.font = font;
    }

    draw(canvasCtx) {

        canvasCtx.font = this.font;
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 

        canvasCtx.fillStyle = "#000000";

        canvasCtx.beginPath();
        canvasCtx.rect(this.x,this.y, this.width, this.height);
        canvasCtx.fill();

        if (this.clicked)
            canvasCtx.fillStyle = "#AAAAAA";
        else if (this.over)
            canvasCtx.fillStyle = "#DDDDDD";
        else
            canvasCtx.fillStyle = "#FFFFFF";
        
        canvasCtx.beginPath();
        canvasCtx.rect(this.x+2,this.y+2, this.width-4, this.height-4);
        canvasCtx.fill();

        canvasCtx.fillStyle = "#000000";

        canvasCtx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
    }
}