function submit(username, password) {
    let reg = new RegExp("[\”\!\@\#\%\&\*\(\)\+\=\ˆ\{\}\[\]\—\;\:\“\’\<\>\?\/]+")
    return !(username.match(/[”!@#%&*()+=ˆ{}\[\]—;:“’<>?\/]+/)) && !(password.match(/[”!@#%&*()+=ˆ{}\[\]—;:“’<>?\/]+/))

}