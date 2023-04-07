function setSession(username, password) {
    // set session
    window.sessionStorage.setItem("username", username)
    window.sessionStorage.setItem("password", password)
    console.log("set the username and password")
}
