const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lines = []


rl.on('line', (line) => {
    lines.push(line)
})


const directions = {
    'U': [-1, 0],
    'UL': [-1, -1],
    'UR': [-1, 1],
    'D': [1, 0],
    'DL': [1, -1],
    'DR': [1, 1],
    'L': [0, -1],
    'R': [0, 1],
}

let visited = new Set()
let finalResult = new Set()

function solve(grid) {
    const connectedNumbers = [];
    const theRest = []
    const visitedPositions = new Set();

    let num = '';

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const currentChar = grid[i][j];

            if (!isNaN(currentChar)) {
                num += currentChar;
            } else if (num !== '') {
                const startCol = Math.max(j - num.length, 0);
                const startStr = `${i}-${startCol}`;
                
                if (!visitedPositions.has(startStr)) {
                    connectedNumbers.push({ number: num, end: [i, j - 1], start: [i, startCol] });
                    num = '';
                    for (let k = startCol; k <= j - 1; k++) {
                        visitedPositions.add(`${i}-${k}`);
                    }
                }
            }

            if (!isNaN(currentChar) || currentChar === '.') {
                for (const direction in directions) {
                    const [rowChange, colChange] = directions[direction];
                    const newRow = i + rowChange;
                    const newCol = j + colChange;

                    if (
                        newRow >= 0 &&
                        newRow < grid.length &&
                        newCol >= 0 &&
                        newCol < grid[i].length
                    ) {
                        const adjacentChar = grid[newRow][newCol];

                        if (
                            isNaN(adjacentChar) &&
                            adjacentChar !== '.' &&
                            currentChar !== '.'
                        ) {
                            theRest.push({pos: [newRow, newCol], adjecent: [i, j], symbol: adjacentChar, number: currentChar})
                        }
                    }
                }
            }
        }
        if (num !== '') {
            const startCol = Math.max(grid[i].length - num.length, 0);
            const startStr = `${i}-${startCol}`;

            if (!visitedPositions.has(startStr)) {
                connectedNumbers.push({ number: num, end: [i, grid[i].length - 1], start: [i, startCol] });
                num = '';
                for (let k = startCol; k <= grid[i].length - 1; k++) {
                    visitedPositions.add(`${i}-${k}`);
                }
            }
        }
    }
    return {numbers: connectedNumbers, symbols: theRest}
}

function getConnectedNumber(connectedNumbers, adjacentCharPos) {
    const result = []
    const symbolsConnectedToNumbers = new Set();

    connectedNumbers.forEach(numInfo => {
        const { start, end, number } = numInfo;

        let id = `${start}-${end}-${number}`;

        adjacentCharPos.forEach(symbolPosInfo => {
            const { pos: symbolPos, symbol } = symbolPosInfo;
            if (
                isPositionAdjacent(symbolPos, start) ||
                isPositionAdjacent(symbolPos, end)
            ) {
                if (!visited.has(id)) {
                    finalResult.add({ id, number });
                    visited.add(id);
                    
                    if (symbol === '*') {
                        symbolsConnectedToNumbers.add(symbolPos.join(','));
                    }
                }
            }
        });
    });

    //return [...symbolsConnectedToNumbers]

    symbolsConnectedToNumbers.forEach(symbolPos => {
        const [row, col] = symbolPos.split(',').map(Number);

        const connectedNums = connectedNumbers.filter(numInfo => {
            const { start, end } = numInfo;
            return isPositionAdjacent([row, col], start) || isPositionAdjacent([row, col], end);
        });

        if(connectedNums.length > 1) {

                result.push(connectedNums)

        }
    });
    return result
}

function isPositionAdjacent(pos1, pos2) {
    const [row1, col1] = pos1;
    const [row2, col2] = pos2;
    return (
        Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1
    );
}


rl.on('close', () => {
    const grid = lines.map(line => line.split(''))

    const result = solve(grid)

    let numbers = getConnectedNumber(result.numbers, result.symbols)

    const multiplyArray = (arr) => arr.reduce((acc, obj) => acc * parseInt(obj.number), 1);

    let sum = 0

    for(const arr of numbers) {
        const res = multiplyArray(arr)

        sum += res
    }

    console.log(sum)
});