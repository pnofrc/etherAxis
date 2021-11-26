//FIRST ANIMATION
let t1 = 0;
let tVel1 = 0.005;

//SECOND ANIMATION
let t2 = 0;
//let tVel2 = 0.0025;
let tVel2 = 0.003;

//FIRST ANIMATION
let angle1 = 0;
let anim1Speed = 10;

//SECOND ANIMATION
let angle2 = 0;
let anim2Speed = 4;

//USED TO CONTROL THE RADIUS
let angleRad = 0;
let angleRadSpeed = 8;

//SPACE IS ADDED TO xUp/xDown TO CENTER THE PARTICLES
let space = 400;

//LIBRARY P5.FUNC INSIDE THE SKETCH hierarchy AND HTML INDEX
let ease = new p5.Ease();

let col;



const serviceUuid = "0000dfb0-0000-1000-8000-00805f9b34fb";
let myCharacteristic;
let myValue = 0;
let myBLE;

let x, y;


function setup() {


    // Create a p5ble class
    myBLE = new p5ble();

    sketchWidth = document.getElementsByClassName("ble")[0].offsetWidth;
    console.log(sketchWidth)
    sketchHeight = document.getElementsByClassName("ble")[0].offsetHeight;


    var myCanvas = createCanvas(sketchWidth, sketchHeight);
    myCanvas.parent("bleFITpls");

    background(0);
    angleMode(DEGREES);
    noStroke();

    //TIME IN MS TO CALL THE F
    //setTimeout(myFunction, 15600);

    //STORE ANY COLOR INSIDE COL, USE RGB TO BE ABLE TO USE ALPHA
    col = color(59, 197, 196);



}

function connectToBle() {
    document.getElementById("connection").remove()
        // Connect to a device by passing the service UUID

    myBLE.connect(serviceUuid, gotCharacteristics);
    // myValue = 1
    $("canvas").fadeIn(600);

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

function myFunction() {
    background(255);
    print("I am a function");

    trigger = false;
} //end of my function




function draw() {
    if (myValue == 1) {
        anim()
    }
}



function anim() {
    background(0, 15);

    let ms = millis();
    let sec = ms / 1000;

    //CURRENT SEC VISIBILITY TO TIME CONDITIONALS
    /**/
    fill(255);
    // textSize(25);

    // //text("current second : " + sec, 30, 50);

    // //textSize(35);

    // text("angle1 is " + angle1, 30, 100);
    // text("t1 is " + Math.round(t1), 30, 200);

    // text("angle2 is " + angle2, 30, 300);
    // text("t2 is " + Math.round(t2), 30, 400);

    //DEFINE EASE METHOD
    let e1 = ease.quadraticBezier(t1);
    let e2 = ease.linear(t2);
    /*
    INTERESTING METHODS TO TRY
    p5.func ease methods :
    -quadraticOut
    -quadraticBezier
    -quadraticBezierStaircase
    -cubicOut
    -cubicInOut
    -quarticIn
    -cubicBezierThrough2Points
    */

    //LERP FROM POINT1 TO POINT2 IN e(ease method in t)

    //GOING TOWARDS THE CENTRE
    let y1 = lerp(height + 10, height / 2, e1);
    let y2 = lerp(0 - 10, height / 2, e1);

    let x1 = map(sin(angle1), -1, 1, -30, 30);
    let x2 = map(sin(angle1), -1, 1, 30, -30);

    //STARTING FROM THE CENTRE OUTWARDS
    let yUp = lerp(height / 2, -10, e2);
    let yDown = lerp(height / 2, height + 10, e2);

    //GREATER OR SMALLER SINE WAVE ON X AXIS
    //TRY TO CHANGE THE LAST TWO PARAMETERS (-value, value)
    let xUp = map(sin(angle2), -1, 1, -30, 30);
    let xDown = map(sin(angle2), -1, 1, 30, -30);

    //rad MAPS THE INCREMENT OF angleRad TO CREATE THE PULSING EFFECT
    let rad = map(sin(angleRad), -1, 1, 10, 3.5);

    if (t1 > 1.001 || t2 > 1.001) {
        t1 = 0;
        t2 = 0;
        background(0, 90);
    }

    //ANIMATION
    if (sec >= 0 && sec < 10) {
        //INCREMENT TIME

        t1 += tVel1;
        angle1 += anim1Speed;
        //HIGHER VALUE, FASTER RADIUS ANIMATION
        angleRad += angleRadSpeed;

        //ANIMATION 1 CIRCLE PROPERTIES
        let outSize = 20;
        let inSize = 10;

        //===================================================TOP CIRCLE
        //OUTER CIRCLE
        fill(col, 70);
        circle(x1 + space, y2, outSize);

        //INNER CIRCLE
        fill(0, 90);
        circle(x1 + space, y2, inSize);

        //==================================================BOTTOM CIRCLE
        //OUTER CIRCLE
        fill(col, 70);
        circle(x2 + space, y1, outSize);

        //INNER CIRCLE
        fill(0, 90);
        circle(x2 + space, y1, inSize);

        if (y1 <= height / 2 || y2 >= height / 2) {
            //=MIDDLE CIRCLE
            //OUTER
            fill(col);
            circle(width / 2, height / 2, 30);

            //INNER
            fill(0);
            circle(width / 2, height / 2, 15);

            //ADDS A LAYER OF BALCK TO COVER THE TRAILS
            background(0, 90);
        }
    } else if (sec >= 10 && sec <= 15.586) {
        //tVel2 is 0 until the first animation is playing
        t2 += tVel2;
        angle2 += anim2Speed;
        //HIGHER VALUE, FASTER RADIUS ANIMATION
        angleRad += angleRadSpeed;

        //COMMENT NOFILL() AND CHANGE STROKE TO FILL TO CHANGE
        noFill();
        stroke(col);
        //TOP ANIMATING CIRCLE
        circle(width / 2, 0 + 50, rad * 4);
        //BOTTOM ANIMATING CIRCLE
        circle(width / 2, height - 50, rad * 4);

        noStroke();

        //CIRCLE UP
        fill(col);
        circle(xUp + space, yUp, rad);

        //CIRCLE DOWN
        circle(xDown + space, yDown, rad);
    } else if (sec >= 15.586 && sec <= 28) {
        quest()
            //insert function body inside here
            //calling the function here would mean to call every content
            //of the f 60 times a sec
    } else {
        //noLoop();
    }


}