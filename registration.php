<?php
    session_start();
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/registration.css">
        <script src="session/setSession.js"></script>
        <script src="session/getSession.js"></script>
    </head>

    <body>
        <div class="navBarCont">
            <?php
                include "components/navBar.php";
            ?>
        </div>
        
        <div id="main">
            <form class="registrationCont" method="post" action="./" onsubmit="setSession(document.getElementById('uname').value, document.getElementById('pwd').value)">
                <div class="usernameCont">
                    <div class="labelCont">
                        <label for="uname">Username</label><br>
                    </div>

                    <div class="inputCont">
                        <input class="input" type="text" id="uname" value="" name="username"><br>
                    </div>
                </div>

                <div class="emojiCont">
                    <div class="skinCont">
                        <div class="featureCont">
                            <img class="green" src="assets/emoji/skin/green.png" />
                        </div>

                        <div class="featureCont">
                            <img class="red" src="assets/emoji/skin/red.png" />
                        </div>

                        <div class="featureCont">
                            <img class="yellow" src="assets/emoji/skin/yellow.png" />
                        </div>
                    </div>

                    <div class="mouthCont">
                        <div class="featureCont">
                            <img class="open" src="assets/emoji/mouth/open.png" />
                        </div>

                        <div class="featureCont">
                            <img class="sad" src="assets/emoji/mouth/sad.png" />
                        </div>

                        <div class="featureCont">
                            <img class="smiling" src="assets/emoji/mouth/smiling.png" />
                        </div>

                        <div class="featureCont">
                            <img class="straight" src="assets/emoji/mouth/straight.png" />
                        </div>

                        <div class="featureCont">
                            <img class="surprise" src="assets/emoji/mouth/surprise.png" />
                        </div>

                        <div class="featureCont">
                            <img class="teeth" src="assets/emoji/mouth/teeth.png" />
                        </div>
                    </div>

                    <div class="eyesCont">
                        <div class="featureCont">
                            <img class="closed" src="assets/emoji/eyes/closed.png" />
                        </div>

                        <div class="featureCont">
                            <img class="laughing" src="assets/emoji/eyes/laughing.png" />
                        </div>

                        <div class="featureCont">
                            <img class="long" src="assets/emoji/eyes/long.png" />
                        </div>

                        <div class="featureCont">
                            <img class="normal" src="assets/emoji/eyes/normal.png" />
                        </div>

                        <div class="featureCont">
                            <img class="rolling" src="assets/emoji/eyes/rolling.png" />
                        </div>

                        <div class="featureCont">
                            <img class="winking" src="assets/emoji/eyes/winking.png" />
                        </div>
                    </div>
                </div>

                <div class="submitCont">
                    <input class="submit" type="submit" value="Submit" name="Submit">
                </div>

            </form>

        </div>
    </body>
</html>
