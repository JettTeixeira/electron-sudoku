
const __cellSize = 50;

class SudokuScreen {
    
    /**
     * Sudoku instance
     */
    constructor() {

        this.grid = [];
        this.numbersBtn = [];
        this.currentNumber = null;

        this.generateGrid();
        this.generateNumbers();
    }

    generateGrid() {

        for (let r = 0; r < 9; ++r) {
            
            let row = [];

            for (let c = 0; c < 9; ++c) {

                let sudokuNumber = new SudokuNumber(177+c*50,72+r*50,48,48);

                sudokuNumber.onMouseUp = () => {
                    sudokuNumber.setValue(this.currentNumber.text);
                }
                
                row.push(sudokuNumber);
            }

            this.grid.push(row);
        }

    }

    generateNumbers() {

        for (let i = 0; i < 9; ++i) {
            
            let numberBtn = new CanvasButton(177+i*50,540,40,40,i+1, "Tahoma 15px");

            numberBtn.onMouseUp = () => {

                this.currentNumber.setProperties({backgroundColor:'#FFFFFF'});
                numberBtn.setProperties({backgroundColor:'#DDDDDD'});

                this.currentNumber = numberBtn;
            };

            this.numbersBtn.push(numberBtn);
        }

        this.currentNumber = this.numbersBtn[0];
        this.currentNumber.setProperties({backgroundColor:'#DDDDDD'});
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
        
        // Draw grey lines (all grid)
        canvasCtx.fillStyle = "#AAAAAA";
        canvasCtx.beginPath();

        for (let i = 0; i < 10; ++i) {

            canvasCtx.rect(175+__cellSize*i,70,2,this.grid.length*50);
            canvasCtx.rect(175,70+__cellSize*i,this.grid.length*50,2);
        }

        // End draw
        canvasCtx.fill();

        // Draw black lines (group lines)
        canvasCtx.fillStyle = "#000000";
        canvasCtx.beginPath();

        // We add "+2" on the length of the lines beucase the anchor is 2
        for (let i = 0; i < 10; i+=3) {

            // Horizontal
            canvasCtx.rect(175+__cellSize*i,70,2,this.grid.length*50+2);

            // Vertical
            canvasCtx.rect(175,70+__cellSize*i,this.grid.length*50+2,2);
        }

        // End draw
        canvasCtx.fill();

        this.grid.forEach(r => r.forEach(e => e.draw(canvasCtx)));

        this.numbersBtn.forEach(e => e.draw(canvasCtx));
    }

    handleEvent(event, x, y) {

        this.numbersBtn.forEach(e => e.handleEvent(event, x, y));

        this.grid.forEach(r => r.forEach(e => e.handleEvent(event, x, y)));
    }    
}