const question = document.querySelector('#question');
const answers = Array.from(document.querySelectorAll('.answer-container'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;
let score = 0;
let currentQuestion = {};

function gQuestion(listOfQ) {
  listOfQ.forEach(q => {
    console.log(q.question.toString())
  })
}

function apiQuestion() {
  fetch(`https://opentdb.com/api.php?amount=10&category=31&type=multiple`)
.then(res => res.json())
.then(rawData => gQuestion(rawData.results))
}

apiQuestion(question);