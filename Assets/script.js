var questionList = [{
  question:" Inside which HTML element do we put the JavaScript?",
  answers:["<javascript>", "script", "<js>", "scripting"]},
  {
  question: "Is JavaScript case-sensitive?",
  answers:["No", "Yes"]},
  {
  question:"3: Where is the correct place to insert a JavaScript?",
  answers:["The <head> section", "Both the <head> section and the <body> section are correct", "The <body> section"]},
  {
  question:"4:What is the correct syntax for referring to an external script called \"xxx.js\"?",
  answers:["<script src=\"xxx.js\">", "<script name=\"xxx.js\"","<script href=\"xxx.js\""]},
  {
  question:"5:The external JavaScript file must contain the <script> tag.",
  answers:["True", "False"]}];
  
var timerElement = document.querySelector('#countdown');
var scoreboard = document.querySelector('#scoreboard');
var highscores = document.querySelector('#highscores');
var quizQ = document.querySelector('#quiz-question');
var quizA = Array.from(document.querySelectorAll('input[name=answer]'));
var startButt = document.querySelector('#start-button');
var submitButt = document.querySelector('#submit');
var timerCount;
var timer;
var questionNum = 0;
var answerNum = 0;
startButt.addEventListener("click", startGame);

function startGame(){
  timerCount = 120;
  startButt.setAttribute("class", "hidden")
  submitButt.setAttribute("class","show")
  nextQuestion();
  startTimer();
}

function nextQuestion(){
  quizQ.textContent = (questionNum+1) + '. ' + 
  questionList[questionNum].question;
//   var answers = questionList[questionNum].answers;
//   quizA.forEach(function (input, i){
//     quizA.setAttribute("class", "show")
//     input.value = answers[i];
//     input.checked = false;
//     quizA.textContent = answers[i];
// });
}


function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = "Timer: " + timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        finished();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      timeOut();
    }
  }, 1000);
}


function timeOut(){
  quizQ.textContent = "Times Up!!!"
  startButt.disabled = false;
  highscores();
}

function finished(){
  quizQ.textContent = "You finished with time remaining! Great Job!"
  startButt.disabled = false;
  highscores();
}