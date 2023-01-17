let operand1;
let operand2;
let operator;
let result;

const display = document.querySelector('#display');
let displayNumber = [];

function updateDisplay () {
    display.textContent = displayNumber.join('');
}

const numButtons = document.querySelectorAll('.btn.num');
for (const button of numButtons) {
    button.addEventListener('click', (e) => {
        if (result) {
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

const opsButtons = document.querySelectorAll('.btn.operator');
for (const button of opsButtons) {
    button.addEventListener('click', (e) => {
        if (result) {
            operand1 = result
            operand2 = null;
            result = null;
        } else if (operator) {
            operand2 = parseInt(displayNumber.join(''));
            operand1 = operate(operand1, operand2, operator);
            operand2 = null;
        } else {
            operand1 = parseInt(displayNumber.join(''));
        }

        operator = e.target.textContent;
        displayNumber = [];
        updateDisplay();
    })
}

const equalizeButton = document.querySelector('.btn.equalize');
equalizeButton.addEventListener('click', () => {
    if (operand2) {
        operand2 = parseInt(displayNumber.join(''));
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
    updateDisplay();
    operand1 = null;
    operand2 = null;
    operator = null;
    result = null;
})

const backspaceButton = document.querySelector('.btn.backspace');
backspaceButton.addEventListener('click', () => {
    displayNumber.pop();
    updateDisplay();
})

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, b, operator) {
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