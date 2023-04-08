<header>
    <link rel="stylesheet" href="./components/navBar.css">

    <script src="session/profile.js"></script>
    <script src="session/register.js"></script>

    <div class="navBar">
        <div class="navBarLeft">
            <button class="navItem" id="index_link" name="home" onClick="window.location.href='index.php'" >
                <h class="text"> Home </h>
            </button>
        </div>

        <div class="navBarRight" id="right">

        </div>

        <Script>
            function reloadNav() {
                let template = ''
                const username = getUsername()
                const profile = getProfile()

                if (username) {
                    template += `<button class=navItem id='pairs_link' name="memory" onClick="window.location.href='pairs.php'">`
                    template += `<h class="text"> Play pairs </h>`
                    template += `</button>`

                    // template += `<script>`
                    // template += `let pairsElement = document.getElementById("pairs_link");`
                    // template += `console.log("pairs element: ", pairsElement);`
                    // template += `pairsElement.style.cursor = "pointer";`
                    // template += `pairsElement.onClick = function() {`
                    // template += `window.location.href = "pairs.php";`
                    // template += `};`
                    // template += `</scr` + `ipt>`
                    // template += `</div>`

                    template += `<button class=navItem id='leaderboard_link' name="leaderboard" onClick="window.location.href='leaderboard.php'">`
                    template += `<h class="text"> Leaderboard </h>`
                    template += `</button>`

                    console.log("profile is: ", profile)
                    if (profile !== false) {
                        template += `<div class="profileCont" id="user_link" name="user">`
                        template += `<img class="emoji" src="${profile.skin}" />`
                        template += `<img class="emoji" src="${profile.mouth}" />`
                        template += `<img class="emoji" src="${profile.eyes}" />`
                        template += `</div>`

                    } else {
                        template += `<div class="emoji" id="user_link" name="user">`
                        template += `<!-- add user emoji in here -->`
                        template += `</div>`
                    }

                } else {
                    template += `<button class=navItem id='register_link' name="register" onClick="window.location.href='registration.php'">`
                    template += `<h class="text"> Register </h>`
                    template += `</button>`
                }

                const container = window.document.getElementById("right")
                container.innerHTML = template
            }

            reloadNav()
        </script>
    </div>
</header>


    <!--            --><?php
//            if(!isset($_SESSION['username'])) {
//                echo '<div class="referenceRegister" id="register_link" name="register">';
//                echo '<h class="text"> Register </h>';
//                echo '<Script>';
//                echo 'var something = document.getElementById("register_link");';
//                echo 'something.style.cursor = "pointer";';
//                echo 'something.onclick = function() {';
//                echo 'window.location.href = "registration.php";';
//                echo '};';
//                echo '</Script>';
//                echo '</div>';
//            } else {
//                echo '<div class="referencePlay" id="pairs_link" name="memory">';
//                echo '<h class="text"> Play Pairs </h>';
//                echo '<Script>';
//                echo 'var something = document.getElementById("pairs_link");';
//                echo 'something.style.cursor = "pointer";';
//                echo 'something.onclick = function() {';
//                echo 'window.location.href = "pairs.php";';
//                echo '};';
//                echo '</Script>';
//                echo '</div>';
//
//                echo '<div class="referenceLeaderboard" id="leaderboard_link" name="leaderboard">';
//                echo '<h class="text"> Leaderboard </h>';
//                echo '<Script>';
//                echo 'var something = document.getElementById("leaderboard_link");';
//                echo 'something.style.cursor = "pointer";';
//                echo 'something.onclick = function() {';
//                echo 'window.location.href = "leaderboard.php";';
//                echo '};';
//                echo '</Script>';
//
//                if (isset($_SESSION['logo'])) {
//                    echo '</div>';
//                    echo '<div class="emoji" id="user_link" name="user">';
//                    echo '<!-- add user emoji in here -->';
//                    echo '</div>';
//                } else {
////                  show default user icon
//                }
//
//            }
//            ?>