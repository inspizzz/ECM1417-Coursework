<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/index.css">

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
            <div class="welcomeCont" id="inner">

            </div>
        </div>
    </body>

    <script>
        // generate conditional content
        let template = "";
        const isset = getUsername()

        if (isset) {
            template += '<h> Welcome to Pairs</h>'
            template += '<button class="button" id="pairsButton" onclick="window.location.href=`pairs.php`;"> Click here to play </button>'
        } else {
            template += '<h> Youre not using a registered session? </h>'
            template += '<button class="button" id="registerButton" onclick="window.location.href=`registration.php`;"> Register now </button>'
        }

        const container = window.document.getElementById("inner")
        container.innerHTML = template


    </script>
</html>
