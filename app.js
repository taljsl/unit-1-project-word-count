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
console.dir(inputElement);
// our button

const buttonElement = document.querySelector("button");

const scoreElement = document.querySelector("score");
console.dir(scoreElement);
const scoringElement = document.querySelector("scoring");
console.dir(scoringElement);
let userInput = "";

const clearInput = () => (inputElement.value = "");
// resets the game
const gameOver = () => {
  score = 0;
  usedWords = [];
};

const notUsed = (word) => {
  userInput = inputElement.value.toLowerCase();
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
  userInput = inputElement.value.toLowerCase();
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
  userInput = inputElement.value.toLowerCase();
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
// scoringElement.textContent = `Great Job, that word was worth ${points}`
score += points;
};

// event listeners
buttonElement.addEventListener("click", () => {
  // notUsed();
  if (notUsed() === true) {
    validWord();
  } else {
    gameOver();
  }
  if (validWord() === true) {
    scoreWord();
    // scoreElement.value = `${score} Points Earned`
  }
  console.log(score);
  clearInput();
});
