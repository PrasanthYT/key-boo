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
  window.open('https://github.com/prasanthj2023', '_blank');
}

function linkedIn(){
  window.open('https://github.com/prasanthj2023', '_blank');
}

const backgroundMusic = document.getElementById("backgroundMusic");
const musicIcon = document.getElementById("music");

function toggleBackgroundMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicIcon.src = "./assets/volume-2.svg";
  } else {
    backgroundMusic.pause();
    musicIcon.src = "./assets/volume-x.svg";
  }
}

function checkScreenWidth() {
  const isMobile = window.innerWidth < 766;

  if (isMobile) {
    showMobilePopup();
  } else {
    removeMobilePopup();
  }
}

function showMobilePopup() {
  document.getElementById("mobilePopup").style.display = "flex";
}

function removeMobilePopup() {
  document.getElementById("mobilePopup").style.display = "none";
}

window.addEventListener("DOMContentLoaded", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);