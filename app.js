// import our database from other file for readability
import { wordsArray } from "./data.js";
//Scoring Object for Later
const pointValues = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10,
};

let usedWords = [];
const highScores = [];
const taHighScores = [];
let score = 0;
let userInput = "";
let gameMode = "";
let timeRemaining = 120;
let gameActive = false;
let countdown;
// element variables
const classicButtonElement = document.querySelector(".classic");
const timeAttackButtonElement = document.querySelector(".timeattack");
const inputElement = document.querySelector("input");
const submitButtonElement = document.querySelector(".submitbutton");
const scoreElement = document.querySelector("#score");
const scoringElement = document.querySelector("#scoring");
const highScoreElement = document.querySelector(".highScore");
const bodyElement = document.querySelector("body");
const gameContainerElement = document.querySelector(".gamecontainer");
const h5Element = document.querySelector(".highScoreList");
const h5Element2 = document.querySelector(".taHighScoreList");
const welcomeElement = document.querySelector("#welcome");
const taHighScoreElement = document.querySelector(".highScoreTA");

// gamefuncitons below
const clearInput = () => (inputElement.value = "");

// resets the game
const gameOver = () => {
  let totalWords = usedWords.length;

  scoringElement.textContent = `You repeated a word after entering ${totalWords} words. Game over! Enter any new word to play again!`;

  scoreElement.textContent = `${score} Points Earned`;
  score = 0;
  usedWords = [];
  gameActive = false;

  classicButtonElement.removeAttribute("disabled");
  timeAttackButtonElement.removeAttribute("disabled");

  clearInput();
//   stops countdown from progressing if present, line added with help  of chtagpt
  clearInterval(countdown);
};

const notUsed = (word) => {
  word = userInput;
  if (!usedWords.includes(word)) {
    return true;
  } else {
    return false;
  }
};
// check that word is legal to use
const validWord = (word) => {
  word = userInput;
  // check that the input word is in our dictionary and not already used
  if (wordsArray.includes(word)) {
    usedWords.push(word);
    return true;
  } else {
    return false;
  }
};

const scoreWord = (word) => {
  
  word = userInput;
  //   splits the word into an array containing component pieces, failure to include the "" results in having an array containing the word itself
  const scoringArray = word.split("");
  scoringArray.sort();
//   take each letter in our word and check it against the object containing our scores.
  let points = 0;
  for (let i = 0; i < scoringArray.length; i++) {
    let letter = scoringArray[i];
    if (pointValues[letter]) {
      points += pointValues[letter];
    }
    // scoring rules by length here
  }
  if (scoringArray.length <= 3) {
    points += 1;
  } else if (scoringArray.length > 3 && scoringArray.length <= 7) {
    points += 2;
  } else points += 3;

  scoringElement.textContent = `Great Job, that word was worth ${points} Points!`;
  score += points;
};

const invalidInputAnimation = () => {
    // makes the box flash red
  inputElement.style.boxShadow = "10px 10px 10px red";
  //   the below will make the input box vibrate back and forth and was taught in a lesson to me by chatgpt
  const vibrate = setInterval(() => {
    // transform says we are moving it and translateX says where we are moving it on the X-axis.
    inputElement.style.transform = "translateX(-2px)";
    
    setTimeout(() => {
      inputElement.style.transform = "translateX(4px)";
    }, 5);
  }, 10);
  // undoes the rest of the function after time in milliseconds elapses
  setTimeout(() => {
    inputElement.style.boxShadow = "";
    clearInterval(vibrate);
  }, 250);
};
const updateTimer = () => {
  welcomeElement.innerText = `${timeRemaining} Seconds Remain`;
  welcomeElement.style.fontSize = "28px";
  timeRemaining--;
  //   changed the if condition here from 0 to neg 1 as timer was calling game over with 2 seonds remaining
  if (timeRemaining <= -1) {
    clearInterval(countdown);
    welcomeElement.innerText = "Times Up!";
    highScorefunction();
    gameOver();
  }
};
const startOfGame = () => {
  if (gameActive === false) {
    gameActive = true;
    classicButtonElement.toggleAttribute("disabled");
    timeAttackButtonElement.toggleAttribute("disabled");
    if (gameMode === "TimeAttack") {
      timeRemaining = 120;
      countdown = setInterval(updateTimer, 1000);
    }if (gameMode === 'Classic'){
        welcomeElement.textContent = 'How Many Words Will You Get?'
    }
      }
};

