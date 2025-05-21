function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (a === 0 || b === 0) return 'ERROR'
    return a / b;
}

function operate(operation, firstOperand, secondOperand) {
    operation = operation.substring(1, operation.length-1);
    switch (true) {
        case values.includes(NaN):
            return 'ERROR'
        case operation.includes('+'):
            return add(firstOperand, secondOperand);
        case operation.includes('-'):
            return subtract(firstOperand, secondOperand);
        case operation.includes('*'):
            return multiply(firstOperand, secondOperand);
        case operation.includes('/'):
            return divide(firstOperand, secondOperand);
        default :
            console.log('failed');
    }
}

const prevDisplay = document.querySelector('#previous');
const currDisplay = document.querySelector('#current');

const equals = document.querySelector('#btn-Enter');

const numbers = document.querySelectorAll('.number');
const dot = document.querySelector('#dot');

const backspace = document.querySelector('#btn-Backspace');
const clear = document.querySelector('#clear');

const negative = document.querySelector('#negative');

let result;

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (result) {
            result = 0;
            currDisplay.textContent = '';
        }
        currDisplay.textContent += number.textContent;
        currDisplay.textContent = currDisplay.textContent.slice(0, 13);
    });
});

negative.addEventListener('click', () => {
    if (!currDisplay.textContent.includes('-')) {
        currDisplay.textContent = `-${currDisplay.textContent}`
    } else {
        currDisplay.textContent = currDisplay.textContent.slice(1);
    }
});

backspace.addEventListener('click', () => {
    currDisplay.textContent = currDisplay.textContent.slice(0, currDisplay.textContent.length-1);
});

clear.addEventListener('click', () => {
    currDisplay.textContent = ''
    prevDisplay.textContent = ''
    values = [];
});

dot.addEventListener('click', () => {
    if (!currDisplay.textContent.includes('.')) currDisplay.textContent += dot.textContent;
});

let values = [];

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {

        if (currDisplay.textContent) {
            values.push(Number(currDisplay.textContent));
            prevDisplay.textContent += `${currDisplay.textContent}${operator.textContent}`;
            currDisplay.textContent = '';
        }

        if (prevDisplay.textContent && !currDisplay.textContent) {
            prevDisplay.textContent = prevDisplay.textContent.slice(0, prevDisplay.textContent.length-1);
            prevDisplay.textContent += `${operator.textContent}`;
        }

        if (values.length == 2) {
            let answer = operate(prevDisplay.textContent, values[0], values[1]);
            values = [];
            values.push(answer);
            currDisplay.textContent = '';
            prevDisplay.textContent = `${answer}${operator.textContent}`;
        }
    });
});

equals.addEventListener('click', () => {
    if (prevDisplay.textContent === '') {
        if (currDisplay.textContent === 'ERROR') return 'ERROR';
        return currDisplay.textContent = Number(currDisplay.textContent);
    }

    prevDisplay.textContent += `${currDisplay.textContent}=`;
    values.push(Number(currDisplay.textContent));
    result = operate(prevDisplay.textContent, values[0], values[1]);
    currDisplay.textContent = result;
    currDisplay.textContent = currDisplay.textContent.slice(0, 13);
    prevDisplay.textContent = '';
    values = [];
});

// Keyboard Support

document.addEventListener('keydown', (event) => {
    document.getElementById(`btn-${event.key}`)?.click();
    if (event.key === '.') dot.click();
})