const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = shuffle(Array.from(document.getElementsByClassName('answer-text')));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;  
let score = 0;

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

function apiQuestion() {
fetch('https://opentdb.com/api.php?amount=1&category=31&type=multiple')
    .then(res => res.json())
    .then(data => { 
        let questionData = data.results;
        let question = questionData[0].question;
        let correctAnswer = questionData[0].correct_answer;
        let incorrectAnswers = questionData[0].incorrect_answers;

        addQuestion(question);
        addChoices(correctAnswer, incorrectAnswers);
        answerFeedback(correctAnswer);

        console.log(questionData);
    })
    .catch(err => console.error(err));
}

apiQuestion();

function addQuestion(question) {
    quizQuestion.innerHTML = question;
};

function addChoices(correctAnswer, incorrectAnswers) {
    console.log("getAnswerChoices:", correctAnswer);
    console.log("getAnswerChoices:", incorrectAnswers);


    answers[0].innerHTML = correctAnswer;
    answers[1].innerHTML = incorrectAnswers[0];
    answers[2].innerHTML = incorrectAnswers[1];
    answers[3].innerHTML = incorrectAnswers[2];
};

function answerFeedback (correctAnswer) {
    $(".answer-text").unbind().click(e => {
        let selectedAnswer = e.target;
        
        if (selectedAnswer === correctAnswer) {
            console.log('CORRECT!');
        } else {
            console.log('INCORRECT!');
        }
        apiQuestion();
        questionProgress();
    })
}

function questionProgress() {
    if (questionCounter <= 10) {
        questionCounter++;
        progressText.innerHTML = `Question ${questionCounter} of 10`;
        progressBarFull.style.width = `${(questionCounter/10)* 100}%`;
    } else {
        window.location.assign('/end-page.html');
    }
}