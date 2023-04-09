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
            <div class="gameCont" id="game">

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
