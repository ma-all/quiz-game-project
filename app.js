//constants
const questionsArr = { "CSS": [
    {q:"What is CSS universal Selector?", a: ["*", "Body", "#"], right: 0}, 
    {q:"Styling sheets can be inserted in --- ways?", a: ["2", "3", "5"], right: 1},
    {q:"How do you write comments in CSS?", a: ["//", "<!---->", " /* */"], right: 2},
    {q:"Colors can be specified by using?", a: ["RGB", "HEX", "Both"], right: 2},
    {q:"Content can be placed vertically using display-flex: -----? ", a: ["column", "row", "column-reverse"], right: 0},
],
    "Javascript": [
    {q:"Which returns the first matching element?", a: ["console.log()", "document.querySelector()", "None"], right: 1},
    {q:"Javascript variables can be declared using?", a: ["let", "const", "Both"], right: 2},
    {q:"Consts can be reassigned?", a: ["Yes", "No", "Depends"], right: 1},
    {q:"Functions parameters and arguments are?", a: ["Distinct", "Similar", "Undefined"], right: 0},
    {q:"How can you extract a part of a string and return the extracted string?", a: ["string.split()", "string.replace()", "string.slice()"], right: 2},
]
}

//variables
let score = 0
let userCategory = ''
let questionNumber = 0

//cache elements
const questionText = document.querySelector('#question-text')
const questionsBox = document.querySelectorAll('#questionsBox') 
const questionNumScreen = document.querySelector('#question-number')
const categoriesBox = document.querySelector('.categoriesBox')
const restart = document.querySelector('#restart')
const answersBox = document.querySelector('.answersBox')
const answersBtn = document.querySelectorAll('.answersBox button')
const results = document.querySelector('#results')
const startQuizBtn = document.querySelector('#start-quiz')
const quizText = document.querySelector('#quiz-text')

//event listeners
questionNumScreen.style.display = 'none' 
answersBox.style.display = 'none'
categoriesBox.style.display = 'none'
results.style.display = 'none'
questionText.style.display = 'none'
restart.style.display = 'none'

startQuizBtn.addEventListener('click', function() {
    //hide ths start part and show the categories
    startQuizBtn.style.display = 'none'
    quizText.textContent = ''
    questionNumScreen.style.display = 'block' 
    categoriesBox.style.display = 'block'
    results.style.display = 'block'
    questionText.style.display = 'block'
    restart.style.display = 'block'
    answersBox.style.display = 'none'
    questionNumScreen.textContent = ''
    questionText.textContent = 'Select a Category:'
})

categoriesBox.addEventListener('click', function(categorySelected) {
    //check whichh category the user selected
    if(categorySelected.target.id === 'category-One') {
        userCategory = "CSS"
    } else if (categorySelected.target.id === 'category-Two') {
        userCategory = "Javascript"
    }
    //remove the categories and show the answers as well
    categoriesBox.style.display = 'none'
    answersBox.style.display = 'block'
    //goes to start quiz function 
    startQuiz()
})

answersBox.addEventListener('click', function(answer) {
    const userAnswer = answer.target.textContent
    checkAnswers(userAnswer)
})

restart.addEventListener('click', function() {
    //reset the scores, user category and go back to the first question
    score = 0
    userCategory = ''
    questionNumber = 0
    //remove the questions number, text, results,
    questionNumScreen.textContent = ''
    questionText.textContent = ''
    results.textContent = ''
    answersBox.style.display = 'none'
    categoriesBox.style.display = 'none'
    restart.style.display = 'none'
    //show start quiz 
    quizText.textContent = 'Start Quiz?'
    startQuizBtn.style.display = 'inline-block'
})

//functions
function startQuiz(){
    //selects the category the user chose and the question its supposed to show and the score 
    questionNumber = 0
    score = 0
    showQuestion()
}

function showQuestion() {
    //we have to retireve the questions array
    const currentCatQuestion = questionsArr[userCategory]
    //check if there's any more questions left or not, if not end the quiz
    if(!currentCatQuestion){
        return
    }
    if(questionNumber >= currentCatQuestion.length){
        return endQuiz()
    }
    //
    const currentQuestion = currentCatQuestion[questionNumber]
    //increase the number by one for every next questions
    questionNumScreen.textContent = `Question ${questionNumber+1}:`
    //get the questions from the current questions 
    questionText.textContent = currentQuestion.q
    //loop through 
    answersBtn.forEach((button, qIndex) => {
        if (currentQuestion.a[qIndex]) {
            button.textContent = currentQuestion.a[qIndex]
            button.style.display = 'inline-block'
        } 
    })
}

function checkAnswers(checkUserAnswer) {
    const currentCheckAnswers = questionsArr[userCategory]
    const currentAnswer = currentCheckAnswers[questionNumber]
    const rightAnswer = currentAnswer.a[currentAnswer.right]
    //check if the user selected thr right answer
    if(checkUserAnswer === rightAnswer) {
        score++
        results.textContent = `Your Score is : ${score} / 5`
    } else {
        results.textContent = `Your Score is : ${score} / 5`
    }
    //go to the next question
    questionNumber++
    showQuestion()
}

function endQuiz() {
    //remove the questions and answers
    questionNumScreen.textContent = ''
    answersBox.style.display = 'none'
    //show the score and play the sound
    questionText.textContent = 'Quiz is Done!'
    results.textContent = `Your Score is ${score} / 5`
    const sound = new Audio('./audio/sound.mp3')
    sound.play()
}