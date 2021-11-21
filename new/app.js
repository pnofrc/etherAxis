let cookie = Cookies.get();
let current = Object.keys(cookie);
$("canvas").slideUp();



function offCompass() {
    $(".compass").slideUp()
}

function offArchive() {
    $(".archive").slideUp()
}

function offBle() {
    $(".ble").slideUp();
    $("canvas").slideUp();
}

function offObj() {
    $(".objective").slideUp();
    $("#objButt").removeClass("clicked2")

}

function offInput() {
    $(".input").slideUp();
    $("#inputButt").removeClass("clicked2")
}

function offGyro() {
    $(".gyro").slideUp();

}

function onCompass() {
    offArchive();
    offBle();
    offObj();
    offInput();
    offGyro();
    $("#compassButt").addClass("clicked")
    $(".compass").slideDown()

    Cookies.set("tool", "compass");
}

function onArchive() {
    offCompass();
    offBle();
    offObj();
    offInput();
    offGyro();

    $("#archiveButt").addClass("clicked")
    $(".archive").slideDown()

    Cookies.set("tool", "archive");
}

function onBle() {
    $("canvas").slideDown();
    offArchive();
    offCompass;
    offObj();
    offInput();
    offGyro();
    $(".ble").slideDown();
    $("#bleButt").addClass("clicked")

    Cookies.set("tool", "ble");
}

function onGyro() {
    offCompass();
    offBle();
    offArchive();
    offObj;
    offInput();
    $(".gyro").slideDown();
    $("#gyroButt").addClass("clicked")

    Cookies.set("tool", "gyro");
}



function onObj() {
    offInput();
    $(".objective").fadeIn();
    $("#objButt").addClass("clicked2")
}

function onInput() {
    offObj;
    $(".input").slideDown();
    $("#objInput").addClass("clicked2")

}






function checkCheck() { //check at what point u are and routing

    let valueTool = Cookies.get("tool");
    if (valueTool == "compass") {
        onCompass()
    }

    if (valueTool == "archive") {
        onArchive()
    }

    if (valueTool == "ble") {
        onBle()
    }
    if (valueTool == "gyro") {
        onGyro()
    }


}

checkCheck()

var btnContainer = document.getElementById("menu");
var btns = btnContainer.getElementsByClassName("menuButt");
console.log(btns.length)
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        $(".clicked").removeClass();
        this.className += " clicked";
        console.log(this.className)
        console.log('oao')
    });
}

var btns2 = btnContainer.getElementsByClassName("gameButt");
console.log(btns2.length)
for (var e = 0; e < btns2.length; e++) {
    btns2[e].addEventListener("click", function() {
        var current = document.getElementsByClassName("clicked2");

        // If there's no active class
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" clicked2", "");
        }

        // Add the active class to the current/clicked button
        this.className += " clicked2";
    });
}

function getInputValue() {
    let inputVal = document.getElementById("input").value;
    inputVal = inputVal.toLowerCase()
    if (inputVal == password[key]) {
        Cookies.set(key, '');
        routing();
    }
}