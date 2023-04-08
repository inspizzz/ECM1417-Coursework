function getUsername() {
    if (sessionStorage.getItem("username")) {
        console.log("getting the username and password")
        return {
            username: sessionStorage.getItem("username"),
        }
    } else {
        return false
    }
}
