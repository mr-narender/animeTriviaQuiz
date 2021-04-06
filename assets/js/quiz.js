const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;  
let score = 0;

apiQuestion();
function apiQuestion() {
fetch('https://opentdb.com/api.php?amount=1&category=31&type=multiple')
    .then(res => res.json())
    .then(data => { 
        let questionData = data.results;
        let question = questionData[0].question;
        let correctAnswer = questionData[0].correct_answer;
        let incorrectAnswers = questionData[0].incorrect_answers;

        getQuestion(question);
        getAnswerChoices(correctAnswer, incorrectAnswers);

        console.log(questionData);
        console.log(question);
        console.log(correctAnswer);
        console.log(incorrectAnswers);
    })
    .catch(err => console.error(err));
}

function getQuestion(question) {
    quizQuestion.innerHTML = question;
};

function getAnswerChoices(correctAnswer, incorrectAnswers) {
    console.log("getAnswerChoices:", correctAnswer);
    console.log("getAnswerChoices:", incorrectAnswers);
};