
let LeaderboardInstance;
class Leaderboard {
    constructor(main) {
        if (LeaderboardInstance) {
            throw new Error("cannot create more than one instance of the class")
        }

        this.screen = main

        LeaderboardInstance = this
    }

    //populate the loaderboard
    async addItem(skin, eyes, mouth, username, score, maxLevel) {

        console.log(`the max level is: ${maxLevel}`)
        const main = this.screen

        let client = new XMLHttpRequest();
        client.open("GET", "./components/scoreItem/scoreItem.php", true);

        client.onload = async function () {
            let result = client.responseText

            // replace a bunch of stuff such as
            result = result.replace("skinImage", skin)
            result = result.replace("eyesImage", eyes)
            result = result.replace("mouthImage", mouth)
            result = result.replace("some_username", username)
            result = result.replace("some_score", score)
            result = result.replace("some_level", maxLevel)

            main.innerHTML += result
        }

        // send to client
        await client.send()

    }

    loadScores() {
        // iterate over all of the scores
        const scores = this.getScores()

        if (scores) {
            // create local instance of scores and order them
            for (let i = 0 ; i < scores.length ; i++) {
                console.log(scores[i])

                const maxLevel = Array.from(scores[i].keys())[scores[i].size - 6]

                this.addItem(scores[i].get("skin"), scores[i].get("eyes"), scores[i].get("mouth"), scores[i].get("username"), scores[i].get("total"), maxLevel)
            }
        } else {

            // add no scores message
            this.screen.innerHTML = "<h1> no data </h1>"
        }

    }

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
                for (let element = 0 ; element < thing.split("|").length ; element++) {
                    console.log(`element: ${thing.split("|")}`)
                    console.log(element)
                    console.log(thing.split("|").length)
                    let tmpMap = new Map()
                    let keyValues = thing.split("|")[element].split(",")
                    for (let keyValue = 0 ; keyValue < keyValues.length ; keyValue++ ) {
                        tmpMap.set(keyValues[keyValue].split(">")[0], keyValues[keyValue].split(">")[1])
                    }
                    array.push(tmpMap)
                }
                return array
            }
        }
        return null;
    }
}
