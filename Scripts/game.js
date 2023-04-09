

// -------------------------------------------------------------------
// ------------------------- PRE GAME CHECKS -------------------------
// -------------------------------------------------------------------

/**
 * code that is ran when the website is loaded check if there
 * is an instance of the game stored ask the user to load it
 * load if yes ignore if no then ask the user to start the game
 */
function beforeGame() {
    // game div


    // check if instance of game is stored in cookies
    if (checkData()) {

        // show load game to the user
        openLoadGame()
    } else {

        // show start game to the user
        openStartGame()
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

/**
 * check if there is data stored as cookies with data
 * about a game, return true if yes and else return false
 *
 * @return boolean
 */
function checkData() {
    return true;
}

/**
 * open the load game modal that asks the user weather
 * or not they want to load previous data from an ongoing
 * game
 */
function openLoadGame() {

    // get game div element
    const game = window.document.getElementById("game")

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

/**
 * add the start game component to the screen, uses ajax
 * to request the file and then grabs the content inserting
 * it into the right space
 */
function openStartGame() {

    // get game div element
    const game = window.document.getElementById("game")

    // ask the user to start the game
    let client = new XMLHttpRequest();
    client.open("GET", "./components/startGame/startGame.php");
    client.onreadystatechange = function() {
        game.innerHTML = client.responseText
    }
    client.send();
}

/**
 * close the start game so that the screen is revealed and
 * allowing the user to play the game, after this, the game
 * goes into full swing and begin automatically
 */
function closeStartGame() {
    const startElement = window.document.getElementById("startGame")
    startElement.style.display = "none"
}

// ------------------------------------------------------------------
// --------------------------- START GAME ---------------------------
// ------------------------------------------------------------------

// variables
let cardsToMatch = 2
let cardsHorizontally = 2
let cardsVertically = 2
let points = 0
let timeLeft = 0

function startGame() {
    console.log("game starting")

    // generate the display of blocks
}

/**
 * create html code that represents the board
 */
function generateBoard() {

}