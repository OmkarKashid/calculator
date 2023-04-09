function add(num1 , num2){
    return num1 + num2;
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
function operate(num1, num2, operator){
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
    disp.textContent = displayValue;
}
function display(btn){
    displayValue = displayValue.concat(` ${btn.textContent}`);
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
function clearDisplay(){
    displayValue = "";
    refreshDisplay();
}
const disp = document.querySelector("#display");
const clr = document.querySelector("#btn_clr");
let displayValue = "";
let num1 = 0;
let num2 = 0;
let operator = "";
iterateEveryButton();
clr.addEventListener("click", () => clearDisplay());


