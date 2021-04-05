const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;  
let score = 0;
let questionIndex = Math.floor(Math.random() * questionData.length);
