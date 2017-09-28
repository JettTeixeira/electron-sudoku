
class Sudoku {
    
    /**
     * Sudoku instance
     */
    constructor() {

        this.grid = Array(9).fill(0).map(() => Array(9).fill(0));
        
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

        // Return clas
        return this;
    }

    /**
     * Draw the chess in canvas
     * @param {Object} canvasCtx Canvas context object
     */
    drawChess(canvasCtx) {

        // TODO:
        let __cellSize = 50;

        // Set Lines properties
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = '#000000';

        canvasCtx.beginPath();

        for (let i = 0; i < 10; ++i) {
            
            // Horizontal
            canvasCtx.moveTo(10, 10+i*__cellSize);
            canvasCtx.lineTo(10+9*__cellSize, 10+i*__cellSize);
            
            // Vectical
            canvasCtx.moveTo(10+i*__cellSize, 10);
            canvasCtx.lineTo(10+i*__cellSize, 10+9*__cellSize);
        }
        

        //canvasCtx.moveTo(50,50);
        //canvasCtx.lineTo(80,80);

        canvasCtx.stroke();

    }
}