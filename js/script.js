var rowCount, colCount;
var bombCells = [];
var safeCells = [];
var score;
var gameOver;
var userLife = 3

function startGame() {
    var table = document.getElementById('table');
    var difficulty = document.getElementById('difficulty').value;
    var message = document.getElementById('message');
    var lifes = document.getElementById('lifes');
    table.innerHTML = ''; 
    message.textContent = '';
    lifes.textContent = 'Lifes: ' + userLife


    switch (difficulty) {
        case '1':
            rowCount = colCount = 10;
            break;
        case '2':
            rowCount = colCount = 9;
            break;
        case '3':
            rowCount = colCount = 7;
            break;
        case '4':
            rowCount = 6;
            colCount = 5;
            break;
        default:
            rowCount = colCount = 10; // Default to easy
    }

    bombCells = generateBombCells(rowCount, colCount);
    safeCells = generateSafeCells(rowCount, colCount);
    score = 0;
    userLife = 3;
    lifes.textContent = 'Lifes: ' + userLife
    gameOver = false;

    for (var i = 0; i < rowCount; i++) {
        var row = table.insertRow(i);

        for (var j = 0; j < colCount; j++) {
            var cell = row.insertCell(j);
            cell.classList.add('unrevealed');

            var rowIndex = cell.parentNode.rowIndex;
            var colIndex = cell.cellIndex;
            var cellNumber = (rowIndex * colCount) + colIndex + 1;
            if (bombCells.includes(cellNumber)) {
                cell.classList.add('hideBomb');
            }

            // Add a click event listener to each cell
            cell.addEventListener('click', function () {
                if (gameOver) return; // Don't process clicks if the game is over
                var rowIndex = this.parentNode.rowIndex;
                var colIndex = this.cellIndex;
                var cellNumber = (rowIndex * colCount) + colIndex + 1;

                if (bombCells.includes(cellNumber)) {
                    this.classList.remove('unrevealed');
                    this.classList.add('bomb');

                    if (userLife > 1) {
                        userLife--;
                        lifes.textContent = 'Lifes: ' + userLife
                    }

                    else {
                        userLife--;
                        lifes.textContent = 'Lifes: ' + userLife
                        message.textContent = 'Game Over! You clicked on a bomb. Your score: ' + score;
                        gameOver = true;

                        const allElements = document.querySelectorAll('*');


                        allElements.forEach((element) => {
                            element.classList.remove('unrevealed');
                        });
                    }

                } else if (safeCells.includes(cellNumber)) {
                    this.classList.remove('unrevealed');
                    this.classList.add('safe');
                    userLife++;
                    lifes.textContent = 'Lifes: ' + userLife
                } else {
                    if (this.classList.contains('unrevealed')) {
                        this.classList.remove('unrevealed');
                        this.classList.add('revealed');
                        score++;

                        if (score === (rowCount * colCount - bombCells.length - safeCells.length)) {
                            message.textContent = 'Congratulations! You won the game with a score of ' + score;
                            gameOver = true;
                        }
                    }
                }
                console.log('Clicked cell:', cellNumber);
            });
        }
    }
}

function generateBombCells(rows, cols) {
    var bombCells = [];
    var totalCells = rows * cols;
    var numBombs = 16; // Change this to set the number of bombs

    while (bombCells.length < numBombs) {
        var randomCell = Math.floor(Math.random() * totalCells) + 1; // Generate a random cell number from 1 to 100

        if (!bombCells.includes(randomCell)) {
            bombCells.push(randomCell);
        }
    }

    return bombCells;
}

function generateSafeCells(rows, cols) {
    var safeCells = [];
    var totalCells = rows * cols;
    var numSafes = 4; // Change this to set the number of bombs

    while (safeCells.length < numSafes) {
        var randomCell = Math.floor(Math.random() * totalCells) + 1; // Generate a random cell number from 1 to 100

        if (!safeCells.includes(randomCell) && !bombCells.includes(randomCell)) {
            safeCells.push(randomCell);
        }
    }

    return safeCells;
}