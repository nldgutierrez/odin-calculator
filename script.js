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
let resetDisplay = false;

// Operate Function
function operate(operator, value1, value2) {
    console.log(`OPERATION: v1: ${value1}, ${operator}, v2: ${value2}`)
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

display.textContent = '0'; // Default 0 as display

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (display.textContent === '0') display.textContent = ''; // Avoid leading zeroes
        
        // Reset display when adding operands
        if (resetDisplay) display.textContent = '';
        resetDisplay = false;

        display.textContent += number.textContent; // Input numbers in the display
        display.textContent = display.textContent.slice(0, 11); // Limit input to 11 digits
        input = Number(display.textContent); // Save input value
    });
});

// Operation
operations.forEach((operation) => {
    operation.addEventListener('click', () => {

        console.log(`is there answer? ${answer}`)

        // Save & operate values only when there's user input for consecutive operations clicked
        if (input) {
            value1 = value2; 
            if (answer !== undefined && answer !== 'ERROR') value1 = answer; // Save answer as operand when chaining operations
            value2 = input; // Save input value as operand
            
            // Operate with the last operator used
            answer = operate(operator, value1, value2);
            console.log(`answer: ${answer}, type: ${typeof(answer)}`)
            if (answer !== undefined) display.textContent = answer;
            display.textContent = display.textContent.slice(0, 11); // Limit display to 11 digits
    
            
            input = ''; // Reset input value for next operand
            resetDisplay = true;
        }
        
        operator = operation.getAttribute('key'); // Set operator

        // Toggle active class when operation is clicked
        operations.forEach((operation) => {
            operation.classList.remove('active');
        });
        operation.classList.add('active');
    });
});

equals.addEventListener('click', () => {
    value1 = value2;
    if (answer !== undefined) value1 = answer; // Save answer as operand when chaining operations
    value2 = input; // Save last input as two operands

    answer = operate(operator, value1, value2);
    console.log(answer)
    if (answer !== undefined) display.textContent = answer;
    display.textContent = display.textContent.slice(0, 11); // Limit display to 11 digits

    // Remove active class in operations
    operations.forEach((operation) => {
        operation.classList.remove('active');
    });

    // End chain of operations
    input = undefined;
    resetDisplay = true;
    value1 = undefined;
    value2 = undefined;
    operator = undefined;
});

dot.addEventListener('click', () => {
    if (display.textContent.includes('.')) return; // Prevent more than one dot

    // Reset display when adding operands
    if (resetDisplay) display.textContent = '';
    resetDisplay = false;

    if (display.textContent == '') display.textContent = '0'; // Start with zero if dot is first clicked
    display.textContent += dot.textContent;
});

negative.addEventListener('click', () => {
    if (!display.textContent.includes('-')) {
        if (display.textContent !== '0') {
            display.textContent = `-${display.textContent}`;
        }
    } else {
        display.textContent = display.textContent.slice(1);
    }
})