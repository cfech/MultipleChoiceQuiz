//Declared Variables
var highscoresList = document.getElementById("highscoresList")
var highScores = []
var newLi
var scores

//Functions being run 
retrieveScore()
appendScores()

// retrieves score and initials from local storage and pushes them ot the highScores array
function retrieveScore() {
    scores = JSON.parse( localStorage.getItem("scoresArray") )
    highScores.push(...scores)
}

// for every score in the highScores array create  new list item nd append it to the high sores list
function appendScores() {
    for (i = 0; i < highScores.length; i++) {
    newLi = document.createElement("li")
    newLi.textContent = highScores[i].initials+ ":" + highScores[i].score
    highscoresList.appendChild(newLi)
    }
}
// When the clear button is clicked set high scores array to empty and store the empty array in local storage
var clearBtn = document.getElementById("clearBtn")
clearBtn.addEventListener("click", function () {
    highScores = [];
    highscoresList.innerHTML = "";
    localStorage.setItem("scoresArray", JSON.stringify([]));
})