const testWord = ['W', 'O', 'R', 'D', 'S']
let currentRow = 0;
currentWord = [];

function isDeleteKey(value) {
    return (value === 'Delete' || value === 'Backspace')
}

function isAlphaKey(value) {
    return value.slice(0, 3) === "Key"
}

function removeLastLetterFromWord(wordArray) {
    return (wordArray.length >= 0) && wordArray.slice(0, -1)
}

function addLetterToCurrentWord(value, wordArray) {
    return ((wordArray.length < 5) ? wordArray : removeLastLetterFromWord(wordArray)).concat([value]) ;

}

function updateCell(row, wordArray) {
        const $container = document.querySelector("#board-container").children
        const $row = $container.item(row).children

        Array.from($row)
            .forEach((child, index) => 
                {
                    (index <= wordArray.length) 
                    ? child.textContent = wordArray[index] 
                    : child.textContent = '';
                });
}

function parseKeyPress(event) {
    const keycode = event.code;
    const keyvalue = event.key.toUpperCase();

    return {
        "keycode" : keycode,
        "keyvalue" : keyvalue
    }
}

function updateWord(keyevent, word) {
    if (keyevent.keycode && keyevent.keyvalue) {
        return (isAlphaKey(keyevent.keycode)) 
            ? addLetterToCurrentWord(keyevent.keyvalue, word) 
            : (isDeleteKey(keyevent.keycode)) ? removeLastLetterFromWord(word) 
            : null;
    } else return;
}


function keyPressHandler(event) {
   const keyevent = parseKeyPress(event);
   currentWord = updateWord(keyevent, currentWord);
   updateCell(currentRow, currentWord)



   
}
window.addEventListener("keydown", (e) => {keyPressHandler(e)})