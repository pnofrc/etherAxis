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
let current = checkCookie()
console.log(coord[current])
let latGoal = coord[current][0]
let lngGoal = coord[current][1]



const compassCircle = document.querySelector(".compass-circle");
const myPoint = document.querySelector(".my-point");
const startBtn = document.querySelector(".start-btn");
const comBtn = document.getElementById("#compassButt")
const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

function init() {
    startBtn.addEventListener("click", startCompass);
    comBtn.addEventListener("click", startCompass);
    navigator.geolocation.getCurrentPosition(locationHandler);
    console.log(navigator.geolocation.getCurrentPosition(locationHandler));
    if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
    }
}


function startCompass() {
    if (isIOS) {
        DeviceOrientationEvent.requestPermission()
            .then((response) => {
                if (response === "granted") {
                    window.addEventListener("deviceorientation", handler, true);
                } else {
                    alert("has to be allowed!");
                }
            })
            .catch(() => alert("not supported"));
    }
}

function handler(e) {
    compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    compassCircle.style.transform = `translate(-50%, -50%) rotate(${(-compass) +(pointDegree) }deg)`;
}

let pointDegree;


function locationHandler(position) {
    const { latitude, longitude } = position.coords;
    pointDegree = calcDegreeToPoint(latitude, longitude, latGoal, lngGoal);

    if (pointDegree < 0) {
        pointDegree = pointDegree + 360;
    }

    let distance = calcCrow(latitude, longitude, latGoal, lngGoal)
    console.log(distance)


}


function calcCrow(latitude, longitude, latGoal, lngGoal) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return (d * 1000).toFixed(1) + 'm';
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}




function calcDegreeToPoint(latitude, longitude, latGoal, lngGoal) {
    const phiK = (latGoal * Math.PI) / 180.0;
    const lambdaK = (lngGoal * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;
    const psi =
        (180.0 / Math.PI) *
        Math.atan2(
            Math.sin(lambdaK - lambda),
            Math.cos(phi) * Math.tan(phiK) -
            Math.sin(phi) * Math.cos(lambdaK - lambda)
        );
    return Math.round(psi);
}

init();