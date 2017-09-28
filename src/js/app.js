
// TODO: TESTING FUNCT!

const game = new Game(document.getElementById("canvas"));

let __ctx = document.getElementById("canvas").getContext("2d");

__ctx.fillStyle = "#FFFFFF";
__ctx.fillRect(0,0,800,600);

game.draw();