<header id="card">
    <link rel="stylesheet" href="./components/card/card.css" />
    <script src="./Scripts/game.js"></script>

    <div class="cardCont" id="tmpContainer">
        <div class="card card--front">
            <img class="cardImage" id="tmpSkin" alt="" src=""/>
            <img class="cardImage" id="tmpEyes" alt="" src=""/>
            <img class="cardImage" id="tmpMouth" alt=""  src=""/>
        </div>

        <div class="card card--back">
            back
        </div>
    </div>

    <script>
        // load a random combination of images into
        function generateRandom(id) {

            // get elements
            const elementSkin = window.document.getElementById("tmpSkin")
            const elementEyes = window.document.getElementById("tmpEyes")
            const elementMouth = window.document.getElementById("tmpMouth")
            const container = window.document.getElementById("tmpContainer")

            // set unique ids to not mistake elements when generating more cards
            elementSkin.id = id + "_Skin"
            elementEyes.id = id + "_Eyes"
            elementMouth.id = id + "_Mouth"
            container.id = id

            // arrays of possible images
            let skins = ["green.png", "red.png", "yellow.png"]
            let mouth = ["open.png", "sad.png", "smiling.png", "straight.png", "surprise.png", "teeth.png"]
            let eyes = ["closed.png", "laughing.png", "long.png", "normal.png", "rolling.png", "winking.png"]

            // get random images
            const random_skin = skins[Math.floor(Math.random() * 3)]; //Bettween 1 and 10
            const random_mouth = mouth[Math.floor(Math.random() * 6)]; //Bettween 1 and 10
            const random_eyes = eyes[Math.floor(Math.random() * 6)]; //Bettween 1 and 10

            // set random images to card
            elementSkin.src = "./assets/emoji/skin/" + random_skin
            elementEyes.src = "./assets/emoji/eyes/" + random_eyes
            elementMouth.src = "./assets/emoji/mouth/" + random_mouth

            // add flipping effect
            container.addEventListener( 'click', function() {
                container.classList.toggle('is-flipped');
            });
        }
        generateRandom(1)

    </script>
</header>
