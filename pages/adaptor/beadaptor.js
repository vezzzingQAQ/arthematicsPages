function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        let ccookie = cookies[i].split('=');
        if (ccookie[0].trim() == name) {
            return { ret: 0, value: ccookie[1] };
        }
    }
    return { ret: 1, value: "noCookie" };//没有cookie和cookie被篡改过都得重新登陆所以一个样
}
