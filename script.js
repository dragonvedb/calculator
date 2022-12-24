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
        if(operator) displayNumber = [];
        displayNumber.push(e.target.textContent);
        updateDisplay();  
    })
}

const opsButtons = document.querySelectorAll('.btn.operator');
for (const button of opsButtons) {
    button.addEventListener('click', (e) => {
        operator = e.target.textContent;
        operand1 = parseInt(displayNumber.join(''));
    })
}

const equalizeButton = document.querySelector('.btn.equalize');
equalizeButton.addEventListener('click', () => {
    operand2 = parseInt(displayNumber.join(''));
    displayNumber = [...String(operate(operand1, operand2, operator))];
    updateDisplay();
})

const clearButton = document.querySelector('.btn.clear');
clearButton.addEventListener('click', () => {
    display.textContent = '';
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
        case '*':
            return multiply(a, b);
        case '\/':
            return divide(a, b);
    }
}