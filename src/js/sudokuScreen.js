
const __cellSize = 50;

class SudokuScreen {
    
    /**
     * Sudoku instance
     */
    constructor(eventManager, properties) {

        this.grid = [];
        this.numbersBtn = [];
        this.currentNumber = null;
        this.properties = properties;
        this.eventManager = eventManager;

        this.generateGrid();
        this.generateNumbers();
    }

    generateGrid() {

        for (let r = 0; r < 9; ++r) {
            
            let row = [];

            for (let c = 0; c < 9; ++c) {

                let sudokuNumber = new SudokuNumber(177+c*50,72+r*50,48,48, Math.floor((r*3+r/3+c)%9+1));

                sudokuNumber.onMouseUp = () => {
                    sudokuNumber.setValue(this.currentNumber.text);
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
        
        // Delete and block
        let i = 0;
        let current = 0;
        let max = 81/this.properties.clues;
        let block =  Math.floor(max) - Math.floor(Math.random() * Math.ceil(81/this.properties.clues));//Math.floor(Math.random() * Math.ceil(81/this.properties.clues));
console.log(++i,block,max);
        while(current < 81) {

            if(current>=max) {
                max += 81/this.properties.clues;
                block = Math.floor(max) - Math.floor(Math.random() * Math.ceil(81/this.properties.clues));
                console.log(++i,block,Math.floor(max));
            }

            let sudokuNumber = this.grid[Math.floor(current/9)][current%9];

            if (current == block)
                sudokuNumber.block = true;
            else
               sudokuNumber.value = 0;

            ++current;
        }
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