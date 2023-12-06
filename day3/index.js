const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lines = []

rl.on('line', (line) => {
    lines.push(line)
})


function solve(grid) {
    let connectedNumbers = [];

    const dfs = (row, column, currentSequence, connectedSymbol) => {
        if (
            row < 0 ||
            row >= grid.length ||
            column < 0 ||
            column >= grid[row].length ||
            grid[row][column] === '.'
        ) {
            return;
        }

        const currentChar = grid[row][column];
        grid[row][column] = '.';

        if (!isNaN(currentChar) && currentChar !== connectedSymbol) {
            connectedSymbol = currentChar;
            currentSequence.push(currentChar);
        } else if (currentChar !== '.') {
            connectedSymbol = currentChar;
            currentSequence.push(currentChar);
        }

        const neighbors = [
            { row: row - 1, column: column - 1 },
            { row: row - 1, column: column },
            { row: row - 1, column: column + 1 },
            { row: row, column: column - 1 },
            { row: row, column: column + 1 },
            { row: row + 1, column: column - 1 },
            { row: row + 1, column: column },
            { row: row + 1, column: column + 1 }
        ];

        for (const neighbor of neighbors) {
            dfs(neighbor.row, neighbor.column, currentSequence, connectedSymbol);
        }
    };

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex++) {
            const currentChar = grid[rowIndex][columnIndex];

            if (!isNaN(currentChar) || currentChar !== '.') {
                const currentSequence = [];
                let connectedSymbol = '';

                dfs(rowIndex, columnIndex, currentSequence, connectedSymbol);

                if (currentSequence.length > 0) {

                    connectedNumbers.push({
                        sequence: currentSequence.join(''),
                        symbol: connectedSymbol
                    });
                }
            }
        }
    }

    const result = []
    connectedNumbers.forEach(element => {
        if(!/^\d+$/.test(element.sequence)){
            result.push(element.sequence)
        }
    });
    return result
}



function extractNumbersFromString(inputStrings) {
    console.log(inputStrings)
    const regex = /\d+/g;

    const numbersArray = []

    inputStrings.forEach(input => {
        input.match(regex).forEach(match => {
            numbersArray.push(match)
        });
    });
    
    return numbersArray || [];
  }

rl.on('close', () => {
    const grid = lines.map(line => line.split(''))

    const result = solve(grid)

    const extract = extractNumbersFromString(result)

    let sum = 0

    extract.forEach(number => {
        sum += parseInt(number)
    });

    console.log(sum)
});