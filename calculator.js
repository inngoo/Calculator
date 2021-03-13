let monitorText = document.getElementById("monitor").childNodes[3];
let monitorTextTop = document.getElementById("monitor").childNodes[1];
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => ((x * y) % 1 === 0 ? x * y : (x * y).toFixed(2));
const divide = (x, y) => (x % y === 0 ? x / y : (x / y).toFixed(2));
const operate = function (operator, x, y) {
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
  let Int = Number(arrInsert.join(""));
  monitorText.textContent = Int;
};

let arrInsert = [];
let firstInt;
let operator;
let secondInt;
let result;

//the condition works with !== undefined, but not with === true. WHY?
//----------number function
let numButtons = Array.from(document.getElementsByClassName("number"));
numButtons.forEach((x) => {
  x.addEventListener("click", function () {
    if (firstInt !== undefined && secondInt !== undefined) {
      arrInsert = [];
      firstInt = undefined;
      secondInt = undefined;
      monitorTextTop.textContent = "";
      arrInsert.push(x.textContent);
      updateMonitor();
    } else if (firstInt !== undefined && arrInsert.length > 0) {
      arrInsert.push(x.textContent);
      updateMonitor();
    } else if (firstInt !== undefined) {
      monitorTextTop.textContent += " " + operator;
      arrInsert.push(x.textContent);
      updateMonitor();
    } else {
      arrInsert.push(x.textContent);
      updateMonitor();
    }
  });
});
//----------dot function
document.getElementById("dot").addEventListener("click", function () {
  !arrInsert.includes(".") ? arrInsert.push(".") : false;
  updateMonitor();
});
//----------clear function
document.getElementById("clear").addEventListener("click", function () {
  arrInsert = [];
  firstInt = undefined;
  secondInt = undefined;
  monitorText.textContent = [0];
  monitorTextTop.textContent = " ";
});
//----------operator function
const operatorButtons = Array.from(document.getElementsByClassName("operator"));
operatorButtons.forEach((x) => {
  x.addEventListener("click", function () {
    if (firstInt !== undefined && secondInt !== undefined) {
      firstInt = result;
      result = undefined;
      secondInt = undefined;
      arrInsert = [];
      monitorTextTop.textContent = firstInt;
      monitorText.textContent = x.textContent;
      operator = x.textContent;
    } else if (firstInt) {
      monitorText.textContent = x.textContent;
      operator = x.textContent;
      console.log("jkasl");
    } else {
      firstInt = Number(arrInsert.join(""));
      monitorTextTop.textContent = firstInt;
      arrInsert = [];
      monitorText.textContent = x.textContent;
      operator = x.textContent;
    }
  });
});
//----------flip function
document.getElementById("flip").addEventListener("click", function () {
  if (result !== undefined) {
    result *= -1;
    monitorText.textContent = result;
  } else {
    num = arrInsert.join("") * -1;
    arrInsert = [];
    arrInsert.push(num);
    monitorText.textContent = arrInsert;
  }
});
//----------delete function
document.getElementById("delete").addEventListener("click", function () {
  arrInsert.pop();
  updateMonitor();
});
//----------equals function
document.getElementById("equals").addEventListener("click", function () {
  if (firstInt === undefined && secondInt === undefined) {
    monitorText.textContent = Number(arrInsert.join(""));
    monitorTextTop.textContent = "";
  } else {
    secondInt = Number(arrInsert.join(""));
    result = operate(operator, firstInt, secondInt);
    monitorTextTop.textContent = `${firstInt} ${operator} ${secondInt} =`;
    monitorText.textContent = result;
  }
});
