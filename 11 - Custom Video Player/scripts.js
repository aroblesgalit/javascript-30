const video = document.querySelector('.player__video');
const playBtn = document.querySelector('.player__button');

playBtn.addEventListener('click', playVid);
video.addEventListener('click', playVid);

function playVid() {
    if (playBtn.innerHTML === '►') {
        video.play();
        playBtn.innerHTML = '❚❚';
    } else {
        video.pause();
        playBtn.innerHTML = '►';
    }
    
}