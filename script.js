let operand1 = [];
let operand2 = [];
let operator;

const display = document.querySelector('#display');

const numButtons = document.querySelectorAll('.btn.num');
for (const button of numButtons) {
    button.addEventListener('click', (e) => {
        if (operator) {
            operand1.push(e.target.textContent);
            display.textContent = operand1.join('');
        } else {
            operand2.push(e.target.textContent);
            display.textContent = operand2.join('');  
        }
        
    })
}

const opsButtons = document.querySelector('.btn.operator');
for (const button of opsButtons) {
    button.addEventListener('click', (e) => {
        operator = e.target.textContent;
    })
}

const equalizeButton = document.querySelector('.btn.equalize');
equalizeButton.addEventListener('click', () => {
    
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