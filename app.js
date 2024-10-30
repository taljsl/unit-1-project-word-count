// import our database from other file for readability
import {wordsArray} from "./data.js";
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
const usedWords = [];
// scoring variable
let score = 0
//input field variable for js
const inputElement = document.querySelector('input');
console.dir(inputElement);
// our button

const buttonElement = document.querySelector('button');

let userInput = ''

const clearInput = () => inputElement. value = '';

const validWord = (word) => {
    userInput = inputElement.value.toLocaleLowerCase();
    word = userInput
    let valid
        if (wordsArray.includes(word) && !usedWords.includes(word)){
            valid= true
            clearInput()
            console.log('included')
            }
        }


        



const gameOver = () => {
    score = 0;
    usedWords = [];
}







// event listeners
buttonElement.addEventListener('click', () =>{
   validWord();
});