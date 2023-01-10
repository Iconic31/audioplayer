const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const stopBtn = document.getElementById('stop');

const audioScreen = document.getElementById('audioScreen');
const volumeControl = document.getElementById('volumeControl');
const displayTime = document.getElementById('displayTime');

const progressContainer = document.getElementById('progress-container')

const songs = ['sample1','sample2','sample3'];


let currIdx = 0;

loadAdo(songs[currIdx]);

function loadAdo(){
    audioScreen.src = `./src/${songs[currIdx]}.mp3`;
}

function playAdo(){
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audioScreen.play();
}

function pauseAdo(){
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audioScreen.pause();
}

function playPauseAdo(){

    if(audioScreen.paused){
        playAdo();
    }else{
        pauseAdo();
    }

}


function nextAdo(){
    currIdx++;

    if(currIdx > songs.length - 1){
        currIdx = 0;
    }

    loadAdo(songs[currIdx]);
    playAdo();
}

function prevAdo(){
    currIdx--;

    if(currIdx < 0){
        currIdx = songs.length - 1;
    }

    loadAdo(songs[currIdx]);
    playAdo();
}

function stopAdo(){
    audioScreen.currentTime = 0;
    pauseAdo();
}

function updateProgress(e){
    const {currentTime,duration} = e.target;

    if(audioScreen.currentTime === 0){
        progress.style.width = '0%';
    }else{
        const currentProgress = (currentTime/duration) * 100;
        progress.style.width = `${currentProgress}%`;
    }

    // Backward
    let mins = Math.floor((audioScreen.duration - audioScreen.currentTime) / 60);
    let secs = Math.floor((audioScreen.duration - audioScreen.currentTime) % 60);

    //  Forward
    // let mins = Math.floor(audioScreen.currentTime / 60);
    // let secs = Math.floor(audioScreen.currentTime % 60);

    const minutes = mins.toString().padStart('2','0');
    const seconds = secs.toString().padStart('2','0');

    displayTime.textContent = `${minutes}:${seconds}`;

    if(isNaN(mins) || isNaN(secs)){
        displayTime.textContent = '00:00';
    }

}

function setProgress(e){
    const getWidth = this.clientWidth;
    const clickX = e.offsetX;

    const duration = audioScreen.duration;

    audioScreen.currentTime = (clickX/getWidth) * duration;

}

function volumeCtrl(){

    audioScreen.volume = volumeControl.value / 100;

}



playBtn.addEventListener('click',playPauseAdo);
nextBtn.addEventListener('click',nextAdo);
prevBtn.addEventListener('click',prevAdo);
stopBtn.addEventListener('click',stopAdo);

audioScreen.addEventListener("timeupdate",updateProgress);
audioScreen.addEventListener("ended",nextAdo);

progressContainer.addEventListener('click',setProgress);

volumeControl.addEventListener('change',volumeCtrl);

