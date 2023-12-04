const readline = require('readline')
const { arrayBuffer } = require('stream/consumers')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lines = []

rl.on('line', (line) => {
    lines.push(line)
})

const [red, green, blue] = [12, 13, 14]

function solve(lines) {
    let games = [

    ]

    lines.forEach(line => {
        const matchGame = line[0].match(/^Game (\d+):/);
        if (matchGame) {
            const gameNumber = parseInt(matchGame[1]); // Parse the game number as an integer
            const game = {
                game: gameNumber,
                colors: {}
            };

            const parts = line[0].split(';');
            parts.forEach(part => {
                const colorMatches = part.matchAll(/(\d+)\s+(\w+)/g);

                for (const match of colorMatches) {
                    const count = parseInt(match[1]);
                    const color = match[2];
                    game.colors[color] = Math.max(game.colors[color] || 0, count);
                }
            });

            games.push(game);
        }
    })

    let sum = 0;

    games.forEach(game => {
        sum += game.colors.red * game.colors.blue * game.colors.green
    });

    
    return sum
}


rl.on('close', () => {

    const splitLines = []

    const l = lines.forEach(line => {
        splitLines.push([line])
    });


    const result = solve(splitLines)

    console.log(result)
})