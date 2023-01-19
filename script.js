let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

const display = document.querySelector('#display');
let displayNumber = [];

const smallDisplay = document.querySelector('#small-display');

function updateDisplay () {
    display.textContent = displayNumber.join('');
    smallDisplay.textContent = `${(operand1 !== null) ? operand1 : ''} ${operator ? operator : ''} ${(operand2 !== null) ? operand2 : ''} ${result ? '=' : ''}`
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

        displayNumber.push(e.target.textContent);
        updateDisplay();  
    })
}

const dotButton = document.querySelector('.btn.dot');
dotButton.addEventListener('click', () => {
        if (result !== null) {
            displayNumber = [];
            operand1 = null;
            operand2 = null;
            operator = null;
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
            operand1 = result
            operand2 = null;
            result = null;
        } else if (operator) {
            operand2 = parseFloat(displayNumber.join(''));
            operand1 = operate(operand1, operand2, operator);
            operand2 = null;
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
        result = operate(operand1, operand2, operator)
        displayNumber = [...String(result)];
        updateDisplay();
        operand1 = null;
        operand2 = null;
        operator = null;
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
    updateDisplay();
})

const invertButton = document.querySelector('.btn.polarity');
invertButton.addEventListener('click', () => {
    if (displayNumber.length == 0) {
        displayNumber.push('-', '0');
        updateDisplay();
        return;
    }

    if (result !== null) {
        operand1 = null;
        operand2 = null;
        operator = null;
        result = null;
    }

    if (displayNumber[0] == '-') {
        displayNumber.shift();
    } else {
        displayNumber.unshift('-')
    }

    updateDisplay();
})

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b != 0) ? a / b : 'CHA0S REIGNS';

function operate(a, b, operator) {
    if (b === null) return a;
    
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '\/':
            return divide(a, b);
    }
}