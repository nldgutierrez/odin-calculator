function add(a, b) {
    let result = a + b;
    result = Math.round((result + Number.EPSILON) * 10000000000) / 10000000000;
    return result;
}

function subtract(a, b) {
    let result = a - b;
    result = Math.round((result + Number.EPSILON) * 10000000000) / 10000000000;
    return a - b;
}

function multiply(a, b) {
    let result = a * b;
    result = Math.round((result + Number.EPSILON) * 10000000000) / 10000000000;
    return result;
}

function divide(a, b) {
    if (a === 0 || b === 0) return 'ERROR'
    let result = a / b;
    result = Math.round((result + Number.EPSILON) * 10000000000) / 10000000000;
    return result;
}

function operate(operation, firstOperand, secondOperand) {
    console.log(values);
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
            console.log('failed')
    }
}

const prevDisplay = document.querySelector('#previous');
const currDisplay = document.querySelector('#current');

const plus = document.querySelector('#add');
const minus = document.querySelector('#subtract');
const times = document.querySelector('#multiply');
const dividedBy = document.querySelector('#divide');
const equals = document.querySelector('#equals');

const numbers = document.querySelectorAll('.number');
const dot = document.querySelector('#dot');

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        currDisplay.textContent += number.textContent;
    });
});

dot.addEventListener('click', () => {
    if (!currDisplay.textContent.includes('.')) currDisplay.textContent += dot.textContent;
})

let values = [];

plus.addEventListener('click', () => {
    values.push(Number(currDisplay.textContent));
    prevDisplay.textContent += `${currDisplay.textContent}+`
    currDisplay.textContent = '';

    if (values.length == 2) {
        let sum = operate(prevDisplay.textContent, values[0], values[1]);
        values = [];
        values.push(sum);
        currDisplay.textContent = '';
        prevDisplay.textContent = `${sum}+`;
    }
});

minus.addEventListener('click', () => {
    values.push(Number(currDisplay.textContent));
    prevDisplay.textContent += `${currDisplay.textContent}-`
    currDisplay.textContent = '';

    if (values.length == 2) {
        let difference = operate(prevDisplay.textContent, values[0], values[1]);
        values = [];
        values.push(difference);
        currDisplay.textContent = '';
        prevDisplay.textContent = `${difference}-`
    }
});

times.addEventListener('click', () => {
    values.push(Number(currDisplay.textContent));
    prevDisplay.textContent += `${currDisplay.textContent}*`
    currDisplay.textContent = '';

    if (values.length == 2) {
        let product = operate(prevDisplay.textContent, values[0], values[1]);
        values = [];
        values.push(product);
        currDisplay.textContent = '';
        prevDisplay.textContent = `${product}*`
    }
});

dividedBy.addEventListener('click', () => {
    values.push(Number(currDisplay.textContent));
    prevDisplay.textContent += `${currDisplay.textContent}/`
    currDisplay.textContent = '';

    if (values.length == 2) {
        let quotient = operate(prevDisplay.textContent, values[0], values[1]);
        values = [];
        values.push(quotient);
        currDisplay.textContent = '';
        prevDisplay.textContent = `${quotient}/`
    }
})

equals.addEventListener('click', () => {
    if (prevDisplay.textContent === '') {
        if (currDisplay.textContent === 'ERROR') return 'ERROR';
        return currDisplay.textContent = Number(currDisplay.textContent);
    }

    prevDisplay.textContent += `${currDisplay.textContent}=`;
    values.push(Number(currDisplay.textContent));
    let result = operate(prevDisplay.textContent, values[0], values[1]);
    currDisplay.textContent = result;
    prevDisplay.textContent = '';
    values = [];
});