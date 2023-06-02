let positions = ["", "", "", "", "", "", "", "", ""]
let player1 = ""
let player2 = ""
// Selectors //

const selectOBtn = document.querySelector("#o-button")
const selectXBtn = document.querySelector("#x-button")
const startGameBtn = document.querySelector("#start-game-btn")

const endScreen = document.querySelector("#end-screen")
const darkenScreen = document.querySelector("#darken-screen")
const selectionScreen = document.querySelector("#player-selector-container")
const gameScreen = document.querySelector("#game-screen")
const turnDisplay = document.querySelector("#turn")
const winnerSign = document.querySelector("#winner-sign")
const gameBoxes = document.querySelectorAll(".box")

// Event listeners //

selectOBtn.addEventListener("click", () => {
    selectOBtn.style.color = "#1E3640"
    selectOBtn.style.backgroundColor = "#A9BEC8"
    selectXBtn.style.color = "#A9BEC8"
    selectXBtn.style.backgroundColor = "transparent"
    player1 = "x"
    player2 = "o"
})

selectXBtn.addEventListener("click", () => {
    selectXBtn.style.color = "#1E3640"
    selectXBtn.style.backgroundColor = "#A9BEC8"
    selectOBtn.style.color = "#A9BEC8"
    selectOBtn.style.backgroundColor = "transparent"
    player1 = "o"
    player2 = "x"
})

startGameBtn.addEventListener("click", () => {
    selectionScreen.style.display = "none"
    gameScreen.style.display = "block"
})

for (var i = 0; i < gameBoxes.length; i++) {

    gameBoxes[i].dataset.id = [i]
    gameBoxes[i].addEventListener("click", (e) => {

        if (positions[e.target.dataset.id] === "") {
            game.switchPlayer(e)
            game.renderPositions()
            game.checkForRoundWin()
        }
    })
}

// Gameboard factory functions //

const gameBoard = (pos) => {

    let gameBoardPositions = pos
    let sign = "x"
    let winner = ""

    const renderPositions = () => {

        for (var i = 0; i < gameBoardPositions.length; i++) {
            gameBoxes[i].innerHTML = gameBoardPositions[i]
        }
    }

    const switchPlayer = (e) => {
        
        positions[e.target.dataset.id] = sign
        if (sign === "x") {
            sign = "o"
            turnDisplay.textContent = "O"
        }
        else {
            sign = "x"
            turnDisplay.textContent = "X"
        }
    }

    const checkForRoundWin = () => {

        const displayWinScreen = () => {
            darkenScreen.style.display = "block"
            endScreen.style.display = "block"
            winnerSign.textContent = winner.toUpperCase()
            console.log(winner)
            if (winner === "x") {
                winnerSign.style.color = "#31C3BD"
            }
            else if (winner === "o") {
    
                winnerSign.style.color = "#F2B137"
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
    }

    return  {renderPositions, switchPlayer, checkForRoundWin}
}

let game = gameBoard(positions)

console.log(game)

