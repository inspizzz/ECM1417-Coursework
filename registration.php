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
            <div class="registrationCont">
                <form method="post" action="./" onsubmit="setSession(document.getElementById('uname').value, document.getElementById('pwd').value)">
                    <label for="uname">Username</label><br>
                    <input type="text" id="uname" value="" name="username"><br>

                    <div class="emojiCont">
                        <div class="skinCont">
                            <div class="featureCont">

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
                    <input type="submit" value="Submit" name="Submit">
                </form>
            </div>
        </div>
    </body>
</html>
