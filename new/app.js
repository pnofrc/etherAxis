//make the wireless tangible and show the mitic side

// First of all disable the not unblocked tools' buttons
$("#gyroButt").prop('disabled', true)
$("#archiveButt").prop('disabled', true)
$("#bleButt").prop('disabled', true)

// let's wrap the cookies check
let cookie = Cookies.get();
let current = Object.keys(cookie);
let len = current.length


// check if is the first access to the webapp
if (len == 0) {
    Cookies.set('level', 0)
    Cookies.set('tool', "compass")
    Cookies.set("compass", '1')
    checkItem();
}
var currentLev = Cookies.get("level"); //set the current level number, important!
if (len > 0) {
    checkItem()
    checkCheck()
}


// delete buttons not necessary in current level
function deleteButton() {
    if (currentLev == 1) {
        console.log(currentLev)
        $("#fakeGyro").fadeIn(1)
    } else {
        $("#fakeGyro").fadeOut(1)
    }
    if (currentLev == 2) {
        $("#recordLevel").fadeOut(1)
    } else {
        $("#recordLevel").fadeIn(1)
    }
}
deleteButton()


// functions to close each tool
function offCompass() {
    $(".compass").fadeOut(1)
    $("#compassButt").removeClass("clicked")
}

function offArchive() {
    $(".archive").fadeOut(1)
    $("#archiveButt").removeClass("clicked")
}

function offBle() {
    $(".ble").fadeOut(1);
    $("canvas").fadeOut(1);
    $("#bleButt").removeClass("clicked")
}

function offGyro() {
    $(".gyro").fadeOut(1);
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


// function to open each tool
function onCompass() {
    $("#nMap").text(coord[currentLev][2])

    console.log(coord[currentLev])
    offArchive();
    offBle();
    offInput();
    offObj();
    offGyro();
    $("#compassButt").addClass("clicked")
    $(".compass").fadeIn(600)

    Cookies.set("tool", "compass");
}

function onArchive() {
    if (currentLev == 2) {
        $("#recordLevel").fadeIn()
    }
    offCompass();
    offBle();
    offInput();
    offInput();
    offGyro();

    $("#archiveButt").addClass("clicked")
    $(".archive").fadeIn(600)

    Cookies.set("tool", "archive");
}

function onBle() {

    offArchive();
    offCompass;
    offInput();
    offInput();
    offGyro();
    $(".ble").fadeIn(600);
    $("#bleButt").addClass("clicked")

    Cookies.set("tool", "ble");
}

function onGyro() {
    offCompass();
    offBle();
    offArchive();
    offObj();
    offInput();
    $(".gyro").fadeIn(600);
    $("#gyroButt").addClass("clicked")

    Cookies.set("tool", "gyro");
}

function onObj() {
    $("#text").text(narration[currentLev])
        // $("#text2").text(text[currentLev])
    offInput();
    $(".objective").fadeToggle(800);
    $("#objButt").toggleClass("clicked2")

}

function onInput() {
    offObj();
    checkButton()
    if (Cookies.get("bridge") == '') {
        instructionLevel()
    }
    $(".input").fadeToggle(800);

    $("#inputButt").toggleClass("clicked2")
}




//check at what point u are and routing
function checkCheck() {

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


// toggle color buttons
var btnContainer = document.getElementById("menu");
var btns = btnContainer.getElementsByClassName("menuButt");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        $(".clicked").removeClass();
        this.className += " clicked";
    });
}

// riddle for input
function checkButton() {
    if (currentLev == 4) {
        $("input").css("display", "none");
        $("#button").css("display", "none");
    }

    document.getElementById("textRiddle").innerHTML = rid[currentLev];
}
checkButton()

// use 'enter' key
input.addEventListener('keypress', function(ev) {
    if (ev.keyCode === 13 || ev.which === 13) {
        getInputValue()
        $('input[type="text"]').val('');
    }
});

// to check if password works
function getInputValue() {
    let input = document.getElementById("input")
    let inputVal = input.value;
    inputVal = inputVal.toLowerCase()
    if (inputVal == password[currentLev]) {
        Cookies.set("bridge")
        Cookies.set(item[currentLev], "1")
        checkItem();
        // $(".popup").slideDown(1000);
        deleteButton()
        instructionLevel()
    }
}


// TO SEE IF IT NEEDED!!!
document.getElementById("adelante").addEventListener("click", function() {
    if (currentLev == 0) {
        quest()
    } else {
        Cookies.set('tool', item[currentLev]);
        Cookies.set(item[currentLev], 1);
        $(".popup").slideUp(1000);
    }

    checkItem()
    checkCheck()

    $("#recorderLevel").fadeOut()
})

// IF TAP ON INPUT, TEXT REMOVE
input.addEventListener("click", function() {
    $('input[type="text"]').val('');
})



// choose answer
function choose(x) {
    deleteButton()
    localStorage.setItem(currentLev, x)
    console.log(currentLev)
    currentLev++;
    console.log(currentLev)
    onCompass()
    Cookies.set('level', currentLev);
    Cookies.remove("bridge")
    $(".popup").slideUp(300);
    document.getElementById("popupButton").innerHTML = '';
}

// to unblock unblocked tools
function checkItem() {
    console.log('si')
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

// after riddle
function instructionLevel() {
    $("#input").fadeOut(1)
    $("#button").fadeOut(1)

    currentLev = Cookies.get("level")

    deleteButton()

    document.getElementById("textRiddle").innerHTML = instru[currentLev]

    if (currentLev == 0) {
        $("#afterZero").fadeIn(1)
    }

    Cookies.set("bridge", "")

    checkItem()
    $("#recorderLevel").fadeOut()
}

$("#recordLevel").addEventListener("click", function() {
    $("#uploaded").fadeOut()
    $("#recorder").fadeIn()
})

//ask question
function quest() {
    $("#adelante").fadeOut(1)

    document.getElementById("popupText").innerHTML = `${qq[currentLev]}<br>`

    for (let x = 0; x < 2; x++) {
        document.getElementById("popupButton").innerHTML += `<button onclick="choose(${x})">${quests[currentLev][x]}</button><br>`
        console.log(quests[currentLev][x])
    }

    $(".popup").slideDown(1000);
    $("#afterZero").fadeOut(1)
    $("#input").fadeIn(1)
    $("#button").fadeIn(1)
}

function recooooooord() {
    quest()
    back()
}