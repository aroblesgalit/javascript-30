let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown); // Clear any existing timers
    const now = Date.now(); // Current time in milliseconds
    const then = now + (seconds * 1000); // Current time + the seconds
    displayTimeLeft(seconds); // Display current time
    displayEndTime(then); // Display end time

    // Display amount time left every second
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // Display it
        displayTimeLeft(secondsLeft)    
    }, 1000);
}

function displayTimeLeft(seconds) {
    // Get minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    // Display to the DOM
    const display = `${minutes}:${remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds}`;
    document.title = display; // Displays on window's tab
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    // Get hour and minutes
    const hour = end.getHours();
    const minutes = end.getMinutes();
    // Display to the DOM
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' + minutes : minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

// For each button with the data-time attribute
// add a click event and run the startTimer
buttons.forEach(button => button.addEventListener('click', startTimer));

// Add event listner to input field
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    const seconds = mins * 60;
    this.reset(); // Resets input
    timer(seconds);
});