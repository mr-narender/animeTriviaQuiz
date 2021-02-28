const quizQuestion = document.querySelector('#question');
const answers = document.querySelectorAll('.answer-text');
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 1;
let score = 0;
let correctAnswers;
let listOfQuestions;

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
function gQuestion(listOfQ) {
   /* listOfQ.forEach(q => {

        //console.log(q);

        quizQuestion.innerHTML = q.question.toString();
        
        //console.log(currentQuestion);

        //Combining correct and incorrect answers into single array
        q.incorrect_answers.push(q.correct_answer); 

        // Shuffling array containing answers
        shuffle(q.incorrect_answers);

        //console.log(q.correct_answer);
        // Individually display multiple answer choices in each .answer-container
        for (let i = 0; i < answers.length; i++) {
            answers[i].innerHTML = q.incorrect_answers.shift().toString();
        };

        //console.log(q.correct_answer);

    });

    */

    let questionElement = listOfQ[Math.floor(Math.random()*listOfQ.length)];

    console.log(questionElement);

    let questionArray = Object.values(questionElement);

    let correctAnswer = questionArray[4].split(",");

    let incorrectAnswers = questionArray[5];

    console.log(questionArray[3]);    
    
    quizQuestion.innerHTML = questionArray[3].toString();

    console.log(correctAnswer);

    console.log(incorrectAnswers);

    let multipleChoice = shuffle(correctAnswer.concat(incorrectAnswers));

    console.log(multipleChoice);

    for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = multipleChoice.shift().toString();
    };

    for (let i = 0; i < multipleChoice.length; i++) {

        if (multipleChoice[i] == correctAnswer) {
            console.log("CORRECT");
            answers[i].style.color = 'green';
        } else {
            console.log("INCORRECT");
            answers[i].style.color = 'blue';
        };

    };
};

/*

function answerFeedback(correct_answer) {

    for (let i = 0; i < answers.length; i++) {

        if (answers[i] == correct_answer) {
            console.log("CORRECT");
            answers[i].style.color = 'green';
        } else {
            console.log("INCORRECT");
            answers[i].style.color = 'blue';
        };

    };
};

*/
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
  .then(rawData => gQuestion(shuffle(rawData.results)));
};

apiQuestion(); 

//console.log(correctAnswers);