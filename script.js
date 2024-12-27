let screenText = []; 
let displayNumber = document.getElementById("display");

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

function operate(a, b, operator) {
    switch(operator) {
        case 'add':
            add(a, b);
            break;
        case 'subtract':
            subtract(a, b);
            break;
        case 'multiply':
            multiply(a, b);
            break;
        case 'divide':
            divide(a, b);
            break;
        default:
            alert("That's not a valid operation");
    }
}   

const buttons = document.getElementById("buttons");
buttons.addEventListener("click", (event) => {
    handleClick(event.target);
});
    
function updateDisplay(text) {
    screenText.push(text);
    
    
    displayNumber.innerHTML = screenText.join(''); 
    displayNumber.style.fontSize = "120px";
    displayNumber.style.color = "white";
    displayNumber.style.fontWeight = "bold";
    displayNumber.style.alignSelf = "flex-end"
}
    
function handleClick(target) {   
    let operatorPressed = false;
    let equalPressed = false;
    let firstNum = [];
    let operator = '';
    let secondNum = [];
    let id = target.id;
    let targetClass = target.className;

    if (targetClass === 'operator') {
        operator = id;
    } else if (targetClass === 'number') {
        let number = getNumber(id);
        updateDisplay(number);
        firstNum.push(number);
    } else {
        let answer = operate(parseInt(firstNum.join('')), parseInt(secondNum.join('')), operator);
        displayNumber.innerHTML = answer;

    } 

}

function getNumber(id) {
    switch(id) {
        case "zero":
            return 0;
        case "one":
            return 1;
        case "two":
            return 2;
        case "three":
            return 3;
        case "four":
            return 4;
        case "five":
            return 5;
        case "six":
            return 6;
        case "seven":
            return 7;
        case "eight":
            return 8;
        case "nine":
            return 9;
        default:
            return 0;
        
    }
}