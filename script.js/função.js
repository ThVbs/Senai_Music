const audioPlayer = document.getElementById('player');
const playPauseBtn = document.getElementById('tocarMsc');
const nextBtn = document.getElementById('proxim');
const audioSource = document.getElementById('audioSource');


const songs = [
    "musica1.mp3", 
    "musica2.mp3", 
    "musica3.mp3"
];
let currentSongIndex = 0;


function tocarMsc() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "Pausar";
    } else {
        audioPlayer.pau
        playPauseBtn.textContent = "Play";
    }
}


function proximaMsc() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audioSource.src = songs[currentSongIndex];
    audioPlayer.load(); 
    audioPlayer.play();
    playPauseBtn.textContent = "Pausar";
}


playPauseBtn.addEventListener('click', proximaMsc);
nextBtn.addEventListener('click', proximaMsc);


audioPlayer.addEventListener('ended',proximaMsc);