let monitorText = document.getElementById("monitor").childNodes[3];
let monitorTextTop = document.getElementById("monitor").childNodes[1];
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => ((x * y) % 1 === 0 ? x * y : (x * y).toFixed(2));
const divide = (x, y) => (x % y === 0 ? x / y : (x / y).toFixed(2));
const calculate = function (operator, x, y) {
  if (operator === "+") {
    return add(x, y);
  } else if (operator === "-") {
    return subtract(x, y);
  } else if (operator === "x") {
    return multiply(x, y);
  } else if (operator === "/") {
    return divide(x, y);
  }
};

let updateMonitor = function () {
  let Int = arrInsert.join("");
  monitorText.textContent = Int;
};

let arrInsert = [];
let firstInt;
let operator;
let secondInt;
let result;

//the condition works with !== undefined, but not with === true. WHY?
////////////////////////////////////////NUMBER FUNCTION////////////////////////////////////
function inputNumber(x) {
  if (firstInt !== undefined && secondInt !== undefined) {
    arrInsert = [];
    firstInt = undefined;
    secondInt = undefined;
    monitorTextTop.textContent = "";
    arrInsert.push(x);
    updateMonitor();
  } else if (firstInt !== undefined && arrInsert.length > 0) {
    arrInsert.push(x);
    updateMonitor();
  } else if (firstInt !== undefined) {
    monitorTextTop.textContent += " " + operator;
    arrInsert.push(x);
    updateMonitor();
  } else {
    arrInsert.push(x);
    updateMonitor();
  }
}
//mouse
let numButtons = Array.from(document.getElementsByClassName("number"));
numButtons.forEach((x) => {
  x.addEventListener("click", function () {
    inputNumber(x.textContent);
  });
});
//key
document.addEventListener("keyup", function (e) {
  if (0 + Number(e.key) > 0) {
    inputNumber(e.key);
  }
});

////////////////////////////////////DOT FUNCTION////////////////////////////////////
function placeDot() {
  if (result !== undefined) {
    arrInsert = [];
    arrInsert.push(result);
    arrInsert.push(".");
    result = undefined;
    firstInt = undefined;
    secondInt = undefined;
    updateMonitor();
  } else {
    !arrInsert.includes(".") ? arrInsert.push(".") : false;
    updateMonitor();
  }
}
//mouse
document.getElementById("dot").addEventListener("click", placeDot);
//key
document.addEventListener("keyup", function (e) {
  e.key === "." ? placeDot() : false;
});

///////////////////////////////////CLEAR FUNCTION////////////////////////////////////
function cleanUp() {
  arrInsert = [];
  firstInt = undefined;
  secondInt = undefined;
  monitorText.textContent = [0];
  monitorTextTop.textContent = " ";
}
//mouse
document.getElementById("clear").addEventListener("click", cleanUp);
//key
document.addEventListener("keyup", (e) => {
  e.key === "Escape" ? cleanUp() : false;
});

////////////////////////////////////OPERATOR FUNCTION////////////////////////////////////
function operate(x) {
  if (result !== undefined) {
    firstInt = result;
    result = undefined;
    secondInt = undefined;
    arrInsert = [];
    monitorTextTop.textContent = firstInt;
    monitorText.textContent = x;
    operator = x;
  } else if (firstInt) {
    monitorText.textContent = x;
    operator = x;
  } else {
    firstInt = Number(arrInsert.join(""));
    monitorTextTop.textContent = firstInt;
    arrInsert = [];
    monitorText.textContent = x;
    operator = x;
  }
}
//mouse
const operatorButtons = Array.from(document.getElementsByClassName("operator"));
operatorButtons.forEach((x) => {
  x.addEventListener("click", function () {
    operate(x.textContent);
  });
});
//key
document.addEventListener("keyup", function (e) {
  if (e.key === "+") {
    operate("+");
  } else if (e.key === "-") {
    operate("-");
  } else if (e.key === "*") {
    operate("x");
  } else if (e.code === "Slash") {
    operate("/");
  }
});

/////////////////////////////////FLIP FUNCTION////////////////////////////////////
function flip() {
  if (result !== undefined) {
    result *= -1;
    monitorText.textContent = result;
  } else {
    num = arrInsert.join("") * -1;
    arrInsert = [];
    arrInsert.push(num);
    monitorText.textContent = arrInsert;
  }
}

document.getElementById("flip").addEventListener("click", flip);

//////////////////////////////////DELETE FUNCTION////////////////////////////////////
function remove() {
  arrInsert.pop();
  updateMonitor();
}
//mouse
document.getElementById("delete").addEventListener("click", remove);
//key
document.addEventListener("keyup", function (e) {
  e.key === "Backspace" ? remove() : false;
});

////////////////////////////////////EQUALS FUNCTION////////////////////////////////////
function equals() {
  if (firstInt === undefined && secondInt === undefined) {
    monitorText.textContent = Number(arrInsert.join(""));
    monitorTextTop.textContent = "";
  } else {
    secondInt = Number(arrInsert.join(""));
    result = calculate(operator, firstInt, secondInt);
    monitorTextTop.textContent = `${firstInt} ${operator} ${secondInt} =`;
    monitorText.textContent = result;
  }
}
//mouse
document.getElementById("equals").addEventListener("click", equals);
//key
document.addEventListener("keyup", function (e) {
  e.key === "Enter" ? equals() : false;
});

//number of digits
//enter key (prevent activating the last key pressed)
