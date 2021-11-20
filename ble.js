const serviceUuid = "0000dfb0-0000-1000-8000-00805f9b34fb";
let myCharacteristic;
let myValue = 0;
let myBLE;

let x, y;

function next() {
    Cookies.set('3', 'quest')
    routing()
}

function setup() {
    // Create a p5ble class
    myBLE = new p5ble();

    createCanvas(windowWidth, windowHeight);

    x = width / 2;
    y = height;

    textSize(80);
    textAlign(CENTER, CENTER);

    // Create a 'Connect' button

}

function connectToBle() {
    // Connect to a device by passing the service UUID

    // myBLE.connect(serviceUuid, gotCharacteristics);
    myValue = 1
    document.getElementById("connection").remove()
}

// A function that will be called once got characteristics
function gotCharacteristics(error, characteristics) {
    if (error) console.log('error: ', error);
    console.log('characteristics: ', characteristics);
    myCharacteristic = characteristics[0];
    // Read the value of the first characteristic
    myBLE.read(myCharacteristic, gotValue);
}

// A function that will be called once got values
function gotValue(error, value) {
    if (error) console.log('error: ', error);
    console.log('value: ', value);
    myValue = value;
    // After getting a value, call p5ble.read() again to get the value again
    myBLE.read(myCharacteristic, gotValue);
}



function draw() {
    if (myValue == 1) {
        anim()
    }
}
// }

function anim() {
    // connectButton.remove();

    background(200);

    // Draw a circle
    stroke(50);
    fill(100);
    ellipse(x, y, 24, 24);

    // Jiggling randomly on the horizontal axis
    x = x + random(-1, 1);
    // Moving up at a constant speed
    y = y - 1;

    // Reset to the bottom
    if (y < 0) {
        next()

    }
}