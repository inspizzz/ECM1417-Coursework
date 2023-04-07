<?php
    // link into the session
    session_start();

    // check if form has been submitted
    if (isset($_POST['Submit'])) {

        // read in the data and set sessions
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['password'] = $_POST['password'];

        // debug
//        echo 'Username: ' . $_SESSION['username'];
//        echo 'Password: ' . $_SESSION['password'];
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/index.css">
    </head>

    <body>
        <div class="navBarCont">
            <?php
                include "components/navBar.php";
            ?>
        </div>

        <div id="main">
            <div class="welcomeCont">
                <?php
                if (isset($_SESSION['username'])) {
                    echo '<h> Welcome to Pairs</h>';
                    echo '<button class="button" id="pairsButton" onclick="window.location.href=`', 'pairs.php', '`;"> Click here to play </button>';
                } else {
                    echo '<h> Youre not using a registered session? </h>';
                    echo '<button class="button" id="registerButton" onclick="window.location.href=`', 'registration.php', '`;"> Register now </button>';
                }
                ?>





            </div>

        </div>
        <script src="session/setSession.js"></script>
        <script src="session/getSession.js"></script>
    </body>
</html>
