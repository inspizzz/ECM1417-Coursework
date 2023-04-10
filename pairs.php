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
                <div id="backgrounds">

                </div>
                <?php
                    include "components/card/card.php"
                ?>
                <?php
                include "components/card/card.php"
                ?>
            </div>

            <script>
                // get element and create a game instance
                const PairsContainer = window.document.getElementById("backgrounds")
                const game = new Game(PairsContainer)

                game.beforeGame()


            </script>
        </div>
    </body>
</html>
