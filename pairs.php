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
                 include "components/navBar/navBar.php";
            ?>
        </div>
        
        <div id="main">
            <div class="scoresCont">
                <div class="timerCont">
                    <div> time left </div>
                    <div class="scores" id="time"> 60s </div>
                </div>

                <div class="levelCont">
                    <div> level </div>
                    <div class="scores" id="level"> 1 </div>
                </div>

                <div class="cardsToMatchCont">
                    <div> cards to match </div>
                    <div class="scores" id="cardsToMatch"> 2 </div>
                </div>

                <div class="levelScoreCont">
                    <div> score  </div>
                    <div class="scores" id="levelScore"> 0 </div>
                    <div> points </div>
                </div>

                <div class="totalScoreCont">
                    <div> total score </div>
                    <div class="scores" id="totalScore"> 0 </div>
                    <div> points </div>
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
