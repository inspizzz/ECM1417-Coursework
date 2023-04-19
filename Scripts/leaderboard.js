
// the leaderboard class singleton instance
let LeaderboardInstance;

/**
 * the leaderboard class that manipulates the leaderboard
 * visual aspects such as what it shows to the user
 */
class Leaderboard {

    /**
     * constructor for this class, it takes the main div
     * as an argument
     *
     * @param main the main leaderboard container that is to be modified
     */
    constructor(main) {
        if (LeaderboardInstance) {
            throw new Error("cannot create more than one instance of the class")
        }

        this.screen = main

        LeaderboardInstance = this
    }

    /**
     * add a leaderboard item to the container
     *
     * @param skin the skin link
     * @param eyes the eyes link
     * @param mouth the mouth link
     * @param username the username link
     * @param score the score
     * @param maxLevel the max score
     *
     * @return {Promise<void>} returns a promise that resolves once the leaderboard is updated
     */
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

    /**
     * populates the leaderboard with the current scores
     */
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

    /**
     * returns the scores cookie dat split up into arrays where
     * each element represents an individual attempt containing a
     * map that has the score, skin, mouth ... etc data
     *
     * @return {[]|null} the data or null if none exists
     */
    getScores() {
        // key:value,key:value/map/map

        let name = "scores=";
        let segments = document.cookie.split(';');
        for(let i = 0; i < segments.length; i++) {
            let segment = segments[i];
            while (segment.charAt(0) === ' ') {
                segment = segment.substring(1);
            }
            if (segment.indexOf(name) === 0) {
                const thing = segment.substring(name.length, c.length);
                let array = []
                for (let element = 0 ; element < thing.split("|").length ; element++) {
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
