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
                <label for="uname">Username</label><br>
                <label for="uname">Username</label><br>
                <input type="text" id="uname" value="" name="username"><br>

                <label for="pwd">Password</label><br>
                <input type="text" id="pwd" value="" name="password"><br><br>

                <input type="submit" value="Submit" name="Submit">
            </form>
        </div>
    </body>
</html>
