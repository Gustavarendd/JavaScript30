let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

timerDisplay.textContent = '00:00';
function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.floor(seconds % 60);
  const display = `${minutes > 9 ? minutes : '0' + minutes}:${
    secondsLeft > 9 ? secondsLeft : '0' + secondsLeft
  }`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const secs = end.getSeconds();

  endDisplay.textContent = `Be back at: ${hours}:${
    minutes > 9 ? minutes : '0' + minutes
  }:${secs > 9 ? secs : '0' + secs}`;
}

function setTimer() {
  console.log(this.dataset.time);
  timer(this.dataset.time);
}

buttons.forEach(button => button.addEventListener('click', setTimer));
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (isNaN(this.minutes.value)) {
    this.reset();
    5;
    return;
  }
  timer(this.minutes.value * 60);
  this.reset();
});
