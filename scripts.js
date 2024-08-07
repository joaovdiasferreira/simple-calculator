const previusOperationText = document.querySelector("#previus-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previusOperationText, currentOperationText) {
        this.previusOperationText = previusOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit) { 
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    processOperation(operation) {

        if(this.currentOperationText.innerText === "" && operation !== "C") {

            if(this.previusOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue;
        const previus = +this.previusOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;
        
        switch(operation) {
            case "+":
                operationValue = previus + current;
                this.updateScreen(operationValue, operation, current, previus);
                break;

            case "-":
                operationValue = previus - current;
                this.updateScreen(operationValue, operation, current, previus);
                break;

            case "*":
                operationValue = previus * current;
                this.updateScreen(operationValue, operation, current, previus);
                break;
            case "/":
                operationValue = previus / current;
                this.updateScreen(operationValue, operation, current, previus);
                break;

            case "CE":
                this.clearCurrentOperator();
                break;

            case "C":
                this.clearOperator();
                break;

            case "DEL":
                this.DelOperator();
                break;
            
            case "=":
                this.equalOperator();
                break;

            default:
                return;
        }
    }

    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previus = null,
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if (previus === 0) {
                operationValue = current;
            }
            this.previusOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }


    }
    DelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0,-1);
    }

    clearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }
    clearOperator() {
        this.currentOperationText.innerText = "";
        this.previusOperationText.innerText = "";
    }

    equalOperator() {
        let operation = this.previusOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }

    changeOperation(operation) {
        const mathOperators = ["+","-","*","/"];

        if(!mathOperators.includes(operation)){
            return;
        }
        this.previusOperationText.innerText = 
            this.previusOperationText.innerText.slice(0,-1) + operation;
    }
}





const calc = new Calculator(previusOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});