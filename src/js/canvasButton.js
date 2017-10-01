/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      CanvasButton
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Button canvas object.
 * 
 */

class CanvasButton extends CanvasObject {

    constructor(x, y, width, height, text, font) {
        super(x, y, width, height);
        this.text = text;
        this.font = font;
        this.properties = {backgroundColor: "#FFFFFF", overBackgroundColor: "#DDDDDD", clickedBackgroundColor: "#AAAAAA"}
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
            canvasCtx.fillStyle = this.properties.clickedBackgroundColor;
        else if (this.over)
            canvasCtx.fillStyle = this.properties.overBackgroundColor;
        else
            canvasCtx.fillStyle = this.properties.backgroundColor;
        
        canvasCtx.beginPath();
        canvasCtx.rect(this.x+2,this.y+2, this.width-4, this.height-4);
        canvasCtx.fill();

        canvasCtx.fillStyle = "#000000";

        canvasCtx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
    }
}