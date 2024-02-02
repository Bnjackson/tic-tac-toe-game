"use strict";

let gameChoices = document.querySelectorAll('.game-choices-container');
const startGameBtn = document.querySelector('#startGameBtn');

for (let i = 0; i < gameChoices.length; i++) {
    gameChoices[i].addEventListener('click', (event) => {
        chooseGameOption(event.target);
    });
}

function chooseGameOption(eventTarget) {
    let btnAvailable = false;
    const playerVsComputerOption = document.querySelector('#playerVsComputer');
    const playerVsPlayerOption = document.querySelector('#playerVsPlayer');
    if (eventTarget.classList.contains('playerVsComputer')) {
        setGameOptionToActive(playerVsComputerOption, playerVsPlayerOption);
    } else if (eventTarget.classList.contains('playerVsPlayer')) {
        setGameOptionToActive(playerVsPlayerOption, playerVsComputerOption);
    }
    if (!btnAvailable) {
        setButtonToAvailable();
        btnAvailable = true;
    }
}

function setGameOptionToActive(selectedOption, otherOption) {
    selectedOption.classList.add("active-choice");
    otherOption.classList.remove("active-choice");
}

function setButtonToAvailable() {
    startGameBtn.setAttribute('class', 'available-btn');
    startGameBtn.addEventListener('click', () => {
        startGame();
    });
}

function startGame() {
    console.log();
}