const highScorefunction = () => {
  let usersScore = score;
  const enterYourName = document.createElement("input");
  enterYourName.placeholder = 'Type Your Name and Push "Enter" to Submit!';
  let usersName = "";
  //   disable the input and button until finished with score
  inputElement.setAttribute("disabled", "");
  submitButtonElement.setAttribute("disabled", "");
  inputElement.style.backgroundColor = "black";

  enterYourName.style.width = "30%";
  enterYourName.style.height = "15%";
  enterYourName.style.padding = "10px";
  //   enterYourName.style.zIndex = "1";
  enterYourName.style.alignSelf = "center";
  enterYourName.style.justifySelf = "center";

  gameContainerElement.appendChild(enterYourName);

  enterYourName.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      // trim added at suggestion of chatgpt
      usersName = enterYourName.value.trim();
      if (usersName !== "") {
        if (gameMode === "Classic") {
          h5Element.style.opacity = "100%";
          highScores.push({ userName: usersName, userScore: usersScore });
          highScores.sort((low, high) => high.userScore - low.userScore);

          // clear the existing high scores
          highScoreElement.replaceChildren();

          for (let i = 0; i < highScores.length; i++) {
            let liElement = document.createElement("li");
            liElement.textContent = `${highScores[i].userName}: ${highScores[i].userScore} Points`;
            console.log(highScores);
            highScoreElement.appendChild(liElement);
          }
        } else if (gameMode === "TimeAttack") {
          h5Element2.style.opacity = "100%";
          taHighScores.push({ userName: usersName, userScore: usersScore });
          taHighScores.sort((low, high) => high.userScore - low.userScore);
          // clear and update
          taHighScoreElement.replaceChildren();
          for (let i = 0; i < taHighScores.length; i++) {
            let liElement = document.createElement("li");
            liElement.textContent = `${taHighScores[i].userName}: ${taHighScores[i].userScore} Points`;

            taHighScoreElement.appendChild(liElement);
          }
        }
        gameContainerElement.removeChild(enterYourName);
        inputElement.removeAttribute("disabled");
        submitButtonElement.removeAttribute("disabled");

        inputElement.style.backgroundColor = "";
      }
    }
  });
};

const handleWordSubmission = () => {
  userInput = inputElement.value.toLowerCase().trim();
  if (userInput !== "") {
    startOfGame();
    if (notUsed(userInput) && validWord(userInput)) {
      usedWords.push(userInput);
      scoreWord(userInput);
      scoreElement.textContent = `${score} Points Earned`;
      clearInput();
    } else if (notUsed(userInput) && validWord(userInput) === false) {
      invalidInputAnimation();
      scoreElement.textContent = `I'm sorry that word is not in our dictionary or it was misspelled. Please try again!`;
      //   the below piece of code comes with help from chatgpt
      if (/[^a-zA-Z]/.test(userInput)) {
        scoreElement.textContent =
          "I'm sorry you input an invalid character. Please make sure that you only input letters.";
      }
    } else {
      highScorefunction();
      gameOver();
    }
  }
};

// event listeners
submitButtonElement.addEventListener("click", () => {
  handleWordSubmission();
});

inputElement.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleWordSubmission();
  }
});

classicButtonElement.addEventListener("click", () => {
  gameMode = "Classic";
  classicButtonElement.style.boxShadow = "0px 0px 20px blue";
  classicButtonElement.style.border = "3px solid black";
  timeAttackButtonElement.style.boxShadow = "";
  timeAttackButtonElement.style.border = "";
  inputElement.removeAttribute("disabled");
  inputElement.placeholder = "Your Word Here";
  console.log(gameMode);
});

timeAttackButtonElement.addEventListener("click", () => {
  gameMode = "TimeAttack";
  timeAttackButtonElement.style.boxShadow = "0px 0px 20px blue";
  timeAttackButtonElement.style.border = "3px solid black";
  classicButtonElement.style.boxShadow = "";
  classicButtonElement.style.border = "";
  inputElement.removeAttribute("disabled");
  inputElement.placeholder = "Your Word Here";
  console.log(gameMode);
});

