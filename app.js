let positions = ["", "", "", "", "", "", "", "", ""]

// Selectors //

const selectOBtn = document.querySelector("#o-button")
const selectXBtn = document.querySelector("#x-button")
const startGameBtn = document.querySelector("#start-game-btn")

const endScreen = document.querySelector("#end-screen")
const darkenScreen = document.querySelector("#darken-screen")
const selectionScreen = document.querySelector("#player-selector-container")
const gameScreen = document.querySelector("#game-screen")
const turnDisplay = document.querySelector("#turn")
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

for (var i = 0; i < gameBoxes.length; i++) {

    gameBoxes[i].dataset.id = [i]
    gameBoxes[i].addEventListener("click", (e) => {

        if (positions[e.target.dataset.id] === "") {
            game.switchPlayer(e)
            game.renderPositions()
            game.checkForWin()
        }
    })
}


// Gameboard factory functions //

const gameBoard = (pos) => {

    let gameBoardPositions = pos
    let sign = "x"

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

    const checkForWin = () => {

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

        let winCondition1 = getValuePositions()[0] + getValuePositions()[1] + getValuePositions()[2]

        if (winCondition1 === 3) {
            darkenScreen.style.display = "block"
            endScreen.style.display = "block"
        }
    }

    return  {renderPositions, switchPlayer, checkForWin}
}

let game = gameBoard(positions)

console.log(game)

