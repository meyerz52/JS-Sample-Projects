

const $numButtons = document.querySelectorAll("[data-number]");
const $displayBox = document.querySelector("#displayWindow")
const $operatorBtns = document.querySelectorAll("[data-operator]");
const $calcBtn = document.querySelector(".equals")
const $clearBtn = document.querySelector(".clear")

const addBtnListeners = (elems, func) => {
    elems.forEach(
        (btn) => btn.addEventListener("click", func))
}

const resizeDisplayText = new ResizeObserver(ele => {
    const height = parseInt(ele[0].target.clientHeight);
    $displayBox.style.fontSize = height * 0.75 + 'px';
})


class Calculator {
    constructor (display) {
        this.displayWindow = display;
        this.operator = null;
        this.currentValue = 0;
        this.previousValue = 0;
        this.isPreviouKeyOperator = false;
        this.updateDisplay()
    }

    appendToCurrentValue (value) {
        (this.isPreviouKeyOperator || !this.currentValue) ? this.currentValue = value : this.currentValue += value;
        this.updateDisplay()
    }

    setOperator (operator) {
        
        

        const operatorFunc = {
            "add" : this.constructor.addValues,
            "subtract" : this.constructor.subtractValues,
            "multiply" : this.constructor.multipleValues,
            "divide" : this.constructor.divideValues
        };
        
        console.log(this.currentValue, this.previousValue)
        if (this.isPreviouKeyOperator) {
            this.submit()
        }
        this.previousValue = this.currentValue;

        this.isPreviouKeyOperator = true;
        this.operator = operatorFunc[operator];
    }

    applyDepressedFormat (elem) {
        elem.classList.add("is-depressed")
    }

    removeDepressedFormat () {
        $operatorBtns.forEach(k => {
            k.classList.remove('is-depressed')
        })
    }

    updateDisplay () {
        const displayValue = this.constructor.formatDisplayValues(this.currentValue)
        this.displayWindow.textContent = displayValue;
    }

    submit () {
        if (this.operator && !this.previousValue) {

            this.previousValue = this.currentValue 
        } 

        this.currentValue = this.operator(parseFloat(this.previousValue),parseFloat(this.currentValue));

        this.updateDisplay()
    }
    
    clear () {
        this.removeDepressedFormat()
        this.operator = null;
        this.previousValue = 0;
        this.currentValue = 0;
        this.isPreviouKeyOperator = false;
        this.updateDisplay()
    }

    clickNumberButton (event) {
        this.removeDepressedFormat();
        this.appendToCurrentValue(event.target.textContent);
        this.isPreviouKeyOperator = false
    }

    clickOperatorButton (event) {
        calculator.applyDepressedFormat(event.target);

        calculator.setOperator(event.target.dataset.operator);
    }

    static formatDisplayValues = (value) => {
        const val = value.toString()
        if (val.length > 8) {
            return val.includes(".") ? (Number(val).toFixed(9 - (val.indexOf(".")))) .toString() : val.slice(0,8) 
        } else {
            return value;
        }
    }
    static addValues = (a, b) => {
        return a + b
    }
    
    static subtractValues = (a, b) => {
        return a - b
    }
    
    static divideValues = (a, b) => {
        return (b === 0) ? "NaN" : a / b
    }
    
    static multipleValues = (a, b) => {
        return (a * b)
    }
}

const calculator = new Calculator($displayBox)

function initilizer () {
    addBtnListeners($numButtons, e => calculator.clickNumberButton(e))
    addBtnListeners($operatorBtns, e => calculator.clickOperatorButton(e))
    resizeDisplayText.observe($displayBox)
    $calcBtn.addEventListener("click", () => calculator.submit())
    $clearBtn.addEventListener("click", () => calculator.clear())
}

window.onload =  initilizer()