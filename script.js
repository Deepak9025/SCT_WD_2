let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let running = false;
let lapCount = 0;

const timeDisplay = document.getElementById("time");
const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const lapList = document.getElementById("lapList");

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function toggleStartStop() {
    if (running) {
        clearInterval(timerInterval);
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 1000);
        startStopButton.textContent = "Pause";
    }
    running = !running;
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    startTime = 0;
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    lapList.innerHTML = ""; 
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}
