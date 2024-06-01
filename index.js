const display = document.querySelector(".screen"); // the display represents the calculator screen
let currentInput = "";
let operator = "";
let firstOpr = null;
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

const chooseOperatorValues = function (selectedOpr) {
  if (currentInput === "" && selectedOpr !== "=") return; // am using guard clause

  if (firstOpr === null) {
    firstOpr = parseFloat(currentInput);
  } else if (operator) {
    firstOpr = operate(firstOpr, parseFloat(currentInput), operator);
    if (selectedOpr === "=") {
      currentInput = firstOpr.toString();
      updateDisplay();
      firstOpr = null;
    }
  }

  operator = selectedOpr;
  if (selectedOpr !== "=") {
    resetScreen = true;
  }
};

const operate = function (operatorA, operatorB, operator) {
  // parforming the calculations
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
  firstOpr = null;
  resetScreen = false;
  updateDisplay();
};

document.querySelector(".calculator-buttons").addEventListener("click", (e) => {
  const { target } = e; // destructuring the target out of the event
  const { value } = target; // destructuring the value out of the target

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
    case "clear-all-values":
      clearAllValues();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        appendNumber(value);
      }
  }
});
