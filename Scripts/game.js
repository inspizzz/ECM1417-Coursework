// variables
let cardsToMatch = 2
let cardsHorizontally = 2
let cardsVertically = 2
let points = 0
let timeLeft = 0

/**
 * code that is ran when the website is loaded
 * check if there is an instance of the game stored
 * ask the user to load it
 * load if yes ignore if no
 * then ask the user to start the game
 */
function beforeGame() {
    // game div
    const game = window.document.getElementById("game")

    // check if instance of game is stored in cookies
    if (false) {

        // show load game to the user
        openLoadGame(game)
    } else {

        // show start game to the user
        openStartGame(game)
    }
}

/**
 * save the platform at frequent intervals so that if the
 * user refreshes automatically then the game may be
 * loaded back into play
 */
function saveData() {

    // save game data into cookies
}

/**
 * load the game back into play when first loading the
 * website so that if the user accidentally refreshes the
 * game can be reloaded
 */
function loadData() {

    // load game data into cookies into script
}


function openLoadGame(game) {
    // ask user to load the game
    let client = new XMLHttpRequest();
    client.open("GET", "./components/loadGame/loadGame.php");
    client.onreadystatechange = function() {
        game.innerHTML = client.responseText
    }
    client.send();
}

/**
 * close the load game back into play prompt to allow the
 * user to use the loaded game back
 */
function closeAutoLoad() {

    // get components
    const startElement = window.document.getElementById("loadGame")
    startElement.style.display = "none"
}

function openStartGame(game) {
    // ask the user to start the game
    let client = new XMLHttpRequest();
    client.open("GET", "./components/startGame/startGame.php");
    client.onreadystatechange = function() {
        game.innerHTML = client.responseText
    }
    client.send();
}

function closeStartGame() {
    const startElement = window.document.getElementById("startGame")
    startElement.style.display = "none"
}

// ------------------------------------------------------------------
// --------------------------- START GAME ---------------------------
// ------------------------------------------------------------------

function startGame() {
    console.log("game starting")
}