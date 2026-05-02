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

function roundIfLongFloat(number) {
    if (!number.toString().includes(".")) return number;
    const chars = number
                    .toString()
                    .split("");
    const decimalPlaces = chars
                            .slice(chars.indexOf(".") +1)
                            .length;
    if (decimalPlaces > 10) {
        return Number.parseFloat(number).toFixed(10);
    } else return number;
};

function operate(operator, a, b) {
    if (b === "") return;
    if (operator === divide && b === "0") {
        reset();
        display.textContent = "No.";
    } else {
        const result = operator(+a, +b);
        reset();
        n1 = roundIfLongFloat(result);
        updateDisplay();
    }
}

function reset() {
    operatorSet = null;
    operatorSymbol = "";
    n1 = "";
    n2 = "";
    operatorDeclared = false;
    updateDisplay();
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
const updateDisplay = () => display.textContent = operation();

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
            updateDisplay();
        }
    })
})

numbers.forEach(number => {
    number.addEventListener("click", e => {
        const digit = /[0-9]/;
        const num = e.target.id
                        .split("")
                        .filter(char => digit.test(char))
                        .join("");
        if (operatorDeclared === true) {
            n2 += num;
        } else {
            n1 += num;
        }
        updateDisplay();
    })
})

clear.addEventListener("click", reset);

equals.addEventListener("click", () => operate(operatorSet, n1, n2));