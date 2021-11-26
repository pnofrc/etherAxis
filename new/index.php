<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <title>etherAxis layout</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
    <script src="../script/cookie.js"></script>
    <script src="../script/jquery-3.6.0.min.js"></script>
    <script src="../script/p5.min.js"></script>
    <script src="../script/p5.dom.min.js"></script>
    <script src="../script/p5.ble.js"></script>
    <script src="../script/recorder.js"></script>
    <script src="p5.func.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>

</head>

<body>
<div class="popup">
<div id="popupText"></div>
<!-- <div id="popupButton"></div> -->
<div><input type="text" placeholder="Enter your answer " value="" id="answerInput">
<button onclick="answer()" id="adelante">Continue</button></div>
<button onclick="$('.popup').slideUp(3000)" id="finalBack">Back</button></div>
</div>

    <div class='container'></div>
    <div id="main">
        <div id="main-content">

            <div class="compass">
                <div class="arrow"></div>
                <div class="compass-circle"></div>
                <div class="my-point"></div>
                <button class="start-btn">Restart compass</button>
                <div><p id="nMap"></p></div>
            </div>
            

            <div class="archive">
                <div class="recorder">

                    <div id="controls">
                        <button id="recordButton" onclick="startConverting(0)">Record</button>
                        <button id="stopButton" onclick="startConverting(1)" disabled>Stop</button>
                    </div>

                    <div id="process"></div>
                    <ol id="recordingsList"></ol>

                    <br><br>

                    <button id="arch" onclick=next()>to Archive</button>

                </div>

                <div class="uploaded">
                    <?php 
                        error_reporting(0);
                        $fs = preg_grep('/^([^.])/', scandir('../ether_archive')); 
                        foreach ($fs as $fileCurr) {
                            $filePath = $fileCurr;
                            $date = date("F d Y", fileatime($fileCurr));
                            echo "<span><a href='../ether_archive/$filePath' title='$filecurr'>$fileCurr</a></span><br><span>$date</span><hr>";
                        }  
                        
                        ?>
                    <button onclick="back()">back to recorder</button>
                    <button id="recorderLevel" onclick="recooooooord()" >Finish level</button>
                </div>
            </div>

           

            <div class="ble">
                <button id="connection" onclick="connectToBle()">Connect</button>
                <!-- <canvas class="p5Canvas"></canvas> -->
            </div>
            
            <div class="gyro">
                    
                <div id="gyro1" data-depth="2"><p>Discover try move let people help you do reveal the next layers</p></div>
                <div id="gyro2" data-depth="1.5"><button onclick="$('#gyro1').fadeOut(2000)"></button></div>
                <div id="gyro3" data-depth="1"><button onclick="$('#gyro2').fadeOut(1500)"></button></div>
                <div id="gyro4" data-depth=".6"><button onclick="$('#gyro3').fadeOut(1000)"></button></div>
                <div id="gyro5" data-depth=".4"><button onclick="$('#gyro4').fadeOut(200)"></button></div>
                <button id="fakeGyro" onclick="quest()"></button>
            </div>

            <div class="objective">
                    <p id="text"></p>
                    <p id="text2"></p>
            </div>

            <div class="input">
                
                <p id="textRiddle"></p>
                <input type="text" placeholder="password " value="" id="input">
                <button id="button" type="button" onclick="getInputValue();">check</button>
                <button id="afterZero" onclick="quest()">Continue</button>
            </div>

        </div>
    </div>



    <div id="menu" class='some-page-wrapper'>
        <div class='row'>
            <div class='column'>
                <div class='tool'>
                    <button class="gameButt" id="objButt" onclick="onObj()">1</button>
                </div>
            </div>
            <div class='column'>
                <div class='tool'>
                    <button class="menuButt" id="compassButt" onclick="onCompass()">2</button>
                </div>
            </div>
            <div class='column'>
                <div class='tool'>
                    <button class="menuButt" id="archiveButt" onclick="onArchive()">3</button>
                </div>
            </div>
        </div>
        <div class='row'>
            <div class='column'>
                <div class='tool'>
                    <button class="gameButt" id="inputButt" onclick="onInput()">4</button>
                </div>
            </div>
            <div class='column'>
                <div class='tool'>
                    <button class="menuButt" id="bleButt" onclick="onBle()">5</button>
                </div>
            </div>
            <div class='column'>
                <div class='tool'>
                    <button class="menuButt" id="gyroButt" onclick="onGyro()">6</button>
                </div>
            </div>

        </div>
    </div>

    </div>

    <button onclick="showAnswer()" id="bridgecard"><i>Answers</i></button>



    <script>
        
    </script>
    <script src="https://hub.xpub.nl/etheraxis/pad/p/dictio/export/txt"></script>
    <script src="app.js"></script>
    <script src="compass_app.js" ></script>
    <script src="./recorder_app.js"></script>
    <script src="./ble.js" ></script>


    <!-- <script src="dictio.js" ></script> -->

</body>
</html>