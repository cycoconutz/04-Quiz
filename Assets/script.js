var questionList = [{
  question:" Inside which HTML element do we put the JavaScript?",
  answers:["<javascript>", "script", "<js>", "scripting"],
  correct:"script"
  },
  {
  question: "Is JavaScript case-sensitive?",
  answers:["No", "Yes"],
  correct:"Yes"
  },
  {
  question:"3: Where is the correct place to insert a JavaScript?",
  answers:["The <head> section", "Both the <head> section and the <body> section are correct", "The <body> section"],
  correct:"Both the <head> section and the <body> section are correct"
  },
  {
  question:"4:What is the correct syntax for referring to an external script called \"xxx.js\"?",
  answers:["<script src=\"xxx.js\">", "<script name=\"xxx.js\"","<script href=\"xxx.js\""],
  correct:"<script src=\"xxx.js\">"
  },
  {
  question:"5:The external JavaScript file must contain the <script> tag.",
  answers:["True", "False"],
  correct:"True"
  }];
  
var timerElement = document.querySelector('#countdown');
var scoreboard = document.querySelector('#scoreboard');
var highscores = document.querySelector('#highscores');
var quizQ = document.querySelector('#quiz-question');
var quizA = document.querySelector('#quizAnswer');
var startButt = document.querySelector('#start-button');
var submitButt = document.querySelector('#submit');
var timerCount;
var timer;
// Start Button Begins Game
startButt.addEventListener("click", startGame);
// Adds time to clock and hides start button
function startGame(){
  timerCount = 120;
  startButt.setAttribute("class", "hidden")
  submitButt.setAttribute("class","show")
  nextQuestion(0);
  startTimer();
}
// Populates questions and answers onto sheet
function nextQuestion(questionNum){
  var currentQuestion = questionList[questionNum];
  quizQ.textContent = (questionNum) + '. ' + currentQuestion.question;
  var answersDOM = currentQuestion.answers.map((answer, answerIndex) => {
  var label = document.createElement("label");
  var input = document.createElement('input');
  label.htmlFor = "q" + answerIndex;
  label.textContent = answer; 
  input.id = "q" + answerIndex;
  input.type = "radio";
  input.name = "answer";
  input.value = answer;
  input.className = "answers";
  quizA.appendChild(label);
  quizA.appendChild(input);
  });
  quizA.onsubmit = (e) => {
  e.preventDefault();
    checkAnswer(currentQuestion, questionNum)};
}
// Checks user selected answer vs. "correct" answer
function checkAnswer(currentQuestion, questionNum){
  if ($('input.answers:checked').val() == currentQuestion.correct){
    nextQuestion(questionNum+1);
    } else{
        timerCount-10;
        nextQuestion();
    }
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

function highscores(){
 var initials = prompt("Enter your initials");
 initials.textContent=(initials + "--" + timerCount);
}