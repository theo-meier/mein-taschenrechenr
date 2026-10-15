const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
}

function appendDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function chooseOperation(op) {
    if (operation !== null) compute();
    previousInput = currentInput;
    operation = op;
    resetScreen = true;
}

function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Division durch 0 ist nicht möglich!");
                clear();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentInput = Math.round(computation * 100000000) / 100000000;
    currentInput = currentInput.toString();
    
    operation = null;
    previousInput = '';
    resetScreen = true;
}

function clear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    resetScreen = false;
}

function deleteNumber() {
    if (resetScreen) return;
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
}
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (action === 'number') {
            appendNumber(value);
        } else if (action === 'operator') {
            chooseOperation(value);
        } else if (action === 'equals') {
            compute();
        } else if (action === 'clear') {
            clear();
        } else if (action === 'delete') {
            deleteNumber();
        } else if (action === 'decimal') {
            appendDecimal();
        }
        updateDisplay();
    });
});
