/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      SudokuNumber
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Handle all the properties of number in the sudoku grid
 * 
 */

class SudokuNumber extends CanvasObject {

    /**
     * Create Sudoku Number
     * @param {Integer} x X position in canvas
     * @param {Integer} y Y position in canvas
     * @param {Integer} width Width of object
     * @param {Integer} height Height of object
     * @param {Integer} value Value of cell
     */
    constructor(x, y, width, height, value = 0) {
        super(x, y, width, height);

        // Set value
        this.value = value;

        // Set properties
        this.block = false;
        this.isCollision = false;
        this.hidden = false;
    }

    /**
     * Set new value with 'block' verification
     * @param {Number} value New value
     * @return {Bool|Error} Setted correctly
     */
    setValue(value) {

        // Is blocked?
        if (this.block)
            return false;

        // Is valid?
        if (value < 0 || value > 9)
            throw new Error('Invalid number entry');

        // Is same?
        if (this.value == value)
            value = 0;

        // Set value
        this.value = value;

        // Return true
        return true;
    }

    /**
     * Draw object
     * @param {Object} canvasCtx Canvas Context to draw
     */
    draw(canvasCtx) {

        // Is hidden? Is wrong? is Blocked? (Change backgground color)
        if (this.hidden)
        canvasCtx.fillStyle = "#000000";
        else if (this.isCollision)
            canvasCtx.fillStyle = "#d80404";
        else if (this.block)
            canvasCtx.fillStyle = "#666666";
        else
            canvasCtx.fillStyle = "#FFFFFF";

        // Layer 1: Rectangle (Background)
        canvasCtx.fillRect(this.x,this.y, this.width, this.height);

        // Value?
        if (!this.value)
            return;

        // Layer 2: Text Value (Number in cell)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.font= "30px Tahoma";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 
        canvasCtx.fillText(this.value,this.x+24,this.y+24);
    }
}
