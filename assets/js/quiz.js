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

    q.incorrect_answers.push(q.correct_answer); 
    
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    console.log(q.incorrect_answers.toString());

    // Used like so
    shuffle(q.incorrect_answers);
    console.log(q.incorrect_answers);

        for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = q.incorrect_answers.shift().toString();
        }
    });
}

function questionCounter() {

    if (questionCounter <= 10) {
        questionCounter++;
    } else {
        return window.location.assign('/end-page.html');
    }

}

function apiQuestion() {
  fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
.then(res => res.json())
.then(rawData => gQuestion(rawData.results))
}

apiQuestion();