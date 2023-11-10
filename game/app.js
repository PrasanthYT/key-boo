//Declare a constant variable called keys that stores an array of alphabets from A to Z.
const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
//Declare an empty array called timestamps to store the time when each key was pressed.
const timestamps = [];
//Initialize a variable called score to keep track of the player's score.
let score = 0;
//Initialize a variable called timeLimit to represent the maximum time the player has to press the correct key.
let timeLimit = 5;
//Initialize a variable called difficultyMultiplier to represent the difficulty level of the game. This variable is used to modify the time limit and the scoring system.
let difficultyMultiplier = 1;

//Select the HTML element with the ID score and store it in a variable called scoreElement. This element will be used to display the player's score during the game.
const scoreElement = document.getElementById("score");
//Select the HTML element with the ID time-limit and store it in a variable called timeLimitElement. This element will be used to display the remaining time to the player.
const timeLimitElement = document.getElementById("time-limit");

//Retrieve the player's name from the local storage and store it in a variable called storedPlayerName. The player's name is displayed in the HTML using the playerNameDisplay element.
const storedPlayerName = localStorage.getItem("playerName");
const playerNameDisplay = document.getElementById("playerNameDisplay");
playerNameDisplay.textContent = `Player Name: ${storedPlayerName}`;

//The gameOverMusic element is selected to store the game over music.
const gameOverMusic = document.getElementById("gameOverMusic");

//This function plays the game over music when the game ends.
function playGameOverMusic() {
    gameOverMusic.play();
}

//This function stops the game over music.
function stopGameOverMusic() {
    gameOverMusic.pause();
    gameOverMusic.currentTime = 0;
}

//This function returns the current timestamp in seconds.
function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

//This function generates a random number between the specified min and max values.
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//This function returns a random key from the keys array.
function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

// This function removes the "selected" class from all keys in the keys array.
function removeSelectedClassFromKeys() {
  keys.forEach((key) => {
    const keyElement = document.getElementById(key);
    keyElement.classList.remove("selected");
  });
}

//This function selects a random key and assigns a random score to it. The key's assigned time limit is also updated.
function targetRandomKey() {
  removeSelectedClassFromKeys();
  const key = getRandomKey();
  const keyElement = document.getElementById(key);
  keyElement.classList.add("selected");
  keyElement.dataset.timeLimit = timeLimit;
  keyElement.dataset.score = getRandomNumber(1, 5);
}

//This function updates the displayed score.
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

//This function updates the time limit and score multiplier based on the game's current difficulty.
function updateDifficulty() {
  timeLimit = Math.max(timeLimit - difficultyMultiplier, 1);
  difficultyMultiplier += 0.1;
}

//This function resets the game by setting the score, time limit, and score multiplier to their initial values.
function resetGame() {
  score = 0;
  timeLimit = 5;
  difficultyMultiplier = 1;
  updateScore();
  updateDifficulty();
  targetRandomKey();
}

// This function starts a timer that decrements the time limit every second. If the time limit reaches 0, the game ends.
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
  return timer;
}

let timer;
let gameActive = false;

// In this an event listener for the keyup event. When the user presses a key, the event listener checks if the game is active. If it is, the code proceeds to execute the game logic.
document.addEventListener("keyup", (event) => {
  if (!gameActive) {
      return;
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
  gameActive = false;
  clearInterval(timer);
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
  //he selected class is removed from the keys by calling the removeSelectedClassFromKeys() function.
  removeSelectedClassFromKeys();
  resetGame();
}

function startNewGame() {
  gameActive = true;
  const popup = document.querySelector(".popup");
  if (popup) {
      document.body.removeChild(popup);
  }
  stopGameOverMusic();
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
  gameActive = true;
  score = 0;
  timeLimit = 5;
  difficultyMultiplier = 1;
  updateScore();
  updateDifficulty();
  targetRandomKey();
  let countdown = 3;
  displayCountdownPopup(countdown);

  const countdownInterval = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      displayCountdownPopup(countdown);
    } else {
      clearInterval(countdownInterval);
      timer = startTimer();
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", startGame);