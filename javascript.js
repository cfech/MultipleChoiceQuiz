//var be set from index.html elements
var timerEl = document.getElementById("time")
var startBtn = document.getElementById("start-btn")
var nextBtn = document.getElementById("next-btn")
var questionEl = document.getElementById("question")
var questionContainer = document.getElementById("question-container")
var answerEl = document.getElementById("answer-buttons")
var endingBox = document.getElementById("endingScreen")
var startingPage = document.getElementById("startingPage")
var submitBTN = document.getElementById("submitBtn")
var initialTxt = document.getElementById("myText")
var highScoreBox = document.getElementById("highScoreBox")
var highScoreList = document.getElementById("highScoreList");
var highScores = ["Learn HTML", "Learn CSS", "Learn JavaScript"];
let shuffledQ, currentQindex;
var score = 0;
var timeLeft



console.log(highScores)
// tring to render li on score list 
function renderScore() {

  highScoreList.innerHTML = "";


  // Render a new li for each highscore
  for (var i = 0; i < highScores.length; i++) {
    var highScores = highScores[i];


    var li = document.createElement("li");
    li.textContent = highScores;
    todoList.appendChild(li);
  }
}






//countdown from 60 seconds, when gets to 0 clear the interval 
function countdown() {
  var timeLeft = 60;
  var timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;
    // console.log(timeLeft)
    if (shuffledQ.length < currentQindex) { //trying to pause timer 
      timerEl.textContent = "";
      clearInterval(timeInterval);
    }

  }, 1000);

}

// if (timerEl === 0 ){
//   console.log("O time left")
// }


// function is being called but cant link timer text for some reason 

function resetTime() {
  timerEl.textContent = 0
  console.log("reset time works ")
}


//when start button is clicked countdown() and startGame() are run
startBtn.addEventListener("click", function () {
  startGame()

}
)

// Start game hides the start button, shuffles our question index and shows our question container
function startGame() {
  console.log("started")
  startBtn.classList.add("hide")
  startingPage.classList.add("hide")
  shuffledQ = questions.sort(() => Math.random() - .5)
  currentQindex = 0
  questionContainer.classList.remove("hide")
  highScoreBox.classList.add("hide")
  countdown()
  nextQ()
  resetHome()
  resetTime()

}
//next q calls function resetQ and showQuestion, which shuffled our index of questions
function nextQ() {
  resetQ()
  showQuestion(shuffledQ[currentQindex])

}

// hides the en screen when game starting 
function resetHome() {
  endingBox.classList.add("hide")
}




// when show question is run, it appends the answer from our question array to each button on the page
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



// going to reset out question buttons so that only buttons with answers are displayed 
function resetQ() {
  // clearStatusClass(document.body)
  nextBtn.classList.add("hide")
  while (answerEl.firstChild) {
    answerEl.removeChild(
      answerEl.firstChild
    )
  }

}


//take the selected answer and check to see if it is correct
function selectAnswer(event) {
  var selectedBtn = event.target
  var correct = selectedBtn.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  //if there are questions left in the array show next
  if (shuffledQ.length > currentQindex + 1) {
    currentQindex++
    nextQ()
    
    //if there are no questions left in the array set the start button to a replay button 
  } else {
    startBtn.innerText = "replay"
    startBtn.classList.remove("hide")
    endingBox.classList.remove("hide")
    questionContainer.classList.add("hide")

    score = document.getElementById("time")//have tp add .value ?


// trying to put score value in local storage 
    console.log(score)
    localStorage.setItem("score", JSON.stringify(score))
  }

}



function setStatusClass(element, correct) {

  if (correct) {
    nextQ()
  }
 
}
// function to save score
function saveScore() {
  console.log("button works")
  localStorage.getItem("Initial")
  localStorage.getItem("score")

}
//submit button function
submitBTN.addEventListener("click", function () {

  localStorage.setItem("Initial", initialTxt)
  highScoreBox.classList.remove("hide")
  endingBox.classList.add("hide")
  saveScore()
  renderScore()
})






// array of questions 
const questions = [
  {
    question: "What is an Array?",
    answers: [
      { text: "Global object that contains a list of items", correct: true },
      { text: 'Local object that contains a list of items ', correct: false },
      { text: "Just a list of items", correct: false },
      { text: "Array who?", correct: false }
    ]
  },
  {
    question: "What is the correct syntax of a function?",
    answers: [
      { text: "Function (Name)", correct: false },
      { text: "Function name ()", correct: true },
      { text: "Name = function ()", correct: false },
      { text: "Function = name ()", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hypertext Markdown Language", correct: false },
      { text: "Hyper Text My Language", correct: true },
      { text: "I Don't Know", correct: false },
      { text: "Hypertext Markup Language", correct: false }
    ]
  },
  {
    question: "What is the HTML tag for the largest heading?",
    answers: [
      { text: "h1", correct: true },
      { text: 'h6', correct: false },
      { text: 'h3', correct: false },
      { text: 'h5', correct: false }
    ]
  },
  {
    question: "What does CSS stand for? ",
    answers: [
      { text: "Color Style Sheets", correct: false },
      { text: "Cascading Style Short", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Common Style Sheet", correct: false }
    ]
  }

]
