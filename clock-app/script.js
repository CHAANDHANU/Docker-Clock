// Switch Tabs
function showTab(tab) {
  document.querySelectorAll(".tab").forEach(el => el.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}


function updateClock() {
  const now = new Date();
  document.getElementById("local-time").innerText = now.toLocaleTimeString();

  const zones = ["America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney"];
  let worldHTML = "";
  zones.forEach(zone => {
    const time = new Date().toLocaleTimeString("en-US", { timeZone: zone });
    worldHTML += `<p>${zone}: ${time}</p>`;
  });
  document.getElementById("world-clock").innerHTML = worldHTML;
}
setInterval(updateClock, 1000);


let alarmTime = null;
let alarmTimeout = null;

function setAlarm() {
  const input = document.getElementById("alarm-time").value;
  if (!input) return alert("Please select a time");

  alarmTime = input;
  document.getElementById("alarm-status").innerText = "Alarm set for " + alarmTime;

  if (alarmTimeout) clearInterval(alarmTimeout);
  alarmTimeout = setInterval(() => {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" +
                        now.getMinutes().toString().padStart(2, "0");

    if (currentTime === alarmTime) {
      document.getElementById("alarm-sound").play();
      alert("⏰ Alarm Ringing!");
      clearInterval(alarmTimeout);
    }
  }, 1000);
}


let stopwatchInterval;
let stopwatchTime = 0;

function formatTime(seconds) {
  let h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  let m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  let s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function startStopwatch() {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    stopwatchTime++;
    document.getElementById("stopwatch-display").innerText = formatTime(stopwatchTime);
  }, 1000);
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchTime = 0;
  document.getElementById("stopwatch-display").innerText = "00:00:00";
}


let timerInterval;
let timerRemaining = 0;

function startTimer() {
  const seconds = parseInt(document.getElementById("timer-seconds").value);
  if (isNaN(seconds) || seconds <= 0) return alert("Enter valid seconds");

  timerRemaining = seconds;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      document.getElementById("alarm-sound").play();
      alert("⏳ Timer Done!");
    } else {
      timerRemaining--;
      updateTimerDisplay();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  let m = String(Math.floor(timerRemaining / 60)).padStart(2, "0");
  let s = String(timerRemaining % 60).padStart(2, "0");
  document.getElementById("timer-display").innerText = `${m}:${s}`;
}
