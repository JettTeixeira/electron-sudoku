/*!
 * Electron Sodoku <https://github.com/JettTeixeira/electron-sudoku>
 * 
 * @name      SudokuScreen
 * @version   v1.0
 * @copyright Copyright (c) 2017 Leonardo Alfaro, Luis Callo Milla, Jett Teixeira
 * @license   MIT Licensed
 * 
 * DESCRIPTION
 * ===========
 * 
 * Sudoku Screen of game. SuDoKu game!!
 * 
 */
const __cellSize = 50;

class SudokuScreen {
    
    /**
     * Create Sudoku Screen
     * @param {EventManager} eventManager Game event manager
     * @param {Object} propreties Sudoku properties
     */
    constructor(eventManager, properties) {

        // Set event manager
        this.eventManager = eventManager;

        // Set properties
        this.properties = properties;

        // Sudoku grid
        this.grid = [];
        this.generateGrid();

        // Sudoku solutions
        this.solutions = this.properties.errors ? this.findSolutions(this.generateRawGrid()) : [];

        // Playable numbers buttons
        this.numbersBtn = [];
        this.currentNumber = null;
        this.generateNumbers();
        
        // Timers
        this.globalTimer = new CanvasTimer(200,15,100,40,"Timer:",this.properties.timer);
        this.blockUpTimer = new CanvasTimer(350,15,100,40,"PC Turn:",this.properties.blockUpTimer);
        this.blockUpPowerDuration = new CanvasTimer(500,15,100,40,"PC Power:",0);
        
        // Init timers
        this.globalTimer.initTimer();
        this.blockUpTimer.initTimer();

        // Set events
        this.setEvents();
    }

    /**
     * Set events of the screen objects
     * @returns {Boolean} Setted correctly
     */
    setEvents() {

        // When ticks ends on 'globalTimer'
        this.globalTimer.eventTimer = () => {

            // Stop all timers
            this.globalTimer.stopTimer();
            this.blockUpTimer.stopTimer();
            this.blockUpPowerDuration.stopTimer();

            // Shows final screen with 'fail' message
            this.eventManager.fire('showFinal', 'FAIL');
        };

        // Trigger power when ticks ends on 'blockUpTimer'  
        this.blockUpTimer.eventTimer = () => this.triggerPower(Math.floor(Math.random()*5));

        // Return true
        return true;
    }

    /**
     * Generate a valid sudoku game from a single combination.
     * 1. Generate a valid sudoku by formula
     * 2. Apply scrambling methods
     * 3. Delete random values and others block them
     */
    generateGrid() {

        // 1. Generate a valid sudoku by formula:
        for (let r = 0; r < 9; ++r) {
            
            // Empty row
            let row = [];

            // Populate
            for (let c = 0; c < 9; ++c) {

                // New sudokuNumber (This function generates a valid sudoku)
                let sudokuNumber = new SudokuNumber(177+c*50,72+r*50,48,48, Math.floor((r*3+r/3+c)%9+1));

                // Set event: set value, is solved? have errors?
                sudokuNumber.onMouseUp = () => {
                    sudokuNumber.setValue(this.currentNumber.text);
                    this.trySolve();
                    this.tryError();
                }
                
                // Push row populated
                row.push(sudokuNumber);
            }

            // Populate grid
            this.grid.push(row);
        }

        // 2. Apply scrambling methods
        for (let i = 1; i < 7; ++i) {
            this.swapNumbers(i, Math.floor(Math.random()*9+1));
            this.swapRows(Math.floor(Math.random()*3),Math.floor(Math.random()*3),Math.floor(Math.random()*3));
            this.swapGroups(Math.floor(Math.random()*3),Math.floor(Math.random()*3,Math.random()*3));
            this.rotateChess();
        }

        // 3. Delete random values and others block them
        let current = 0;
        let max = 81/this.properties.clues;
        let block = Math.floor(Math.random() * Math.round(max));

        // While not processed all the cells
        while (current < 81) {

            // Current verify all the section? Set new block position, set new section
            if (current >= Math.round(max)) {
                block = Math.floor(Math.random() * (Math.round(max+81/this.properties.clues) - Math.round(max)) + Math.round(max));
                max += 81/this.properties.clues;
            }

            // Get sudoku number
            let sudokuNumber = this.grid[Math.floor(current/9)][current%9];
            
            // Need block?
            if (current == block)
                sudokuNumber.block = true;
            else
                sudokuNumber.value = 0;

            // Process next cell
            ++current;
        }
    }

