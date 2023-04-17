<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/leaderboard.css">
        <script src="session/profile.js"></script>
        <script src="Scripts/leaderboard.js"></script>
    </head>

    <body>
        <div class="navBarCont">
            <?php
                include "components/navBar.php";
            ?>
        </div>

        <div id="main">
            <div class="leaderboardCont" id="leaderboard">
                <div class="leaderboardScoreCont">
                    <head>
                        <link rel="stylesheet" href="./css/global.css"/>
                        <link rel="stylesheet" href="./components/scoreItem/scoreItem.css"/>
                    </head>

                    <div class="profilePictureCont">
                        <h1 class="image"> image </h1>
                    </div>

                    <div class="usernameCont">
                        <h1 class="username" id="username"> username </h1>
                    </div>

                    <div class="totalScoreCont">
                        <h1 class="totalScore" id="score"> score </h1>
                    </div>

                    <div class="levelReachedCont">
                        <h1 class="levelReached" id="levelReached"> level </h1>
                    </div>
                </div>
            </div>

            <script>
                const LeaderboardContainer = window.document.getElementById("leaderboard")
                let leaderboard = new Leaderboard(LeaderboardContainer)

                leaderboard.loadScores()
            </script>
        </div>
    </body>
</html>
