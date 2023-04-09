// variables
let cardsToMatch = 2
let cardsHorizontally = 2
let cardsVertically = 2
let points = 0
let timeLeft = 0

function startGame() {
    const startElement = window.document.getElementById("startGame")
    startElement.style.display = "none"
}


/**
 * save the platform at frequent intervals so that if the
 * user refreshes automatically then the game may be
 * loaded back into play
 */
function autoSave() {
    // use cookies
}

/**
 * load the game back into play when first loading the
 * website so that if the user accidentally refreshes the
 * game can be reloaded
 */
function autoLoad() {

    // finally close the auto load
    closeAutoLoad()
}

/**
 * close the load game back into play prompt to allow the
 * user to use the loaded game back
 */
function closeAutoLoad() {
    const startElement = window.document.getElementById("loadGame")
    startElement.style.display = "none"
}