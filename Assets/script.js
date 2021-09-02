var startEl = document.getElementById("submit")
var questionCardEl = document.getElementById("questions-card")
var nextEl = document.getElementById("next")
var questionsEl = document.getElementById("question")
var answerEl = document.getElementById("answer")
var answersEl = document.getElementById("answers")
var timerEl = document.getElementById("timer")

var questions = [{
    question: "What would you code to make sure something is working using dev-tools",
    options: [
    { text: "document.write", correct: false },
    { text: "console.log()", correct: true },
    { text: "function()", correct: false },
    { text: "<a href=", correct: false }]
},
{
    question: "Inside which HTML element do we put the JavaScript",
    options: [
    { text: "<js>", correct: false },
    { text: "<scriptinator>", correct: false },
    { text: "<div>", correct: false },
    { text: "<<script>>", correct: true }]
},
{
    question: "Where is the correct place to insert JavaScript in a HTML file?",
    options: [
    { text: "<head>", correct: true },
    { text: "<body>", correct: false },
    { text: "<div>", correct: false },
    { text: "<br>", correct: false }]
},
{
    question: "The external JavaScript file must contain the <script> tag.",
    options: [
    { text: "True", correct: false },
    { text: "False", correct: true }]
},
{
    question: "How do you create a function in JavaScript?",
    options: [
    { text: "fuction = functionName", correct: false },
    { text: "<function>", correct: false },
    { text: "function functionname()", correct: true },
    { text: "function===", correct: false }]
}
]

var currentQuestion = 0;
var timeCount = 30;

function startQuiz() {
    score = 0;
    startEl.classList.add("hide")
    questionCardEl.classList.remove("hide")
    var time = setInterval(function () {
        timerEl.textContent = "Time remaining: " + timeCount;
        timeCount--;

        if (timeCount <= 0) {
            clearInterval(time)
        }
    }, 1000);

    next()

}

function next() {
    reset();
    questionShow(questions[currentQuestion]);

}
function questionShow(question) {
    questionsEl.innerText = question.question
    question.options.forEach(options => {
        var button = document.createElement("button")
        button.innerText = options.text
        button.classList.add("answer")
        if (options.correct) {
            button.dataset.correct = options.correct
        }
        button.addEventListener("click", answer)
        answersEl.appendChild(button)
    })

}
function reset() {
    nextEl.classList.add("hide");
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
}
function answer(e) {
    var selected = e.target;
    var correct = selected.dataset.correct
    Array.from(answersEl.children).forEach(button => {
        right(button, button.dataset.correct)
    })
    if (questions.length > currentQuestion + 1) {
        nextEl.classList.remove("hide")
    }
  
    else {

        questionsEl.innerText = "Congrats you've finished! Your score is " + timeCount + "."
        saveScore();
        timeCount = 0;
        
    }


}

function right(correct) {
    if(correct){
        timeCount += 20;}
}

function saveScore() {
    localStorage.setItem("score", JSON.stringify(timeCount))
}



nextEl.addEventListener("click", () => {
    currentQuestion++;
    next()
})
startEl.addEventListener("click", startQuiz)