$("#gyroButt").prop('disabled', true)
$("#archiveButt").prop('disabled', true)
$("#bleButt").prop('disabled', true)


let cookie = Cookies.get();
let current = Object.keys(cookie);
let len = current.length
$("canvas").slideUp();


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
}

function offBle() {
    $(".ble").fadeOut();
    $("canvas").slideUp();
}

// function offObj() {
//     $(".objective").fadeOut();
//     $('#objButt').removeClass("clicked2")
// }

// function offInput() {
//     $(".input").fadeOut();
//     $("#inputButt").removeClass("clicked2")
// }

function offGyro() {
    $(".gyro").fadeOut();

}

function onCompass() {
    offArchive();
    offBle();
    //offObj();
    //offInput();
    offGyro();
    $("#compassButt").addClass("clicked")
    $(".compass").fadeIn()

    Cookies.set("tool", "compass");
}

function onArchive() {
    offCompass();
    offBle();
    //offObj();
    //offInput();
    offGyro();

    $("#archiveButt").addClass("clicked")
    $(".archive").fadeIn()

    Cookies.set("tool", "archive");
}

function onBle() {
    $("canvas").fadeIn();
    offArchive();
    offCompass;
    //offObj();
    //offInput();
    offGyro();
    $(".ble").fadeIn();
    $("#bleButt").addClass("clicked")

    Cookies.set("tool", "ble");
}

function onGyro() {
    offCompass();
    offBle();
    offArchive();
    // offObj;
    //offInput();
    $(".gyro").fadeIn();
    $("#gyroButt").addClass("clicked")

    Cookies.set("tool", "gyro");
}



function onObj() {
    //offInput();
    $(".objective").toggle();
    $("#objButt").toggleClass("clicked2")
}

function onInput() {
    // offObj;
    $(".input").toggle();
    $("#inputButt").toggleClass("clicked2")

}






function checkCheck() { //check at what point u are and routing

    let valueTool = Cookies.get("tool");
    if (valueTool == "compass") {
        onCompass()
            // offObj()
            // offInput()

    }

    if (valueTool == "archive") {
        onArchive()
        offCompass()
        offGyro()
        offBle()
            // offObj()
            // offInput()
    }

    if (valueTool == "ble") {
        onBle()
        offCompass()
        offArchive()
        offGyro()
            // offObj()
            // offInput()
    }
    if (valueTool == "gyro") {
        onGyro()
        offCompass()
        offArchive()
        offBle()
            // offObj()
            // offInput()
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
    }
}