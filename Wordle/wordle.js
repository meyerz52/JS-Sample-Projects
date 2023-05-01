const testWord = ['W', 'O', 'R', 'D', 'S']
let currentRow = 1;
let currentColumn = 0;
currentWord = [];

function addLetterToCurrentWord(value) {
    currentWord.push(value);
}

function removeLastLetterFromCurrentWord() {
    currentWord.length > 0 && currentWord.pop();
}

function isDeleteKey(value) {
    return (value === 'Delete' || value === 'Backspace')
}

function isAlphaKey(value) {
    return value.slice(0, 3) === "Key"
}

function addLetterFromCurrentRow(value) {
    if  (currentWord.length < 5) {
        addLetterToCurrentWord(value)
    } else {
        removeLastLetterFromCurrentWord()
        addLetterToCurrentWord(value)
    }
}


window.addEventListener("keydown", (e) => {
    enteredKey = e.key.toUpperCase();

    isDeleteKey(e.code) && removeLastLetterFromCurrentWord();

    isAlphaKey(e.code) && addLetterFromCurrentRow(enteredKey);
    
    
    let currentCell = document.querySelector(`.row-1>.column-${currentWord.length}`);

    
        
    currentCell.textContent = currentWord.slice(-1);
    


})