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

function keyboardHandler(e) {
    if (digit.test(e.key)) {
        numberHandler(e, e.key);
    }
    switch (e.key) {
        case "+":
            operatorHandler(e, "addition");
            break;
        case "-":
            operatorHandler(e, "subtraction");
            break;
        case "*":
        case "x":
            operatorHandler(e, "multiplication");
            break;
        case "/":
            operatorHandler(e, "division");
            break;
        case "=":
        case "Enter":
            operatorHandler(e, "equals");
            break;
        case ".":
            decimalHandler();
            break;
        case "Backspace":
        case "Delete":
            backspaceHandler();
            break;
        case "C":
            reset();
            break;
    }
}

function operatorHandler(e, key) {
    if (operation.n1 === "-") return;
    const input = key ? key : e.target.id;
    if (operation.n2 === "" && input === "subtraction" && operation.type !== null) {
        operation.n2 += "-";
        updateDisplay();
        return;
    }
    if (operation.n1 !== "") {
        switch (input) {
            case "addition":
                if (operation.type !== null) {
                    operate(operation.type, operation.n1, operation.n2, add, "+");
                    return;
                } else setOperator(add, "+");
                break;
            case "subtraction":
                if (operation.type !== null) {
                    operate(operation.type, operation.n1, operation.n2, subtract, "-");
                    return;
                } else setOperator(subtract, "-");
                break;
            case "multiplication":
                if (operation.type !== null) {
                    operate(operation.type, operation.n1, operation.n2, multiply, "×");
                    return;
                } else setOperator(multiply, "×");
                break;
            case "division":
                if (operation.type !== null) {
                    operate(operation.type, operation.n1, operation.n2, divide, "÷");
                    return;
                } else setOperator(divide, "÷");
                break;
            case "equals":
                operate(operation.type, operation.n1, operation.n2);
                return;
        }
        currentOperand = 2;
    } else if (input === "subtraction") {
        operation.n1 += "-";
    }
    updateDisplay();
}

function numberHandler(e, key) {
    let num = e.target.id
                    .split("")
                    .filter(char => digit.test(char))
                    .join("");
    if (key) num = key;
    if (currentOperand === 2) {
        operation.type !== null ? operation.n2 += num : reset(num);
    } else {
        operation.n1 += num;
    }
    updateDisplay();
}

function decimalHandler(e) {
    if (currentOperand === 2 && operation.type === null) return;
    if (currentOperand === 1) {
        if (operation.n1.match(/[0-9]/) !== null &&
            operation.n1.match(/\./) === null) {
            operation.n1 += ".";
        } else return;
    } else if (operation.n2.match(/[0-9]/) !== null &&
               operation.n2.match(/\./) === null) {
        operation.n2 += ".";
    }
    updateDisplay();
}

function backspaceHandler(e) {
    if (currentOperand === 2 && operation.type === null) return;
    if (currentOperand === 1) {
        operation.n1 = operation.n1.split("")
                                   .slice(0, -1)
                                   .join("");
    } else if (operation.n2 === "") {
        operation.symbol = operation.symbol.split("")
                                           .slice(0, -1)
                                           .join("");
        operation.type = null;
        currentOperand = 1;
    } else {
        operation.n2 = operation.n2.split("")
                                   .slice(0, -1)
                                   .join("");
    }
    updateDisplay();
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
    operation.type = func;
    operation.symbol = symbol;
}

function operate(operator, a, b, newOp, symbol) {
    if (b === "" || b === "-") return;
    if (operator === divide && isZero(b)) {
        reset();
        display.textContent = "No.";
    } else {
        const result = operator(+a, +b);
        reset();
        operation.n1 = roundIfLongFloat(result).toString();
        currentOperand = 2;
        if (arguments.length === 5) setOperator(newOp, symbol);
        updateDisplay();
    }
}

function reset(n) {
    operation.type = null;
    operation.symbol = "";
    n ? operation.n1 = n : operation.n1 = "";
    operation.n2 = "";
    currentOperand = 1;
    updateDisplay();
}

let currentOperand = 1;

const operation = {
    type: null,
    symbol: "",
    n1: "",
    n2: "",
};

const digit = /[0-9]/;

const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number")
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");
const backspace = document.querySelector("#delete");
const display = document.querySelector("#display");
const updateDisplay = () => {
    display.textContent = `${operation.n1} ${operation.symbol} ${operation.n2}`;
}

document.addEventListener("keydown", keyboardHandler);

operators.forEach(operator => {
    operator.addEventListener("click", operatorHandler);
});

numbers.forEach(number => {
    number.addEventListener("click", numberHandler);
});

decimal.addEventListener("click", decimalHandler);

backspace.addEventListener("click", backspaceHandler);

clear.addEventListener("click", () => reset());