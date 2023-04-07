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

                        </div>

                        <div class="featureCont">

                        </div>
                    </div>

                    <div class="mouthCont">
                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>
                    </div>

                    <div class="eyesCont">
                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

                        </div>

                        <div class="featureCont">

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
