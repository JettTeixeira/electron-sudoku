/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      FinalScreen
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Final Screen of game. Show message.
 * 
 */

class FinalScreen {
    
    /**
     * Create Final Screen
     * @param {EventManager} eventManager Game event manager
     * @param {String} message Message to display
     */
    constructor(eventManager, message) {
        
        // Set event manager
        this.eventManager = eventManager;

        // Set message
        this.message = message;
    }

    /**
     * Draw object
     * @param {Object} canvasCtx Canvas Context to draw
     */
    draw(canvasCtx) {

        // Layer 1: Message (Large message) 
        canvasCtx.fillStyle = "#000000";
        canvasCtx.font = "200px Tahoma";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 
        canvasCtx.fillText(this.message,400,300);
    }

    /**
     * Handle events of objects
     * @param {String} event Event to execute
     * @param {Integer} x Event trigger x coordinate
     * @param {Integer} y Event trigger y coordinate
     * @returns {Boolean} Executed correctly
     */
    handleEvent(event, x, y) {

        // For any click, fire 'showMain'
        if (event == "up")
            this.eventManager.fire('showMain');
    }
}