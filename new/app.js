$("#gyroButt").prop('disabled', true)
$("#archiveButt").prop('disabled', true)
$("#bleButt").prop('disabled', true)


let cookie = Cookies.get();
let current = Object.keys(cookie);
let len = current.length
    // $("canvas").slideUp();


if (len == 0) {
    Cookies.set('level', 0)
    Cookies.set('tool', "compass")
    checkItem()
        // $(".compass").fadeIn()
        // $("#compassButt").addClass("clicked")
} else {
    checkItem()
    checkCheck()
}


function checkItem() {
    if (Cookies.get('gyro')) {
        $("#gyroButt").prop('disabled', false)
    } else {}
    if (Cookies.get("archive")) {
        $("#archiveButt").prop('disabled', false)

    } else {}
    if (Cookies.get("ble")) {

        $("#bleButt").prop('disabled', false)

    } else {}



}



currentLev = Cookies.get("level");
$("#text").text(narration[currentLev])
$("#text2").text(text[currentLev])
$("#nMap").text(coord[currentLev][2])

function offCompass() {
    $(".compass").fadeOut()
    $("#compassButt").removeClass("clicked")
}

function offArchive() {
    $(".archive").fadeOut()
    $("#archiveButt").removeClass("clicked")

}

function offBle() {
    $(".ble").fadeOut();
    $("canvas").fadeOut();
    $("#bleButt").removeClass("clicked")

}


function offGyro() {
    $(".gyro").fadeOut();
    $("#gyroButt").removeClass("clicked")


}

function offObj() {
    if ($(".objective").css("display", "block")) {
        $(".objective").toggle();
    }
    if ($("#objButt").hasClass("clicked2")) {
        $("#objButt").toggleClass("clicked2")
    }
}

function offInput() {

    if ($(".input").css("display", "block")) {
        $(".input").toggle();
    }
    if ($("#inputButt").hasClass("clicked2")) {
        $("#inputButt").toggleClass("clicked2")
    }
}


function onCompass() {
    offArchive();
    offBle();
    offInput();
    offObj();
    offGyro();
    $("#compassButt").addClass("clicked")
    $(".compass").fadeIn()

    Cookies.set("tool", "compass");
}

function onArchive() {
    offCompass();
    offBle();
    offInput();
    offInput();
    offGyro();

    $("#archiveButt").addClass("clicked")
    $(".archive").fadeIn()

    Cookies.set("tool", "archive");
}

function onBle() {
    $("canvas").fadeIn();
    offArchive();
    offCompass;
    offInput();
    offInput();
    offGyro();
    $(".ble").fadeIn();
    $("#bleButt").addClass("clicked")

    Cookies.set("tool", "ble");
}

function onGyro() {
    offCompass();
    offBle();
    offArchive();
    offObj();
    offInput();
    $(".gyro").fadeIn();
    $("#gyroButt").addClass("clicked")

    Cookies.set("tool", "gyro");
}



function onObj() {
    offInput();
    $(".objective").toggle();
    $("#objButt").toggleClass("clicked2")
    offInput()

}

function onInput() {
    offObj();
    $(".input").toggle();

    $("#inputButt").toggleClass("clicked2")

    offObj()

}










function checkCheck() { //check at what point u are and routing

    let valueTool = Cookies.get("tool");
    if (valueTool == "compass") {
        onCompass()
        offObj();
        offInput();

    }

    if (valueTool == "archive") {
        onArchive()
        offCompass()
        offGyro()
        offBle()
        offObj();
        offInput();
    }

    if (valueTool == "ble") {
        onBle()
        offCompass()
        offArchive()
        offGyro()
        offObj();
        offInput();
    }
    if (valueTool == "gyro") {
        onGyro()
        offCompass()
        offArchive()
        offBle()
        offObj();
        offInput();
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

function checkButton() {
    if (currentLev == 4) {
        $("input").css("display", "none");
        $("#button").css("display", "none");
        // for (let x = 0; x < 4; x++) {
        //     let i = localStorage.getItem(x);
        //     document.getElementById("textRiddle").innerHTML += i.toString()
        // }

    }
    document.getElementById("textRiddle").innerHTML = rid[currentLev];


}


input.addEventListener('keypress', function(ev) {
    if (ev.keyCode === 13 || ev.which === 13) {
        getInputValue()
    }
});

function getInputValue() {
    let inputVal = document.getElementById("input").value;
    inputVal = inputVal.toLowerCase()
    if (inputVal == password[currentLev]) {
        Cookies.set(item[currentLev], 1);
        Cookies.set('tool', item[currentLev]);
        (console.log(currentLev++))
        Cookies.set('level', currentLev);

        checkItem()
        checkCheck()
        checkButton()
    }
}

checkButton()