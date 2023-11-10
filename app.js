//Getting the name of the user and storing it to the local storage when the user press the start button
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

//Giving onclick function to the Instruction Button
function instruction(){
  window.location.href='./instruction.html'
}

//Giving onclick function to the Back Button on Instruction page
function returnHome(){
  window.location.href="./index.html"
}

//Giving onclick function to the github img
function gitHub(){
  window.open('https://github.com/prasanthj2023', '_blank');
}

//Giving onclick function to the linked in img
function linkedIn(){
  window.open('https://github.com/prasanthj2023', '_blank');
}


// This is used for changing the icon when the user clicked the img
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

//Used to display the popup when the screen width is decreased to 768px
//Checking the screen width is less than 786 is less means if show the popup else it remove that
function checkScreenWidth() {
  const isMobile = window.innerWidth < 766;

  if (isMobile) {
    showMobilePopup();
  } else {
    removeMobilePopup();
  }
}

//making the function called in the previous code 
function showMobilePopup() {
  document.getElementById("mobilePopup").style.display = "flex";
}

function removeMobilePopup() {
  document.getElementById("mobilePopup").style.display = "none";
}

window.addEventListener("DOMContentLoaded", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);