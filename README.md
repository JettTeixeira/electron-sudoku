# Sudoku

A new type of sudoku where the computer wants to lose you.

## Rules

- Starts with a 9x9 grid.
- You must set numbers 1 to 9 in the empty squares.
- Numbers can only be once in each row and column. At the same way, we have boxes 3x3 who contains the same numbers only once.
- Well, the computer doesn't wanna play, because it always wins. That's why it has put two timers:
  - Global Timer: If you solve the sudoku before it reaches zero you win.
  - Block-up Timer: When it reaches zero, the computer will do something that will work against you.

## Computer Movements

- **Block Number:** Select a random number and you can't use it until some time.
- **Delete Number:** Remove a random number on your grid. This does not include the numbers that come by default
- **Blind Screen:** A section of the grid will be covered until some time. If you remember where to set the numbers you can do it.
- **Fake It:** A random number will change it. This does not include the numbers that come by default.
- **My turn:** The computer will set a random number in random blank cell.

## Dificulties

- **Easy:**
  - Global Timer: 20 minutes
  - Block-up Timer: 1 minute
  - Block-up Power Duration: 15 seconds
  - Clues: 40
  - Grid errors: Displayed

- **Normal:**
  - Global Timer: 10 minutes
  - Block-up Timer: 1 minute
  - Block-up Power Duration: 30 seconds
  - Clues: 30
  - Grid errors: Hidden

- **Hard:**
  - Global Timer: 20 minutes
  - Block-up Timer: 30 seconds
  - Block-up Power Duration: 30 seconds
  - Clues: 30
  - Grid errors: Hidden


## Installation

You require [Node.js](https://nodejs.org/) to run.

Install the dependencies:

```sh
$ npm install
```

Afer that for simple start:

```sh
$ npm start
```

To make binaries:

```sh
$ npm run build         # Build all plataforms
$ npm run package-osx   # Only build OS X 
$ npm run package-win   # Only build Windows
$ npm run package-linux # Only build Linux
```

# Members

- Alfaro Carrasco, Leonardo Daniel
- Callo Milla, Luis Eduardo
- Teixeira Walters, Jett Manuel