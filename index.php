<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/global.css">
        <link rel="stylesheet" href="./css/index.css">

        <script src="./session/profile.js"></script>
        <script src="./session/register.js"></script>
    </head>

    <body>
        <div class="navBarCont">
            <?php
                include "components/navBar/navBar.php";
            ?>
        </div>

        <div id="main">
            <div class="welcomeCont" id="inner">

            </div>
        </div>
    </body>

    <script>

        // function may be called to update when changes have been made
        function reloadIndex() {
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
        }

        // show it
        reloadIndex()
    </script>
</html>
