const timer = document.querySelector(".timer");
let time = "";
let myStorage = window.localStorage;
let startArr = [];
let ScoreArr;
if (myStorage.getItem("prevBrainScores") == null) {
    myStorage.setItem("prevBrainScores", JSON.stringify(startArr));
} else {
    ScoreArr = JSON.parse(localStorage.getItem("prevBrainScores"));
}

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
    if (stoptime) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
    console.log(time);
    ScoreArr.push(time);
    myStorage.setItem("prevBrainScores", JSON.stringify(ScoreArr));
    updateList();
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = "0" + sec;
        }
        if (min < 10 || min == 0) {
            min = "0" + min;
        }
        if (hr < 10 || hr == 0) {
            hr = "0" + hr;
        }

        timer.innerHTML = min + ":" + sec;
        time = `${min} : ${sec}`;
        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    timer.innerHTML = "00:00:00";
}
