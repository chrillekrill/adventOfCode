const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let lines = []

rl.on('line', (line) => {
    lines.push(line)
})

function calibration(splitLines) {
    const newLines = []

    splitLines.forEach(line => {
        const l = line[0].replace(/\D/g,'');

        newLines.push(l)
    });

    let sum = 0

    newLines.forEach(line => {
        const first = line[0]
        const second = line[line.length - 1]

        var concat = first.toString() + second.toString()

        sum += parseInt(concat)
    })

    return sum
}

rl.on('close', () => {

    const splitLines = lines.map(line => line.split(' '))
    
    var sum = calibration(splitLines)

    console.log(sum)
});