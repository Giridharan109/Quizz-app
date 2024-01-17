const questions = [

    {

        question: "Which is the longest ocean in the world",
        answers :[
            {text:"Altantic ocean", correct: false},
            {text:"pacific ocean", correct: true},
            {text:"Artic ocean", correct: false},
            {text:"Atlantic ocean", correct: false}
        ]
    },
    {

        question: "Which is the deepest ocean in the world",
        answers :[
            {text:"Altantic ocean", correct: false},
            {text:"pacific ocean", correct: true},
            {text:"Artic ocean", correct: false},
            {text:"Atlantic ocean", correct: false}
        ]
    },
    {

        question: "Which is the largest mammal in the world",
        answers :[
            {text:"Elephant", correct: false},
            {text:"Giraffee", correct: false},
            {text:"Sea Lion", correct: false},
            {text:"BlueWhale", correct: true}
        ]
    },
    {

        question: "Which is the Highest building in the world",
        answers :[
            {text:"BurgKhaliffa", correct: true},
            {text:"Twin towers", correct: false},
            {text:"Taj mahal", correct: false},
            {text:"Hut", correct: false}
        ]
    },
    {

        question: "Which is the largest Continent in the world",
        answers :[
            {text:" Antartica", correct: false},
            {text:"Australia", correct: false},
            {text:"Asia", correct: true},
            {text:"Africa", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }


    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();