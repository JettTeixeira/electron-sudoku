
class SudokuNumber extends CanvasObject {

    constructor(x, y, width, height, value = 0) {
        super(x, y, width, height);
        this.value = value;
        this.block = false;
        this.isCollision = false;
        this.possibleValues = [1,2,3,4,5,6,7,8,9];
        this.userMark = [];
    }

    /**
     * Set new value
     * @param {Number} value New value
     * @return {SudokuNumber} Instance of this
     */
    setValue(value) {

        // Is blocked?
        if (this.block)
            return this;

        // Is valid?
        if (value < 0 || value > 9)
            throw new Error('Invalid number entry');

        if (this.value == value)
            value = 0;

        // Set value
        this.value = value;

        // Return class
        return this;
    }

    /**
     * Get the value of the number
     * @returns {SudokuNumber} Value of number
     */
    getValue() {

        return this.value;
    }

    setBlock(block) {

        this.block = block;

        return this;
    }

    isBlock() {

        return this.block;
    }

    setUserMark() {

    }

    draw(canvasCtx) {

        if(this.isCollision)
            canvasCtx.fillStyle = "#d80404";
        else if (this.block)
            canvasCtx.fillStyle = "#666666";
        else
            canvasCtx.fillStyle = "#FFFFFF";

        canvasCtx.beginPath();

        canvasCtx.rect(this.x,this.y, this.width, this.height);
        
        canvasCtx.fill();

        canvasCtx.fillStyle = "#000000";
        canvasCtx.font= "30px Tahoma";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 

        if (this.value)
            canvasCtx.fillText(this.value,this.x+24,this.y+24);
    }
}
