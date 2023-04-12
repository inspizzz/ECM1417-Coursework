/**
 * shuffle and array of random elements
 *
 * @param array the array to be shuffled
 * @return {*} the shuffled array
 */
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

function getIdFromElement(element) {
    console.log("[DEBUG] element: ", element)

    return {
        id: element.id,
        skin: element.children[0].children[0].id.split("_")[2],
        mouth: element.children[0].children[1].id.split("_")[2],
        eyes: element.children[0].children[2].id.split("_")[2]
    }
}

let instance;

class Game {


    constructor(main) {
        if (instance) {
            throw new Error("cannot create more than one instance of the class")
        }
        this.screen = main;
        this.level = 1
        this.cardsToMatch = 2
        this.numberOfCards = 6
        this.pointsLevel = 0
        this.pointsTotal = 0
        this.flipNumber = 0
        this.timeLeft = 60

        this.flipped = []
        this.found = []
        this.checking = false

        this.loaded = false

        instance = this
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
        console.log(`[DEBUG] cookie data\n${data}`)
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

        console.log(`[DEBUG] level:${level} pointsLevel:${pointsLevel} pointsTotal:${pointsTotal} timeLeft:${timeLeft}`)
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
        console.log(`[DEBUG] saving data`)

        // serialise the board and found
        let tmpBoard = ""
        let tmpFound = ""

        this.board.forEach((element) => {
            tmpBoard += `${element.id}/${element.skin}/${element.mouth}/${element.eyes}|`
        })
        console.log(this.board)
        console.log(tmpBoard)

        this.found.forEach((element) => {
            tmpFound += `${element}|`

        })
        tmpFound = tmpFound.slice(0, -1);
        tmpBoard = tmpBoard.slice(0, -1);

        // save game data into cookies
        document.cookie = `game=level:${this.level},cardsToMatch:${this.cardsToMatch},numberOfCards:${this.numberOfCards},pointsLevel:${this.pointsLevel},pointsTotal:${this.pointsTotal},flipNumber:${this.flipNumber},timeLeft:${this.timeLeft},board:${tmpBoard},found:${tmpFound}`
    }

    /**
     * remove the game cookie so that loading the previous game
     * does not work anymore
     */
    removeData() {
        console.log("[GAME] removing data")
        document.cookie = "game=null"
    }

    /**
     * load the game back into play when first loading the
     * website so that if the user accidentally refreshes the
     * game can be reloaded
     */
    loadData() {

        console.log("[DEBUG] loading data")

        const data = this.getData()

        console.log(`[DEBUG] load data
        level: ${data.get("level")}
        cards to match: ${data.get("cardsToMatch")}
        number of cards: ${data.get("numberOfCards")}
        points at level: ${data.get("pointsLevel")}
        points total: ${data.get("pointsTotal")}
        flip number: ${data.get("flipNumber")}
        time left: ${data.get("timeLeft")}
        board: ${data.get("board")}
        found: ${data.get("found")}
        
        `)

        this.level = parseInt(data.get("level"))
        this.cardsToMatch = parseInt(data.get("cardsToMatch"))
        this.numberOfCards = parseInt(data.get("numberOfCards"))
        this.pointsLevel = parseInt(data.get("pointsLevel"))
        this.pointsTotal = parseInt(data.get("pointsTotal"))
        this.flipNumber = parseInt(data.get("flipNumber"))
        this.timeLeft = parseInt(data.get("timeLeft"))

        // need to unpack the board and found
        this.found = data.get("found").split("|")

        this.board = []
        data.get("board").split("|").forEach((thing) => {
            this.board.push({
                id: thing.split("/")[0],
                skin: thing.split("/")[1],
                mouth: thing.split("/")[2],
                eyes: thing.split("/")[3],
            })
        })

        window.document.getElementById("time").innerHTML = this.timeLeft
        window.document.getElementById("level").innerHTML = this.level
        window.document.getElementById("levelScore").innerHTML = this.pointsLevel
        window.document.getElementById("totalScore").innerHTML = this.pointsTotal

        this.loaded = true
    }

