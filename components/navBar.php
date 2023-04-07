<?php
    session_start();
?>

<header>
    <link rel="stylesheet" href="./components/navBar.css">

    <div class="navBar">
        <div class="navBarLeft">
            <div class="referenceHome" id="index_link" name="home" >
                <h class="text"> Home </h>
                <Script>
                    var something = document.getElementById('index_link');

                    something.style.cursor = 'pointer';
                    something.onclick = function() {
                        window.location.href = "index.php";
                    };
                </Script>
            </div>
        </div>

        <div class="navBarRight">
            <?php
            if(!isset($_SESSION['username'])) {
                echo '<div class="referenceRegister" id="register_link" name="register">';
                echo '<h class="text"> Register </h>';
                echo '<Script>';
                echo 'var something = document.getElementById("register_link");';
                echo 'something.style.cursor = "pointer";';
                echo 'something.onclick = function() {';
                echo 'window.location.href = "registration.php";';
                echo '};';
                echo '</Script>';
                echo '</div>';
            } else {
                echo '<div class="referencePlay" id="pairs_link" name="memory">';
                echo '<h class="text"> Play Pairs </h>';
                echo '<Script>';
                echo 'var something = document.getElementById("pairs_link");';
                echo 'something.style.cursor = "pointer";';
                echo 'something.onclick = function() {';
                echo 'window.location.href = "pairs.php";';
                echo '};';
                echo '</Script>';
                echo '</div>';

                echo '<div class="referenceLeaderboard" id="leaderboard_link" name="leaderboard">';
                echo '<h class="text"> Leaderboard </h>';
                echo '<Script>';
                echo 'var something = document.getElementById("leaderboard_link");';
                echo 'something.style.cursor = "pointer";';
                echo 'something.onclick = function() {';
                echo 'window.location.href = "leaderboard.php";';
                echo '};';
                echo '</Script>';

                if (isset($_SESSION['logo'])) {
                    echo '</div>';
                    echo '<div class="emoji" id="user_link" name="user">';
                    echo '<!-- add user emoji in here -->';
                    echo '</div>';
                } else {
//                  show default user icon
                }

            }
            ?>
        </div>
    </div>
</header>
