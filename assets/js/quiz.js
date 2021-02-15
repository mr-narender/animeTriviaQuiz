const quizQuestion = document.querySelector('#question');
const answers = document.querySelectorAll('.answer-text');
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 1;
let score = 0;
let currentQuestion = {};


// Function that displays question in HTML
function gQuestion(listOfQ) {
    listOfQ.forEach(q => {

        console.log(q.question.toString());
        quizQuestion.innerHTML = q.question.toString();

        //Combining correct and incorrect answers into single array
        q.incorrect_answers.push(q.correct_answer); 
        
        //Defining shuffle() function 
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

            // Return newly shuffled array
            return array;
        }

        //Log to console answers array
        console.log(q.incorrect_answers.toString());

        // Shuffling array containing answers
        shuffle(q.incorrect_answers);
        console.log(q.incorrect_answers);


        for (let i = 0; i < answers.length; i++) {
        answers[i].innerHTML = q.incorrect_answers.shift().toString();
        };
    });
};


function questionProgress() {

    if (questionCounter <= 9) {
        questionCounter++;

        progressText.innerText = `Question ${questionCounter} of 10`;
        progressBarFull.style.width = `${(questionCounter/10 * 100)}%`;
        
    } else {
        return window.location.assign('/end-page.html');
    }

};


function apiQuestion() {
  fetch(`https://opentdb.com/api.php?amount=39&category=31&type=multiple`)
.then(res => res.json())
.then(rawData => gQuestion(rawData.results))
}

apiQuestion();