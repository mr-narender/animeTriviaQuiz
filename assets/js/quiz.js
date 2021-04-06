const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;  
let score = 0;
//let questionIndex = Math.floor(Math.random() * questionData.length);

fetch('https://opentdb.com/api.php?amount=39&category=31&type=multiple')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));