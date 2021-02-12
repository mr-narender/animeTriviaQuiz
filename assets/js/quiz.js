const question = document.querySelector('#question');
const answers = Array.from(document.querySelectorAll('.answer-container'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let questionCounter = 0;
let score = 0;