const quizQuestion = document.querySelector('#question');
const answers = document.getElementsByClassName('answer-text');
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');
let questionArray;

let questionCounter = 1;
let score = 0;  

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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

    // Return newly shuffled array
    return array;
}


// Function that displays question in HTML
function getQuestion(question, correctAnswer, incorrectAnswers) {


    console.log(question);

    console.log(correctAnswer);

    console.log(incorrectAnswers);

    quizQuestion.innerHTML = question;

    for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = incorrectAnswers.shift() || correctAnswer;
    };
};

function answerFeedback(correctAnswer) {
    for (const answer of answers) {
        console.log(event);
        console.log(event.target.innerHTML);
        questionProgress();
        if (event.target.innerHTML == correctAnswer) {
            console.log('CORRECT');
        } else {
            console.log('INCORRECT');
        }
    };
};

function questionProgress() {

if (questionCounter <= 9) {
        questionCounter++;

        progressText.innerHTML = `Question ${questionCounter} of 10`;
        progressBarFull.style.width = `${(questionCounter/10 * 100)}%`;

        apiQuestion();

    } else {

        return window.location.assign('/end-page.html');

    };
};

function apiQuestion() {
  fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
  .then(res => res.json())
  .then(rawData => {
    let quizData = shuffle(rawData.results);
    let quizQuestion = quizData[0].question;
    let quizCorrectAnswer = quizData[0].correct_answer;
    let quizIncorrectAnswers = quizData[0].incorrect_answers;

    getQuestion(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers),
    answerFeedback(quizCorrectAnswer)

    });
};

apiQuestion();