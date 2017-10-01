/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      Game
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Handle all games properties, events and screens.
 * 
 */

class Game {

    /**
     * 
     * @param {HTMLElement} canvas the game canvas to display
     */
    constructor(canvas) {
        
        // Set canvas
        this.canvas = canvas;

        // Create event manager
        this.eventManager = new EventManager();

        // Set main screen
        this.screen = new MainScreen(this.eventManager);

        // Set events
        this.setEvents();
    }

    /**
     * Set events of the screen objects
     * @returns {Boolean} Setted correctly
     */
    setEvents() {

        // Register event 'showMain', who change the screen to 'MainScreen'
        this.eventManager.on('showMain', () => {
            this.screen = new MainScreen(this.eventManager);
        });

        // Register event 'showSudoku', who change the screen to 'SudokuScreen'
        this.eventManager.on('showSudoku', (dificulty) => {
            this.screen = new SudokuScreen(this.eventManager, dificulty);
        });

        // Register event 'showFinal', who change the screen to 'FinalScreen'
        this.eventManager.on('showFinal', (message) => {
            this.screen = new FinalScreen(this.eventManager, message);
        });

        // Return true
        return true;
    }

    /**
     * Draw object
     * @param {Object} canvasCtx Canvas Context to draw
     */
    draw() {

        // Get canvas context
        let canvasCtx = this.canvas.getContext("2d");
        
        // Layer 0: White rectangle (Background)
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(0,0,800,600);

        // Draw the current screen
        this.screen.draw(canvasCtx);
    }

    /**
     * Handle events of objects
     * @param {String} event Event to execute
     * @param {Integer} x Event trigger x coordinate
     * @param {Integer} y Event trigger y coordinate
     * @returns {Boolean} Executed correctly
     */
    handleEvent(event, x, y) {

        // Send event to current screen
        this.screen.handleEvent(event, x, y);

        // Return true
        return true;
    }
}