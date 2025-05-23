// Operation Functions

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (a === 0 || b === 0) return 'ERROR';
    return a / b;
}

// Variables
let value1;
let value2;
let operator;

// Operate Function
function operate(operator, value1, value2) {
    switch (operator) {
        case '+': return add(value1, value2);
        case '-': return subtract(value1, value2);
        case '*': return multiply(value1, value2);
        case '/': return divide(value1, value2);
        default:
            console.log('Operation failed');
    }
}

// DOM Selects
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('#equals');
const dot = document.querySelector('#dot');
const c = document.querySelector('#backspace');
const ac = document.querySelector('#clear');