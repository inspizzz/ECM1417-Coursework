function getProfile() {
    console.log("[COOKIES] Getting the cookies")

    const cookies = document.cookie
    console.log(cookies)
}

function setProfile(skin, mouth, eyes) {

    //debug
    console.log("[COOKIES] Setting the cookies")

    // set cookies
    document.cookie = `skin=${skin}`
    document.cookie = `mouth=${mouth}`
    document.cookie = `eyes=${eyes}`
}