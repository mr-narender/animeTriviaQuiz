const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 1;  
let score = 0;

/**
 * Fisher-Yates Shuffle Algorithm
 * Used to randomise the order of the array elements
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Question data is fetched from opentbd api
function apiQuestion() {
    fetch('https://opentdb.com/api.php?amount=39&category=31&type=multiple')
        .then(res => res.json())
        .then(data => { 

            let questionData = data.results;

            addQuestion(questionData);
        })
        .catch(err => console.error(err));
}

apiQuestion();

// Adds question into quiz HTML page
function addQuestion(questionData) {

    let random = Math.floor(Math.random() * questionData.length);
    let correctAnswer = questionData[random].correct_answer;
    let incorrectAnswers = questionData[random].incorrect_answers;
    
    if (quizQuestion === null) {
        return;
    }

    quizQuestion.innerHTML = questionData[random].question;

    addChoices(correctAnswer, incorrectAnswers);
    answerFeedback(correctAnswer);
};

// Adds answer choices into quiz HTML page
function addChoices(correctAnswer, incorrectAnswers) {

    answers[0].innerHTML = correctAnswer;
    answers[1].innerHTML = incorrectAnswers[0];
    answers[2].innerHTML = incorrectAnswers[1];
    answers[3].innerHTML = incorrectAnswers[2];

    return shuffle(answers);
};

// Checks if answer clicked is correct (adds points) or incorrect, requests new question and updates progress
function answerFeedback (correctAnswer) {

    $(".answer-text").unbind().click(e => {
        let selectedAnswer = e.target;
        
        if (selectedAnswer.innerHTML === correctAnswer) {

            score += 10;
            scoreText.innerHTML = score;
        } 

        questionProgress();
        apiQuestion();
    })
}

// Used to display progress in the quiz, sends to end page if quiz is completed
function questionProgress() {
    if (questionCounter < 10) {

        questionCounter++;
        progressText.innerHTML = `Question ${questionCounter} of 10`;
        progressBarFull.style.width = `${(questionCounter/10)* 100}%`;
    } else {
        
        window.location.assign('end-page.html');
    }
}
