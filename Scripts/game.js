function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

class Game {
    constructor(main) {
        this.screen = main;
        this.level = 1
        this.cardsToMatch = 2
        this.numberOfCards = 6
        this.pointsLevel = 0
        this.pointsTotal = 0
        this.flipNumber = 0
        this.timeLeft = 60
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
        const data = this.getData()
        console.log(data)
        // check if instance of game is stored in cookies
        if (data !== null) {

            // show load game to the user
            this.openLoadGame(data.get("level"), data.get("pointsLevel"), data.get("pointsTotal"), data.get("timeLeft"))
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
    async openLoadGame(level, pointsLevel, pointsTotal, timeLeft) {

        // screen variable
        const main = this.screen

        // ask user to load the game
        let client = new XMLHttpRequest();
        client.open("GET", "./components/loadGame/loadGame.php", true);
        client.onreadystatechange = function () {
            main.innerHTML = client.responseText
        }


        // send
        await client.send()

        client.onload = function () {
            window.document.getElementById("loadGameLevel").textContent = `level: ${level}`
            window.document.getElementById("loadGamePointsLevel").textContent = `points in level: ${pointsLevel}`
            window.document.getElementById("loadGamePointsTotal").textContent = `points total: ${pointsTotal}`
            window.document.getElementById("loadGameTimeLeft").textContent = `time left: ${timeLeft}`
        }
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
        document.cookie = `game=level:${this.level},cardsToMatch:${this.cardsToMatch},numberOfCards:${this.numberOfCards},pointsLevel:${this.pointsLevel},pointsTotal:${this.pointsTotal},flipNumber:${this.flipNumber},timeLeft:${this.timeLeft}`
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
        const data = this.getData()

        this.level = data.get("level")
        this.cardsToMatch = data.get("cardsToMatch")
        this.numberOfCards = data.get("numberOfCards")
        this.pointsLevel = data.get("pointsLevel")
        this.pointsTotal = data.get("pointsTotal")
        this.flipNumber = data.get("flipNumber")
        this.timeLeft = data.get("timeLeft")

        console.log("loaded data")
    }

    /**
     * get the cookie data under the name game, this loads and returns each individual
     */
    getData() {
        const value = `; ${document.cookie}`;
        console.log(value)
        const parts = value.split(`; game=`);
        console.log("parts: ", parts)
        if (parts.length === 2) {
            const data = parts.pop().split(';').shift();
            let map = new Map()

            const thing = data.split(",")
            console.log(thing[0])
            if (thing[0] === "null") {
                return null
            } else {
                console.log("on")
                thing.map((value) => {
                    const split = value.split(":")
                    map.set(split[0], split[1])
                })

                return map
            }
        } else {
            return null
        }
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
    async startGame() {
        console.log("game starting")

        // generate array of blocks
        let board = this.generateBoard()

        console.log(board)
        // place them into the
        for (let i = 0; i < board.length; i++) {
            const item = board[i]

            this.addCard(item.id, item.skin, item.mouth, item.eyes).then(() => {
                const thing = window.document.getElementsByClassName("cardCont")
                console.log(thing)
            })

            // this.addCard(item.id, item.skin, item.mouth, item.eyes).then((value) => {
            //     console.log("found: ", value)
            // }, (value) => {
            //     console.log("rejected: ", value)
            // })

            // const element = window.document.getElementById(item.id)
            //
            // element.addEventListener( `click`, function() {
            //     element.classList.toggle('is-flipped');
            // });

        }
    }

    generateBoard() {

        // cards
        let cards = []
        let combos = []

        // create array of elements
        for (let i = 0 ; i < this.numberOfCards ; i+=2) {

            // generate random skin
            let skin = Math.floor(Math.random() * 3)
            let mouth = Math.floor(Math.random() * 6)
            let eyes = Math.floor(Math.random() * 6)

            // while an element in the array has skin mouth and eyes the same
            while (combos.includes(`${skin}${mouth}${eyes}`)) {

                // regenerate new face
                skin = Math.floor(Math.random() * 3)
                mouth = Math.floor(Math.random() * 6)
                eyes = Math.floor(Math.random() * 6)
            }

            // add cards to match to the array
            for (let j = 0 ; j < this.cardsToMatch ; j++) {
                cards.push({
                    id: i+j,
                    skin: skin,
                    mouth: mouth,
                    eyes: eyes
                })
            }


            // store the current combinations so no duplicates come to be
            combos.push(`${skin}${mouth}${eyes}`)
        }

        cards = shuffle(cards)

        return cards
    }

    nextLevel() {

        // increment level
        this.level += 1

        // new amount of cards
        this.cardsToMatch = (this.level < 5) ? (2) : ((this.level < 10) ? (3) : (4))
        this.numberOfCards = ((this.level + 2) * this.cardsToMatch < 24) ? ((this.level + 2) * this.cardsToMatch) : (24)
        this.pointsLevel = 0
        this.flipNumber = 0
        this.timeLeft = 60
    }

    async addCard(id, randomSkin, randomMouth, randomEyes) {
        console.log(`adding card with id ${id}`)
        // screen variable
        const main = this.screen
        let element;

        // arrays of possible images
        let skins = ["green.png", "red.png", "yellow.png"]
        let mouth = ["open.png", "sad.png", "smiling.png", "straight.png", "surprise.png", "teeth.png"]
        let eyes = ["closed.png", "laughing.png", "long.png", "normal.png", "rolling.png", "winking.png"]

        // ask user to load the game
        let client = new XMLHttpRequest();
        client.open("GET", "./components/card/card.php", true);
        client.onload = async function () {
            let result = client.responseText

            // change the tmp things
            result = result.replace("tmpContainer", id)
            result = result.replace("tmpSkin", `${id}_Skin`)
            result = result.replace("tmpMouth", `${id}_Mouth`)
            result = result.replace("tmpEyes", `${id}_Eyes`)
            result = result.replace("skinImage", `./assets/emoji/skin/${skins[randomSkin]}`)
            result = result.replace("mouthImage", `./assets/emoji/mouth/${mouth[randomMouth]}`)
            result = result.replace("eyesImage", `./assets/emoji/eyes/${eyes[randomEyes]}`)

            main.innerHTML += result

            const thing = window.document.getElementsByClassName("cardCont")

            for (let i = 0 ; i < thing.length ; i++) {
                thing[i].addEventListener("click", function() {
                    thing[i].classList.toggle("is-flipped")
                })
            }
        }

        // send
        await client.send()
    }
}




















