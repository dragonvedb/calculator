let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

const display = document.querySelector('#display');
let displayNumber = [];
let maxLength = () => {
    let x = 15;
    if (displayNumber.includes('-')) x++;
    if (displayNumber.includes('.')) x++;
    return x;
}

const smallDisplay = document.querySelector('#small-display');

function updateDisplay () {
    display.textContent = displayNumber.join('');
    smallDisplay.textContent = `${(operand1 !== null) ? operand1 : ''} ${operator ? operator : ''} ${(operand2 !== null) ? operand2 : ''} ${result !== null ? '=' : ''}`
}

const numButtons = document.querySelectorAll('.btn.num');
for (const button of numButtons) {
    button.addEventListener('click', (e) => {
        if (result !== null) {
            displayNumber = [];
            operand1 = null;
            operand2 = null;
            operator = null;
            result = null;
        }

        if (displayNumber.length >= maxLength()) {
            return;
        }
        displayNumber.push(e.target.textContent);
        updateDisplay();  
    })
}

const dotButton = document.querySelector('.btn.dot');
dotButton.addEventListener('click', () => {
        if (result !== null) {
            displayNumber = [];
            result = null;
        }

        if (displayNumber.length === 0) {
            displayNumber.push('0', '.');
            updateDisplay();
            return;
        }

        if (displayNumber.includes('.')) return;

        displayNumber.push('.');
        updateDisplay();  
    })

const opsButtons = document.querySelectorAll('.btn.operator');
for (const button of opsButtons) {
    button.addEventListener('click', (e) => {
        if (result !== null) {
            operand1 = result;
            operand2 = null;
            result = null;
        } else if (operand1 !== null && operator && displayNumber.length) {
            operand2 = parseFloat(displayNumber.join(''));
            operate(operand1, operand2, operator)
            operand1 = null;
            operand2 = null;
            operator = null;
            if (isNaN(result)) {
                result = null;
                return;
            } else {
                operand1 = result;
                result = null;
            }
        } else if (operand1 !== null) {

        } else {
            operand1 = parseFloat(displayNumber.join(''));
            if (isNaN(operand1)) operand1 = 0;
        }

        operator = e.target.textContent;
        displayNumber = [];
        updateDisplay();
    })
}

const equalizeButton = document.querySelector('.btn.equalize');
equalizeButton.addEventListener('click', () => {
    if (operand1 !== null && operator && displayNumber.length) {
        operand2 = parseFloat(displayNumber.join(''));
        operate(operand1, operand2, operator)
        operand1 = null;
        operand2 = null;
        operator = null;
        if (isNaN(result)) result = null;
    }
})

const clearButton = document.querySelector('.btn.clear');
clearButton.addEventListener('click', () => {
    displayNumber = [];
    operand1 = null;
    operand2 = null;
    operator = null;
    result = null;
    updateDisplay();
})

const backspaceButton = document.querySelector('.btn.backspace');
backspaceButton.addEventListener('click', () => {
    displayNumber.pop();
    if (displayNumber[displayNumber.length - 1] == '-') displayNumber.pop();
    result = null;
    updateDisplay();
})

const invertButton = document.querySelector('.btn.polarity');
invertButton.addEventListener('click', () => {
    if (displayNumber.length == 0) {
        displayNumber.push('-', '0');
        updateDisplay();
        return;
    }

    if (displayNumber[0] == '-') {
        displayNumber.shift();
    } else {
        displayNumber.unshift('-')
    }

    result = null;
    updateDisplay();
})

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '\/':
            if (!b) {
                result = 'CHA0S RE1GNS';
                break;
            };
            result = divide(a, b);
            break;
    }

    if (result >= 1000000000000000 || result <= -1000000000000000) {
        result = 'TOO LARGE';
    } if (result.toString().length > 16) {
        let cutoff = 15;
        if (result.toString().includes('-')) cutoff = 16;
        result = Number(result.toFixed(cutoff - Math.trunc(result).toString().length))
    }

    displayNumber = [...String(result)];
    updateDisplay();
    if (isNaN(result)) displayNumber = [];
}