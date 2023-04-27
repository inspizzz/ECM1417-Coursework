
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
    async addItem(skin, eyes, mouth, username, score, maxLevel, scoresPerLevel) {

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
            result = result.replace("some_per_level_scores", scoresPerLevel)

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
        let data = this.getScores().toString()
        data = data.split("\n")
        data.pop()

        for (let i = 0 ; i < data.length ; i++) {
            let thing = data[i].split(",")
            let name = thing[0]
            let skin = thing[1]
            let eyes = thing[2]
            let mouth = thing[3]
            let total = thing[thing.length-1]

            let scores = []
            for (let j = 0 ; j < thing.length-5 ; j++) {
                let score = parseInt(thing[4+j].replace("[", "").replace("]", ""))
                console.log("for the index ", j, "the score is")
                console.log(score)
                scores.push(score)
            }
            this.addItem(skin, eyes, mouth, name, total, scores.length, scores)
        }
        data = data[0].split(",")


        // if (scores) {
        //     // create local instance of scores and order them
        //     for (let i = 0 ; i < scores.length ; i++) {
        //         console.log(scores[i])
        //
        //         const maxLevel = Array.from(scores[i].keys())[scores[i].size - 6]
        //
        //         this.addItem(scores[i].get("skin"), scores[i].get("eyes"), scores[i].get("mouth"), scores[i].get("username"), scores[i].get("total"), maxLevel)
        //     }
        // } else {
        //
        //     // add no scores message
        //     this.screen.innerHTML = "<h1> no data </h1>"
        // }
    }

    /**
     * returns the scores cookie dat split up into arrays where
     * each element represents an individual attempt containing a
     * map that has the score, skin, mouth ... etc data
     *
     * @return {[]|null} the data or null if none exists
     */
    getScores() {
        let oReq = new XMLHttpRequest();
        oReq.open("GET", "http://20.58.113.5:51199/", false)
        oReq.send()
        return oReq.responseText.toString()
    }
}
