// Operation Functions

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (!a || !b) return 'ERROR';
    return a / b;
}

// Variables
let value1;
let value2;
let operator;
let answer;
let input;

// Operate Function
function operate(operator, value1, value2) {
    console.log(`OPERATION: ${value1} ${operator} ${value2}`)
    if (value1 === 'ERROR' || value2 === 'ERROR') return 'ERROR'
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
        if (answer && display.textContent == answer) display.textContent = ''; // Reset display when inputting a number after equals button is clicked
        if (display.textContent === '0') display.textContent = '';
        if (display.textContent != input && display.textContent != '0.') display.textContent = '';
        display.textContent += number.textContent;
        display.textContent = display.textContent.slice(0, 11);
        input = Number(display.textContent);
    });
});

// Saving and operating values when clicking an operation button
operations.forEach((operation) => {
    operation.addEventListener('click', () => {
        if (display.textContent === '0') input = 0;
        console.log(`input: ${input}`)
        if (answer) display.textContent = answer;
        equals.click();
        operator = operation.getAttribute('key');
        input = '';

        // Add active style while waiting for input
        operations.forEach((operation) => {
            operation.classList.remove('active');
        })
        operation.classList.add('active');
    });
});

// Equals button
equals.addEventListener('click', () => {
    if (value2 != undefined) value1 = value2;
    if (answer) value1 = answer;
    value2 = input;
    console.log(`VALUES value1: ${value1}, value2: ${value2}, answer: ${answer}`)
    if (value2) answer = operate(operator, value1, value2);
    if (!answer && answer != 0) return;
    display.textContent = answer;
    display.textContent = display.textContent.slice(0, 11);
    console.log(`answer: ${answer}`)
    value2 = '';
    input = '';
    
    // Remove active style from operator
    operations.forEach((operation) => {
        operation.classList.remove('active');
    })
});

dot.addEventListener('click', () => {
    if (display.textContent == answer || value1 == undefined) display.textContent = 0;
    if (display.textContent.includes('.')) return;
    if (display.textContent === '0') display.textContent = '0'
    display.textContent += dot.textContent;
})