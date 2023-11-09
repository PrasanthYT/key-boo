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
  const isMobile = window.innerWidth < 1022;

  console.log("Is Mobile: ", isMobile);

  if (isMobile) {
    showMobilePopup();
  } else {
    removeMobilePopup();
  }
}

function showMobilePopup() {
  const popupContent = `
    <div id="mobilePopup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 1.0); display: flex; justify-content: center; align-items: center; color: white; font-size: 24px;">
      <p>This website is best viewed on a larger screen. Please use a desktop or tablet for the best experience.</p>
    </div>
  `;

  const popup = document.createElement("div");
  popup.innerHTML = popupContent;
  popup.id = "mobilePopup";
  document.body.appendChild(popup);

  console.log("Popup added");

  popup.addEventListener("click", () => {
    removeMobilePopup();
  });
}

function removeMobilePopup() {
  const existingPopup = document.getElementById("mobilePopup");
  if (existingPopup) {
    document.body.removeChild(existingPopup);
    console.log("Popup removed");
  }
}

window.addEventListener("DOMContentLoaded", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

