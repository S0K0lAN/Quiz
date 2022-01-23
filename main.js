// All answers options
const 
        option1 = document.querySelector('.option1'),
        option2 = document.querySelector('.option2'),
        option3 = document.querySelector('.option3'),
        option4 = document.querySelector('.option4');


// All our options
const   optionElements = document.querySelectorAll('.option');

// Question 
const   question = document.getElementById('question');


const 
        numberOfQuestion = document.getElementById('number-of-question'),   // Number of question
        numberOfAllQuestions = document.getElementById('number-of-all-questions');  // Number of all questions

let 
        indexOfQuestion,   // Index of current question
        indexOfPage = 0;   // Index of page

const   answersTracker = document.getElementById('answers-tracker'); // tracker wrapper
const   btnNext = document.getElementById('btn-next');

let score = 0;  // final result of quiz

const   
        correctAnswer = document.getElementById('correct-answer'),   // number of right answers
        numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),   // number of all answers(in the modal window)
        btnTryAgain = document.getElementById('btn-try-again');


// data
const questions = 
[
    {
        question: 'Можно ли с помощью Javascript сделать игру?',
        options: [
            'Нет',
            'Да',
            'Неуверен',
            'Без сомнений',
        ],
        rightAnswer: 3
    },
    {
        question: 'Что такое Promise?',
        options: [
            'Соглашение с языком',
            'Обертка для колбэков',
            'Незнаю',
            'Обещание маме написать код',
        ],
        rightAnswer: 1
    },
    {
        question: 'Что такое колбэк',
        options: [
            'Протокол обратного вызова аббонента',
            'Скрипт для сайтов',
            'Функция как аргумент другой функции',
            'То, что ты кричишь, когда зовёшь на помощь',
        ],
        rightAnswer: 2
    }
];


numberOfAllQuestions.innerHTML = questions.length;
const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // question

    // answers
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // Setting up number of current page
    indexOfPage++; 
}


let completedAnswers = []  // array for alredy asked questions


const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // flag for right answers checking

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}


const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}


for(option of optionElements) {
    option.addEventListener('click', e => {
        checkAnswer(e);
    });
}


const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    });
}


// Deleting all classes from all answers
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
}


const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    });
}


const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}


const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('You should chose answer');
    } else {
        randomQuestion();
        enableOptions();
    }
}


const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});


window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});



