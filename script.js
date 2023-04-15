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
    return  num1 / num2;
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
function display(btn){
    if(operators.includes(btn.textContent)){
        if(isOperatorPresent) processEqual();
        displayText = displayText.concat(` ${btn.textContent} `);
        isOperatorPresent = true;
        operator = btn.textContent;
    }
    else{
        if(btn.textContent == "."){
            checkDecimal();
            if(!isNum1DecimalPresent && !isOperatorPresent){
                displayText = displayText.concat(`${btn.textContent}`);
            }
            if(!isNum2DecimalPresent && isOperatorPresent){
                displayText = displayText.concat(`${btn.textContent}`);
            }
        }
        else{
            displayText = displayText.concat(`${btn.textContent}`);
        }

    }
    refreshDisplay();
}
function checkDecimal(){
    if(displayText.includes(".")){
        if(isOperatorPresent){
            if(displayText.lastIndexOf(".") > displayText.indexOf(operator)){
                isNum2DecimalPresent = true;
            }
        }
        else{
            isNum1DecimalPresent = true;
        }
    }
    else{
        isNum1DecimalPresent = false;
        isNum2DecimalPresent = false;
    }
}
function processEqual(){
    const equationArray = displayText.split(" ");
    if(equationArray.length > 2){
        displayText = String(operate(equationArray[0], equationArray[1], equationArray[2]));
        isOperatorPresent = false;
        isNum1DecimalPresent = false;
        isNum2DecimalPresent = false;
        
        checkDecimal();

        if(!isOperatorPresent && isNum1DecimalPresent){
            let NumberValue = (+displayText);
            NumberValue = Math.round((NumberValue + Number.EPSILON) * 1000) / 1000;
            displayText = String(NumberValue);
        }
        refreshDisplay();
    }
}
function clearDisplay(){
    displayText = "";
    isOperatorPresent = false;
    isNum1DecimalPresent = false;
    isNum2DecimalPresent = false;
    refreshDisplay();
}

function refreshDisplay(){
    checkDecimal();

    if(displayText === "NaN") {
        disp.textContent = "Gotcha! Infinite~";
        displayText = "";
        isOperatorPresent = false;
        isNum1DecimalPresent = false;
        isNum2DecimalPresent = false;
        return;
    }
    disp.textContent = displayText;
}

const disp = document.querySelector("#display");
const eql = document.querySelector("#btn_eql");
const clr = document.querySelector("#btn_clr");
const dec = document.querySelector("#btn_dec");
let isOperatorPresent = false;
let isNum1DecimalPresent = false;
let isNum2DecimalPresent = false;
let operator = "";
let displayText = "";
const operators = ["+", "-", "*", "/"];
iterateEveryButton();
eql.addEventListener("click", () => processEqual());
clr.addEventListener("click", () => clearDisplay());
clearDisplay();


