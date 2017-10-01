/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      MainScreen
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Main Screen of game. Show title and 3 buttons with difficulties
 * 
 */

class MainScreen {

    /**
     * Create Main Screen
     * @param {EventManager} eventManager Game event manager
     */
    constructor(eventManager) {

        // Set event manager
        this.eventManager = eventManager;

        // Create buttons
        this.btnEasy = new CanvasButton(300, 250, 200, 50, "Easy", "30px Tahoma");
        this.btnNormal = new CanvasButton(300, 350, 200, 50, "Normal", "30px Tahoma");
        this.btnHard = new CanvasButton(300, 450, 200, 50, "Hard", "30px Tahoma");

        // Set events
        this.setEvents();
    }

    /**
     * Set events of the screen objects
     * @returns {Boolean} Setted correctly
     */
    setEvents() {
        
        // Fire 'showSudoku' when 'mouse up' in 'btnEasy'
        this.btnEasy.onMouseUp = () => {
            this.eventManager.fire('showSudoku', {
                timer:600,
                blockUpTimer:60,
                blockUpPowerDuration:15,
                clues:40,
                errors:true
            });
        };

        // Fire 'showSudoku' when 'mouse up' in 'btnNormal'
        this.btnNormal.onMouseUp = () => {
            this.eventManager.fire('showSudoku', {
                timer:900,
                blockUpTimer:60,
                blockUpPowerDuration:30,
                clues:30,
                errors:false
            });
        };

        // Fire 'showSudoku' when 'mouse up' in 'btnHard'
        this.btnHard.onMouseUp = () => {
            this.eventManager.fire('showSudoku', {
                timer:1200,
                blockUpTimer:30,
                blockUpPowerDuration:25,
                clues:20,
                errors:false
            });
        };

        // Return true
        return true;
    }

    /**
     * Draw object
     * @param {Object} canvasCtx Canvas Context to draw
     */
    draw(canvasCtx) {
        
        // Layer 1: Main text (Title)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.font = "100px Tahoma";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 
        canvasCtx.fillText("SuDoKu",400,120);

        // Layer 2: Buttons (Difficulties)
        this.btnEasy.draw(canvasCtx);
        this.btnNormal.draw(canvasCtx);
        this.btnHard.draw(canvasCtx);
    }

    /**
     * Handle events of objects
     * @param {String} event Event to execute
     * @param {Integer} x Event trigger x coordinate
     * @param {Integer} y Event trigger y coordinate
     * @returns {Boolean} Executed correctly
     */
    handleEvent(event, x, y) {

        // Buttons events
        this.btnEasy.handleEvent(event, x, y);
        this.btnNormal.handleEvent(event, x, y);
        this.btnHard.handleEvent(event, x, y);

        // Return true
        return true;
    }
}