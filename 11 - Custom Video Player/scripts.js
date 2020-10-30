// Video
const video = document.querySelector('.player__video');
// Play button
const playBtn = document.querySelector('.player__button');
// Progress div
const progressDiv = document.querySelector('.progress'); 
// Progress bar
const progressBar = document.querySelector('.progress__filled');
// Rewind button
const rewind = document.querySelector('.player__button[data-skip="-10"]');
// Skip button
const skip = document.querySelector('.player__button[data-skip="25"]');
// Volume slider
const volumeSlider = document.querySelector('.player__slider[name="volume"]');
// Playback rate slider
const playbackRateSlider = document.querySelector('.player__slider[name="playbackRate"]');

// Click events on video and play button
playBtn.addEventListener('click', playVid);
video.addEventListener('click', playVid);

// Timeupdate event on video
video.addEventListener('timeupdate', updateProgressBar);

// Click event on progress bar
progressDiv.addEventListener('click', scrub);

// Click event on rewind and skip
rewind.addEventListener('click', rewindVid);
skip.addEventListener('click', skipVidAhead);

// Change and mousemove events on volume slider
volumeSlider.addEventListener('change', setVolume);
volumeSlider.addEventListener('mousemove', setVolume);

// Change and mousemove events on playback rate slider
playbackRateSlider.addEventListener('change', setPlaybackRate);
playbackRateSlider.addEventListener('mousemove', setPlaybackRate);

// Play video
function playVid() {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = '❚❚';
    } else {
        video.pause();
        playBtn.innerHTML = '►';
    }
}

// Rewind video by 10 seconds
function rewindVid() {
    if (video.currentTime <= 10) {
        video.currentTime = 0;
    } else {
        video.currentTime -= 10;
    }
}

// Skip ahead by 25 seconds
function skipVidAhead() {
    if (video.currentTime >= video.duration - 25) {
        video.currentTime = video.duration;
    } else {
        video.currentTime += 25;
    }
}

// Set volume
function setVolume() {
    video.volume = volumeSlider.value;
}

// Set playback rate
function setPlaybackRate() {
    video.playbackRate = playbackRateSlider.value;
}

// Update progress bar
function updateProgressBar() {
    progressBar.style.flexBasis = ((video.currentTime / video.duration) * 100) + '%';
}

// Scrub progress bar
function scrub(e) {
    const scrubTime = (e.offsetX / progressDiv.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}