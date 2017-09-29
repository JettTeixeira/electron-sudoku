
// TODO: TESTING FUNCT!

const game = new Game(document.getElementById("canvas"));

//);

game.canvas.addEventListener("mousemove", event => {

    let rect = game.canvas.getBoundingClientRect();

    game.handleEvent("move", event.clientX - rect.left, event.clientY - rect.top);
});

game.canvas.addEventListener("mousedown", event => {
    
    let rect = game.canvas.getBoundingClientRect();
    
    game.handleEvent("down", event.clientX - rect.left, event.clientY - rect.top);
});

game.canvas.addEventListener("mouseup", event => {
    
    let rect = game.canvas.getBoundingClientRect();
    
    game.handleEvent("up", event.clientX - rect.left, event.clientY - rect.top);
});

// Anonymous function to exec draw in Game context
setInterval(function(){game.draw();},100);