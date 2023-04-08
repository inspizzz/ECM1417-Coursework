function setUsername(username) {
    // debug
    console.log("[SESSION] Setting the username")

    // set the session
    window.sessionStorage.setItem("username", username)
}

function getUsername() {

    // debug
    console.log("[SESSION] Getting the username")

    // check if session exists, return if not then false
    if (sessionStorage.getItem("username")) {
        console.log("getting the username and password")
        return {
            username: sessionStorage.getItem("username"),
        }
    } else {
        return false
    }
}