    /**
     * get the cookie data under the name game, this loads and returns each individual
     */
    getData() {
        const value = `; ${document.cookie}`;
        console.log(`[DEBUG] grabbed cookie of value: ${value}`)
        const parts = value.split(`; game=`);
        if (parts.length === 2) {
            const data = parts.pop().split(';').shift();
            let map = new Map()

            const thing = data.split(",")
            if (thing[0] === "null") {
                return null
            } else {
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
    startGame() {
        console.log(`[GAME] game starting`)

        if (this.loaded) {
            this.startGameFrom()
            return
        }

        // reset the content of the div
        this.screen.innerHTML = ""

        // generate array of blocks
        this.board = this.generateBoard()

        console.log(`[DEBUG] generated board\n${this.board}`)
        // place them into the
        for (let i = 0; i < this.board.length; i++) {
            const item = this.board[i]
            this.addCard(item.id, item.skin, item.mouth, item.eyes)
        }

        // begin decrementing the timer and updating it to the board
        this.timer = setInterval(function() {
            instance.timeLeft -= 1

            if (instance.timeLeft <= 0) {
                // timer has finished
                console.log(`[GAME] timer has finished, end game`)
                clearInterval(instance.timer)
                instance.endGame()
            }

            // update the tag
            window.document.getElementById("time").innerHTML = instance.timeLeft

            // update the cookie
            instance.saveData()
        }, 1000)
    }

    /**
     * when loading data from cookies, user wants to start the game from
     * a pre loaded game position, this includes time and whatnot
     */
    startGameFrom() {
        this.loaded = false
        console.log("[DEBUG] starting game from a point")

        console.log(`[DEBUG] data
        level: ${this.level}
        cards to match: ${this.cardsToMatch}
        number of cards: ${this.numberOfCards}
        points at level: ${this.pointsLevel}
        points total: ${this.pointsTotal}
        flip number: ${this.flipNumber}
        time left: ${this.timeLeft}
        board: `, this.board + `
        found: `, this.found)


        // populate the board with cards
        for (let i = 0; i < this.board.length; i++) {
            const item = this.board[i]
            this.addCard(item.id, item.skin, item.mouth, item.eyes)
        }

        //begin timer
        this.timer = setInterval(function() {
            instance.timeLeft -= 1

            if (instance.timeLeft <= 0) {
                // timer has finished
                console.log(`[GAME] timer has finished, end game`)
                clearInterval(instance.timer)
                instance.endGame()
            }

            // update the tag
            window.document.getElementById("time").innerHTML = instance.timeLeft

            // update the cookie
            instance.saveData()
        }, 1000)
    }

    /**
     * generate a board of elements, note that there should be repeating
     * elements depending on what the number of number of matches
     * this coudl be 2, 3 or 4
     *
     * @return {[]} an array of cards
     */
    generateBoard() {

        // cards
        let cards = []
        let combos = []

        // create array of elements
        for (let i = 0 ; i < this.numberOfCards ; i+=this.cardsToMatch) {

            // generate random skin
            let skin = Math.floor(Math.random() * 3)
            let mouth = Math.floor(Math.random() * 6)
            let eyes = Math.floor(Math.random() * 6)

            // while an element in the array has skin mouth and eyes the same
            while (combos.includes(`${skin}${mouth}${eyes}`)) {

                console.log(`[DEBUG] card ${skin}${mouth}${eyes} already in combos`)
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

        // shuffle them for randomness
        cards = shuffle(cards)

        return cards
    }

    nextLevel() {

        // reset the timer
        clearInterval(this.timer)

        // increment level
        this.level += 1

        // new amount of cards to match
        if (this.level < 5) {

            // just 2
            this.cardsToMatch = 2

        } else if (this.level < 10) {

            // just 2 and 3
            this.cardsToMatch = (this.level % 2 === 0) ? (2) : (3)
        } else {

            // just 2 and 3 and 4
            this.cardsToMatch = (this.level % 3 === 0) ? (2) : ((this.level % 3 === 1) ? (3) : (4))
        }

        // interesting number of cards generation
        if (this.cardsToMatch === 2) {

            // is 2
            this.numberOfCards = Math.ceil((6 + this.level * 3 / 2) / 2.0) * 2

        } else if (this.cardsToMatch === 3) {

            // is 3
            this.numberOfCards = Math.ceil((6 + this.level * 2 / 3) / 3.0) * 3
        } else {

            // is 4
            this.numberOfCards = Math.ceil((6 + this.level * 2 / 4) / 4.0) * 4
        }

        if (this.numberOfCards > 24) {
            this.numberOfCards = 24
        }
        console.log(`[DEBUG] number of cards: ${this.numberOfCards}\nnumber to match: ${this.cardsToMatch}`)



        // this.cardsToMatch = (this.level < 5) ? (2) : ((this.level < 10) ? (3) : (4))
        // this.numberOfCards = (this.level * (this.cardsToMatch) < 24) ? (this.level * this.cardsToMatch) : (24)

        this.pointsLevel = 0
        this.flipNumber = 0
        this.timeLeft = 60

        this.flipped = []
        this.found = []
        this.checking = false

        // set the visual
        window.document.getElementById("time").innerHTML = this.timeLeft
        window.document.getElementById("level").innerHTML = this.level

        // save this checkpoint
        this.saveData()

        // restart the game
        this.startGame()
    }

    async addCard(id, randomSkin, randomMouth, randomEyes) {
        console.log(`[DEBUG] adding card with id ${id}`)
        // screen variable
        const main = this.screen

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
            result = result.replace("tmpSkin", `${id}_Skin_${randomSkin}`)
            result = result.replace("tmpMouth", `${id}_Mouth_${randomMouth}`)
            result = result.replace("tmpEyes", `${id}_Eyes_${randomEyes}`)
            result = result.replace("skinImage", `./assets/emoji/skin/${skins[randomSkin]}`)
            result = result.replace("mouthImage", `./assets/emoji/mouth/${mouth[randomMouth]}`)
            result = result.replace("eyesImage", `./assets/emoji/eyes/${eyes[randomEyes]}`)

            main.innerHTML += result

            const thing = window.document.getElementsByClassName("cardCont")

            for (let i = 0 ; i < thing.length ; i++) {
                thing[i].addEventListener("click", function(event) {
                    instance.flip(event, this)
                })

                const elementId = getIdFromElement(thing[i])
                const elementString = `${elementId.id}${elementId.skin}${elementId.mouth}${elementId.eyes}`

                if (instance.found.includes(elementString)) {
                    console.log("flipping ", thing[i])
                    setTimeout(function() {
                        if (!thing[i].classList.contains("is-flipped")) {
                            thing[i].classList.toggle("is-flipped")
                        }
                    }, 50)

                }
            }
        }

        // send
        await client.send()
    }

    flip(event, element) {

        // add element if the length is less than 2
        if (instance.flipped.length < this.cardsToMatch) {

            const elementId = getIdFromElement(element)
            const stringId = `${elementId.id}${elementId.skin}${elementId.mouth}${elementId.eyes}`

            // check if the element is already flipped
            if (!instance.flipped.includes(element) && !instance.found.includes(stringId)) {
                instance.flipped.push(element)
                element.classList.toggle("is-flipped")
            } else {
                event.preventDefault()
                console.log(`[DEBUG] cannot unflip card`)
            }

        } else {

            // show a little wiggle animation error
            event.preventDefault()
        }

        // check if items are already being checked
        if (!this.checking) {
            // check if there are now 2 elements
            if (instance.flipped.length >= this.cardsToMatch) {

                // checking
                this.checking = true

                setTimeout(function() {
                    console.log(`[DEBUG] checking card`)

                    const face = instance.flipped.every(value => value.children[0].children[0].src === instance.flipped[0].children[0].children[0].src)
                    const eyes = instance.flipped.every(value => value.children[0].children[1].src === instance.flipped[0].children[0].children[1].src)
                    const mouth = instance.flipped.every(value => value.children[0].children[2].src === instance.flipped[0].children[0].children[2].src)

                    console.log(`[DEBUG] face:${face} eyes:${eyes} mouth:${mouth}`)

                    if (face && mouth && eyes) {
                        console.log(`[DEBUG] MATCH OLEEEE OLEE OLE OLEEHHH`)

                        instance.flipped.forEach((element) => {

                            // get the id version of the element
                            const elementId = getIdFromElement(element)
                            const stringId = `${elementId.id}${elementId.skin}${elementId.mouth}${elementId.eyes}`

                            // add element to found
                            instance.found.push(stringId)

                            // show glowing effect for correctly found elements
                            element.classList.toggle("is-glowing")

                            setTimeout(function() {
                                element.classList.toggle("is-glowing")
                            }, 1000)
                        })

                        // check if the game is finished
                        if (instance.found.length === instance.numberOfCards) {
                            console.log(`[DEBUG] THATS GAME`)

                            // handle the end of the round, next level
                            instance.nextLevel()
                        }

                    } else {
                        console.log(`[DEBUG] no match`)

                        // unflip all
                        instance.flipped.forEach((element) => {
                            element.classList.toggle("is-flipped")

                            // show incorrect effect
                            element.classList.toggle("is-incorrect")

                            setTimeout(function() {

                                // remove incorrect effect after a second
                                element.classList.toggle("is-incorrect")
                            }, 700)
                        })
                    }

                    // reset variables
                    instance.flipped = []
                    instance.checking = false
                }, 700);
            }
        } else {
            console.log(`[DEBUG] already checking items`)
        }
    }

    /**
     * handle the end game code, what happens when the game ends,
     * show some display, reset the code, show a set to leaderboard
     * display
     */
    endGame() {
        // remove saved game from
        this.removeData()
    }
}

