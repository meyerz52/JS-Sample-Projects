const testWord = ['W', 'O', 'R', 'D', 'S']

const $submitButton = document.querySelector("#submit");
const $resetButton = document.querySelector("#reset");
const $container = document.querySelector("#board-container").children;

let currentRow = 0;
let currentColumn = 0;

function isDeleteKey(value) {
    return (value === 'Delete' || value === 'Backspace')
}

function isAlphaKey(value) {
    const regex = /Key[A-Za-z]/i;
    return regex.test(value);
}

function isEnterKey(value) {
    return value === 'Enter'
}

function getCell(row, column) {
    const $row = $container.item(row).children;
    return $row[column]
}

function deleteLetter(row, column) {
    (column > 0)
        ? (column--, getCell(row, column).textContent = '')
        : (column = 0);
    return column
}

function addLetter(row, column, value) {
    (column < 5) 
        ? (getCell(row, column).textContent = value, column++) 
        : (getCell(row, 4).textContent = value, column=5);
    return column
}

function parseKeyPress(event) {
    const keycode = event.code;
    const keyvalue = event.key.toUpperCase();

    return {
        "keycode" : keycode,
        "keyvalue" : keyvalue
    }
}

function getGuessWord(row) {
    let guess = [];
    const columns = Array.from($container.item(row).children);
    columns.forEach( (column) => {
        guess.push(column.textContent)
    })
    return guess;
}


function isletterSameAtIndex(letter, index, target) {
    return letter === target[index]
}

function isLetterIncluded(letter, target) {
    return target.includes(letter);
}

function colorizeTiles(colorMap) {
    const numToClass = {
        "-1" : "is-incorrect",
        "0" : "is-partially-correct",
        "1" : "is-correct"
    }
    const tempRowNum = currentRow;

    const addClasses = (value, i) => getCell(tempRowNum, i).classList.add(numToClass[value], 'card-flip');
    
    const delayLoop = (fn, delay) => {
            return (value, i) => {
                setTimeout(() => {
                    fn(value, i);
                }, i * delay);
            }
        };

    colorMap.forEach(delayLoop(addClasses, 600))
    
};

function wordleTest(guess, target) {
    let colorMap = Array(5).fill("-1");
    let remainingLettersInWord = [...target];

    guess.forEach((letter, index) => {
        if (isletterSameAtIndex(letter, index, remainingLettersInWord)) {
            colorMap[index] = "1";
            remainingLettersInWord[index] = '';
        } else if (isLetterIncluded(letter, remainingLettersInWord)) {
            colorMap[index] = "0";
            remainingLettersInWord[remainingLettersInWord.indexOf(letter)] = '';
        } else null;
    })

    return colorMap
}

function moveToNextRow() {
    currentRow++
    currentColumn = 0
    $submitButton.classList.remove("button-active")
    submitButtonHandler(currentColumn)
}

function submitButtonHandler(currentWordLen) {
    const toggleSubmitOn = () => {
        $submitButton.addEventListener('click', onSubmit);
        $submitButton.classList.add("button-active");
    }
    const toggleSubmitOff = () => {
        $submitButton.removeEventListener('click', onSubmit);
        $submitButton.classList.remove("button-active");
    }

    (currentWordLen === 5) ? toggleSubmitOn() : toggleSubmitOff();
}

function endGame() {
    // todo: create an endgame sequence
}

function keyBoardEventHandler (event) {
        const keyevent = parseKeyPress(event);
        if (isAlphaKey(keyevent.keycode)) {
            currentColumn = addLetter(currentRow, currentColumn, keyevent.keyvalue);
        } else if (isDeleteKey(keyevent.keycode)) {
            currentColumn = deleteLetter(currentRow, currentColumn);
        } else null;
        submitButtonHandler(currentColumn)
};

function onSubmit () {
    const guess = getGuessWord(currentRow)

    const colorMap = wordleTest(guess, testWord);
    $submitButton.classList.remove("button-active");
    
    colorizeTiles(colorMap);
    moveToNextRow()
};

function onReset() {
    const $container = document.querySelector("#board-container").children
    const cols = [...Array(5).keys()]
    const rows = [...Array(currentRow + 1).keys()]
    console.log(rows)
    rows.forEach( row => {
        cols.forEach(col => {
            let element = getCell(row, col);
            element.textContent = "";
            element.classList = ""
        })
    });
    currentColumn = 0;
    currentRow = 0;
};

// const key = keyBoardEventHandler()
window.addEventListener("keydown", (e) => {keyBoardEventHandler(e)})

$resetButton.addEventListener('click', onReset)