
const __cellSize = 50;

class SudokuScreen {
    
    /**
     * Sudoku instance
     */
    constructor(eventManager, properties) {

        this.grid = [];
        //this.rawGrid = [];
        //this.tempGrid = [];
        this.solutions = null;
        this.numbersBtn = [];
        this.currentNumber = null;
        this.properties = properties;
        this.eventManager = eventManager;
        
        this.globalTimer = new CanvasTimer(200,15,100,40,"Timer:",this.properties.timer);
        this.blockUpTimer = new CanvasTimer(350,15,100,40,"PC Turn:",this.properties.blockUpTimer);
        this.blockUpPowerDuration = new CanvasTimer(500,15,100,40,"PC Power:",0);
        

        this.generateGrid();
        this.generateNumbers();
        

        this.solutions = this.findSolutions(this.generateRawGrid());

        // As this is a relatively expensive function, we'll only run it if we're going to check for errors (easy mode)
        //if(this.properties['errores'])
        //    this.findSolutions();
        //    console.log(this.solutions);

        this.globalTimer.initTimer();
        this.blockUpTimer.initTimer();

        this.setEvents();
    }

    setEvents() {

        this.globalTimer.eventTimer = () => {
            this.globalTimer.stopTimer();
            this.blockUpTimer.stopTimer();
            this.blockUpPowerDuration.stopTimer();

            this.eventManager.fire('showFinal', 'FAIL');
        };

        this.blockUpTimer.eventTimer = () => {
            this.blockUpPowerDuration.current = this.properties.blockUpPowerDuration;
            this.blockUpPowerDuration.initTimer();
            if(Math.floor(Math.random() * 10) % 2 = 0)
                this.triggerPower();
        };

        this.blockUpPowerDuration.eventTimer = () => {
            this.blockUpPowerDuration.stopTimer();
        };
    }

    generateGrid() {

        for (let r = 0; r < 9; ++r) {
            
            let row = [];

            for (let c = 0; c < 9; ++c) {

                let sudokuNumber = new SudokuNumber(177+c*50,72+r*50,48,48, Math.floor((r*3+r/3+c)%9+1));

                sudokuNumber.onMouseUp = () => {
                    sudokuNumber.setValue(this.currentNumber.text);
                    if(this.solveAndMark()) {
                        this.globalTimer.stopTimer();
                        this.blockUpTimer.stopTimer();
                        this.blockUpPowerDuration.stopTimer();

                        this.eventManager.fire('showFinal', 'WIN');
                    }
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

                this.currentNumber.setProperties({backgroundColor:'#FFFFFF'});
                numberBtn.setProperties({backgroundColor:'#DDDDDD'});

                this.currentNumber = numberBtn;
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

        let emptyCell = this.findEmptyCell(rawGrid);

        if (!emptyCell) {
            //copy
            console.log("DOIT!");
            let tmpGrid = rawGrid.map(arr => arr.slice());
            solutions.push(tmpGrid);
            return solutions;
        }

        let row = emptyCell[0];
        let col = emptyCell[1];
        //console.log(row,col);
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

    solveAndMark() {

        let max = -1;
        let weights = new Array(this.solutions.length).fill(0);

        for (let i = 0; i < weights.length; ++i) {
            
            for (let r = 0; r < 9; ++r)
                for (let c = 0; c < 9; ++c)
                    if (this.grid[r][c].value == this.solutions[i][r][c])
                        ++weights[i];

            max = Math.max(max, weights[i]);

        }

        if (max == 81)
            return true;

        if (!this.properties.errors)
            return false;

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

        return false;
    }

    triggerPower(){
        // TODO
    }
}
