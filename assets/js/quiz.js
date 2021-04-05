const quizQuestion = document.querySelector('#question');
const answerParent = document.querySelector('#answerParent');
const answers = Array.from(document.getElementsByClassName('answer-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;  
let score = 0;



function apiQuestion() {
    fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
    .then(res => res.json())
    .then(rawData => {
        getQuestion(rawData.results);
    })
    .catch((err) => {
        console.error(err);
    });
}

apiQuestion();

/*
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
*/

function getQuestion(questionData) {

    if (questionCounter === 10) {
        return window.location.assign('/end-page.html');
    }

    questionCounter++;  
    progressText.innerHTML = `Question ${questionCounter} of 10`;
    progressBarFull.style.width = `${(questionCounter/10 * 100)}%`;

    let questionIndex = Math.floor(Math.random() * questionData.length);

    currentQuestion = questionData[questionIndex];


    console.log(questionData);
    console.log(currentQuestion);
    
    quizQuestion.innerHTML = currentQuestion.question;

    let correctAnswer = currentQuestion.correct_answer;
    let incorrectAnswers = currentQuestion.incorrect_answers;


    console.log(correctAnswer)
    console.log(incorrectAnswers)

    for (x in incorrectAnswers) {
        for (i in answers) {
            answers[i].innerHTML = incorrectAnswers[i] || correctAnswer;
        }
    }

    answerFeedback(correctAnswer, questionData);
 }

 /*
 function answerFeedback(correctAnswer, questionData) {
    console.log(correctAnswer)
    $('.answer-text').click(e => {
        let choice = e.target.innerHTML;
        if (correctAnswer == choice) {
            console.log('CORRECT!')
            scoreAddition();
        } else {
            console.log('INCORRECT!')
        }
    })
}

function apiQuestion() {
    fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
    .then(res => res.json())
    .then(rawData => {
        return questionData.push(rawData.results);
    })
    .catch((err) => {
        console.error(err);
    });
};
*/


/*


function questionProgress() {
    if (questionCounter <= 9) {
        questionCounter++;
        progressText.innerHTML = `Question ${questionCounter} of 10`;
        progressBarFull.style.width = `${(questionCounter/10 * 100)}%`;
    } else {
        return window.location.assign('/end-page.html');
    };
};

*/

function scoreAddition() {
    score += 10;
    scoreText.innerHTML = score;
}
