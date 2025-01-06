let input = [];
let screenText = []; 
let displayNumber = document.getElementById("digits");
let operatorIndex = 0;
let operator = '';
let operatorPressed = false;

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
    if (b === 0) {
        alert("Ya can't do that");
        allClear();
        return;
    }
    return a / b;
}

function exponent(a, b) {
    return a ** b;
}

function operate(a, b, operator) {
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        case '**':
            return exponent(a, b);
        default:
            alert("That's not a valid operation");
    }
}   

const buttons = document.getElementById("buttons");
buttons.addEventListener("click", (event) => {
    handleClick(event.target);
});
  
//updates "display" on screen
function updateDisplay(text) {
    screenText.push(text);
    displayNumber.innerHTML = screenText.join('');
}
    
function handleClick(target) {

    if(!operatorPressed && target.id === 'equals') {
        alert("Error: Not a full equation");
        input.pop();
        clearScreen();
    } else if (operatorPressed && target.id === 'equals') {
        let value = getNumber(target.id);
        input.push(value);
        let answer = solve(input);
        clearScreen();
        updateDisplay(answer);
    } else if (target.className === 'operator') {
        if (operatorPressed) {
            alert(`You've already chosen ${operator} for this equation`);
        } else {
            clearScreen();
            operator = getOperator(target.id);
            input.push(operator);
            operatorPressed = true;
            operatorIndex = findOperatorIndex(input);
        }
    } else if (target.className === 'number'){
        let value = getNumber(target.id);
        input.push(value);
        updateDisplay(getNumber(target.id))
    } else if (target.className === 'function') {
        updateDisplay(getFunction(target.id));
    }
}

function getFunction(id) {
    switch(id) {
        case 'clear':
            allClear();
            break;
        case 'delete':
            deleteCharacter();
            break;
    }
}

function getOperator(id) {
    switch(id) {
        case 'add':
            return '+';
            break;
        case 'subtract':
            return '-';
            break;
        case 'multiply':
            return '*';
            break;
        case 'divide':
            return '/';
        case 'exponent':
            return '**';
            break;
        case 'equals':
            return '=';
            break;
    }
}

function getNumber(id) {
    switch(id) {
        case 'zero':
            return 0;
            break;
        case 'one':
            return 1;
            break;
        case 'two':
            return 2;
            break;
        case 'three':
            return 3;
            break;
        case 'four':
            return 4;
            break;
        case 'five':
            return 5;
            break;
        case 'six':
            return 6;
            break;
        case 'seven':
            return 7;
            break;
        case 'eight':
            return 8;
            break;
        case 'nine':
            return 9;
            break;
        case 'decimal':
            return '.';
            break;
        case 'pi':
            return Math.PI.toFixed(5);
            break;
        default:
            break; 
    }
}

function solve(array) {
    let firstNum = parseFloat(array.slice(0, operatorIndex).join(''));
    let secondNum = parseFloat(array.slice(operatorIndex + 1, array.length - 1).join(''));

    if(!secondNum && secondNum !== 0) {
        alert("You're missing a second number!");
        allClear();
        return;
    }

    return isFloat(array) ? operate(firstNum, secondNum, operator).toPrecision(8) : operate(firstNum, secondNum, operator);
}

function clearScreen() {
    screenText = [];
}

function allClear() {
    screenText = [];
    input = [];
    operatorPressed = false;
}

function deleteCharacter() {
    input.pop();
}

function isNumber(number) {
    return !isNaN(number);
}

function findOperatorIndex(array) {
    return array.findIndex(value => typeof value === "string" && value !== '.');
}

function isFloat(array) {
    return array.includes(".");
}