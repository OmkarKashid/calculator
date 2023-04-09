function add(num1 , num2){
    return (+num1) + (+num2);
}
function subtract(num1 , num2){
    return num1 - num2;
}
function multiply(num1 , num2){
    return num1 * num2;
}
function divide(num1 , num2){
    return num1 / num2;
}
function operate(num1, operator, num2){
    switch(operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "Operator not recognized!";
    }
}
function refreshDisplay(){
    if(!isOperatorPresent){
        let NumberValue = (+displayValue);
        NumberValue = Math.round((NumberValue + Number.EPSILON) * 1000) / 1000;
        displayValue = String(NumberValue);
    } 
    if(displayValue === "NaN") {
        disp.textContent = "Gotcha! Infinite~";
        displayValue = "";
        isOperatorPresent = false;
        return;
    }
    disp.textContent = displayValue;
}
function display(btn){
    if(operators.includes(btn.textContent)){
        if(isOperatorPresent) processEqual();
        displayValue = displayValue.concat(` ${btn.textContent} `);
        isOperatorPresent = true;
    }
    else{
    displayValue = displayValue.concat(`${btn.textContent}`);
    }
    refreshDisplay();
    console.log(displayValue);
}
function iterateEveryButton(){
    const btns = document.querySelectorAll(".btn");
    const btnsArray = [...btns];
    btnsArray.forEach(btn => {
        addButtonEvent(btn);
    });
}
function addButtonEvent(btn){
    btn.addEventListener("click", () => display(btn))
}
function processEqual(){
    const equationArray = displayValue.split(" ");
    if(equationArray.length > 2){
        displayValue = String(operate(equationArray[0], equationArray[1], equationArray[2]));
        isOperatorPresent = false;
        refreshDisplay();
    }
}
function clearDisplay(){
    displayValue = "";
    isOperatorPresent = false;
    refreshDisplay();
}
const disp = document.querySelector("#display");
const eql = document.querySelector("#btn_eql");
const clr = document.querySelector("#btn_clr");
const operators = ["+", "-", "*", "/"];
let displayValue = "";
let isOperatorPresent = false;
let num1 = 0;
let num2 = 0;
let operator = "";
iterateEveryButton();
eql.addEventListener("click", () => processEqual());
clr.addEventListener("click", () => clearDisplay());
clearDisplay();


