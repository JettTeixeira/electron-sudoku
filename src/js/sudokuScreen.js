
const __cellSize = 50;

class SudokuScreen {
    
    /**
     * Sudoku instance
     */
    constructor() {

        this.grid = Array(9).fill(0).map(() => Array(9).fill(0).map(() => new SudokuNumber()));
        
    }

    /**
     * Returns a value of the specified cell
     * @param {Number} row Number of row
     * @param {Number} column Number of column
     * @return {Number} Value of cell
     */
    getCell(row, column) {

        // Return value
        return this.grid[row][column];
    }

    /**
     * Set a value in the specified cell
     * @param {Number} row Number of row
     * @param {Number} column Number of column
     * @param {Number} value New value of cell
     * @return {Sudoku} Instance of this
     */
    setCell(row, column, value) {

        // Is number? Is valid?
        if (typeof value === "Number" || value <= 0 || value > 9)
            throw new Error('Invalid number entry');

        // Row && Column are valid? 
        if (row < 0 || row > 8 || column < 0 || column > 8)
            throw new Error('Invalid pointer');
        
        // Set number
        this.grid[row][column] = number;

        // Return class
        return this;
    }

    //TODO: drawChess must delete! 
    draw(canvasCtx) {
        
        this.drawChess(canvasCtx, 10, 10);
    }

    /** TODO: must delete ^^
     * Draw the chess in canvas
     * @param {Object} canvasCtx Canvas context object
     */
    drawChess(canvasCtx, x, y) {

        // Draw grey lines (all grid)
        canvasCtx.fillStyle = "#AAAAAA";
        canvasCtx.beginPath();

        for (let i = 0; i < 10; ++i) {

            canvasCtx.rect(x+__cellSize*i,y,2,this.grid.length*50);
            canvasCtx.rect(x,y+__cellSize*i,this.grid.length*50,2);
        }

        // End draw
        canvasCtx.fill();

        // Draw black lines (group lines)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.beginPath();

        // We add "+2" on the length of the lines beucase the anchor is 2
        for (let i = 0; i < 10; i+=3) {

            // Horizontal
            canvasCtx.rect(x+__cellSize*i,y,2,this.grid.length*50+2);

            // Vertical
            canvasCtx.rect(x,y+__cellSize*i,this.grid.length*50+2,2);
        }

        // End draw
        canvasCtx.fill();

        // Draw all cells
        for (let r = 0; r < this.grid.length; ++r)
            for (let c = 0; c < this.grid.length; ++c)
                this.drawCell(canvasCtx, r, c, x, y);
    }

    drawCell(canvasCtx, row, col, x, y) {

        // +2 x border!
        this.grid[row][col].draw(canvasCtx, x + col * __cellSize + 2, y + row * __cellSize + 2);
    }

    handleEvent(event, x, y) {

    }    
}