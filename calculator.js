/* Select calculator display elements */
let operatorDisplay = document.querySelector("#operation");
let outputDisplay = document.querySelector('#output');
let operandCandidate;
let operandA;
let operandB;
let operatorSymbol;
let equalPressed = false;
let displayWidth = 11; // Width of output display in characters

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
    // Limit the number of input characters
    if (operandCandidate) {
        if (operandCandidate.toString().length >= displayWidth) {
            return;
        }
    }
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
    answer = answer.toString().substring(0, displayWidth);
    updateDisplay(answer);

    // Reset variables and clear display
    operandCandidate = undefined;
    operandA = undefined;
    operandB = undefined;
    operatorSymbol = undefined;
    updateOperation(operatorSymbol);
}

function enterDecimal(value) {
    // Prevent multiple decimal places in number
    if (operandCandidate) {
        operandCandidate.indexOf('.') == -1 ? numberPressed(value) : null;
    } else {
        numberPressed(value);
    }
}

function deleteLastNumber() {
    if (operandCandidate) {
        operandCandidate = operandCandidate.slice(0, -1);
        updateDisplay(operandCandidate);
    }
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
            enterDecimal(value);
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
            deleteLastNumber();
            break;
        case '=':
            operate();
            break;
        default:
            updateDisplay('Error default case');
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

function wireUpKeyboard() {
    window.addEventListener('keydown', function (event) {
        // document.querySelector()
        switch (event.key) {
            case '1':
                document.getElementById('btn-one').classList.add('keyPressed');
                buttonPressed('1');
                break;
            case '2':
                document.getElementById('btn-two').classList.add('keyPressed');
                buttonPressed('2');
                break;
            case '3':
                document.getElementById('btn-three').classList.add('keyPressed');
                buttonPressed('3');
                break;
            case '4':
                document.getElementById('btn-four').classList.add('keyPressed');
                buttonPressed('4');
                break;
            case '5':
                document.getElementById('btn-five').classList.add('keyPressed');
                buttonPressed('5');
                break;
            case '6':
                document.getElementById('btn-six').classList.add('keyPressed');
                buttonPressed('6');
                break;
            case '7':
                document.getElementById('btn-seven').classList.add('keyPressed');
                buttonPressed('7');
                break;
            case '8':
                document.getElementById('btn-eight').classList.add('keyPressed');
                buttonPressed('8');
                break;
            case '9':
                document.getElementById('btn-nine').classList.add('keyPressed');
                buttonPressed('9');
                break;
            case '0':
                document.getElementById('btn-zero').classList.add('keyPressed');
                buttonPressed('0');
                break;
            case '.':
                document.getElementById('btn-decimal').classList.add('keyPressed');
                enterDecimal('.')
                break;
            case 'Clear':
            case 'Escape':
                document.getElementById('btn-clear').classList.add('keyPressed');
                clearPressed()
                break;
            case '/':
                document.getElementById('btn-division').classList.add('keyPressed');
                operatorPressed('÷');
                break;
            case '*':
                document.getElementById('btn-multiply').classList.add('keyPressed');
                operatorPressed('×');
                break;
            case '-':
                document.getElementById('btn-subtract').classList.add('keyPressed');
                operatorPressed('−');
                break;
            case '+':
                document.getElementById('btn-plus').classList.add('keyPressed');
                operatorPressed('+');
                break;
            case 'Backspace': // Back button
            case 'Delete': // Back button
                document.getElementById('btn-delete').classList.add('keyPressed');
                deleteLastNumber();
                break;
            case '=':
            case 'Enter':
                document.getElementById('btn-equal').classList.add('keyPressed');
                operate();
                break;
            default:
                updateDisplay('Error keyboard case');
                break;
        }
    })
}

// Remote highlight from button when keystroke is lifted up
function keyboardReleaseKey() {
    window.addEventListener('keyup', function (event) {
        document.querySelector('.keyPressed').classList.remove('keyPressed');
    })
}

window.onload = wireUpButtons();
window.onload = wireUpKeyboard();
window.onload = keyboardReleaseKey();