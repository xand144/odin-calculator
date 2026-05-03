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

function isZero(number) {
    const digits = number
                    .split("")
                    .filter(char => char.match(/[0-9]/) !== null)
    return digits.every(digit => digit === "0");
}

function setOperator(func, symbol) {
    operatorSet = func;
    operatorSymbol = symbol;
}

function operate(operator, a, b, newOp, symbol) {
    if (b === "" || b === "-") return;
    if (operator === divide && isZero(b)) {
        reset();
        display.textContent = "No.";
    } else {
        const result = operator(+a, +b);
        reset();
        n1 = roundIfLongFloat(result);
        currentOperand = 2;
        if (arguments.length === 5) setOperator(newOp, symbol);
        updateDisplay();
    }
}

function reset() {
    operatorSet = null;
    operatorSymbol = "";
    n1 = "";
    n2 = "";
    currentOperand = 1;
    updateDisplay();
}

let operatorSet = null;
let operatorSymbol = "";
let n1 = "";
let n2 = "";
let currentOperand = 1;

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const display = document.querySelector("#display");
const operation = () => `${n1} ${operatorSymbol} ${n2}`;
const updateDisplay = () => display.textContent = operation();

operators.forEach(operator => {
    operator.addEventListener("click", e => {
        if (n1 === "-") return;
        if (n2 === "" && e.target.id === "subtraction" && operatorSet !== null) {
            n2 += "-";
            updateDisplay();
            return;
        }
        if (n1 !== "") {
            switch (e.target.id) {
                case "addition":
                    if (operatorSet !== null) {
                        operate(operatorSet, n1, n2, add, "+");
                        return;
                    } else setOperator(add, "+");
                    break;
                case "subtraction":
                    if (operatorSet !== null) {
                        operate(operatorSet, n1, n2, subtract, "-");
                        return;
                    } else setOperator(subtract, "-");
                    break;
                case "multiplication":
                    if (operatorSet !== null) {
                        operate(operatorSet, n1, n2, multiply, "×");
                        return;
                    } else setOperator(multiply, "×");
                    break;
                case "division":
                    if (operatorSet !== null) {
                        operate(operatorSet, n1, n2, divide, "÷");
                        return;
                    } else setOperator(divide, "÷");
                    break;
                case "equals":
                    operate(operatorSet, n1, n2);
                    return;
            }
            currentOperand = 2;
        } else if (e.target.id === "subtraction") {
            n1 += "-";
        }
        updateDisplay();
    })
})

numbers.forEach(number => {
    number.addEventListener("click", e => {
        if (currentOperand === 2 && operatorSet === null) return;
        const digit = /[0-9]/;
        const num = e.target.id
                        .split("")
                        .filter(char => digit.test(char))
                        .join("");
        if (currentOperand === 2) {
            n2 += num;
        } else {
            n1 += num;
        }
        updateDisplay();
    })
})

clear.addEventListener("click", reset);