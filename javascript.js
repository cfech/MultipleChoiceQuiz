//var be set from index.html elements
var timerEl = document.getElementById("time");
//Buttons
var startBtn = document.getElementById("start-btn");
var nextBtn = document.getElementById("next-btn");
var answerEl = document.getElementById("answer-buttons");
var submitBTN = document.getElementById("submitBtn");
//Different Screens
var startingPage = document.getElementById("startingPage");
var questionContainer = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var endingBox = document.getElementById("endingScreen");
//Scoring elements
var initialTxt = document.getElementById("myText");
var highScoreList = document.getElementById("highScoreList");
var highScores = ["Congrats Your score is:"];
var scoreSpan = document.getElementById("scoreSpan");
//Answer check span 
var answerCheck = document.getElementById("answerCheck")
//Declared Variables 
let shuffledQ, currentQindex;
var scores
var timeLeft
var timeInterval
var answers
var scoresArray = []

//Time function, countdown from 60 seconds, when gets to 0 clear the interval 
function countdown() {
  timeLeft = 60;
  timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;

    //If there are not questions left, clear timer interval
    if (shuffledQ.length < currentQindex) {
      timerEl.textContent = "";
      clearInterval(timeInterval);
    }

    //If timer hits 0 end the game
    if (timeLeft === 0) {
      clearInterval(timeInterval)
      timerEl.textContent = timeLeft;
      questionContainer.classList.add("hide")
      endingBox.classList.remove("hide")
    }
  }, 1000);
}

// Resets the timer to 0
function resetTime() {
  timerEl.textContent = 0
}

//when start button is clicked  startGame() is run
startBtn.addEventListener("click", function () {
  startGame()
}
)

// Start game hides the start button, shuffles question index and shows our question container, displays starting page, and calls countdown, nextQ resetHome nad resetTime functions 
function startGame() {
  startBtn.classList.add("hide")
  startingPage.classList.add("hide")
  shuffledQ = questions.sort(() => Math.random() - .5)
  currentQindex = 0
  questionContainer.classList.remove("hide")
  countdown()
  nextQ()
  resetHome()
  resetTime()
}
//NextQ calls function resetQ and showQuestion, which shuffles our question index
function nextQ() {
  resetQ()
  showQuestion(shuffledQ[currentQindex])
}

// Hides the ending screen when game starts
function resetHome() {
  endingBox.classList.add("hide")
}

// When show question is run, it displays our question on page, creates an answer button for each answer and appends the button to the page.
function showQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerEl.appendChild(button)
  });
}

//Take the selected answer and check to see if it is correct
function selectAnswer(event) {
  var selectedBtn = event.target
  var correct = selectedBtn.dataset.correct
  //If not correct, deduct 10 from timer/score
  if (!correct) {
    timeLeft = timeLeft - 10
    //Print incorrect if question is wrong
    answerCheck.textContent = "Incorrect"
    // Print correct when question is answered correct 
  } else {
    answerCheck.textContent = "Correct"
  }

  //If there are questions left in the array show next question
  if (shuffledQ.length > currentQindex + 1) {
    currentQindex++
    nextQ()

    //if there are no questions left in the array set the start button text content to 'replay', and hide the question container and show the ending box and newly named 'replay button'
  } else {
    startBtn.innerText = "replay"
    startBtn.classList.remove("hide")
    endingBox.classList.remove("hide")
    questionContainer.classList.add("hide")

    // Clearing the time interval when game is over 
    clearInterval(timeInterval);

    //setting score span text content to the score1
    score1 = document.getElementById("time").textContent
    scoreSpan.textContent = score1
  }
}

// going show whether answer correct or incorrect in answercheck div
function resetQ() {
  setTimeout(function () {
    answerCheck.textContent = ""
  }, 300);
  //will reset buttons
  nextBtn.classList.add("hide")
  while (answerEl.firstChild) {
    answerEl.removeChild(
      answerEl.firstChild
    )
  }
}

//When submit button is clicked scores array is set to the the current scores array in local storage, 
//initials are set to the txt value of the initials box
//scores is set the txt content of time, 
//both the initials and scores are pushed to the scores array, 
//scoresArray is set to scoresArray in local storage
//The location is changed to highscores.html
submitBTN.addEventListener("click", function(event) {
  event.preventDefault();
  scoresArray = JSON.parse(localStorage.getItem("scoresArray"))
  initials = initialTxt.value
  scores = document.getElementById("time").textContent
  scoresArray.push({
    score: scores,
    initials: initials,
  })
  localStorage.setItem("scoresArray", JSON.stringify(scoresArray))
  location.href = 'highscores.html';
})

// Array of questions and answers 
const questions = [
  {
    question: "What is an Array?",
    answers: [
      { text: "A: Global object that contains a list of items", correct: true },
      { text: 'B: Local object that contains a list of items ', correct: false },
      { text: "C: Just a list of items", correct: false },
      { text: "D: Array who?", correct: false }
    ]
  },
  {
    question: "What is the correct syntax of a function?",
    answers: [
      { text: "A: Function (Name)", correct: false },
      { text: "B: Function name ()", correct: true },
      { text: "C: Name = function ()", correct: false },
      { text: "D: Function = name ()", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "A: Hypertext Markdown Language", correct: false },
      { text: "B: Hyper Text My Language", correct: false },
      { text: "C: I Don't Know", correct: false },
      { text: "D: Hypertext Markup Language", correct: true }
    ]
  },
  {
    question: "What is the HTML tag for the largest heading?",
    answers: [
      { text: "A: H1", correct: true },
      { text: 'B: H6', correct: false },
      { text: 'C: H3', correct: false },
      { text: 'D: H5', correct: false }
    ]
  },
  {
    question: "What does CSS stand for? ",
    answers: [
      { text: "A: Color Style Sheets", correct: false },
      { text: "B: Cascading Style Short", correct: false },
      { text: "C: Cascading Style Sheets", correct: true },
      { text: "D: Common Style Sheet", correct: false }
    ]
  }
]
