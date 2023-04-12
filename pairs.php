<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/pairs.css">
        <script src="Scripts/game.js"> </script>

    </head>
    
    <body>
        <div class="navBarCont">
            <?php
                include "components/navBar.php";
            ?>
        </div>
        
        <div id="main">
            <div class="scoresCont">
                <div class="timerCont">
                    time left: <h1 id="time"> 60 </h1> s
                </div>

                <div class="levelCont">
                    level: <h1 id="level"> 1 </h1>
                </div>

                <div class="levelScoreCont">
                    score: <h1 id="levelScore"> 0 </h1> points
                </div>

                <div class="totalScoreCont">
                    total score <h1 id="totalScore"> 0 </h1> points
                </div>
            </div>

            <div class="gameCont" id="game">
                <!--       content of the game goes in here         -->
            </div>


            <script>
                // get element and create a game instance
                const PairsContainer = window.document.getElementById("game")
                const game = new Game(PairsContainer)

                game.beforeGame()
            </script>
        </div>
    </body>
</html>
