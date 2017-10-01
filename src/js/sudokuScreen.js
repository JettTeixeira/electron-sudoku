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

        //TODO: view!
        this.powerActive = false;
        
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

        // When ticks ends on 'blockUpTimer'
        this.blockUpTimer.eventTimer = () => {
            this.triggerPower(Math.floor(Math.random()*5));

        };
    }

    generateGrid() {

        for (let r = 0; r < 9; ++r) {
            
            let row = [];

            for (let c = 0; c < 9; ++c) {

                let sudokuNumber = new SudokuNumber(177+c*50,72+r*50,48,48, Math.floor((r*3+r/3+c)%9+1));

                sudokuNumber.onMouseUp = () => {
                    sudokuNumber.setValue(this.currentNumber.text);
                    this.trySolve();
                    this.tryError();
                }
                
                row.push(sudokuNumber);
            }

            this.grid.push(row);
        }

        // Simplest way ^^
        for (let i = 1; i < 7; ++i) {
            this.swapNumbers(i, Math.floor(Math.random()*9+1));
            this.swapRows(Math.floor(Math.random()*3),Math.floor(Math.random()*3),Math.floor(Math.random()*3));
            this.swapGroups(Math.floor(Math.random()*3),Math.floor(Math.random()*3,Math.random()*3));
            this.rotateChess();
        }

        let current = 0;
        let max = 81/this.properties.clues;
        let block = Math.floor(Math.random() * Math.round(max));

        while (current < 81) {

            if (current >= Math.round(max)) {
                block = Math.floor(Math.random() * (Math.round(max+81/this.properties.clues) - Math.round(max)) + Math.round(max));
                max += 81/this.properties.clues;
            }

            let sudokuNumber = this.grid[Math.floor(current/9)][current%9];
            
            if (current == block)
                sudokuNumber.block = true;
            else
                sudokuNumber.value = 0;

            ++current;

        }
        console.log("YAY");
    }

    swapNumbers(from, to) {

        this.grid.forEach(r => {
            r.forEach(e => {
                if (e.value == from)
                    e.value = to;
                else if (e.value == to)
                    e.value = from;
            });
        });
        
    }

    swapRows(group, from, to) {

        from = this.grid[group*3+from];
        to = this.grid[group*3+to];

        for (let i = 0; i < 9; ++i) {
            let tmpVal = from[i].value;
            from[i].value = to[i].value;
            to[i].value = tmpVal;
        }
    }

    swapGroups(from, to) {

        from = from*3;
        to = to*3;

        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 9; ++j) {
                let tmpVal = this.grid[from+i][j].value;
                this.grid[from+i][j].value = this.grid[to+i][j].value;
                this.grid[to+i][j].value = tmpVal;
            }
        }
    }

    rotateChess() {

        for (let r = 0; r < 9; ++r) {
            for (let c = r+1; c < 9; ++c) {
                let tmpVal = this.grid[r][c].value;
                this.grid[r][c].value = this.grid[c][r].value;
                this.grid[c][r].value = tmpVal;
                
            }
        }

        for (let r = 0; r < 9; ++r) {
            for (let c = 0; c < 4; ++c) {
                let tmpVal = this.grid[r][c].value;
                this.grid[r][c].value = this.grid[r][8-c].value;
                this.grid[r][8-c].value = tmpVal;
                
            }
        }
    }

    generateNumbers() {

        for (let i = 0; i < 9; ++i) {
            
            let numberBtn = new CanvasButton(181+i*50,540,40,40,i+1, "Tahoma 15px");

            numberBtn.onMouseUp = () => {
                if(!numberBtn.blocked){
                    this.currentNumber.setProperties({backgroundColor:'#FFFFFF'});
                    numberBtn.setProperties({backgroundColor:'#DDDDDD'});

                    this.currentNumber = numberBtn;
                }
            };

            this.numbersBtn.push(numberBtn);
        }

        this.currentNumber = this.numbersBtn[0];
        this.currentNumber.setProperties({backgroundColor:'#DDDDDD'});
    }

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

        this.globalTimer.draw(canvasCtx);
        this.blockUpTimer.draw(canvasCtx);
        this.blockUpPowerDuration.draw(canvasCtx);
    }

    handleEvent(event, x, y) {

        this.numbersBtn.forEach(e => e.handleEvent(event, x, y));

        this.grid.forEach(r => r.forEach(e => e.handleEvent(event, x, y)));
    }

    findSolutions(rawGrid, solutions = []) {

        if (!this.properties.errors)
            return;

        let emptyCell = this.findEmptyCell(rawGrid);

        if (!emptyCell) {


            let tmpGrid = rawGrid.map(arr => arr.slice());
            solutions.push(tmpGrid);
            return solutions;
        }

        let row = emptyCell[0];
        let col = emptyCell[1];

        for(let n = 1; n <= 9; ++n) {
            if (!this.isValid(rawGrid, row, col, n))
                continue;

            rawGrid[row][col] = n;
            
            this.findSolutions(rawGrid, solutions);
            
            rawGrid[row][col] = 0;
        }

        return solutions;
    }

    isValid(rawGrid, row, col, number) {
        let length = rawGrid.length;
        let width = Math.sqrt(length);

        if (number == 0)
            return false;

        for(let i = 0; i < length; ++i)
            if(i !== col && rawGrid[row][i] === number)
                return false;

        for(let i = 0; i < length; ++i)
            if(i !== row && rawGrid[i][col] === number)
                return false;

        let limit_x = width * Math.floor(row / width);
        let limit_y = width * Math.floor(col / width);

        for(let i = 0; i < width; ++i)
        for(let j = 0; j < width; ++j){
            if(limit_x + i == row && limit_y + j == col)
                continue;

            if(rawGrid[limit_x + i][limit_y + j] === number)
                return false;
        }

        return true;
    }
        
    generateRawGrid() {

        let rawGrid = [];
        
        for(let row of this.grid){
            let rawRow = [];

            for(let number of row)
                rawRow.push(number.value);

            rawGrid.push(rawRow);
        }

        return rawGrid;
    }

    findEmptyCell(rawGrid) {
        let length = rawGrid.length;
        
        for(let i = 0; i < length; ++i)
            for(let j = 0; j < length; ++j)
                if(rawGrid[i][j] === 0)
                    return [i, j];
        
        return false;
    }

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
}
