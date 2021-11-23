//TRIGGER AT SOME POINT TRUE TO CALL FADE
let trigger = false;

let alpha = 70

let t = 0;
let tVel = 0.005;

let angle = 0;
let angleRad = 0;

//CIRCLE PROPERTIES 
//size of the outer circle
let outSize = 20;

//size of the inner circle 
let inSize = 10;

let space = 400;

let ease = new p5.Ease();
let col;




const serviceUuid = "0000dfb0-0000-1000-8000-00805f9b34fb";
let myCharacteristic;
let myValue = 0;
let myBLE;

let x, y;


function setup() {

    background(0)
    angleMode(DEGREES);
    noStroke();
    col = color(59, 197, 196)

    // Create a p5ble class
    myBLE = new p5ble();

    createCanvas((windowWidth - windowWidth / 18), windowHeight / 2).parent("main-content");

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



    background(0, 5);


    //DEFINE EASE METHOD 
    let e = ease.linear(t);


    let yUp = lerp(height + 10, -10, e);
    let yDown = lerp(0 - 10, height + 10, e)

    let xUp = map(sin(angle), -1, 1, -30, 30);
    let xDown = map(sin(angle), -1, 1, 30, -30);

    let rad = map(sin(angleRad), -1, 1, 10, 4)



    fill(col);
    circle(width / 2, 0 + 50, rad * 3);
    circle(width / 2, height - 50, rad * 3);


    //CIRCLE 2 TEST 
    //OUTER CIRCLE
    fill(col, alpha);
    circle(xUp + space, yUp, rad);

    //CIRCLE 2 TEST 
    //OUTER CIRCLE
    circle(xDown + space, yDown, rad);


    //INCREMENT TIME 
    t += tVel;


    //HIGHER VALUE = FASTER Y MOVEMENT  
    angle += 5; //random(0,25);

    //
    angleRad += 10;

    /*
    //HIGHER VALUE LONGER ANIMATION
    if (t > 1.501) 
    {
    //inner circle 
      
      //circle(width/2, height/2, 20)
      
      //ADDS A LAYER OF BALCK TO COVER THE TRAILS  
      
    
      //UNCOMMENT TO STOP UPDATE 
      //tVel=0; 
    }
    */


    if (yUp <= -10 || yDown > height) {

        //use col to fade ?
        //col=0
        t = 0;

        background(0, 80)

        //tVel STOP
        //tVel=0;

    }


    //DEFINE A FADING F TO CALL AFTER ??
    function fade() {

        let fTime = 0;
        let speed = 0.001;

        if (trigger == true) {

            falpha = lerp(255, 0, fTime)

            if (fTime >= 1.0001) {

                bacground(0, fAlpha)

                fTime = 0;
                speed = 0;

            }

        }
    }


}