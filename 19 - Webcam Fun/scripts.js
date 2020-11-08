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

// Variables for effects
let filter = false;
let effect = null;
let ghosting = false;

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
        // Get video for canvas
        ctx.drawImage(video, 0, 0, width, height);

        // Get pixels for filter
        let pixels = ctx.getImageData(0, 0, width, height); // Take pixels out

        // Mess with them
        if (filter) {
            if (effect === "redEffect") {
                pixels = redEffect(pixels);
            } else if (effect === "rgbSplit") {
                pixels = rgbSplit(pixels);
            }
        }

        // Ghosting effect
        if (ghosting) {
            ctx.globalAlpha = 0.1;
        } else {
            ctx.globalAlpha = 1;
        }

        pixels = greenScreen(pixels); // Mess with them

        ctx.putImageData(pixels, 0, 0) // Put them back

    }, 16);
}

// Take a photo
function takePhoto() {
    snap.currentTime = 0;
    // Play sound
    snap.play();

    // Take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a'); // Create a link
    link.href = data; // Set href to the data
    link.setAttribute('download', 'photo'); // Set download attribute
    link.innerHTML = `<img src='${data}' alt='JS30-19th' />`; // Set innerHTML to an image
    strip.insertBefore(link, strip.firstChild); // Insert the link into the strip element
}

// Red Effect filter
function redEffect(pixels) {
    filter = true;
    effect = "redEffect";
    // Loop through pixels
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] += 100; // Red
        pixels.data[i + 1] -= 50; // Green
        pixels.data[i + 2] *= 0.5; // Blue
    }
    return pixels;
}

// RGB Split filter
function rgbSplit(pixels) {
    filter = true;
    effect = "rgbSplit";
    // Loop through pixels
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // Red
        pixels.data[i + 100] = pixels.data[i + 1]; // Green
        pixels.data[i + 150] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

// Toggle ghosting effect
function toggleGhosting() {
    ghosting = !ghosting;
}

// Reset effects
function reset() {
    filter = false;
    effect = "";
    ghosting = false;
}

// Green screen
function greenScreen(pixels) {
    // Levels object for holding min/max green
    const levels = {};

    // Grab every rgb input and add to levels object with their values
    document.querySelectorAll('.rgb input').forEach(input => levels[input.name] = input.value);

    // Loop over pixels
    for (i = 0; i < pixels.data.length; i += 4) {
        // Get red, green, blue, and alpha
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        // If it's anywhere in between the min and max values
        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            pixels.data[i + 3] = 0; // Take it out
        }
    }

    return pixels;
};

getVideo();

// Once video is played, run paintToCanvas
video.addEventListener('canplay', paintToCanvas);