    /**
     * Swap all numbers of grid (a,b)=>(b,a)
     * @param {Integer} from First number to swap
     * @param {Integer} to Second number to swap
     */
    swapNumbers(from, to) {

        // For each element of the grid, change it!
        this.grid.forEach(r => {
            r.forEach(e => {
                if (e.value == from)
                    e.value = to;
                else if (e.value == to)
                    e.value = from;
            });
        });   
    }

    /**
     * Swap rows inside group 'triplets' (a,b,c) =(a,c)=> (c,b,a)
     * @param {Integer} group Number of group to move
     * @param {Integer} from First number row to swap
     * @param {Integer} to Second number row to swap
     */
    swapRows(group, from, to) {

        // Get positions of rows
        from = this.grid[group*3+from];
        to = this.grid[group*3+to];

        // Move each value of row
        for (let i = 0; i < 9; ++i) {
            let tmpVal = from[i].value;
            from[i].value = to[i].value;
            to[i].value = tmpVal;
        }
    }

    /**
     * Swap groups ([.a.],[.b.],[.c.])  =(a,c)=> ([.c.],[.b.],[.a.])
     * @param {Integer} from First number to swap
     * @param {Integer} to Second number to swap
     */
    swapGroups(from, to) {

        // Get positions of group
        from = from*3;
        to = to*3;

        // Move each value of group
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 9; ++j) {
                let tmpVal = this.grid[from+i][j].value;
                this.grid[from+i][j].value = this.grid[to+i][j].value;
                this.grid[to+i][j].value = tmpVal;
            }
        }
    }

    /**
     * Rotate grid 90 degrees
     */
    rotateChess() {

        // Transpose the matrix
        for (let r = 0; r < 9; ++r) {
            for (let c = r+1; c < 9; ++c) {
                let tmpVal = this.grid[r][c].value;
                this.grid[r][c].value = this.grid[c][r].value;
                this.grid[c][r].value = tmpVal;
                
            }
        }

        // Swap all rows (a,b,c,d,e) => (e,b,c,d,a)
        for (let r = 0; r < 9; ++r) {
            for (let c = 0; c < 4; ++c) {
                let tmpVal = this.grid[r][c].value;
                this.grid[r][c].value = this.grid[r][8-c].value;
                this.grid[r][8-c].value = tmpVal;
                
            }
        }
    }

    /**
     * Generate button numbers 1-9 for play
     */
    generateNumbers() {

        // Generate 9 numbers
        for (let i = 0; i < 9; ++i) {
            
            // Create number canvas button
            let numberBtn = new CanvasButton(181+i*50,540,40,40,i+1, "Tahoma 15px");

            // Add event
            numberBtn.onMouseUp = () => {
                
                // Is blocked?
                if(numberBtn.blocked)
                    return;

                // Change number ^^
                this.currentNumber.setProperties({backgroundColor:'#FFFFFF'});
                numberBtn.setProperties({backgroundColor:'#DDDDDD'});
                this.currentNumber = numberBtn;
                
            };

            // Push number
            this.numbersBtn.push(numberBtn);
        }

        // Set default
        this.currentNumber = this.numbersBtn[0];
        this.currentNumber.setProperties({backgroundColor:'#DDDDDD'});
    }

    /**
     * Use backtracking for find all solutions
     * @param {Array} rawGrid Only number sudoku grid
     * @param {Array} solutions store the solutions
     * @returns {Array} All solutions
     */
    findSolutions(rawGrid, solutions = []) {

        // Errors?
        if (!this.properties.errors)
            return;

        // Get empty cell
        let emptyCell = this.findEmptyCell(rawGrid);

        // Not empty? register solution
        if (!emptyCell) {
            let tmpGrid = rawGrid.map(arr => arr.slice());
            solutions.push(tmpGrid);
            return solutions;
        }

        // Get row and col of empty cell
        let row = emptyCell[0];
        let col = emptyCell[1];

        // Try all posibilities
        for(let n = 1; n <= 9; ++n) {

            // Is valid?
            if (!this.isValid(rawGrid, row, col, n))
                continue;

            // Set number
            rawGrid[row][col] = n;
            
            // Try find solution
            this.findSolutions(rawGrid, solutions);
            
            // Remove number
            rawGrid[row][col] = 0;
        }

        // Return solutions
        return solutions;
    }

    /**
     * Validate a value in the grid
     * @param {Array} rawGrid Only number sudoku grid
     * @param {Array} row Row of number
     * @param {Array} col Column of number
     * @param {Array} number Number to validate
     * @returns {Boolean} Is valid?
     */
    isValid(rawGrid, row, col, number) {

        // Get lengths
        let length = rawGrid.length;
        let width = Math.sqrt(length);

        // Is zero?
        if (number == 0)
            return false;

        // Col valid?
        for(let i = 0; i < length; ++i)
            if(i !== col && rawGrid[row][i] === number)
                return false;

        // Row valid?
        for(let i = 0; i < length; ++i)
            if(i !== row && rawGrid[i][col] === number)
                return false;

        // Get gruop limits
        let limit_x = width * Math.floor(row / width);
        let limit_y = width * Math.floor(col / width);

        // Group valid?
        for(let i = 0; i < width; ++i) {
            for(let j = 0; j < width; ++j){
                if(limit_x + i == row && limit_y + j == col)
                    continue;

                if(rawGrid[limit_x + i][limit_y + j] === number)
                    return false;
            }
        }

        // return try
        return true;
    }
    
    /**
     * Generate a grid of numbers
     * @return {Array} Grid of numbers
     */
    generateRawGrid() {

        // Empty array
        let rawGrid = [];
        
        // For each row
        for(let row of this.grid){

            // Empty row
            let rawRow = [];

            // Populate row
            for(let number of row)
                rawRow.push(number.value);

            // Populate rawGrid
            rawGrid.push(rawRow);
        }

        // Return rawGrid
        return rawGrid;
    }

    /**
     * Find position of empty cell
     * @param {Array} rawGrid Only number sudoku grid
     * @return {Integer|Boolean} Position of empty cell or false
     */
    findEmptyCell(rawGrid) {
        let length = rawGrid.length;
        
        for(let i = 0; i < length; ++i)
            for(let j = 0; j < length; ++j)
                if(rawGrid[i][j] === 0)
                    return [i, j];
        
        return false;
    }

    /**
     * View if is solved, in that case, go to final screen
     */
    trySolve() {

        for (let r = 0; r < 9; ++r)
            for (let c = 0; c < 9; ++c)
                if (!this.grid[r][c].value)
                    return false;

        let rawGrid = this.generateRawGrid();

        for (let r = 0; r < 9; ++r)
            for (let c = 0; c < 9; ++c)
                if (!this.isValid(rawGrid, r, c, rawGrid[r][c]))
                    return false;

        this.globalTimer.stopTimer();
        this.blockUpTimer.stopTimer();
        this.blockUpPowerDuration.stopTimer();
        this.eventManager.fire('showFinal', 'WIN');
    }

    /**
     * Try to find erros
     */
    tryError() {

        if (!this.properties.errors)
            return;

        let max = -1;
        let weights = new Array(this.solutions.length).fill(0);

        for (let i = 0; i < weights.length; ++i) {
            
            for (let r = 0; r < 9; ++r)
                for (let c = 0; c < 9; ++c)
                    if (this.grid[r][c].value == this.solutions[i][r][c])
                        ++weights[i];

            max = Math.max(max, weights[i]);

        }

        for (let i = 0; i < weights.length; ++i) {
            if (weights[i] != max)
                continue;
            for (let r = 0; r < 9; ++r)
                for (let c = 0; c < 9; ++c)
                    if (this.grid[r][c].value && this.grid[r][c].value != this.solutions[i][r][c])
                        this.grid[r][c].isCollision = true;
                    else
                        this.grid[r][c].isCollision = false;
        }
    }

    /**
     * PC turn movement
     * @param {Integer} powerId Power id
     */
    triggerPower(powerId){

        switch(powerId) {
            case 0:
                return this.blockNumberPower();
                break;
            case 1:
                return this.DeleteNumberPower();
                break;
            case 2:
                return this.BlindScreenPower();
                break;
            case 3:
                return this.FakeItPower();
                break;
            case 4:
                return this.MyTurnPower();
                break;
        }

        throw new Error('Invalid power');
    }

    /**
     * Select a random number and you can't use it until some time
     */
    blockNumberPower() {

        let blocked = Math.floor(Math.random() * 9);

        this.numbersBtn[blocked].blocked = true;
        this.numbersBtn[blocked].setProperties({backgroundColor: "#000000", overBackgroundColor: "#000000", clickedBackgroundColor: "#000000"});

        if (this.currentNumber.text == blocked+1) {

            this.currentNumber = this.numbersBtn[(blocked+1)%9];
            this.currentNumber.setProperties({backgroundColor:'#DDDDDD'});
        }

        this.blockUpPowerDuration.eventTimer = () => {
            this.numbersBtn[blocked].blocked = false;
            this.numbersBtn[blocked].setProperties({backgroundColor: "#FFFFFF", overBackgroundColor: "#DDDDDD", clickedBackgroundColor: "#AAAAAA"});
            this.blockUpPowerDuration.stopTimer();
        }

        this.blockUpPowerDuration.current = this.properties.blockUpPowerDuration;
        this.blockUpPowerDuration.initTimer();

        return true;
    }

    /**
     * Remove a random number on your grid. This does not include the numbers that come by default
     */
    DeleteNumberPower() {

        let number = Math.floor(Math.random() * 81);
        let current = number;

        do {

            let sudokuNumber = this.grid[Math.floor(current/9)][current%9];

            if (!sudokuNumber.block && sudokuNumber.value) {
    
                sudokuNumber.value = 0;
                sudokuNumber.isCollision = false;
                break;
            }
            
            current = (current+1)%81;

        } while(current != number);
        
        return true;
    }

    /**
     * A section of the grid will be covered until some time. If you remember where to set the numbers you can do it
     */
    BlindScreenPower() {

        let limit_x = Math.floor(Math.random()*3);
        let limit_y = Math.floor(Math.random()*3);

        for(let r = limit_x*3; r < limit_x*3+3; ++r)
            for(let c = limit_y*3; c < limit_y*3+3; ++c)
                this.grid[r][c].hidden = true;

        this.blockUpPowerDuration.eventTimer = () => {
            for(let r = limit_x*3; r < limit_x*3+3; ++r)
                for(let c = limit_y*3; c < limit_y*3+3; ++c)
                    this.grid[r][c].hidden = false;
            this.blockUpPowerDuration.stopTimer();
        }
        
        this.blockUpPowerDuration.current = this.properties.blockUpPowerDuration;
        this.blockUpPowerDuration.initTimer();

        return true;
    }

    /**
     * A random number will change. This does not include the numbers that come by default
     */
    FakeItPower() {
        
        let number = Math.floor(Math.random() * 81);
        let current = number;

        do {

            let sudokuNumber = this.grid[Math.floor(current/9)][current%9];

            if (!sudokuNumber.block && sudokuNumber.value) {
                sudokuNumber.value = (sudokuNumber.value + Math.floor(Math.random() * 8))%9+1;
                this.trySolve();
                this.tryError();
                break;
            }
            
            current = (current+1)%81;

        } while(current != number);
        
        return true;
    }

    /**
     * The computer will set a random number in a random blank cell
     */
    MyTurnPower(){
        
        let number = Math.floor(Math.random() * 81);
        let current = number;

        do {

            let sudokuNumber = this.grid[Math.floor(current/9)][current%9];

            if (!sudokuNumber.block && !sudokuNumber.value) {
                sudokuNumber.value = Math.floor(Math.random() * 9)+1;
                this.trySolve();
                this.tryError();
                break;
            }
            
            current = (current+1)%81;

        } while(current != number);
        
        return true;
    }

    /**
     * Draw object
     * @param {Object} canvasCtx Canvas Context to draw
     */
    draw(canvasCtx) {
        
        // Layer 1: Grey lines (All grid)
        canvasCtx.fillStyle = "#AAAAAA";
        for (let i = 0; i < 10; ++i) {
            canvasCtx.fillRect(175+50*i,70,2,this.grid.length*50);
            canvasCtx.fillRect(175,70+50*i,this.grid.length*50,2);
        }

        // Layer 2: Black lines (Group lines)
        canvasCtx.fillStyle = "#000000";
        for (let i = 0; i < 10; i+=3) {
            canvasCtx.fillRect(175+50*i,70,2,this.grid.length*50+2);
            canvasCtx.fillRect(175,70+50*i,this.grid.length*50+2,2);
        }

        // Layer 3: Grid cells & Number buttons
        this.grid.forEach(r => r.forEach(e => e.draw(canvasCtx)));
        this.numbersBtn.forEach(e => e.draw(canvasCtx));

        // Layer 4: Timers
        this.globalTimer.draw(canvasCtx);
        this.blockUpTimer.draw(canvasCtx);
        this.blockUpPowerDuration.draw(canvasCtx);
    }

    /**
     * Handle events of objects
     * @param {String} event Event to execute
     * @param {Integer} x Event trigger x coordinate
     * @param {Integer} y Event trigger y coordinate
     * @returns {Boolean} Executed correctly
     */
    handleEvent(event, x, y) {

        // Buttons events
        this.numbersBtn.forEach(e => e.handleEvent(event, x, y));

        // Grid events
        this.grid.forEach(r => r.forEach(e => e.handleEvent(event, x, y)));

        // Return true
        return true;
    }
}
