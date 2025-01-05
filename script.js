let screenText = []; 
let displayNumber = document.getElementById("digits");
let input = [];

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
    return a / b;
}

//takes in 2 numbers and an operator and performs the proper function based on the operator
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
    screenText.push(text); //pushes next digit to end of the screenText array
    displayNumber.innerHTML = screenText.join(''); //displays screenText array
}
    
function handleClick(target) {   
        let id = target.id;
        let targetClass = target.className;
    
        if (id === 'equals') {
            let character = getNumber(id);
            input.push(character);
            let answer = solve(input);
            clearScreen();
            updateDisplay(answer);
        } else if (targetClass === 'operator') {
            clearScreen();
            let character = getNumber(id);
            input.push(character);
        } else {
            let character = getNumber(id);
            input.push(character);
            updateDisplay(getNumber(target.id))
        }
}

function getNumber(id) {
    switch(id) {
        case "zero":
            return 0;
            break;
        case "one":
            return 1;
            break;
        case "two":
            return 2;
            break;
        case "three":
            return 3;
            break;
        case "four":
            return 4;
            break;
        case "five":
            return 5;
            break;
        case "six":
            return 6;
            break;
        case "seven":
            return 7;
            break;
        case "eight":
            return 8;
            break;
        case "nine":
            return 9;
            break;
        case "decimal":
            return '.';
            break;
        case "add":
            return '+';
            break;
        case "subtract":
            return '-';
            break;
        case "multiply":
            return '*';
            break;
        case "divide":
            return '/';
        case "equals":
            return '=';
            break;
        case "pi":
            return Math.PI.toFixed(5);
            break;
        case "exponent":
            return 
        case "clear":
            clearScreen();
            break;
        case "backspace":
            deleteCharacter();
            break;
        default:
            break; 
    }
}

function solve(array) {
    let firstNum = [];
    let secondNum = [];
    let operator = '';
    let answer = 0;
    let operatorPressed = false;

    array.forEach((item) => {
        if (item === '=') {
            answer = operate(parseInt(firstNum.join('')), parseInt(secondNum.join('')), operator);
        } else if (typeof item === 'string' && ) {
            operator = item;
            operatorPressed = true;
        } else if (operatorPressed && typeof item === 'number') {
            secondNum.push(item);
        } else if (!operatorPressed && typeof item === 'number') {
            firstNum.push(item);
        }
    })
    return answer;
}

function clearScreen() {
    screenText = [];
}

function deleteCharacter() {
    screenText.pop();
    input.pop();
}