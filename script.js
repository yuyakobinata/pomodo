const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const timeEl = document.getElementById("time");
const modeEl = document.getElementById("mode");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let secondsLeft = WORK_MINUTES * 60;
let isWork = true;
let intervalId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function render() {
  timeEl.textContent = formatTime(secondsLeft);
  modeEl.textContent = isWork ? "作業時間" : "休憩時間";
}

function tick() {
  secondsLeft -= 1;
  if (secondsLeft < 0) {
    isWork = !isWork;
    secondsLeft = (isWork ? WORK_MINUTES : BREAK_MINUTES) * 60;
  }
  render();
}

function start() {
  if (intervalId !== null) return;
  intervalId = setInterval(tick, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pause() {
  clearInterval(intervalId);
  intervalId = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function reset() {
  pause();
  isWork = true;
  secondsLeft = WORK_MINUTES * 60;
  render();
}

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);

render();
