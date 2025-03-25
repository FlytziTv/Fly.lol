// Sélection des éléments DOM
const audioPlayer = document.getElementById('audioPlayer');
const playPause = document.getElementById('playPause');
const playIcon = document.getElementById('playIcon');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeControl = document.getElementById('volumeControl');
const muteBtn = document.getElementById('muteBtn');
const nextSong = document.getElementById('nextSong');
const prevSong = document.getElementById('prevSong');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songAvatar = document.getElementById('songAvatar');
const musicBanner = document.getElementById('musicBanner');

// Liste des chansons
const songs = [
  {
    title: "Perte de temps",
    artist: "So La Lune",
    src: "/music/So_La_Lune/Perte de temps.mp3",
    avatar: "/music/So_La_Lune/Pp.png",
    banner: "/music/So_La_Lune/Bannière.png",
  },
  {
    title: "Lâme du phoenix",
    artist: "Yuston XIII",
    src: "/music/Yuston_XIII/Lâme du phoenix.mp3",
    avatar: "/music/Yuston_XIII/Pp.png",
    banner: "/music/Yuston_XIII/Bannière.png",
  },
];

let currentSongIndex = 0;

// Charger la chanson initiale
function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  songAvatar.src = song.avatar;
  musicBanner.style.backgroundImage = `url('${song.banner}')`;
  audioPlayer.src = song.src;
}

// Lecture/Pause
function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playIcon.src = "/img/her/pause.svg";
  } else {
    audioPlayer.pause();
    playIcon.src = "/img/her/play.svg";
  }
}

// Mettre à jour la barre de progression
function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress || 0;
  currentTime.textContent = formatTime(audioPlayer.currentTime);
  totalTime.textContent = formatTime(audioPlayer.duration);
}

// Changer de position dans la musique
function setProgress() {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
}

// Formater le temps (mm:ss)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Gérer le volume
function setVolume() {
  audioPlayer.volume = volumeControl.value;
}

// Mute/Demute
function toggleMute() {
  audioPlayer.muted = !audioPlayer.muted;
  muteBtn.src = audioPlayer.muted ? "/img/her/volume-mute.svg" : "/img/her/volume-full.svg";
}

// Changer de chanson
function next() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
}

function prev() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
}

// Événements
playPause.addEventListener('click', togglePlayPause);
progressBar.addEventListener('input', setProgress);
audioPlayer.addEventListener('timeupdate', updateProgress);
volumeControl.addEventListener('input', setVolume);
muteBtn.addEventListener('click', toggleMute);
nextSong.addEventListener('click', next);
prevSong.addEventListener('click', prev);
audioPlayer.addEventListener('ended', next);

// Charger la première chanson
loadSong(currentSongIndex);
