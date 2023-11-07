const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const timestamps = [];
let score = 0;
let timeLimit = 5; // Initial time limit in seconds
let difficultyMultiplier = 1; // Initial difficulty multiplier

const scoreElement = document.getElementById("score");
const timeLimitElement = document.getElementById("time-limit");

const storedPlayerName = localStorage.getItem("playerName");
const playerNameDisplay = document.getElementById("playerNameDisplay");
playerNameDisplay.textContent = `Player Name: ${storedPlayerName}`;

const gameOverMusic = document.getElementById("gameOverMusic");

function playGameOverMusic() {
    gameOverMusic.play();
}

function stopGameOverMusic() {
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
}

function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

function targetRandomKey() {
  removeSelectedClassFromKeys(); // Reset the selected class from all keys
  const key = getRandomKey();
  const keyElement = document.getElementById(key);
  keyElement.classList.add("selected");

  // Set time limit and score for each key
  keyElement.dataset.timeLimit = timeLimit;
  keyElement.dataset.score = getRandomNumber(1, 5); // Set a random score for each key
}

function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

function updateDifficulty() {
  timeLimit = Math.max(timeLimit - difficultyMultiplier, 1); // Ensure time limit doesn't go below 1
  difficultyMultiplier += 0.1; // Increase difficulty for the next round
}

function resetGame() {
  // Reset game state
  score = 0;
  timeLimit = 5;
  difficultyMultiplier = 1;
  updateScore();
  updateDifficulty();
  targetRandomKey();
}

function removeSelectedClassFromKeys() {
  keys.forEach((key) => {
    const keyElement = document.getElementById(key);
    keyElement.classList.remove("selected");
  });
}

function startTimer() {
  timer = setInterval(() => {
      timeLimitElement.textContent = `Time Limit: ${timeLimit}s`;

      if (timeLimit <= 0) {
          clearInterval(timer);
          gameover();
      } else {
          timeLimit--;
      }
  }, 1000);
  return timer; // Return the timer value
}

let timer; // Declare timer outside the function to make it accessible globally
let gameActive = false;
document.addEventListener("keyup", (event) => {
  if (!gameActive) {
    return; // Do nothing if the game is not active
  }
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");

  keyElement.classList.add("hit");
  keyElement.addEventListener("animationend", () => {
    keyElement.classList.remove("hit");
  });

  if (keyPressed === highlightedKey.innerHTML) {
    timestamps.unshift(getTimestamp());
    const elapsedTime = timestamps[0] - timestamps[1];

    const keyTimeLimit = parseInt(highlightedKey.dataset.timeLimit, 10);
    const keyScore = parseInt(highlightedKey.dataset.score, 10);

    if (elapsedTime <= keyTimeLimit * 1000) {
      score += keyScore;
      updateScore();
      updateDifficulty();
      timeLimit = keyTimeLimit;
      highlightedKey.classList.remove("selected");
      targetRandomKey();
    }
  } else {
    gameover();
  }
});

function gameover() {
  gameActive = false; // Set game state to inactive
  clearInterval(timer); // Stop the timer
  const endTime = Date.now();
  const timeTakenSeconds = Math.floor((endTime - timestamps[1]) / 1000);
  const timeTakenFormatted = timeTakenSeconds < 10 ? `0${timeTakenSeconds}` : timeTakenSeconds;
  const keysPressed = timestamps.length - 1;

  playGameOverMusic();

  const popupContent = `
      <img id="pushed_img" src="../assets/key_boo.png">
      <p id="game-over">Game Over!</p>
      <p>Player: ${storedPlayerName}</p>
      <p>Your final score is: ${score}</p>
      <p>Time taken: ${timeTakenFormatted} seconds</p>
      <p>Number of keys pressed: ${keysPressed}</p>
      <button class="popup-btn" onclick="startNewGame()">Play again</button>
  `;

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = popupContent;

  document.body.appendChild(popup);

  // Reset game state
  removeSelectedClassFromKeys();
  resetGame();
}

function startNewGame() {
  gameActive = true; // Set game state to active
  const popup = document.querySelector(".popup");
  if (popup) {
      document.body.removeChild(popup);
  }
  stopGameOverMusic();
  // Reset scores and other items
  score = 0;
  timeLimit = 5;
  difficultyMultiplier = 1;
  updateScore();
  updateDifficulty();
  targetRandomKey();
  window.location.reload();
}

function displayCountdownPopup(countdown) {
  const popupContent = `
    <p>Get ready! Starting in ${countdown} seconds...</p>
  `;
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = popupContent;

  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, 1000);
}

function startGame() {
  // Reset game state
  gameActive = true;  // Set game state to active
  score = 0;
  timeLimit = 5;
  difficultyMultiplier = 1;
  updateScore();
  updateDifficulty();
  targetRandomKey();

  // Display countdown before starting the game
  let countdown = 3;
  displayCountdownPopup(countdown);

  const countdownInterval = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      displayCountdownPopup(countdown);
    } else {
      // Start the game after the countdown
      clearInterval(countdownInterval);
      timer = startTimer();
    }
  }, 1000);
}



document.addEventListener("DOMContentLoaded", startGame);