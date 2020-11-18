let countdown;

function timer(seconds) {
    const now = Date.now(); // Current time in milliseconds
    const then = now + (seconds * 1000); // Current time + the seconds
    displayTimeLeft(seconds); // Display time
    
    // Display amount time left every second
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop it
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }
        // Display it
        displayTimeLeft(secondsLeft)    
    }, 1000);
}

function displayTimeLeft(seconds) {
    console.log(seconds);
}