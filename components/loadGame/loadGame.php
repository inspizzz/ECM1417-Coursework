<header id="loadGame">
    <link rel="stylesheet" href="./components/loadGame/loadGame.css" />
    <script src="./Scripts/game.js"></script>

    <div class="backdrop">

    </div>

    <div class="loadCont">
        <div class="loadTitleCont">
            <h class="loadTitle"> loaded game detected </h>
        </div>

        <div class="loadData">
            <ul id="showData">
                <li id="loadGameLevel"> level: </li>
                <li id="loadGamePointsLevel"> points in level: </li>
                <li id="loadGamePointsTotal"> points total: </li>
                <li id="loadGameTimeLeft"> time left: </li>
            </ul>
        </div>

        <div class="loadButtonCont">
            <button class="load" onClick="game.loadData(); game.closeAutoLoad(); game.openStartGame()"> Load Game </button>
            <button class="cancel" onClick="game.closeAutoLoad(); game.openStartGame()"> Start Again </button>
        </div>
    </div>
</header>
