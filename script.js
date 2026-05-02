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

function operate(operatorSet, n1, n2) {
    return operator(+n1, +n2);
}

let operatorSet = null;
let operatorSymbol = "";
let n1 = "";
let n2 = "";
let operatorDeclared = false;

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const display = document.querySelector("#display");
const operation = () => `${n1} ${operatorSymbol} ${n2}`;
const updateDisplay = () => display.textContent = operation;

operators.forEach(operator => {
    operator.addEventListener("click", e => {
        if (n1 !== "" && operatorDeclared === false) {
            switch (e.target.id) {
                case "addition":
                    operatorSet = add;
                    operatorSymbol = "+"
                    break;
                case "subtraction":
                    operatorSet = subtract;
                    operatorSymbol = "-";
                    break;
                case "multiplication":
                    operatorSet = multiply;
                    operatorSymbol = "×";
                    break;
                case "division":
                    operatorSet = divide;
                    operatorSymbol = "÷"
                    break;
            }
            operatorDeclared = true;
            display.textContent = operation();
        }
    })
})