function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function operate(operation, firstOperand, secondOperand) {
    operation = operation.substring(0, operation.length-1);
    switch (true) {
        case operation.includes('+'):
            return add(firstOperand, secondOperand);
        case operation.includes('-'):
            return subtract(firstOperand, secondOperand);
        default :
            console.log('failed')
    }
}

const prevDisplay = document.querySelector('#previous');
const currDisplay = document.querySelector('#current');

const plus = document.querySelector('#add');
const minus = document.querySelector('#subtract');
const equals = document.querySelector('#equals');

const numbers = document.querySelectorAll('.number');

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        currDisplay.textContent += number.textContent;
    });
});

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

equals.addEventListener('click', () => {
    if (prevDisplay.textContent == '') {
        return currDisplay.textContent = currDisplay.textContent;
    }

    prevDisplay.textContent += `${currDisplay.textContent}=`;
    values.push(Number(currDisplay.textContent));
    let result = operate(prevDisplay.textContent, values[0], values[1]);
    currDisplay.textContent = result;
    prevDisplay.textContent = '';
    values = [];
});