<header id="loadGame">
    <link rel="stylesheet" href="./components/loadGame/loadGame.css" />
    <script src="./Scripts/game.js"></script>

    <div class="backdrop">

    </div>

    <div class="loadCont">
        <div class="loadTitleCont">
            <h class="loadTitle"> loaded game detected </h>
        </div>

        <div class="loadButtonCont">
            <button class="load" onClick="loadData(); closeAutoLoad(); openStartGame();"> Load Game </button>
            <button class="cancel" onClick="closeAutoLoad(); openStartGame();"> Reload Game </button>
        </div>
    </div>
</header>
