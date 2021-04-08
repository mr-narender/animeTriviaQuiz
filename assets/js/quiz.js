const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 1;  
let score = 0;

// Fisher-Yates Shuffle Algorithm
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

// Question data is fetched from opentbd api
function apiQuestion() {
fetch('https://opentdb.com/api.php?amount=39&category=31&type=multiple')
    .then(res => res.json())
    .then(data => { 

        // Separating question, correct answer and incorrect answers into their own variables
        let questionData = data.results;

        /*
        let question = questionData[0].question;
        let correctAnswer = questionData[0].correct_answer;
        let incorrectAnswers = questionData[0].incorrect_answers;
        */

        // Passing the data into the functions to be handled
        addQuestion(questionData);

        /*
        addChoices(correctAnswer, incorrectAnswers);
        answerFeedback(correctAnswer);
        */

    })
    .catch(err => console.error(err));
}

// Calls first question when page is opened
apiQuestion();

// Adds question into quiz HTML page
function addQuestion(questionData) {

    console.log(questionData);

    let random = Math.floor(Math.random() * questionData.length);

    quizQuestion.innerHTML = questionData[random].question;
};

// Adds answer choices into quiz HTML page
function addChoices(correctAnswer, incorrectAnswers) {

    // Answers constant is an array of an array length of 4
    answers[0].innerHTML = correctAnswer;
    answers[1].innerHTML = incorrectAnswers[0];
    answers[2].innerHTML = incorrectAnswers[1];
    answers[3].innerHTML = incorrectAnswers[2];

    // Answers constant is shuffled so correct answer does not appear in same place
    return shuffle(answers);
};

// Checks if answer clicked is correct (adds points) or incorrect, requests new question and updates progress
function answerFeedback (correctAnswer) {

    // Click event listener
    $(".answer-text").unbind().click(e => {
        let selectedAnswer = e.target;
        
        if (selectedAnswer.innerHTML === correctAnswer) {

            // If answer is correct, gives users 10 points and updates score
            console.log('CORRECT!');
            score += 10;
            scoreText.innerHTML = score;
        } else {
            console.log('INCORRECT!');
        }

        // requests new question and updates users' progress
        apiQuestion();
        questionProgress();
    })
}

// Used to display progress in the quiz, sends to end page if quiz is completed
function questionProgress() {
    if (questionCounter < 10) {

        // Updates users on their progress while they have not completed all questions
        questionCounter++;
        progressText.innerHTML = `Question ${questionCounter} of 10`;
        progressBarFull.style.width = `${(questionCounter/10)* 100}%`;
    } else {

        // Sends users to end-page once they have answered all questions
        window.location.assign('/end-page.html');
    }
}
