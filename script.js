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
let answer;

// Operate Function
function operate(operator, value1, value2) {
    console.log(operator);
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
const display = document.querySelector('.display p');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equals = document.querySelector('#equals');
const dot = document.querySelector('#dot');
const c = document.querySelector('#backspace');
const ac = document.querySelector('#clear');
const negative = document.querySelector('#negative');

// Inputting in the display
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (display.textContent === '0') display.textContent = '';
        display.textContent += number.textContent;
        display.textContent = display.textContent.slice(0, 11);
    });
});

// Saving and operating values when clicking an operation button
operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        operator = operation.getAttribute('key');
        
        // Save values when clicking an operation
        if (display.textContent != '') {
            value1 = value2;
            value2 = Number(display.textContent);
        }
        
        display.textContent = '';

        console.log(`OPERATOR value1: ${value1}, value2: ${value2}, answer: ${answer}`)
    });
});

// Equals button
equals.addEventListener('click', () => {
    answer = operate(operator, value1, value2);
    display.textContent = answer;
    display.textContent = display.textContent.slice(0, 11);
    console.log(`EQUALS value1: ${value1}, value2: ${value2}, answer: ${answer}`)
})