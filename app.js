function routing() {
    var cookie = Cookies.get();
    var lenCookie = Object.keys(cookie).length;

    if (lenCookie > 0) {
        var current = Object.keys(cookie)[0].toString()
        var value = Object.values(cookie)[0].toString()
        var route
        if (value == "compass") {
            var route = value
        } else if (value == "quest") {
            var route = value
        } else {
            var route = current
        }

        window.location.href = route + '.html'

    }
}

function checkCookie() {
    let cookie = Cookies.get();
    let lenCookie = Object.keys(cookie).length;

    if (lenCookie > 0) {
        let current = Object.keys(cookie)[0].toString()
            // console.log(cookie)
        console.log(current)
        return (current)
    } else {
        window.location.href = "index.html"
    }
}

function checkCheck(n) {
    let cookie = Cookies.get();
    let current = Object.keys(cookie)
    if (current != n) {
        window.location.href = "index.html"

    }

}