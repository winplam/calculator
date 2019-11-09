// TODO
// Add keyboard support

/* Select calculator display elements */
let operatorDisplay = document.querySelector("#operation");
let outputDisplay = document.querySelector('#output');
let operandCandidate;
let operandA;
let operandB;
let operatorSymbol;
let equalPressed = false;

/* Math operators */
function calculate(a, operator, b) {
    switch (operator) {
        case '+':
            return parseFloat(a) + parseFloat(b);
        case '−':
            return parseFloat(a) - parseFloat(b);
        case '×':
            return parseFloat(a) * parseFloat(b);
        case '÷':
            return parseFloat(a) / parseFloat(b);
    }
}

/* Update the output display line */
const updateDisplay = content => outputDisplay.textContent = content;
const updateOperation = operation => operatorDisplay.textContent = operation;

// Reset the calculator
function clearPressed() {
    operandA = undefined;
    operandB = undefined;
    operandCandidate = undefined;
    updateDisplay(operandCandidate);
    operatorSymbol = undefined;
    updateOperation(operatorSymbol);
}

// Concatenate characters into a string of numbers
function numberPressed(value) {
    equalPressed = false;
    if (!operatorSymbol && !operandCandidate) {
        operandCandidate = value;
        updateDisplay(operandCandidate);
    } else if (!operatorSymbol && operandCandidate) {
        operandCandidate += value;
        updateDisplay(operandCandidate);
    } else if (operatorSymbol && !operandCandidate) {
        operandCandidate = value;
        updateDisplay(operandCandidate);
    } else if (operatorSymbol && operandCandidate) {
        operandCandidate += value;
        updateDisplay(operandCandidate);
    }
}

// Process mathematical operator symbols (+, -, *, /)
function operatorPressed(value) {
    equalPressed = false;
    if (!operandA && operandCandidate) {
        operandA = operandCandidate;
        operandCandidate = undefined;
        operatorSymbol = value;
        updateOperation(operatorSymbol);
    } else if (!operandA && !operandCandidate) {
        operandA = outputDisplay.textContent;
        operatorSymbol = value;
        updateOperation(operatorSymbol);
    } else if (!operandB) {
        operandB = operandCandidate;
        operatorSymbol = value;
        updateOperation(operatorSymbol);
    } else {
        updateDisplay("Error operators")
    }
}

// Calculate equation when equal (=) button is pressed
function operate() {
    if (equalPressed || !operandA || !operandCandidate) {
        return;
    }
    equalPressed = true;
    operandB = operandCandidate;
    // Truncate number to fit display
    let answer = calculate(operandA, operatorSymbol, operandB);
    answer = answer.toString().substring(0, 11);
    updateDisplay(answer);

    // Reset variables and clear display
    operandCandidate = undefined;
    operandA = undefined;
    operandB = undefined;
    operatorSymbol = undefined;
    updateOperation(operatorSymbol);
}

function buttonPressed(value) {
    switch (value) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '00':
            numberPressed(value);
            break;
        case '.':
            // Prevent multiple decimal places in number
            if (operandCandidate) {
                operandCandidate.indexOf('.') == -1 ? numberPressed(value) : null;
            } else {
                numberPressed(value);
            }
            break;
        case 'Clear':
            clearPressed()
            break;
        case '÷':
        case '×':
        case '−':
        case '+':
            operatorPressed(value);
            break;
        case '\u21E4': // Back button
            operandCandidate = operandCandidate.slice(0, -1);
            updateDisplay(operandCandidate);
            break;
        case '=':
            operate();
            break;
        default:
            updateDisplay('Error case default`');
            break;
    }
}

/* Add event listeners for button clicks */
function wireUpButtons() {
    const buttons = document.querySelectorAll('div.button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            buttonPressed(this.textContent);
        })
    })
}

window.onload = wireUpButtons();