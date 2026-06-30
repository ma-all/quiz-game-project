//constants
// const categoryArr = ['Information Systems', 'Software Engineering']
const questionsArr = { "CSS": [
    {q:"sys question 1", a: ["one", "Two", "three"], right: 1}, //i'll add the questions and answers later
    {q:"sys question 2", a: ["one", "Two", "three"], right: 1},
    {q:"sys question 3", a: ["one", "Two", "three"], right: 1},
    {q:"sys question 4", a: ["one", "Two", "three"], right: 1},
    {q:"sys question 5", a: ["one", "Two", "three"], right: 1},
],
    "Javascript": [
    {q:"question 1", a: ["one", "two", "three"], right: 1},
    {q:"question 2", a: ["one", "two", "three"], right: 1},
    {q:"question 3", a: ["one", "two", "three"], right: 1},
    {q:"question 4", a: ["one", "two", "three"], right: 1},
    {q:"question 5", a: ["one", "two", "three"], right: 1},
]
}

//variables
let userChoice
let score = 0
let userCategory = ''
let questionNumber = 0

//cache elements
const questionText = document.querySelector('#question-text')
const questionsBox = document.querySelectorAll('#questionsBox') 
const questionNumScreen = document.querySelector('#question-number')
// const categoryOne = document.querySelector('#category-One')
// const categoryTwo = document.querySelector('#category-Two')
const categoriesBox = document.querySelector('.categoriesBox')
const restart = document.querySelector('#restart')
const answersBox = document.querySelector('.answersBox')
const answersBtn = document.querySelectorAll('.answersBox button')
const results = document.querySelector('#results')

//event listeners

questionNumScreen.textContent = ''
questionText.textContent = 'Select a Category'

answersBox.style.display = 'none'

categoriesBox.addEventListener('click', function(categorySelected) {
    //this stores users choice 
    // userChoice = categorySelected.target.id
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
    score = 0
    userCategory = ''
    questionNumber = 0
    questionNumScreen.textContent = ''
    questionText.textContent = 'Select a Category'
    categoriesBox.style.display = 'block'
    answersBox.style.display = 'none'
    results.textContent = 'Your Score is:  / 5'
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
        console.log(score)
        results.textContent = `Your Score is: ${score} / 5`
    }
    //go to the next question
    questionNumber++
    showQuestion()
}

function endQuiz() {
    questionNumScreen.textContent = ''
    answersBox.style.display = 'none'
    questionText.textContent = 'The Quiz is Done!'
    results.textContent = `Your Total Score is ${score} / 5`
}