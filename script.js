const calculator = document.getElementById("calculator");
const displayNumber = document.getElementById("digits");
let input = [];
let screenText = []; 
let operatorIndex = undefined;
let operator = undefined;
let operatorPressed = false;
let decimalPressed = false;

calculator.addEventListener("click", (event) => handleClick(event.target));

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
    if(b === 0) {
        alert("Ya can't do that"); //No dividing by 0!!
        allClear();
        return;
    }
    return a / b;
}

function exponent(a, b) {
    return a ** b;
}

//gets 2 numbers and an operator and performs the correct function based on the operator
function operate(a, b, operator) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '**':
            return exponent(a, b);
        default:
            alert("That's not a valid operation");
            break;
    }
}   
  
//updates "display" on screen
function updateDisplay(text) {
    screenText.push(text);
    displayNumber.innerHTML = screenText.join('');
}

//processes click
function handleClick(target) {
    if(!operatorPressed && target.id === 'equals') {
        alert("Error: Not a full equation"); // need 2 numbers for an equation!
        input.pop();
        clearScreen();
    } else if(operatorPressed && target.id === 'equals') {
        clearScreen();
        updateDisplay(solve(input));
    } else if(target.className === 'operator') {
        if(operatorPressed) {
            alert(`You've already chosen ${operator} for this equation`); //only 1 operator per equation!
        } else {
            clearScreen();
            operator = getOperator(target.id);
            input.push(operator);
            operatorPressed = true;
            decimalPressed = false;
            operatorIndex = findOperatorIndex(input);
        }
    } else if(target.className === 'number'){
        let value = getNumber(target.id);
        input.push(value);
        updateDisplay(value);
    } else if(target.className === 'function') {
        getFunction(target.id);
    }
}

//gets event targets id and performs required function
function getFunction(id) {
    switch(id) {
        case 'clear':
            allClear();
            break;
        case 'delete':
            deleteCharacter();
            break;
        default:
            alert("Error: Not a valid function");
            break;
    }
}

//gets event targets id and converts it to an operator
function getOperator(id) {
    switch(id) {
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '*';
        case 'divide':
            return '/';
        case 'exponent':
            return '**';
        case 'equals':
            return '=';
        default:
            alert("Error: Not a valid operator");
            break;
    }
}

//gets event targets id and coverts it into a number
function getNumber(id) {
    switch(id) {
        case 'zero':
            return 0;
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        case 'decimal':
            //ensures decimal is only pressed once
            if(decimalPressed) {
                alert("Your number is already a decimal!");
                return;
            } else {
                decimalPressed = true;
                return '.';
            }
        case 'pi':
            let pi = [3, '.', 1, 4, 1, 5 ,9];
            return parseFloat(pi.join(''));
        default:
            alert("Error: Not a valid number");
            break; 
    }
}

//solves input splitting the input array at the operator index, also checks to ensure equation is complete
function solve(array) {
    let firstNum = parseFloat(array.slice(0, operatorIndex).join(''));
    let secondNum = parseFloat(array.slice(operatorIndex + 1, array.length).join(''));

    if(!secondNum && secondNum !== 0) {
        alert("You're missing a second number!");
        allClear();
        return;
    }
    return isFloat(array) ? (operate(firstNum, secondNum, operator).toFixed(8) / 1) : operate(firstNum, secondNum, operator);
}

//clears the screen only but does not delete any values
function clearScreen() {
    screenText = [];
}

//clears the screen and deletes values
function allClear() {
    screenText = [];
    input = [];
    updateDisplay(screenText);
    operatorPressed = false;
}

//removes 1 character from the screen and from input
function deleteCharacter() {
    input.pop();
    screenText.pop();
    displayNumber.innerHTML = screenText.join('');
}

function isNumber(number) {
    return !isNaN(number);
}

//finds operator index for slicing purposes
function findOperatorIndex(array) {
    return array.findIndex(value => typeof value === "string" && value !== '.');
}

function isFloat(array) {
    return array.includes(".");
}