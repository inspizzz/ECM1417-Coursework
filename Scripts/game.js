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

        // game running
        this.running = true

        // game running score
        this.levelScore = new Map()

        // game running logic
        this.screen = main;
        this.level = 1
        this.cardsToMatch = 2
        this.numberOfCards = 6
        this.pointsLevel = 0
        this.pointsTotal = 0
        this.flipNumber = 0
        this.timeLeft = 30

        // card game logic
        this.flipped = []
        this.found = []
        this.checking = false

        // when loading the game dont generate cards, just load them
        this.loaded = false

        // the instance of this class that is public, singleton
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

        // reset variables
        this.running = true
        this.levelScore = new Map()
        this.level = 1
        this.cardsToMatch = 2
        this.numberOfCards = 6
        this.pointsLevel = 0
        this.pointsTotal = 0
        this.flipNumber = 0
        this.timeLeft = 30
        this.flipped = []
        this.found = []
        this.checking = false

        // when loading the game dont generate cards, just load them
        this.loaded = false

        const data = this.getData()
        // console.log(`[DEBUG] cookie data\n${data}`)
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

        // console.log(`[DEBUG] level:${level} pointsLevel:${pointsLevel} pointsTotal:${pointsTotal} timeLeft:${timeLeft}`)
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
        // console.log(`[DEBUG] saving data`)

        // serialise the board and found
        let tmpBoard = ""
        let tmpFound = ""

        this.board.forEach((element) => {
            tmpBoard += `${element.id}/${element.skin}/${element.mouth}/${element.eyes}|`
        })

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
        document.cookie = 'game=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    /**
     * load the game back into play when first loading the
     * website so that if the user accidentally refreshes the
     * game can be reloaded
     */
    loadData() {

        // console.log("[DEBUG] loading data")

        const data = this.getData()

        // console.log(`[DEBUG] load data
        // level: ${data.get("level")}
        // cards to match: ${data.get("cardsToMatch")}
        // number of cards: ${data.get("numberOfCards")}
        // points at level: ${data.get("pointsLevel")}
        // points total: ${data.get("pointsTotal")}
        // flip number: ${data.get("flipNumber")}
        // time left: ${data.get("timeLeft")}
        // board: ${data.get("board")}
        // found: ${data.get("found")}
        // `)

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

        window.document.getElementById("time").innerHTML = this.timeLeft + "s"
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
        // console.log(`[DEBUG] grabbed cookie of value: ${value}`)
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

        // reset the content of the div
        this.screen.innerHTML = ""

        // if loading game, load the board instead of generating a new one
        if (this.loaded) {

            // reset the variable as you only need to load the board once
            this.loaded = false


        } else {
            // generate array of blocks
            this.board = this.generateBoard()

            // populate the board with cards

        }

        // populate the board with cards
        for (let i = 0; i < this.board.length; i++) {
            const item = this.board[i]
            this.addCard(item.id, item.skin, item.mouth, item.eyes, function(element) {
                // add flipping to all items
                const thing = window.document.getElementsByClassName("cardCont")

                for (let i = 0 ; i < thing.length ; i++) {
                    thing[i].addEventListener("click", function(event) {
                        instance.flip(event, this)
                    })

                    const elementId = getIdFromElement(thing[i])
                    const elementString = `${elementId.id}${elementId.skin}${elementId.mouth}${elementId.eyes}`

                    if (instance.found.includes(elementString)) {
                        if (!thing[i].classList.contains("is-flipped")) {
                            thing[i].classList.toggle("is-flipped")
                        }
                    }
                }
            })
        }



        // begin decrementing the timer and updating it to the board
        this.timer = setInterval(function() {
            instance.timeLeft -= 1

            // update the tag
            window.document.getElementById("time").innerHTML = instance.timeLeft + "s"

            // update the cookie
            instance.saveData()

            if (instance.timeLeft <= 0) {
                // timer has finished
                console.log(`[GAME] timer has finished, end game`)
                clearInterval(instance.timer)
                instance.endGame()
            }
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

                // console.log(`[DEBUG] card ${skin}${mouth}${eyes} already in combos`)
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

        // add the current score to
        this.levelScore.set(this.level, this.pointsLevel)
        console.log(`[DEBUG] ${this.levelScore}`)

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



        // this.cardsToMatch = (this.level < 5) ? (2) : ((this.level < 10) ? (3) : (4))
        // this.numberOfCards = (this.level * (this.cardsToMatch) < 24) ? (this.level * this.cardsToMatch) : (24)

        this.pointsLevel = 0
        this.flipNumber = 0
        this.timeLeft = 60

        this.flipped = []
        this.found = []
        this.checking = false

        // set the visual
        window.document.getElementById("time").innerHTML = this.timeLeft + "s"
        window.document.getElementById("level").innerHTML = this.level
        window.document.getElementById("cardsToMatch").innerHTML = this.cardsToMatch
        window.document.getElementById("levelScore").innerHTML = this.pointsLevel


        // save this checkpoint
        this.saveData()

        // restart the game
        this.startGame()
    }

    async addCard(id, randomSkin, randomMouth, randomEyes, finished) {
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
        }

        // send
        await client.send()

        client.onloadend = function () {
            finished()
        }
    }

    flip(event, element) {

        // add element if the length is less than 2
        if (instance.flipped.length < this.cardsToMatch) {

            const elementId = getIdFromElement(element)
            const stringId = `${elementId.id}${elementId.skin}${elementId.mouth}${elementId.eyes}`

            // check if the element is already flipped
            if (!instance.flipped.includes(element) && !instance.found.includes(stringId) && this.running) {
                instance.flipped.push(element)
                element.classList.toggle("is-flipped")
            } else {

                // prevent the actions of the click
                event.preventDefault()

                // display a red background
                element.classList.toggle("is-incorrect")
                setTimeout(function() {
                    element.classList.toggle("is-incorrect")
                }, 200)
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
                this.flipNumber += 1

                console.log(`flip number is now ${this.flipNumber}`)

                // delay for user to see the actual card before it is hidden
                setTimeout(function() {

                    const face = instance.flipped.every(value => value.children[0].children[0].src === instance.flipped[0].children[0].children[0].src)
                    const eyes = instance.flipped.every(value => value.children[0].children[1].src === instance.flipped[0].children[0].children[1].src)
                    const mouth = instance.flipped.every(value => value.children[0].children[2].src === instance.flipped[0].children[0].children[2].src)

                    // check if faces match
                    if (face && mouth && eyes) {
                        console.log(`[DEBUG] MATCH OLEEEE OLEE OLE OLEEHHH`)

                        // add points based on time left normalised to 100 points
                        instance.pointsLevel += parseInt((instance.timeLeft / 60) * 100) * instance.cardsToMatch * instance.level

                        // update the score
                        window.document.getElementById("levelScore").innerHTML = instance.pointsLevel

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

                            // add code for deducting points for flips + visual
                            setTimeout(function() {
                                instance.nextLevel()
                            }, 5000)

                            // perform point subtractions here
                            console.log(`subtracted ${(instance.flipNumber - (instance.numberOfCards/instance.cardsToMatch)) * 10} points from the level total`)

                            // subtract it
                            const scoreElement = window.document.getElementById("levelScore")
                            let target = instance.pointsLevel - (instance.flipNumber - (instance.numberOfCards/instance.cardsToMatch)) * 10

                            // make it visual, a second later begin to remove the score
                            setTimeout(function() {

                                // add red glow
                                scoreElement.classList.toggle("decreasing")

                                // slowly decrease the score
                                const interval = setInterval(function() {
                                    console.log(`currently ${instance.pointsLevel} going towards ${target}`)

                                    if (instance.pointsLevel === target) {
                                        clearInterval(interval)
                                        scoreElement.classList.toggle("decreasing")

                                        // add score to the total score
                                        instance.pointsTotal += instance.pointsLevel
                                        window.document.getElementById("totalScore").innerHTML = instance.pointsTotal
                                    } else {
                                        instance.pointsLevel -= 1
                                        scoreElement.innerHTML = instance.pointsLevel
                                    }
                                }, 20)
                            }, 1000)
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

        // update the scores with the new totals and per level
        this.levelScore.set(this.level, this.pointsLevel)
        instance.pointsTotal += instance.pointsLevel

        // let the whole program know the games ended
        this.running = false

        // remove saved game from
        this.removeData()

        // open end game dialogue
        this.openEndGame()
    }

    // --------------------------------------------------------------------
    // ------------------------- POST GAME CHECKS -------------------------
    // --------------------------------------------------------------------

    openEndGame() {
        // screen variable, cannot use this in function
        const main = this.screen;

        // ask the user to start the game
        let client = new XMLHttpRequest();
        client.open("GET", "./components/endGame/endGame.php");
        client.onreadystatechange = function() {
            main.innerHTML = client.responseText
        }

        // send to dom
        client.send();

        client.onloadend = function() {
            const profile = getProfile()
            console.log(profile)
            window.document.getElementById("profileSkin").src = profile.skin
            window.document.getElementById("profileEyes").src = profile.eyes
            window.document.getElementById("profileMouth").src = profile.mouth
        }
    }

    closeEndGame() {
        const endElement = window.document.getElementById("endGame")
        endElement.style.display = "none"
    }

    // --------------------------------------------------------------------
    // ------------------------ POST GAME DATABASE ------------------------
    // --------------------------------------------------------------------

    /**
     * after the user has ended the game by losing, they get
     * the option to save their data to cookie
     */
    saveScores() {
        // add user information to the scores map

        console.log("saving things")

        let newArray = []
        // if existing data exists then populate it
        if (this.getScores()) {
            newArray = this.getScores()
            console.log("before")
            console.log(newArray)
        }

        // get the profile
        const profile = getProfile()

        // add existing data to it
        this.levelScore.set("username", getUsername().username)
        this.levelScore.set("total", this.pointsTotal)
        this.levelScore.set("skin", profile.skin)
        this.levelScore.set("eyes", profile.eyes)
        this.levelScore.set("mouth", profile.mouth)

        newArray.push(this.levelScore)

        let content = ""

        console.log("after")
        console.log(newArray)

        for (let element = 0 ; element < newArray.length ; element++) {
            console.log(newArray[element])
            for (let [key, value] of newArray[element].entries()) {
                content += `${key}:${value},`
            }
            content = content.slice(0, -1)
            content += "/"
        }
        content = content.slice(0, -1)

        console.log("saving:")
        console.log(content)

        // save the total score
        document.cookie = `scores=${content}`
    }

    /**
     * get the max score for the current level, this will come
     * in handy when the background should turn golden when the
     * user has surpassed the levels max score
     *
     * @param level this is the level to check
     *
     * @return the integer max score
     */
    getMaxScore(level) {
        let max = -1

        for (let element in this.getScores()) {
            if (element.has(level)) {
                if (element.get(level) > max) {
                    max = element.get(level)
                }
            }
        }

        if (max > 0) {
            return max
        } else {
            return null
        }
    }

    /**
     * return an array of maps of all the users who have saved
     * their data, this data includes their profile picture,
     * their max score and the max level that they have reached
     *
     * @return an array of maps
     */
    getScores() {
        // key:value,key:value/map/map

        let name = "scores=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                const thing = c.substring(name.length, c.length);
                let array = []
                for (let element = 0 ; element < thing.split("/").length ; element++) {
                    console.log(`element: ${thing.split("/")}`)
                    console.log(element)
                    console.log(thing.split("/").length)
                    let tmpMap = new Map()
                    let keyValues = thing.split("/")[element].split(",")
                    for (let keyValue = 0 ; keyValue < keyValues.length ; keyValue++ ) {
                        tmpMap.set(keyValues[keyValue].split(":")[0], keyValues[keyValue].split(":")[1])
                    }
                    array.push(tmpMap)
                }
                return array
            }
        }
        return null;
    }
}

