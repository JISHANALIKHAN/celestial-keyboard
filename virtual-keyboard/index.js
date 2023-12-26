// DOM Elements
let displayTextarea = document.getElementById('display'); 
let keys = document.querySelectorAll('.key');
let specialKeys = document.querySelectorAll('.special-buttons');
let powerButton = document.getElementById('power-button');
let savedText; 
// State
let displayVisible = true;

// Functions to Manipulate Display
function appendToDisplay(input) {
    // Append input to display only if it is visible
    if (displayVisible) {
        displayTextarea.value += input;
    }
}

function appendQuotes(type) {
    // Append single or double quotes to display
    if (displayVisible) {
        const quote = (type === 'single') ? "'" : '"';
        displayTextarea.value += quote;
    }
}

function appendBracket(position, type) {
    // Append brackets to display based on position and type
    const brackets = {
        'parenthesis': { 'left': '(', 'right': ')' },
        'curly': { 'left': '{', 'right': '}' },
        'square': { 'left': '[', 'right': ']' }
    };
    if (displayVisible) {
        if (brackets[type] && brackets[type][position]) {
            displayTextarea.value += brackets[type][position];
        }
    }
}

function onPressed(action) {
    // Handle space and backspace actions if display is visible
    if (displayVisible) {
        if (action === 'space') {
            displayTextarea.value += ' ';
        } else if (action === 'backspace') {
            displayTextarea.value = displayTextarea.value.slice(0, -1);
        }
    }
}

function playAudio(audio, startTime, endTime) {
    // Set the start time
    audio.currentTime = startTime;

    // Play the audio
    audio.play();

    // Pause the audio and reset to the start time after the specified duration
    setTimeout(function () {
        audio.pause();
        audio.currentTime = startTime;
    }, (endTime - startTime) * 1000); // Convert duration from seconds to milliseconds
}

function clearDisplay() {
    // Clear the display textarea
    displayTextarea.value = '';
}

function toggleDisplay() {
    // Toggle display visibility and clear if it's hidden
    if (displayVisible) {
        displayVisible = false;
        displayTextarea.style.backgroundColor = 'hsl(0, 0%, 20%)';
        savedText = displayTextarea.value; // Save the current text
        clearDisplay();
    } else {
        displayVisible = true;
        displayTextarea.style.backgroundColor = 'rgb(128, 128, 128)';
        displayTextarea.value = savedText; // Restore the saved text
    }
}

// Constants
const keyPressAudioDuration = 1.5;
const togglePowerAudioDuration = 2;

// Audio Elements
var keypressAudio = document.getElementById('keyboard-sound-effect');
var togglePowerSound = document.getElementById('power-button-sound-effect');

// Event Listeners
const clickListener = (audio, startTime, audioDuration) => {
    return function () {
        playAudio(audio, startTime, audioDuration);
    };
};

// Attach click listeners to regular keys
keys.forEach(function (key) {
    key.addEventListener('click', clickListener(keypressAudio, 0.1, keyPressAudioDuration));
});

// Attach click listeners to special keys
specialKeys.forEach(function (specialKey) {
    specialKey.addEventListener('click', clickListener(keypressAudio, 1, keyPressAudioDuration));
});

// Attach click listener to power button
powerButton.addEventListener('click', clickListener(togglePowerSound, 0.1, togglePowerAudioDuration));
