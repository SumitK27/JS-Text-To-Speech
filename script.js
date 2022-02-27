const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
const speedDisplay = document.getElementById("show-speed");
let currentChar;

// * Event Listeners
playBtn.addEventListener("click", () => {
    playText(textInput.value);
});

pauseBtn.addEventListener("click", pauseText);

stopBtn.addEventListener("click", stopText);

speedInput.addEventListener("input", (e) => {
    speedDisplay.textContent = "x" + e.target.value;

    // Stop reading
    stopText();

    // Resume playing from the current character
    playText(utterance.text.substring(currentChar));
});

// * Speech Synthesis
// Creating Utterance Object
const utterance = new SpeechSynthesisUtterance();

// Adding end event listener
utterance.addEventListener("end", () => {
    // Re-enable text input after reading
    textInput.disabled = false;
});

utterance.addEventListener("boundary", (e) => {
    currentChar = e.charIndex;
});

// * Callback Functions for Events
function playText(text) {
    // If Speech is paused and there is text left to read, start reading it when pressed play
    if (speechSynthesis.paused && speechSynthesis.speaking) {
        return speechSynthesis.resume();
    }

    // Return if already Speaking
    if (speechSynthesis.speaking) return;

    // Passing text to be read
    utterance.text = text;

    // Specify Speed of Reading
    utterance.rate = speedInput.value || 1;

    // Disable text input while speaking
    textInput.disabled = true;

    // Speak
    speechSynthesis.speak(utterance);
}

function pauseText() {
    // Pause if reading
    if (speechSynthesis.speaking) {
        speechSynthesis.pause();
    }
}

function stopText() {
    speechSynthesis.resume();

    // Cancel Reading
    speechSynthesis.cancel();
}
