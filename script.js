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
/*Evaluates expression and returns answer type as number */
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

/*Function adds eventlistners to every button except CLR, DEL and = */
function iterateEveryButton(){
    const btns = document.querySelectorAll(".btn");
    const btnsArray = [...btns];//converting to array as btns is a nodelist
    btnsArray.forEach(btn => {
        addButtonEvent(btn);
    });
}
function addButtonEvent(btn){
    btn.addEventListener("click", () => display(btn))
}
/*Displays pressed button after checking type of button*/
function display(btn){
    if(operators.includes(btn.textContent)){
        if(isOperatorPresent) processEqual(); //if operator exists then first evaluate equation
        displayText = displayText.concat(` ${btn.textContent} `); //then add operator with spaces to display, spaces used in splitting num1, num2, operator
        isOperatorPresent = true;
        operator = btn.textContent; //updating operator
    }
    else{
        if(btn.textContent == "."){ //checks if decimal is pressed and if it is present for num1 and num2
            checkDecimal();
            if(!isNum1DecimalPresent && !isOperatorPresent){ //add decimal to num1 if operator and decimal both not present
                displayText = displayText.concat(`${btn.textContent}`);
            }
            if(!isNum2DecimalPresent && isOperatorPresent){ //add decimal to num2 if it's not present
                displayText = displayText.concat(`${btn.textContent}`);
            }
        }
        else{
            displayText = displayText.concat(`${btn.textContent}`);//not operator and decimal means it's number button
        }

    }
    refreshDisplay();
}
/*function to keep decimal status for num1 and num2 updated*/
function checkDecimal(){
    if(displayText.includes(".")){
        if(isOperatorPresent){ //for checking if decimal is pressed for num1 or num2
            if(displayText.lastIndexOf(".") > displayText.indexOf(operator)){ //checks if decimal present for num2 already with help of operator and decimal position
                isNum2DecimalPresent = true;
            }
        }
        else{
            isNum1DecimalPresent = true; //operator not present so decimal added for num1
        }
    }
    else{
        isNum1DecimalPresent = false; //decimal not present in expression
        isNum2DecimalPresent = false;
    }
}
/*Function to evaluate expression*/
function processEqual(){
    const equationArray = displayText.split(" ");//splitting text with space to differentiate num1, operator and num2
    if(equationArray.length > 2){  //checks if num2 also present
        refreshDisplayExpression(); //moves expression to expression display
        displayText = String(operate(equationArray[0], equationArray[1], equationArray[2]));
        isOperatorPresent = false; //reset indicators
        isNum1DecimalPresent = false;
        isNum2DecimalPresent = false;
        
        checkDecimal();

        if(!isOperatorPresent && isNum1DecimalPresent){ //rounds answer to 3 decimals
            let NumberValue = (+displayText);
            NumberValue = Math.round((NumberValue + Number.EPSILON) * 1000) / 1000;
            displayText = String(NumberValue);
        }
        refreshDisplay();
    }
}
/*Function to delete one character from expression*/
function deleteDisplay(){
    if(displayText.slice(-1) == " "){ //check for operator
        displayText = displayText.slice(0, displayText.length-3)
    }
    else{
        displayText = displayText.slice(0, displayText.length-1);
    }
    refreshDisplay();
}
/*Function for reseting display and indicators */
function clearDisplay(){
    displayText = "";
    isOperatorPresent = false;
    isNum1DecimalPresent = false;
    isNum2DecimalPresent = false;
    refreshDisplay();
    refreshDisplayExpression();
}

/*Function for refreshing display whenever a button is pressed */
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
/*Function display evaluated expression whenever expression is evaluated*/
function refreshDisplayExpression(){
    disp_exp.textContent = displayText; 
}

const disp = document.querySelector("#display_ans");
const disp_exp = document.querySelector("#display_exp");
const eql = document.querySelector("#btn_eql");
const clr = document.querySelector("#btn_clr");
const del = document.querySelector("#btn_del");

let isOperatorPresent = false;
let isNum1DecimalPresent = false;
let isNum2DecimalPresent = false;
let operator = "";
let displayText = "";
const operators = ["+", "-", "*", "/"];

iterateEveryButton();
eql.addEventListener("click", () => processEqual());
clr.addEventListener("click", () => clearDisplay());
del.addEventListener("click", () => deleteDisplay());
clearDisplay();


