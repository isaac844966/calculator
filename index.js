const display = document.querySelector(".screen");
let currentInput = "";
let operator = "";
let firstOperand = null;
let resetScreen = false;

const updateDisplay = () => {
  display.value = currentInput;
};

const appendNumber = function (number) {
  if (resetScreen) {
    currentInput = "";
    resetScreen = false;
  }
  currentInput += number;
  updateDisplay();
};

const chooseOperatorValues = function (selectedOperator) {
  if (currentInput === "" && selectedOperator !== "=") return; // am using guard clause

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    firstOperand = operate(firstOperand, parseFloat(currentInput), operator);
    if (selectedOperator === "=") {
      currentInput = firstOperand.toString();
      updateDisplay();
      firstOperand = null;
    }
  }

  operator = selectedOperator;
  if (selectedOperator !== "=") {
    resetScreen = true;
  }
};

const operate = function (operatorA, operatorB, operator) {
  switch (operator) {
    case "+":
      return operatorA + operatorB;
    case "-":
      return operatorA - operatorB;
    case "*":
      return operatorA * operatorB;
    case "/":
      return operatorA / operatorB;
    case "%":
      return (operatorA * operatorB) / 100;
    default:
      return operatorB;
  }
};

const clearAllValues = () => {
  currentInput = "";
  operator = "";
  firstOperand = null;
  resetScreen = false;
  updateDisplay();
};

document
  .querySelector(".calculator-buttons")
  .addEventListener("click", (event) => {
    const { target } = event;
    const value = target.value;

    if (!target.matches("button")) return; // am using guard clause

    switch (value) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        chooseOperatorValues(value);
        break;
      case "=":
        chooseOperatorValues(value);
        operator = "";
        break;
      case ".":
        if (!currentInput.includes(".")) {
          appendNumber(value);
        }
        break;
      case "clear-all":
        clearAllValues();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          appendNumber(value);
        }
    }
  });
