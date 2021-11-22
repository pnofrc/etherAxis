var currentLev



console.log(coord[currentLev])
var latGoal = coord[currentLev][0]
var lngGoal = coord[currentLev][1]

const compassCircle = document.querySelector(".compass-circle");
const myPoint = document.querySelector(".my-point");
const startBtn = document.querySelector(".start-btn");
// const comBtn = document.getElementById("#compassButt")
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


function locationHandler(position) {
    const { latitude, longitude } = position.coords;
    pointDegree = calcDegreeToPoint(latitude, longitude, latGoal, lngGoal);
    console.log(pointDegree)
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

startCompass()
init();