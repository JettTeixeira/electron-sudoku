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

    /**
     * Create Canvas Button
     * @param {Integer} x X position in canvas
     * @param {Integer} y Y position in canvas
     * @param {Integer} width Width of object
     * @param {Integer} height Height of object
     * @param {String} text Text to display
     * @param {Integer} font Font of text
     */
    constructor(x, y, width, height, text, font) {
        super(x, y, width, height);

        // Set text
        this.text = text;

        // Set properties
        this.font = font;
        this.properties = {backgroundColor: "#FFFFFF", overBackgroundColor: "#DDDDDD", clickedBackgroundColor: "#AAAAAA"};
        this.blocked = false;
    }

    /**
     * Draw object
     * @param {Object} canvasCtx Canvas Context to draw
     */
    draw(canvasCtx) {

        // Layer 1: Black rectangle (border)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.fillRect(this.x,this.y, this.width, this.height);

        // Is cliked? is over? (Change background color)
        if (this.clicked)
            canvasCtx.fillStyle = this.properties.clickedBackgroundColor;
        else if (this.over)
            canvasCtx.fillStyle = this.properties.overBackgroundColor;
        else
            canvasCtx.fillStyle = this.properties.backgroundColor;
        
        // Layer 2: Rectangle (Background)
        canvasCtx.fillRect(this.x+2,this.y+2, this.width-4, this.height-4);

        // Layer 3: Text (Inside text)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.font = this.font;
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 
        canvasCtx.fillText(this.text,this.x+this.width/2,this.y+this.height/2);
    }
}