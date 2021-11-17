const compassCircle = document.querySelector(".compass-circle");
const myPoint = document.querySelector(".my-point");
const startBtn = document.querySelector(".start-btn");
const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);

function init() {
    startBtn.addEventListener("click", startCompass);
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

const goal = { latGoal, lngGoal } = [51.925641, 4.4758654]

console.log(goal[1])

function locationHandler(position) {
    const { latitude, longitude } = position.coords;
    pointDegree = calcDegreeToPoint(latitude, longitude, goal[0], goal[1]);

    if (pointDegree < 0) {
        pointDegree = pointDegree + 360;
    }
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

//let distance =  calcCrow(location.lat, location.lng, newLat,newLng)
//document.getElementById('x').innerHTML = distance;