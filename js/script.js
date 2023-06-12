let timer; // Declare a variable to store the timer
let zoomEffect = document.getElementById("zoomeffect");
let blure = document.getElementById("blured");
let zoomScore = document.getElementById("zoomscore");
var score = document.getElementById("scoreboard");
var bestScore = JSON.parse(localStorage.getItem("scoreboard")) || [];

let happyFace = document.getElementById("happyEmogi");
let sadFace = document.getElementById("sadEmogi");

var bstScore = document.getElementById("bestscore");
var crntScore = document.getElementById("currentscore");

function popupRandomMole() {
  const moleElements = document.getElementsByClassName("mole");
  const randomIndex = Math.floor(Math.random() * moleElements.length);
  const randomMole = moleElements[randomIndex];

  randomMole.classList.add("popped-up");

  // Set a timer to hide the mole after a certain duration (e.g., 1 second)
  setTimeout(() => {
    randomMole.classList.remove("popped-up");
  }, 700);
}
let startButton = document.querySelector(".startbtn");
var audio = document.getElementById("backgroundMusic");
var audio1 = document.getElementById("backgroundMusic1");
function startGame() {
  audio.play();
  startButton.disabled = true;
  zoomScore.classList.remove("zoom1");
  blure.classList.remove("blure_body");
  score.innerHTML = "0";
  let duration = 20000; // 20 seconds
  let interval = 800; // 1 second

  timer = setInterval(popupRandomMole, interval);

  // Stop the game after the specified duration
  setTimeout(() => {
    clearInterval(timer);
    console.log("complete");
    waitsec();
  }, duration);
}

function countScore() {
  let currentScore = parseInt(score.innerHTML);
  let newScore = currentScore + 1;

  score.innerHTML = String(newScore);
}

let timerInterval;

let startingMinutes = 0;
let time = 20; // 20 seconds

const countdownEle = document.getElementById("countdown");

function timerStart() {
  timerInterval = setInterval(updateCountDown, 1000);
  startingMinutes = 0;
  time = 20;
}

function updateCountDown() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  countdownEle.innerHTML = `${formattedMinutes}:${formattedSeconds}`;

  if (time <= 0) {
    clearInterval(timerInterval);
    countdownEle.innerHTML = "00:00";

    // Perform any actions or call functions when the timer reaches 0
  }

  time--;
}

function waitsec() {
  let timer = 1000;
  let duration = 1000;

  setTimeout(() => {
    clearInterval(timer);
    console.log("wait");
    displayTimeup();
    audio.pause();
    audio.currentTime = 0;
    audio1.play();
  }, duration);
}

function displayTimeup() {
  let timer = 1000;
  let duration = 2500;

  blure.classList.add("blure_body");
  zoomEffect.classList.add("zoom");

  setTimeout(() => {
    clearInterval(timer);
    zoomEffect.classList.remove("zoom");
    displayScoreboard();
  }, duration);
}

function displayScoreboard() {
  updateLocalStorage();
  zoomScore.classList.add("zoom1");
  let timer = 1000;
  let duration = 2000;
  setTimeout(() => {
    clearInterval(timer);
    audio1.pause();
    audio1.currentTime = 0;
  }, duration);
  
}

function cancelGame(){
  zoomScore.classList.remove("zoom1");
  blure.classList.remove("blure_body");
  score.innerHTML = "0";
  startButton.disabled = false;
}

function updateLocalStorage() {
  sadFace.classList.remove("emogi");
  happyFace.classList.remove("emogi");
  if (!bestScore || bestScore.length === 0) {
    // Local storage is not defined or empty
    var scoreKey = score.innerHTML.trim();
    happyFace.classList.add("emogi");
    bstScore.innerHTML = scoreKey.toString().padStart(2,0);
    crntScore.innerHTML = scoreKey.toString().padStart(2,0);
    if (scoreKey) {
      var scores = {
        id: Date.now(),
        Text: scoreKey,
      };
      bestScore.push(scores);
      localStorage.setItem("scoreboard", JSON.stringify(bestScore));
    }
  } else {
    var last_score = bestScore[bestScore.length - 1];
    var current_score = parseInt(score.innerHTML);

    if (current_score >= last_score.Text) {
      happyFace.classList.add("emogi");
      bstScore.innerHTML = current_score.toString().padStart(2,0);
      crntScore.innerHTML = current_score.toString().padStart(2,0);
      var scoreKey = score.innerHTML.trim();
      if (scoreKey) {
        var scores = {
          id: Date.now(),
          Text: scoreKey,
        };
        bestScore.push(scores);
        localStorage.setItem("scoreboard", JSON.stringify(bestScore));
      }
    }else{
      sadFace.classList.add("emogi");
      bstScore.innerHTML = last_score.Text.toString().padStart(2,0);
      crntScore.innerHTML = current_score.toString().padStart(2,0);
    }
  }
}
 
//localStorage.clear();


  
