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
        case '+':
            add(value1, value2);
            break;
        case '-':
            subtract(value1, value2);
            break;
        case '*':
            multiply(value1, value2);
            break;
        case '/':
            divide(value1, value2);
            break;
        default:
            console.log('Operation failed');
    }
}