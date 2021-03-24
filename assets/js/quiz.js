const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionData = {}; 
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



function getQuestion(quizData) {
    let question = quizData[0].question;
    let correctAnswer = quizData[0].correct_answer;
    let incorrectAnswers = quizData[0].incorrect_answers;
    let multipleChoice;

    console.log(quizData[0]);
    
    console.log(question);
    console.log(correctAnswer);
    console.log(incorrectAnswers);
    questionData = quizData;

    return questionData;
    /*
    var questions;
    fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
    .then(res => res.json()).then(data => {
        questions = data.results;
    });
    return questions;
    */
}

function apiQuestion() {
    fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
    .then(res => res.json())
    .then(rawData => {
        
        getQuestion(rawData.results);

        /*

        let quizData = shuffle(rawData.results);
        let question = quizData[0].question;
        let correctAnswer = quizData[0].correct_answer;
        let incorrectAnswers = quizData[0].incorrect_answers;

        quizQuestion.innerHTML = question;

        console.log('answers', answers)
        answers.forEach(answer => {
            answer.innerHTML = incorrectAnswers.shift() || correctAnswer;
            answer.setAttribute("data-answer", incorrectAnswers.shift() || correctAnswer);
        });
        console.log("Correct answer: " + correctAnswer);

        answers.forEach(answer => {
            answer.addEventListener('click', clickHandler)
        });

        */
    })
    .catch((err) => {
        console.error(err);
    });
};

apiQuestion();

/*

function clickHandler(e) {
    console.log(e);
    let clickedItem = e.target.innerHTML;

    if (clickedItem == e.currentTarget.getAttribute('data-answer')) {
        console.log("CORRECT!");
    } else {
        console.log("INCORRECT!");
    }
};

*/

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



