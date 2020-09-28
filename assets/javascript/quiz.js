
function buildQuiz(){
    const output = [];
  
    // iteration for each question
    quizQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = [];
  
        for(letter in currentQuestion.answers){
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber+1}" value="${letter}" data-bind="checked: $root.userAnswer">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label><br>`
          );
        }
  
        output.push(
          `<div class="slide"><div class="question"> <h4>${currentQuestion.question}</h4> </div>
          <div class="answers"> ${answers.join('')} </div></div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
}

const quizQuestions = [
  new QuizObject ({
    question: "What is the correct way to write a JavaScript array?",
    answers: {
      a: 'arrayName = [item1, item2, item3]',
      b: 'var arrayName = item1, item2, item3',
      c: 'var arrayName = \"item1, item2, item3\"',
      d: 'var arrayName = [item1, item2, item3]'
    },
    correctAnswer: 'd'
  }),
  new QuizObject ({
    question: 'How does JavaScript store dates in a date object?',
    answers: {
      a: 'The number of milliseconds since January 1st, 1970.',
      b: 'The number of days since January 1st, 1900.',
      c: 'The number of seconds since Netscape\'s public stock offering.',
      d: 'None of the above.',
    },
    correctAnswer: 'a'
  }),
  new QuizObject ({
    question: 'How do you comment in JavaScript?',
    answers: {
      a: '&ltComment Here&gt',
      b: '&lt!--Comment Here--&gt',
      c: '/Comment Here/',
      d: '//Comment Here',
    },
    correctAnswer: 'd'
  }),
  new QuizObject ({
    question: 'How do you define a function in JavaScript?',
    answers: {
      a: 'Function myFunction() { //code here }',
      b: 'run myFunction { // code here }',
      c: 'function myFunction() { // code here }',
      d: 'Functions are defined in a separate file.',
    },
    correctAnswer: 'c'
  }),
  new QuizObject ({
    question: 'What is the expected output of: \n &ltscript type = \"text/javascript\"&gt \n x = 4 + \"4\";\ndocument.write(x);\n&lt/script&gt',
    answers: {
      a: '44',
      b: '8',
      c: '4',
      d: 'Error output.',
    },
    correctAnswer: 'a'
  }),
  new QuizObject ({
    question: 'What is the correct JavaScript syntax to write \"Hello World\"?',
    answers: {
      a: 'System.out.printIn(\"Hello World\")',
      b: 'printIn(\"Hello World\")',
      c: 'document.write(\"Hello World\")',
      d: 'response.write(\"Hello World\")',
    },
    correctAnswer: 'c'
  }),
  new QuizObject ({
    question: 'Where is the JavaScript placed inside an HTML document or page?',
    answers: {
      a: 'JavaScript cannot be placed inside an HTML document.',
      b: 'In the &ltbody&gt and &lthead&gt sections.',
      c: 'Only in the &lthead&gt section.',
      d: 'Only in the &ltbody&gt section.',
    },
    correctAnswer: 'd'
  }),
  new QuizObject ({
    question: 'What is meant by the \"this\" keyword in JavaScript?',
    answers: {
      a: 'It refers to the current object.',
      b: 'It refers to the previous object.',
      c: 'It is a variable which contains a value.',
      d: 'None of the above.',
    },
    correctAnswer: 'a'
  }),
  new QuizObject ({
    question: 'JavaScript is a case sensitive language.',
    answers: {
      a: 'True',
      b: 'False'
    },
    correctAnswer: 'a'
  }),
  new QuizObject ({
    question: 'Which group of array methods are used in JavaScript?',
    answers: {
      a: 'splice(), concat(), delete(), toString()',
      b: 'toString(), bubbleSort(), order(), quicksort()',
      c: '&ltarray&gt, &ltdeque&gt, &ltset&gt, &ltvector&gt',
      d: 'SELECT, BREACH, FROM, INSERT',
    },
    correctAnswer: 'a'
  })
]
  
  function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    var correctAnswer='';
    var resultsContainer = [];
  
    // iteration for each question
    quizQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber+1}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
        const scorePercent = Math.round(100 * numCorrect/quizQuestions.length)
        console.log(scorePercent);
      }
      else{
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
  }
  
function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}
function showNextSlide() {
  showSlide(currentSlide + 1);
}
function showPreviousSlide() {
  showSlide(currentSlide - 1);
}
  
// get elements from the dom
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
  
function QuizObject(question, answers, correctAnswer) {
    this.question = question,
    this.answers = answers,
    this.correctAnswer = correctAnswer
}
// array of questions

function SubmissionViewModel()  {
  var quiz = this;
  quiz.question = ko.observable("");
  quiz.answers = ko.observable("");
  quiz.correctAnswer = ko.observable("");

  quiz.questions = ko.observableArray(quizQuestions);

  this.submissions = function() {
    var answerUnwrapped = ko.unwrap(this.answers);  
    console.log(answerUnwrapped);
  };
};
ko.applyBindings(new SubmissionViewModel());
  
  buildQuiz();
  
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  
  // Show the first slide
  showSlide(currentSlide);
  
  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
