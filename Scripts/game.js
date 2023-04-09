
class Game {
    constructor(main) {
        this.screen = main;
        this.level = 1
        this.cardsToMatch = 2
        this.numberOfCards = 6
        this.pointsLevel = 0
        this.pointsTotal = 0
        this.flipNumber = 0
        this.timeLeft = 0
    }


    // -------------------------------------------------------------------
    // ------------------------- PRE GAME CHECKS -------------------------
    // -------------------------------------------------------------------

    /**
     * code that is ran when the website is loaded check if there
     * is an instance of the game stored ask the user to load it
     * load if yes ignore if no then ask the user to start the game
     */
    beforeGame() {
        this.saveData()

        // check if instance of game is stored in cookies
        if (this.checkData()) {

            // show load game to the user
            this.openLoadGame()
        } else {

            // show start game to the user
            this.openStartGame()
        }
    }

    /**
     * open the load game modal that asks the user weather
     * or not they want to load previous data from an ongoing
     * game
     */
    openLoadGame() {

        // screen variable
        const main = this.screen

        // ask user to load the game
        let client = new XMLHttpRequest();
        client.open("GET", "./components/loadGame/loadGame.php");
        client.onreadystatechange = function() {
            main.innerHTML = client.responseText
        }

        // send
        client.send();
    }

    /**
     * close the load game back into play prompt to allow the
     * user to use the loaded game back
     */
    closeAutoLoad() {

        // get components
        const startElement = window.document.getElementById("loadGame")
        startElement.style.display = "none"
    }

    /**
     * add the start game component to the screen, uses ajax
     * to request the file and then grabs the content inserting
     * it into the right space
     */
    openStartGame() {

        // screen variable, cannot use this in function
        const main = this.screen;

        // ask the user to start the game
        let client = new XMLHttpRequest();
        client.open("GET", "./components/startGame/startGame.php");
        client.onreadystatechange = function() {
            main.innerHTML = client.responseText
        }

        // send to dom
        client.send();
    }

    /**
     * close the start game so that the screen is revealed and
     * allowing the user to play the game, after this, the game
     * goes into full swing and begin automatically
     */
    closeStartGame() {
        const startElement = window.document.getElementById("startGame")
        startElement.style.display = "none"

        this.removeData()
    }


    // --------------------------------------------------------------------
    // ------------------------- SAVE & LOAD DATA -------------------------
    // --------------------------------------------------------------------

    /**
     * save the platform at frequent intervals so that if the
     * user refreshes automatically then the game may be
     * loaded back into play
     */
    saveData() {

        // save game data into cookies
        document.cookie = `game={level: ${this.level}, cardsToMatch:  ${this.cardsToMatch}, numberOfCards: ${this.numberOfCards}, pointsLevel: ${this.pointsLevel}, pointsTotal: ${this.pointsTotal}, flipNumber: ${this.flipNumber}, timeLeft: ${this.timeLeft}}`
    }

    /**
     * remove the game cookie so that loading the previous game
     * does not work anymore
     */
    removeData() {
        console.log("removing data")
        document.cookie = "game=null"
    }

    /**
     * load the game back into play when first loading the
     * website so that if the user accidentally refreshes the
     * game can be reloaded
     */
    loadData() {

        // load game data into cookies into script

    }

    /**
     * get the cookie data under the name game, this loads and returns each individual
     */
    gatData() {

    }

    /**
     * check if there is data stored as cookies with data
     * about a game, return true if yes and else return false
     *
     * @return boolean
     */
    checkData() {

    }


    // ------------------------------------------------------------------
    // --------------------------- START GAME ---------------------------
    // ------------------------------------------------------------------


    /**
     * start the game by generating a board of cards depending on
     * the current level and then displaying it to the user,
     * additionally utilising the timer, points per level, total
     * points and much more
     */
    startGame() {
        console.log("game starting")

        // generate the display of blocks
    }
}




















