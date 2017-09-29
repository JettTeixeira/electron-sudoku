
class SudokuNumber {

    constructor(value = 0) {
        this.value = value;
        this.block = false;
        this.possibleValues = [1,2,3,4,5,6,7,8,9];
        this.userMark = [];
    }

    /**
     * Set new value
     * @param {Number} value New value
     * @return {SudokuNumber} Instance of this
     */
    setValue(value) {

        // Is valid?
        if (value <= 0 || value > 9)
            throw new Error('Invalid number entry');

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

    draw(canvasCtx, x, y) {

        if (this.block)
            canvasCtx.fillStyle = "#666666";
        else
            canvasCtx.fillStyle = "#FFFFFF";

        canvasCtx.beginPath();

        canvasCtx.rect(x,y,48,48);
        
        canvasCtx.fill();

        canvasCtx.fillStyle = "#000000";
        canvasCtx.font="25px Arial";
        canvasCtx.textAlign="center";
        canvasCtx.textBaseline="middle"; 

        if (this.value)
            canvasCtx.fillText(this.value,x+24,y+24); 

    }
}