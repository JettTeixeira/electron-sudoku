/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      CanvasTimer
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Timer canvas object who ticks every second.
 * 
 */

class CanvasTimer extends CanvasObject {

    /**
     * Create Canvas Timer
     * @param {Integer} x X position in canvas
     * @param {Integer} y Y position in canvas
     * @param {Integer} width Width of object
     * @param {Integer} height Height of object
     * @param {String} text Text to display on header
     * @param {Integer} value Time of seconds to execute their event
     */
    constructor(x, y, width, height, text, value = 60) {
        super(x, y, width, height);

        // Set times
        this.default = value;
        this.current = this.default;

        // Set header text
        this.text = text;

        // Interval ID
        this.interval = null;
    }

    /**
     * Start the timer
     * @returns {Boolean|Error} Init correctly
     */
    initTimer() {
        
        // Interval exist?
        if (this.interval !== null)
            throw new Error('Timer started');
        
        // Set interval ID, tick at 1 second
        this.interval = setInterval(()=>{this.tick();},1000);

        // Init correctly
        return true;
    }

    /**
     * Stop the timer
     * @returns {Boolean|Error} Stop correctly
     */
    stopTimer() {
        
        // Interval exist?
        if (this.interval === null)
        throw new Error('Timer dosen\'t exists');
        
        // Stop interval
        clearInterval(this.interval);

        // Delete interval ID
        this.interval = null;

        // Stop correctly
        return true;
    }

    /**
     * Event trrigger when time ends
     * @abstract
     */
    eventTimer() {throw new Error('Must declare the function')}

    /**
     * Tick timer
     * @returns {*} Returns the result of the event or false
     */
    tick() {
        
        // Less one second, timer end?
        if (--this.current >= 0)
            return false;

        // Reset timer
        this.reset();

        // Return the result of the event
        return this.eventTimer();
    }

    /**
     * Set the current seconds to default value
     * @returns {Boolean} Reset correctly
     */
    reset() {

        // Set the current seconds to default value
        this.current = this.default;

        // Reset correctly
        return true;
    }

    /**
     * Transform the current time to "00:00" format
     * @returns {String} Time formatted
     */
    getTextFormat() {

        // Return "00:00" format
        return ('0'+Math.floor(this.current/60)).slice(-2) + ':' + ('0'+this.current%60).slice(-2);
    }

    /**
     * Draw object
     * @param {Object} canvasCtx Canvas Context to draw
     */
    draw(canvasCtx) {

        // Layer 1: Black rectangle (Border)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.fillRect(this.x,this.y, this.width, this.height);

        // Layer 2: White rectangle (Background)
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x+2,this.y+2, this.width-4, this.height-4);

        // Layer 3: Timer Text (Counter)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.font = "25px Courier New bold";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="bottom"; 
        canvasCtx.fillText(this.getTextFormat(),this.x+this.width/2,this.y+this.height);

        // Set font properties for measure header text
        canvasCtx.font = "12px Tahoma";
        canvasCtx.textAlign="left";
        canvasCtx.textBaseline="middle"; 

        // Layer 4: White rectangle (Delete border for header text)
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x+4,this.y, canvasCtx.measureText(this.text).width+3, 2);

        // Layer 5: Header text (Title text)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.fillText(this.text,this.x+5,this.y);        
    }
}