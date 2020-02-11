//Declared Variables
var highscoresList = document.getElementById("highscoresList")
var highScores = []
var newLi = document.createElement("li")
var score
var Initial


//Functions being run 
retrieveScore()
appendScores()

// retrieves score and intial from local storage and pushes it ot the highScores array
function retrieveScore() {
    score = JSON.parse(localStorage.getItem("score"))
    Initial = JSON.parse(localStorage.getItem("Initial"))
    highScores.push(Initial, score)
}

// appends initials and score to highscoreslist 
function appendScores() {
    // for (i = 0; i < highScores.length; i++) {
    newLi.textContent += Initial + " : " + score
    highscoresList.appendChild(newLi)

}

// trying to clear high scores list 
var clearBtn = document.getElementById("clearBtn")
clearBtn.addEventListener("click", function () {
    console.log("works")
    highScores = ''
})