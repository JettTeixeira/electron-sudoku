/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      CanvasObject
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * An abstract canvas object. Can handle simples mouse events like 'up', 'down', 
 * 'move'.
 * 
 */

class CanvasObject {

    /**
     * Create Canvas Object
     * @param {Integer} x X position in canvas
     * @param {Integer} y Y position in canvas
     * @param {Integer} width Width of object
     * @param {Integer} height Height of object
     */
    constructor(x, y, width, height) {

        // Set coordinates
        this.x = x;
        this.y = y;

        // Set dimentions
        this.height = height;
        this.width = width;

        // Events status
        this.over = false;
        this.clicked = false;

        // Properties
        this.properties = {};
    }

    /**
     * Set only defined properties
     * @param {Object} properties Properties to define
     * @returns {Boolean} Setted correctly
     */
    setProperties(properties) {

        // For each property, if exist, set
        for (let key in properties)
            if (this.properties.hasOwnProperty(key))
                this.properties[key] = properties[key];

        // Return true
        return true;
    }

    /**
     * Validate if a coordinate it's inside the object
     * @param {Integer} x X coordinate to validate
     * @param {Integer} y Y coordinate to validate
     * @returns {Boolean} Collider result
     */
    itCollide(x, y) {

        // Is x coordinate it's out object?
        if (x < this.x || x > this.x + this.width)
            return false;

        // Is y coordinate it's out object?
        if (y < this.y || y > this.y + this.height)
            return false;

        // Coordinates inside
        return true;
    }

    /**
     * Handle events and execute the event function
     * @param {String} event Event to execute
     * @param {Integer} x Event trigger x coordinate
     * @param {Integer} y Event trigger y coordinate
     * @returns {*} Returns the result of the event or false
     */
    handleEvent(event, x, y) {

        // Is not collide?
        if(!this.itCollide(x, y)) {

            // Set false all events status
            this.over = false;
            this.clicked = false;

            // No event
            return false;
        }

        // Is 'up'?
        if(event === 'up') {

            // Finish click
            this.clicked = false;

            // Return the result of the event
            return this.onMouseUp();;
        }

        // Is 'down'?
        if(event === 'down') {

            // Start click
            this.clicked = true;

            // Return the result of the event
            return this.onMouseDown();
        }  

        // Is 'move'?
        if(event === 'move') {

            // Is over
            this.over = true;

            // Return the result of the event
            return this.onMouseOver(); 
        }

        // No event
        return false;
    }

    /**
     * Draw the object in the canvas
     * @virtual
     * @param {*} canvasCtx Canvas Context to draw
     * @returns {Boolean} Drawn correctly
     */
    draw(canvasCtx) {}

    /**
     * Event trrigger when mouse is over the object
     * @virtual
     * @returns {Boolean} Executed correctly
     */
    onMouseOver() {return true;}

    /**
     * Event trrigger when mouse click is down
     * @virtual
     * @returns {Boolean} Executed correctly
     */
    onMouseDown() {return true;}

    /**
     * Event trrigger when mouse click is up
     * @virtual
     * @returns {Boolean} Executed correctly
     */
    onMouseUp() {return true;}
}