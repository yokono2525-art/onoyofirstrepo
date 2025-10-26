// iPhone Web計算機のJavaScript機能

class Calculator {
    constructor() {
        this.display = document.getElementById('result');
        this.calculationDisplay = document.getElementById('calculation');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForOperand = false;
        this.calculationString = '';
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // ボタンクリックイベント
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');
                this.handleButtonClick(value);
            });
        });
        
        // キーボードイベント
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.key);
        });
    }
    
    handleButtonClick(value) {
        if (this.isNumber(value)) {
            this.inputNumber(value);
        } else if (this.isOperator(value)) {
            this.inputOperator(value);
        } else if (value === '=') {
            this.calculate();
        } else if (value === 'AC') {
            this.clear();
        } else if (value === '%') {
            this.percentage();
        } else if (value === '.') {
            this.inputDecimal();
        }
    }
    
    handleKeyPress(key) {
        if (this.isNumber(key)) {
            this.inputNumber(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            const operator = key === '*' ? '×' : key === '/' ? '÷' : key;
            this.inputOperator(operator);
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.clear();
        } else if (key === '.') {
            this.inputDecimal();
        }
    }
    
    isNumber(value) {
        return /^[0-9]$/.test(value);
    }
    
    isOperator(value) {
        return ['+', '-', '×', '÷'].includes(value);
    }
    
    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentInput = num;
            this.waitingForOperand = false;
            // 計算過程は消さない
        } else {
            this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
        }
        this.updateCalculationDisplay();
        this.updateDisplay();
    }
    
    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput === '') {
            this.previousInput = inputValue;
            this.calculationString = this.currentInput + ' ' + nextOperator;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operator);
            
            this.currentInput = String(newValue);
            this.previousInput = newValue;
            this.calculationString = String(newValue) + ' ' + nextOperator;
        } else {
            this.calculationString = this.currentInput + ' ' + nextOperator;
        }
        
        this.waitingForOperand = true;
        this.operator = nextOperator;
        this.updateDisplay();
    }
    
    calculate() {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput !== '' && this.operator) {
            const newValue = this.performCalculation(this.previousInput, inputValue, this.operator);
            this.calculationString = this.calculationString + ' ' + this.currentInput + ' =';
            this.currentInput = String(newValue);
            this.previousInput = '';
            this.operator = '';
            this.waitingForOperand = true;
            this.updateDisplay();
        }
    }
    
    performCalculation(firstValue, secondValue, operator) {
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '×':
                return firstValue * secondValue;
            case '÷':
                return secondValue !== 0 ? firstValue / secondValue : 0;
            default:
                return secondValue;
        }
    }
    
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForOperand = false;
        this.calculationString = '';
        this.updateCalculationDisplay();
        this.updateDisplay();
    }
    
    percentage() {
        const value = parseFloat(this.currentInput);
        this.currentInput = String(value / 100);
        this.updateCalculationDisplay();
        this.updateDisplay();
    }
    
    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentInput = '0.';
            this.waitingForOperand = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.updateCalculationDisplay();
        this.updateDisplay();
    }
    
    updateCalculationDisplay() {
        this.calculationDisplay.textContent = this.calculationString;
    }
    
    updateDisplay() {
        // 計算過程を上部に表示
        this.updateCalculationDisplay();
        
        // 結果を下部に表示
        let displayValue = this.currentInput;
        if (displayValue.length > 10) {
            displayValue = parseFloat(displayValue).toExponential(6);
        }
        this.display.textContent = displayValue;
    }
}

// ページ読み込み完了後に計算機を初期化
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
