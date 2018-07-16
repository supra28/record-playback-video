'use strict'
let recorder,stream 
let getAccessBtn = document.getElementById('getAccess')
let startBtn = document.getElementById('start')
let stopBtn = document.getElementById('stop')
let video = document.getElementById('video')
startBtn.disabled = true;
stopBtn.disabled = true;

getAccessBtn.onclick = e => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      .then(_stream => {
        stream= _stream
        getAccessBtn.style.display = 'none';
        startBtn.removeAttribute('disabled');
        resetVideo();
      }).catch(e => console.error(e));
    }  

startBtn.onclick = e => {
    //create a new recorder and start recording
    recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm'
    });
    resetVideo();
    recorder.start();
    stopBtn.removeAttribute('disabled');
    startBtn.disabled = true;
}

stopBtn.onclick = e =>{
    //setting video element to the recording when the recorder is stopped
    recorder.ondataavailable = e => {
        video.removeAttribute('autoplay')
        video.src = URL.createObjectURL(e.data);
        video.controls= true
    }
    recorder.stop();
    startBtn.removeAttribute('disabled');
    stopBtn.disabled = true;
}

//resetting video element  to live stream
function resetVideo(){
    video.removeAttribute('controls')
    video.autoplay=true
    video.src = URL.createObjectURL(stream);
}