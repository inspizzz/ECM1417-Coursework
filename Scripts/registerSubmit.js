function submitCheck(username) {
    if (username !== "") {
        return !(username.match(/[”!@#%&*()+=ˆ{}\[\]—;:“’<>?\/]+|[ ]+/))
    } else {
        return false
    }
}