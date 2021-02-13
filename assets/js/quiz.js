const question = document.querySelector('#question');
const answers = document.querySelectorAll('.answer-text');
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;
let score = 0;
let currentQuestion = {};

function gQuestion(listOfQ) {
  listOfQ.forEach(q => {

    console.log(q.question.toString());
    question.innerHTML = q.question.toString();

    /*console.log(q.correct_answer.toString());
    answers.innerHTML = q.correct_answer.toString();
    
    console.log(q.incorrect_answers.toString());
    answers.innerHTML = q.incorrect_answers.toString();*/

    console.log(q.correct_answer.toString());
    console.log(q.incorrect_answers.toString());

    q.incorrect_answers.push(q.correct_answer);   

    for (let i = 0; i < answers.length; i++) {
    answers[i].innerHTML = q.incorrect_answers.shift().toString();
    }
  });
}

function apiQuestion() {
  fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
.then(res => res.json())
.then(rawData => gQuestion(rawData.results))
}

apiQuestion();