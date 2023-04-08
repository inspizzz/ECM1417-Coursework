<?php
include "session/startSession.php";
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/leaderboard.css">
        <script src="session/setUsername.js"></script>
        <script src="session/getUsername.js"></script>
    </head>

    <body>
        <div class="navBarCont">
            <?php
                include "components/navBar.php";
            ?>
        </div>

        <div id="main">
            this is inside leaderboard
        </div>

    </body>
</html>
