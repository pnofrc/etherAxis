function next() {
    $(".uploaded").fadeIn()
    $(".recorder").fadeOut()

}

function back() {
    $(".uploaded").fadeOut()
    $(".recorder").fadeIn()
    $("#recorderLevel").fadeOut()
}

if (currentLev > 2) { $("#arch").fadeIn() }


//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; //stream from getUserMedia()
var rec; //Recorder.js object
var input; //MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");

//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);

function startRecording() {
    $("#stopButton").css("border", "solid")
    $(".archive").addClass("glow")
    console.log("recordButton clicked");

    var constraints = { audio: true, video: false }

    recordButton.disabled = true;
    stopButton.disabled = false;

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        // console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

        audioContext = new AudioContext();

        gumStream = stream;

        input = audioContext.createMediaStreamSource(stream);

        rec = new Recorder(input, { numChannels: 1 })

        //start the recording process
        rec.record()

        console.log("Recording started");

    }).catch(function(err) {
        recordButton.disabled = false;
        stopButton.disabled = true;
    });
}


function stopRecording() {
    $("#stopButton").css("border", "none")
    $(".archive").removeClass("glow")

    console.log("stopButton clicked");

    //disable the stop button, enable the record too allow for new recordings
    stopButton.disabled = true;
    recordButton.disabled = false;

    //tell the recorder to stop the recording
    rec.stop();

    //stop microphone access
    gumStream.getAudioTracks()[0].stop();

    //create the wav blob and pass it on to createDownloadLink
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');

    //name of .wav file to use during upload and download (without extendion)
    var filename = new Date().toISOString();

    //add controls to the <audio> element
    au.controls = true;
    au.src = url;

    //add the new audio element to li
    li.appendChild(au);

    //upload link
    var upload = document.createElement('a');
    upload.href = "#";
    upload.innerHTML = "Upload";
    upload.addEventListener("click", function(event) {

        var xhr = new XMLHttpRequest();
        xhr.onload = function(e) {
            if (this.readyState === 4) {
                console.log("Server returned: ", e.target.responseText);
            }
        };
        var fd = new FormData();
        fd.append("audio_data", blob, filename);
        xhr.open("POST", "./script/upload.php", true);
        xhr.send(fd);
        $("#arch").fadeIn();

    })
    li.appendChild(document.createTextNode(" ")) //add a space in between
    li.appendChild(upload) //add the upload link to li

    //add the li element to the ol
    recordingsList.appendChild(li);
}