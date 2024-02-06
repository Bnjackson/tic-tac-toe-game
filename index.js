"use strict";

// GAME START SCREEN 
let gameChoices = document.querySelectorAll('.game-choices-container');
const startGameBtn = document.querySelector('#startGameBtn');
let userChoice = "";

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
        userChoice = "playerVsComputer";
    } else if (eventTarget.classList.contains('playerVsPlayer')) {
        setGameOptionToActive(playerVsPlayerOption, playerVsComputerOption);
        userChoice = "playerVsPlayer";
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
        startGame(userChoice);
    });
}

// GAME
const gameState = {
    gameboard : [0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentTurn : 'player1',
}

function startGame(userChoice) {
    const gameOptionsScreen = document.querySelector('.game-options-screen');
    const gameScreen = document.querySelector('.game-screen');
    const gameSquares = document.querySelectorAll('.game-square');
    gameOptionsScreen.style.display = "none";
    gameScreen.style.display = "block";
    for (let i = 0; i < gameSquares.length; i++) {
        gameSquares[i].addEventListener('click', async (event) => {
            if (!event.currentTarget.classList.contains("cross-placed") && !event.currentTarget.classList.contains("nought-placed")) {
                addPieceToBoard(event);
            }
        });
    }
    if (userChoice === 'playerVsComputer') {

    } else if (userChoice === 'playerVsPlayer') {
        playerVsPlayerGame();
    }
}

function playerVsPlayerGame() {
    const opponentImg = document.querySelector('#opponentImg');
    const opponentName = document.querySelector('#opponentName');
    opponentImg.src = "/assets/images/soccer-player.png";
    opponentName.textContent = 'Player2';
}

function addPieceToBoard(event) {
    const squareNum = event.currentTarget.dataset.squareNum;
    if (gameState.currentTurn === 'player1') {
        event.currentTarget.classList.add("cross-placed");
        gameState.gameboard[Number(squareNum)] = 'x';
        gameState.currentTurn = 'player2';
    } else {
        event.currentTarget.classList.add("nought-placed");
        gameState.gameboard[Number(squareNum)] = '0';
        gameState.currentTurn = 'player1';
    }
    checkForEndGame();
    
}

function checkForEndGame() {
    if (gameState.gameboard[0] === 'x' && gameState.gameboard[1] === 'x' && gameState.gameboard[2] === 'x' || gameState.gameboard[3] === 'x' && gameState.gameboard[4] === 'x' && gameState.gameboard[5] === 'x' || gameState.gameboard[6] === 'x' && gameState.gameboard[7] === 'x' && gameState.gameboard[8] === 'x' || gameState.gameboard[0] === 'x' && gameState.gameboard[3] === 'x' && gameState.gameboard[6] === 'x' || gameState.gameboard[1] === 'x' && gameState.gameboard[4] === 'x' && gameState.gameboard[7] === 'x' || gameState.gameboard[2] === 'x' && gameState.gameboard[5] === 'x' && gameState.gameboard[8] === 'x' || gameState.gameboard[0] === 'x' && gameState.gameboard[4] === 'x' && gameState.gameboard[8] === 'x' || gameState.gameboard[2] === 'x' && gameState.gameboard[4] === 'x' && gameState.gameboard[6] === 'x') {
        console.log('Player1 wins round');
        displayWinner('player1');
    } else if (gameState.gameboard[0] === '0' && gameState.gameboard[1] === '0' && gameState.gameboard[2] === '0' || gameState.gameboard[3] === '0' && gameState.gameboard[4] === '0' && gameState.gameboard[5] === '0' || gameState.gameboard[6] === '0' && gameState.gameboard[7] === '0' && gameState.gameboard[8] === '0' || gameState.gameboard[0] === '0' && gameState.gameboard[3] === '0' && gameState.gameboard[6] === '0' || gameState.gameboard[1] === '0' && gameState.gameboard[4] === '0' && gameState.gameboard[7] === '0' || gameState.gameboard[2] === '0' && gameState.gameboard[5] === '0' && gameState.gameboard[8] === '0' || gameState.gameboard[0] === '0' && gameState.gameboard[4] === '0' && gameState.gameboard[8] === '0' || gameState.gameboard[2] === '0' && gameState.gameboard[4] === '0' && gameState.gameboard[6] === '0') {
        console.log('Player2 wins round');
        displayWinner('player2');
    }
}

function displayWinner(winner) {
    const winnerModal = document.querySelector('#winnerModal');
    const winnerMessage = document.querySelector('#winnerMessage');
    if (winner === 'player1') {
        winnerMessage.textContent = 'Player 1 wins!';
    } else if (winner === 'player2') {
        winnerMessage.textContent = 'Player 2 wins!';
    }
    winnerModal.style.display = 'flex';
    setTimeout(() => {
        winnerModal.style.display = 'None';
        resetGame();
    }, 1500);
}

function resetGame() {
    const gameSquares = document.querySelectorAll('.game-square');
    gameState.gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    gameState.currentTurn = 'player1';
    for (let i = 0; i < gameSquares.length; i++) {
        gameSquares[i].classList.remove('cross-placed');
        gameSquares[i].classList.remove('nought-placed');
    }
}