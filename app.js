let playerName;

function startGame() {
  playerName = document.getElementById("playerName").value;
  if (!playerName.trim()) {
    alert("Please enter your name before starting the game.");
    return;
  }
  localStorage.setItem("playerName", playerName);
  window.location.href = './game/index.html';
}

function instruction(){
  window.location.href='./instruction.html'
}

function returnHome(){
  window.location.href="./index.html"
}

function gitHub(){
  window.location.href = 'https://github.com/prasanthj2023';
}

function linkedIn(){
  window.location.href = 'https://github.com/prasanthj2023';
}

const backgroundMusic = document.getElementById("backgroundMusic");
const musicIcon = document.getElementById("musicIcon");

function toggleBackgroundMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicIcon.src = "./assets/volume-2.svg";
  } else {
    backgroundMusic.pause();
    musicIcon.src = "./assets/volume-x.svg";
  }
}
