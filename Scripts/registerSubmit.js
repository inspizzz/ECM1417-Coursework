function submitCheck(username) {
    console.log("submit check")
    let reg = new RegExp("[ \”\!\@\#\%\&\*\(\)\+\=\ˆ\{\}\[\]\—\;\:\“\’\<\>\?\/]+")
    return !(username.match(/[”!@#%&*()+=ˆ{}\[\]—;:“’<>?\/]+/))

}