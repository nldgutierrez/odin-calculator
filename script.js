function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function operate(operation, firstOperand, secondOperand) {
    console.log(`operation: ${operation}`)
    switch (true) {
        case  operation.includes('+'):
            return add(firstOperand, secondOperand);
        case '-' :
            return subtract(firstOperand, secondOperand);
        default :
            console.log('failed')
    }
}

const prevDisplay = document.querySelector('#previous');
const currDisplay = document.querySelector('#current');

const one = document.querySelector('#one');
const plus = document.querySelector('#add');
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
    console.log(values);
    prevDisplay.textContent += `${currDisplay.textContent}+`
    currDisplay.textContent = '';
    
    // if (values.length == 2) {
    //     let sum = add(values[0], values[1]);
    //     values = [];
    //     values.push(sum);
    //     console.log(values);
    //     currDisplay.textContent = '';
    //     prevDisplay.textContent = `${sum}+`;
    // }
})

equals.addEventListener('click', () => {
    if (prevDisplay.textContent == '') {
        currDisplay.textContent = currDisplay.textContent;
    }

    prevDisplay.textContent += currDisplay.textContent;
    values.push(Number(currDisplay.textContent));
    let result = operate(prevDisplay.textContent, values[0], values[1]);
    currDisplay.textContent = result;
    prevDisplay.textContent = '';
    values = [];
})