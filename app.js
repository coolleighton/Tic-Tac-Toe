let positions = ["", "", "", "", "", "", "", "", ""]
let sign = "x"
let winner = ""
let playerXScore = 0
let playerOScore = 0
let tieScore = 0

// Selectors //

const selectOBtn = document.querySelector("#o-button")
const selectXBtn = document.querySelector("#x-button")
const startGameBtn = document.querySelector("#start-game-button")
const nextRoundBtn = document.querySelector("#next-round-button")
const restartBtn = document.querySelector("#restart-btn")
const quitBtn = document.querySelector("#quit-button")

const endScreen = document.querySelector("#end-screen")
const darkenScreen = document.querySelector("#darken-screen")
const selectionScreen = document.querySelector("#player-selector-container")
const gameScreen = document.querySelector("#game-screen")
const turnDisplay = document.querySelector("#turn")
const playerXScoreDisplay = document.querySelector("#x-score")
const playerOScoreDisplay = document.querySelector("#o-score")
const playerTiesScore = document.querySelector("#ties-score")
const congratsMessage = document.querySelector("#congrats-message")
const winnerSign = document.querySelector("#winner-sign")
const winnerStatement = document.querySelector("#winner-statement")
const gameBoxes = document.querySelectorAll(".box")

// Event listeners //

selectOBtn.addEventListener("click", () => {
    selectOBtn.style.color = "#1E3640"
    selectOBtn.style.backgroundColor = "#A9BEC8"
    selectXBtn.style.color = "#A9BEC8"
    selectXBtn.style.backgroundColor = "transparent"
})

selectXBtn.addEventListener("click", () => {
    selectXBtn.style.color = "#1E3640"
    selectXBtn.style.backgroundColor = "#A9BEC8"
    selectOBtn.style.color = "#A9BEC8"
    selectOBtn.style.backgroundColor = "transparent"
})

startGameBtn.addEventListener("click", () => {
    selectionScreen.style.display = "none"
    gameScreen.style.display = "block"
})

restartBtn.addEventListener("click", () => {
    game.restartRound()
})

nextRoundBtn.addEventListener("click", () => {
    game.startNextRound()
})

quitBtn.addEventListener("click", () => {
    game.restartGame()
})

for (var i = 0; i < gameBoxes.length; i++) {
    gameBoxes[i].dataset.id = [i]
    gameBoxes[i].addEventListener("click", (e) => {
        game.addSign(e)
    })
}


// Gameboard factory functions //

const gameBoard = (pos) => {

    let gameBoardPositions = pos

    // function to add signs to the board //
    const addSign = (e) => {
        if (gameBoardPositions[e.target.dataset.id] === "") {
            gameBoardPositions[e.target.dataset.id] = sign
            game.switchPlayer(e)
            game.checkForRoundWin()
            game.renderPositions()
        }
    }

    // function to render the positions array on the board //
    const renderPositions = () => {
        for (var i = 0; i < positions.length; i++) {
            gameBoxes[i].innerHTML = positions[i]
        }
    }

    // function to switch player after every valid sign placement //
    const switchPlayer = (e) => {
        positions[e.target.dataset.id] = sign

        if (sign === "x") {
            sign = "o"
            turnDisplay.textContent = "O"
            e.target.style.color = "#31C3BD"
        }
        else {
            sign = "x"
            turnDisplay.textContent = "X"
            e.target.style.color = "#F2B137"
        }
    }

    // function to clear array and restart round //
    const restartRound = () => {
        positions = ["", "", "", "", "", "", "", "", ""]
        gameBoardPositions = ["", "", "", "", "", "", "", "", ""]
        sign = "x"
        turnDisplay.textContent = "X"
        for (var i = 0; i < gameBoxes.length; i++) {
            gameBoxes[i].style.color = "#223c47"
        }
        renderPositions()
    }

    // function to start next round //
    const startNextRound = () => {
        darkenScreen.style.display = "none"
        endScreen.style.display = "none"
        restartRound()
    }

    // function to completly restart game //
    const restartGame = () => {
        playerXScore = 0
        playerOScore = 0
        tieScore = 0
        playerXScoreDisplay.textContent = playerXScore
        playerOScoreDisplay.textContent = playerOScore
        playerTiesScore.textContent = tieScore
        restartRound()
        darkenScreen.style.display = "none"
        endScreen.style.display = "none"
        selectionScreen.style.display = "block"
        gameScreen.style.display = "none"
        
    }

    // function to check for win conditions and display winner on screen if any //
    const checkForRoundWin = () => {

        const displayWinScreen = () => {

            darkenScreen.style.display = "block"
            endScreen.style.display = "block"

            if (winner === "x") {
                winnerSign.style.color = "#31C3BD"
                playerXScore++
                congratsMessage.textContent = "CONGRATULATIONS !"
                winnerSign.textContent = winner.toUpperCase()
                winnerStatement.textContent = "TAKES THE ROUND"
                playerXScoreDisplay.textContent = playerXScore
            }
            else if (winner === "o") {
                winnerSign.style.color = "#F2B137"
                playerOScore++
                congratsMessage.textContent = "CONGRATULATIONS !"
                winnerSign.textContent = winner.toUpperCase()
                winnerStatement.textContent = "TAKES THE ROUND"
                playerOScoreDisplay.textContent = playerOScore
            }
            else if (winner === "tie") {
                winnerSign.style.color = "#A9BEC8"
                tieScore++
                congratsMessage.textContent = ""
                winnerSign.textContent = "IT'S A TIE!"
                winnerStatement.textContent = ""
                playerTiesScore.textContent = tieScore
            }
        }

        let getValuePositions = () => {
            let valuePositions = []

            gameBoardPositions.forEach(item => {
                if(item === "") {
                    item = 0
                    valuePositions.push(item)
                }
                else if(item === "x") {
                    item = 1
                    valuePositions.push(item)
                }
                else {
                    item = -1
                    valuePositions.push(item)
                }
            });
            return valuePositions
        }

        const winCondition1 = getValuePositions()[0] + getValuePositions()[1] + getValuePositions()[2]
        const winCondition2 = getValuePositions()[3] + getValuePositions()[4] + getValuePositions()[5]
        const winCondition3 = getValuePositions()[6] + getValuePositions()[7] + getValuePositions()[8]
        const winCondition4 = getValuePositions()[0] + getValuePositions()[3] + getValuePositions()[6]
        const winCondition5 = getValuePositions()[1] + getValuePositions()[4] + getValuePositions()[7]
        const winCondition6 = getValuePositions()[2] + getValuePositions()[5] + getValuePositions()[8]
        const winCondition7 = getValuePositions()[0] + getValuePositions()[4] + getValuePositions()[8]
        const winCondition8 = getValuePositions()[2] + getValuePositions()[4] + getValuePositions()[6]

        if (winCondition1 === 3 || winCondition2 === 3 || winCondition3 === 3 || winCondition4 === 3 || winCondition5 === 3 || winCondition6 === 3 || winCondition7 === 3 || winCondition8 === 3 ) {
            winner = "x"
            displayWinScreen()
        }

        else if (winCondition1 === -3 || winCondition2 === -3 || winCondition3 === -3 || winCondition4 === -3 || winCondition5 === -3 || winCondition6 === -3 || winCondition7 === -3 || winCondition8 === -3 ) {
            winner = "o"
            displayWinScreen()
        }

        else if (gameBoardPositions.every(element => element)) {
            winner = "tie"
            displayWinScreen()
        }
    }

    return  {renderPositions, switchPlayer, checkForRoundWin, startNextRound, restartRound, restartGame, addSign}
}

let game = gameBoard(positions)


