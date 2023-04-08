function getProfile() {
    if (sessionStorage.getItem("profile")) {
        console.log("getting the profile")
        return {
            profile: sessionStorage.getItem("profile"),
        }
    } else {
        return false
    }
}