// Target necessary elements
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Get video stream
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => console.error(`OH NO!!! ${err}`));
}

// Take frame from video and add to canvas
function paintToCanvas() {
    // Get width and height of video
    const width = video.videoWidth;
    const height = video.videoHeight;
    // Set width and height of canvas to that of the video
    canvas.width = width;
    canvas.height = height;
    // Every 16 ms, take an image from webcam and paint to canvas
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

getVideo();