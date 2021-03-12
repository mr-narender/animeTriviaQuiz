const quizQuestion = document.querySelector('#question');
const answers = document.querySelectorAll('.answer-text');
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
function gQuestion(question, correctAnswer, incorrectAnswers) {


    console.log(question);

    console.log(correctAnswer);

    console.log(incorrectAnswers);


    /*
    
    let questionElement = listOfQ.shift();

    let questionArray = Object.values(questionElement);

    let correctAnswer = questionArray[4].split(",");

    let incorrectAnswers = questionArray[5];

    console.log(questionArray[3]);    
    
    quizQuestion.innerHTML = questionArray[3].toString();

    console.log(":" + correctAnswer.toString());
    

    let multipleChoice = shuffle(correctAnswer.concat(incorrectAnswers));

    
    for (let i = 0; i < answers.length; i++) {
        answers[i].innerText = multipleChoice.shift().toString();

        console.log(answers[i].innerText);  
    };

    listOfQ.unshift(questionElement);

    */

    quizQuestion.innerHTML = question;

    for (let i = 0; i < answers.length; i++) {
        answers[i].innerText = incorrectAnswers.shift() || correctAnswer;

        console.log(answers[i].innerText);  
    };

};


function answerFeedback(question, correctAnswer, incorrectAnswers) {


    console.log(question);

    console.log(correctAnswer);

    console.log(incorrectAnswers);


    /*

    let questionElement = listOfQ.shift();

    let questionArray = Object.values(questionElement);

    let correctAnswer = questionArray[4].split(",");

    let incorrectAnswers = questionArray[5];

    let multipleChoice = shuffle(correctAnswer.concat(incorrectAnswers));

    console.log(";" + correctAnswer.toString());


    for (let i = 0; i < answers.length; i++) {

        answers[i].addEventListener('click', function () {
            if (answers[i].innerText == correctAnswer.toString()) { 
                score += 10;
                scoreText.innerText = score;
                console.log("CORRECT");
            
            } else {
                console.log("INCORRECT");
            };
        });
    };

    */
};

function questionProgress() {

    if (questionCounter <= 9) {
        questionCounter++;

        progressText.innerText = `Question ${questionCounter} of 10`;
        progressBarFull.style.width = `${(questionCounter/10 * 100)}%`;

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

    gQuestion(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers),
    answerFeedback(quizQuestion, quizCorrectAnswer, quizIncorrectAnswers)

    });
};

apiQuestion(); 
