const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lines = []

rl.on('line', (line) => {
    lines.push(line)
})

function sortMatches(cardObjects) {
    let result = []
    cardObjects.forEach(card => {
        const exists = result.find((a) => a.card === card.card)
        if(!exists) {
            result.push({card: card.card, winningNumbers: [card.winningNumbers]})
        } else {
            exists.winningNumbers.push(card.winningNumbers)
        }
    });

    let calculatePoints = []

    result.forEach(card => {
        calculatePoints.push({card: card.card, points: 1 * Math.pow(2, card.winningNumbers.length-1)})
    });

    return calculatePoints
}

function solve(cards) {
    const matches = []
    cards.forEach(card => {
        const cardNumber = card[0]
        const winningNumbers = card[1].split(' ').filter(a => a)
        const ownNumbers = card[2].split(' ').filter(a => a)

        winningNumbers.forEach(win => {
            ownNumbers.forEach(own => {
                if(own === win) {
                    matches.push({card: cardNumber, winningNumbers: win, ownNumbers: own})
                }
            });
        });
    });
    const sort = sortMatches(matches)

    let sum = 0

    sort.forEach(card => {
        sum += card.points
    });

    return sum
}


rl.on('close', () => {

    const splitLines = lines.map(line => line.split(/Card\s+(\d+):\s*([\d\s]+)\s*\|\s*([\d\s]+)/).filter(Boolean));

    const result = solve(splitLines)
    
    console.log(result)
});