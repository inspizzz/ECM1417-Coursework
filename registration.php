<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/registration.css">

        <script src="session/register.js"></script>
        <script src="Scripts/registerSubmit.js"></script>
    </head>

    <body>
        <div class="navBarCont">
            <?php
                include "components/navBar/navBar.php";
            ?>
        </div>
        
        <div id="main">
            <div class="registrationCont">
                <div class="usernameCont">
                    <div class="labelCont">
                        <label for="uname">Username</label><br>
                    </div>

                    <div class="inputCont">
                        <input class="input" type="text" id="uname" value="" name="username" onChange="removeError()"><br>
                    </div>

                    <script>
                        const element = window.document.getElementById("uname");
                        let addError = function() { element.classList.add('error'); };
                        let removeError = function() { element.classList.remove('error'); };
                    </script>
                </div>

                <div class="emojiCont">
                    <div class="buttonCont">
                        <button class="buttonLeft" type="button" onClick="changeSkin(-1)"> < </button>
                        <button class="buttonLeft" type="button" onClick="changeEyes(-1)"> < </button>
                        <button class="buttonLeft" type="button" onClick="changeMouth(-1)"> < </button>
                    </div>

                    <div class="faceCont">
                        <div class="skinCont">
                            <div id="skin_1" class="featureCont">
                                <img class="green" src="assets/emoji/skin/green.png" />
                            </div>

                            <div id="skin_2" class="featureCont">
                                <img class="red" src="assets/emoji/skin/red.png" />
                            </div>

                            <div id="skin_3" class="featureCont">
                                <img class="yellow" src="assets/emoji/skin/yellow.png" />
                            </div>
                        </div>

                        <div class="mouthCont">
                            <div id="mouth_1" class="featureCont">
                                <img class="open" src="assets/emoji/mouth/open.png" />
                            </div>

                            <div id="mouth_2" class="featureCont">
                                <img class="sad" src="assets/emoji/mouth/sad.png" />
                            </div>

                            <div id="mouth_3" class="featureCont">
                                <img class="smiling" src="assets/emoji/mouth/smiling.png" />
                            </div>

                            <div id="mouth_4" class="featureCont">
                                <img class="straight" src="assets/emoji/mouth/straight.png" />
                            </div>

                            <div id="mouth_5" class="featureCont">
                                <img class="surprise" src="assets/emoji/mouth/surprise.png" />
                            </div>

                            <div id="mouth_6" class="featureCont">
                                <img class="teeth" src="assets/emoji/mouth/teeth.png" />
                            </div>
                        </div>

                        <div class="eyesCont">
                            <div id="eyes_1" class="featureCont">
                                <img class="closed" src="assets/emoji/eyes/closed.png" />
                            </div>

                            <div id="eyes_2" class="featureCont">
                                <img class="laughing" src="assets/emoji/eyes/laughing.png" />
                            </div>

                            <div id="eyes_3" class="featureCont">
                                <img class="long" src="assets/emoji/eyes/long.png" />
                            </div>

                            <div id="eyes_4" class="featureCont">
                                <img class="normal" src="assets/emoji/eyes/normal.png" />
                            </div>

                            <div id="eyes_5" class="featureCont">
                                <img class="rolling" src="assets/emoji/eyes/rolling.png" />
                            </div>

                            <div id="eyes_6" class="featureCont">
                                <img class="winking" src="assets/emoji/eyes/winking.png" />
                            </div>
                        </div>
                    </div>

                    <div class="buttonCont">
                        <button class="buttonRight" type="button" onClick="changeSkin(1)"> > </button>
                        <button class="buttonRight" type="button" onClick="changeEyes(1)"> > </button>
                        <button class="buttonRight" type="button" onClick="changeMouth(1)"> > </button>
                    </div>
                </div>

                <div class="submitCont">
                    <button class="submit" type="button" value="Submit" name="Submit" onclick="submit()"> Submit</button>
                </div>

                <script>
                    let skinNumber = 1;
                    let mouthNumber = 1;
                    let eyeNumber = 1;

                    function changeSkin(change) {

                        // hide the previous skin
                        const prev = window.document.getElementById(`skin_${skinNumber}`)
                        prev.style.display = "none"

                        // update the value
                        if (skinNumber + change > 3) {
                            skinNumber = 1
                        } else if (skinNumber + change < 1) {
                            skinNumber = 3
                        } else {
                            skinNumber += change
                        }


                        // show the new skin
                        const next = window.document.getElementById(`skin_${skinNumber}`)
                        next.style.display = "flex"
                    }

                    function changeMouth(change) {

                        // hide the previous mouth
                        const prev = window.document.getElementById(`mouth_${mouthNumber}`)
                        prev.style.display = "none"

                        // update the value
                        if (mouthNumber + change > 6) {
                            mouthNumber = 1
                        } else if (mouthNumber + change < 1) {
                            mouthNumber = 6
                        } else {
                            mouthNumber += change
                        }


                        // show the new skin
                        const next = window.document.getElementById(`mouth_${mouthNumber}`)
                        next.style.display = "flex"
                    }

                    function changeEyes(change) {

                        // hide the previous mouth
                        const prev = window.document.getElementById(`eyes_${eyeNumber}`)
                        prev.style.display = "none"

                        // update the value
                        if (eyeNumber + change > 6) {
                            eyeNumber = 1
                        } else if (eyeNumber + change < 1) {
                            eyeNumber = 6
                        } else {
                            eyeNumber += change
                        }


                        // show the new skin
                        const next = window.document.getElementById(`eyes_${eyeNumber}`)
                        next.style.display = "flex"
                    }

                    // on load set the display of skin, mouth and eye
                    const skin = window.document.getElementById(`skin_${skinNumber}`)
                    const mouth = window.document.getElementById(`mouth_${mouthNumber}`)
                    const eye = window.document.getElementById(`eyes_${eyeNumber}`)

                    skin.style.display = "flex"
                    mouth.style.display = "flex"
                    eye.style.display = "flex"

                    console.log("complete")
                </script>
            </div>

            <script>
                function submit() {
                    const username = window.document.getElementById('uname').value
                    const skin = window.document.getElementById(`skin_${skinNumber}`)
                    const mouth = window.document.getElementById(`mouth_${mouthNumber}`)
                    const eye = window.document.getElementById(`eyes_${eyeNumber}`)

                    const result = submitCheck(username)
                    console.log("result: ", result)
                    if (result) {

                        // set the username
                        setUsername(username)

                        let skinURL = skin.getElementsByTagName('img')[0].src
                        let mouthURL = mouth.getElementsByTagName('img')[0].src
                        let eyeURL = eye.getElementsByTagName('img')[0].src

                        // set the profile image
                        setProfile(skinURL, mouthURL, eyeURL)

                        // reload the navigatino bar dynamically
                        reloadNav()

                        // navigate the user automatically to the index page
                        window.location.href = "./index.php"
                    } else {
                        // error username not valid, do something
                        addError()
                    }

                }
            </script>
        </div>
    </body>
</html>
