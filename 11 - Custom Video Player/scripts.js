// Video
const video = document.querySelector('.player__video');
// Play button
const playBtn = document.querySelector('.player__button');
// Progress bar
const progressBar = document.querySelector('.progress__filled');
// Rewind 10 seconds button
const rewind = document.querySelector('.player__button[data-skip="-10"]');
// Skip 25 seconds button
const skip = document.querySelector('.player__button[data-skip="25"]');

// Click events on video and play button
playBtn.addEventListener('click', playVid);
video.addEventListener('click', playVid);

// Click event on rewind and skip
rewind.addEventListener('click', rewindVid);
skip.addEventListener('click', skipVidAhead);

// Play video
function playVid() {
    if (playBtn.innerHTML === '►') {
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