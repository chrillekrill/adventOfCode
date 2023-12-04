const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const numbersInText = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
};

let lines = []

rl.on('line', (line) => {
    lines.push(line)
})

function loopThrough(text) {

    let textSplit = text.split('');
    let number = '';
    let returnText = text;

    let t = ''

    textSplit.forEach(element => {
        if(/[0-9]/.test(element)) {
            t += element
        } else {
        number += element;
        for (let value of Object.values(numbersInText)) {
            if (number.includes(value)) {
                const objectKey = Object.keys(numbersInText).find(k => numbersInText[k] === value);
                t += objectKey
                returnText = returnText.replace(new RegExp(numbersInText[objectKey], 'g'), objectKey);
                number = '' + number.slice(-1)
            }
        }
        }
    });
    return t;
}

function removeLetters(splitLines) {
    const newLines = []

    splitLines.forEach(line => {
        const l = line.replace(/\D/g,'');

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

function calibration(splitLines) {
    var changeLines = splitLines
    var returnText;
    
    changeLines.forEach((line, i) => {
        let newText = loopThrough(line)
        let moreNumbers = false;

        for (let value of Object.values(numbersInText)) {
            if (newText.includes(value)) {
                moreNumbers = true;
            }
        }

        returnText = newText
    });

    return returnText
}

rl.on('close', () => {7

    const splitLines = lines.map(line => line.split(' '))

    let newArr = []

    splitLines.forEach(line => {
        let word = calibration(line)

        newArr.push(word)
    });

    let sum = removeLetters(newArr)

    console.log('sum ' + sum)

    
    // let sum = calibration(splitLines)

    // console.log(sum)
});