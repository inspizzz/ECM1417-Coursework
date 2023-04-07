function getSession() {
    if (sessionStorage.getItem("username")) {
        console.log("getting the username and password")
        return {
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password")
        }
    } else {
        return false
    }
}
