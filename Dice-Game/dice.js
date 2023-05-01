const gameInfo = {
    "rolls": null,
    "diceArr": null,
    "sumOfDice": null
}

const el = document.querySelector("form");
el.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    rollDice(formData.get("numdice"))
}, false);

const createDiceArray = (rolls, sides) => Array.from({ length: rolls }, () => randomNumber(sides, 1));
const sumOfDice = (diceArr) => diceArr.reduce((initial, acc) => initial + acc, 0);
const getNumDice = () => document.getElementById("numdice").value;
const setSumOfDice = (sumRolls) => document.getElementById("total-rolls").textContent = sumRolls;
const randomNumber = (upperbound, lowerbound) => {
    const maxSides = 6;
    const upper = upperbound ?? maxSides;
    const lower = lowerbound ?? 1;
    return Math.floor(Math.random() * upper) + lower;
}

const setValues = (rolls, arr, sum) => {
    gameInfo.rolls = rolls;
    gameInfo.diceArr = arr;
    gameInfo.sumOfDice = sum;
}

const rollDice = (rollNum) => {
    const rolls = rollNum ?? 0;
    const rollArr = createDiceArray(rolls, 6) ?? [];
    const sumRolls = sumOfDice(rollArr) ?? 0;
    setValues(rolls, rollArr, sumRolls);
    setSumOfDice(sumRolls);
    activateShowDiceBtn()
}

const createDiceFace = (parent, numChits) => {
    const numberMap = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six"
    }
    const newFace = parent.appendChild(document.createElement('ul'));
    newFace.className = `face ${numberMap[numChits]}`;
    return newFace
}

const addChit = (container) => {
    container.append(document.createElement('li'))
}

const createDice = (faceValue) => {
    const diceFace = createDiceFace(document.querySelector(".dice-container"), faceValue)
    for (let i = 0; i < faceValue; i++) {
        addChit(diceFace)
    }
}

const isDice = () => {
    return document.querySelectorAll(".face").length > 0;
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
const removeDice = () => {
    if (isDice()) {
        removeAllChildNodes(document.querySelector(".dice-container"))
    }
}

const activateShowDiceBtn = () => {
    const btn = document.getElementById("display-dice");
    btn.classList.remove("hidden-btn");
    btn.addEventListener("click", showDiceBtn);


}
const deactivateShowDiceBtn = () => {
    const btn = document.getElementById("display-dice");
    btn.classList.add("hidden-btn");
    btn.removeEventListener("click", showDiceBtn);
}
const showDiceBtn = () => {
    removeDice()
    gameInfo.diceArr.forEach((rollVal, i) => {
        setTimeout(() => {
            createDice(rollVal)
        }, i * 200);
    })
    deactivateShowDiceBtn()
}

