// import our database from other file for readability
import { wordsArray } from "./data.js";
// what we will check do determine
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
// where we will store inputs already made
let usedWords = [];
// scoring variable
let score = 0;

//input field variable for js
const inputElement = document.querySelector("input");

// our button
const buttonElement = document.querySelector("button");
const scoreElement = document.querySelector("#score");
const scoringElement = document.querySelector("#scoring");
const highScoreElement = document.querySelector(".highScore");
const bodyElement = document.querySelector("body");
const gameContainerElement = document.querySelector(".gamecontainer");
let userInput = "";
const highScores = [];
const clearInput = () => (inputElement.value = "");
// resets the game
const gameOver = () => {
  let totalWords = usedWords.length;
  scoringElement.textContent = `You repeated a word after entering ${totalWords} words. Game over! Enter any new word to play again!`;

  score = 0;
  usedWords = [];
  scoreElement.textContent = `${score} Points Earned`;

  clearInput();
};

const notUsed = (word) => {
  word = userInput;
  if (!usedWords.includes(word)) {
    console.log("good to continue");
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
    console.log("included");

    return true;
  } else {
    console.log("not included");
    return false;
  }
};

const scoreWord = (word) => {
  //
  word = userInput;
  //   splits the word into an array containing component pieces, failure to include the "" results in having an array containing the word itself
  const scoringArray = word.split("");
  scoringArray.sort();

  console.log(scoringArray);
  let points = 0;
  for (let i = 0; i < scoringArray.length; i++) {
    let letter = scoringArray[i];
    if (pointValues[letter]) {
      points += pointValues[letter];
    }
  }
  if (scoringArray.length <= 3) {
    points += 1;
  } else if (scoringArray.length > 3 && scoringArray.length <= 7) {
    points += 2;
  } else points += 3;
  console.log("this checks", points);
  scoringElement.textContent = `Great Job, that word was worth ${points} Points!`;
  score += points;
};

const invalidInputAnimation = () => {
  inputElement.style.boxShadow = "10px 10px 10px red";
  //   the below will make the input box vibrate back and forth
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

const highScorefunction = () => {
  let usersScore = 0;
  usersScore = score;
  const enterYourName = document.createElement("input");
  let usersName = "";
  //   disable the input and button until finished with score
  inputElement.toggleAttribute("disabled");
  inputElement.style.backgroundColor = "black";

  enterYourName.style.width = "30%";
  enterYourName.style.height = "15%";
  enterYourName.placeholder = 'Type Your Name and Push "Enter" to Submit!';
  enterYourName.style.padding = "10px";
  enterYourName.style.zIndex = "1";
  enterYourName.style.alignSelf = "center";
  enterYourName.style.justifySelf = "center";

  gameContainerElement.appendChild(enterYourName);
  console.log(enterYourName);
  enterYourName.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      if (enterYourName.value !== "") {
        usersName = enterYourName.value;
        highScores.push({ userName: usersName, userScore: usersScore });
        highScores.sort((low, high) => high.userScore - low.userScore);
        highScoreElement.replaceChildren();

        for (let i = 0; i < highScores.length; i++) {
          let liElement = document.createElement("li");
          liElement.textContent = `${highScores[i].userName}: ${highScores[i].userScore} Points`;

          highScoreElement.appendChild(liElement);
        }
      }
      gameContainerElement.removeChild(enterYourName);
      inputElement.removeAttribute("disabled");
      inputElement.style.backgroundColor = "";
    }
  });
};

const handleWordSubmission = () => {
  userInput = inputElement.value.toLowerCase().trim();
  if (userInput !== "") {
    if (notUsed() && validWord()) {
      scoreWord();

      scoreElement.textContent = `${score} Points Earned`;
      clearInput();
    } else if (notUsed() && validWord() === false) {
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
      clearInput();
    }
  }
};

// event listeners
buttonElement.addEventListener("click", () => {
  handleWordSubmission();
});

inputElement.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleWordSubmission();
  }
});
