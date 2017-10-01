/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      app.js
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Main file. This will create the game and bind some events listeners to the 
 * canvas.
 * 
 * The game will be encapsulated in a function for preventing access by console.
 */

(function(){

    // Create game
    const game = new Game(document.getElementById("canvas"));
    
    // Set 'mousemove' listener
    game.canvas.addEventListener("mousemove", event => {
    
        // Get canvas position
        let rect = game.canvas.getBoundingClientRect();
    
        // Send 'move' event with rightly mouse coordinates
        game.handleEvent("move", event.clientX - rect.left, event.clientY - rect.top);
    });
    
    // Set 'mousedown' listener
    game.canvas.addEventListener("mousedown", event => {
        
        // Get canvas position
        let rect = game.canvas.getBoundingClientRect();
        
        // Send 'down' event with rightly mouse coordinates
        game.handleEvent("down", event.clientX - rect.left, event.clientY - rect.top);
    });
    
    // Set 'mouseup' listener
    game.canvas.addEventListener("mouseup", event => {
        
        // Get canvas position
        let rect = game.canvas.getBoundingClientRect();
        
        // Send 'up' event with rightly mouse coordinates
        game.handleEvent("up", event.clientX - rect.left, event.clientY - rect.top);
    });
    
    // Anonymous function to exec draw in Game context
    setInterval(()=>game.draw(),100);
})();