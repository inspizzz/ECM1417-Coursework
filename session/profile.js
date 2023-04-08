function getProfile() {
    let skinData = getCookie("skin")
    let mouthData = getCookie("mouth")
    let eyesData = getCookie("eyes")

    if (skinData && mouthData && eyesData) {
        return {
            skin: skinData,
            mouth: mouthData,
            eyes: eyesData
        }
    } else {
        return null
    }

}

function setProfile(skin, mouth, eyes) {

    //debug
    console.log("[COOKIES] Setting the cookies")

    // set cookies
    document.cookie = `skin=${skin}`
    document.cookie = `mouth=${mouth}`
    document.cookie = `eyes=${eyes}`
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}