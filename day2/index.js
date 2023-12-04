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
    });

    console.log(games)

    const correctGames = games.filter(game => {
        // Check if the counts match the constants
        return game.colors.red <= red &&
               game.colors.green <= green &&
               game.colors.blue <= blue;
    });

    let IdSums = 0;

    correctGames.forEach(game => {
        IdSums += game.game
    });

    return IdSums

}


rl.on('close', () => {

    const splitLines = []

    const l = lines.forEach(line => {
        splitLines.push([line])
    });


    const result = solve(splitLines)

    console.log(result)
})