/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      EventManager
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Handles events for interact with classes in different hierarchy.
 */

class EventManager {

    /**
     * Create the Event Manager
     */
    constructor() {

        // Map of events
        this.events = new Map();
    }

    /**
     * Create a new event
     * @param {String} eventName Name of the event
     * @param {Function} callback Function to execute
     * @returns {Boolean} Setted correctly
     */
    on(eventName, callback) {

        // Set the event
        this.events.set(eventName, callback);
        
        // Return true
        return true;
    }

    /**
     * Exec the event
     * @param {String} eventName Name of event
     * @param {...*} arguments Arguments for the event
     * @returns {*} Returns the result of the function or error
     */
    fire(eventName) {

       // Exists?
        if (!this.events.has(eventName))
            throw new Error('Invalid event fired');

        // Slice all the arguments
        let args = Array.prototype.slice.call(arguments);

        // Drop the first argument "eventName"
        args.shift();

        // Return the result of the event
        return this.events.get(eventName)(...args);
    }
}