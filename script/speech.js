// The Myth of the Natural Language %%
// Speech2Design!!

// Welcome to the core-code of the Speech-to-text

// The tool we are gonna use is the "Web Speech API".

// What is an API?
// An API is a set of defined rules that explain how computers or applications communicate with one another.
// APIs sit between an application and the web server, acting as an intermediary layer that processes data transfer between systems.

// GLOBAL VARIABLES

let interimTranscripts = ""; // Variable for interim results, the Speech-to-text try different worlds before to give us the most correct one.
let allTheInterim = ""; // Variable to store *all* the interim results
let finalTranscripts = ""; // Variable for the final transcripts

// To define bridges to the html file:
let speech = document.getElementById("result"); // where to print the final result of the recognition
let process = document.getElementById("process"); // and here the process, print the current sentence with interim results

// TEXT STORAGE




// START LISTENING



function startConverting(x) {
    if ("webkitSpeechRecognition" in window) {


        // Declaring here the API
        let speechRecognizer = new webkitSpeechRecognition() || new SpeechRecognition();

        if (x == 0) {

            // And here the settings, like
            speechRecognizer.continuous = true; // if the recognition should continue or stop when you finish to talk
            speechRecognizer.interimResults = true; // if you want also get the interim results
            speechRecognizer.lang = "en-US"; // which language you want to recognize (!!)
            speechRecognizer.start(); // and then start :))

            // EVENTS

            // ON END
            speechRecognizer.onend = function() {
                // If the Speech-to-text stops to work, it will be notified in the console...
                console.log("Speech recognition service disconnected");
                speechRecognizer.start(); // and then restart itself
            };

            // ON SOUND START
            speechRecognizer.onsoundstart = function() {
                // When it starts the Speech-to-text, it will be notified in the console
                console.log("Some sound is being received");
            };

            // ON ERROR
            speechRecognizer.onerror = function(event) {
                // Log the error
                console.log(event);
            };

            // ON RESULT
            speechRecognizer.onresult = function(event) {
                // Here is where the Speech-to-text show itself on the web page.
                interimTranscripts = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    let transcript = event.results[i][0].transcript;

                    if (event.results[i].isFinal) {
                        finalTranscripts += transcript.trim() + "\n";
                    } else {
                        // There are also shown the interim results and according to their "confidence" (the percentage of how much the word is correct) the color of each word could change
                        interimTranscripts += transcript;

                        allTheInterim += `<span style="opacity: 
					${event.results[i][0].confidence + 0.3} 
					"> ${interimTranscripts} </span> `;
                    }
                }

                process.innerHTML = allTheInterim;
                let final =
                    finalTranscripts + '<span class="interim">' + interimTranscripts + "</span>";

                speech.innerHTML = final.replaceAll("\n", "<br />");
                window.scrollTo(0, document.body.scrollHeight);

                textStorage = final;
                cleanup = localStorage.setItem(
                    "speech",
                    final.replace(/(<span class="interim">)/g, "").replace(/(<\/span>)/g, "")
                ); // Here is where is stored the recognized text in the Local Storage
            };
        }
    } else {
        speechRecognizer.stop()

    }


}


// October 2021, copyleft || Kamome and Funix ||  Speech-to-Derive * The Myth of Natural Language || Roodkapje, Rotterdam