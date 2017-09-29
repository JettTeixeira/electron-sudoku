
class CanvasObject {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.over = false;
        this.clicked = false;
    }

    itCollide(x, y) {

        if (x < this.x || x > this.x + this.width)
            return false;

        if (y < this.y || y > this.y + this.height)
            return false;

        return true;
    }

    handleEvent(event, x, y) {

        if(!this.itCollide(x, y)) {
            this.over = false;
            this.clicked = false;
            return false;
        }

        if(event === "up") {
            this.clicked = false;
            return this.onMouseUp();;
        }

        if(event === "down") {
            this.clicked = true;
            return this.onMouseDown();
        }  

        if(event === "move") {
            this.over = true;
            return this.onMouseOver(); 
        }

        return false;
    }

    draw(canvasCtx) {}

    onMouseOver() {}

    onMouseDown() {}

    onMouseUp() {}
}