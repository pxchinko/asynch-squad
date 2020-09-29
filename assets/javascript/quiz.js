// array of questions
const quizQuestions = [{
  question: "What is the correct way to write a JavaScript array?",
  answers: [
    'arrayName = [item1, item2, item3]',
    'var arrayName = item1, item2, item3',
    'var arrayName = \"item1, item2, item3\"',
    'var arrayName = [item1, item2, item3]'
  ],
  correctAnswer: 'var arrayName = [item1, item2, item3]'
},{
  question: 'How does JavaScript store dates in a date object?',
  answers: [
    'The number of milliseconds since January 1st, 1970.',
    'The number of days since January 1st, 1900.',
    'The number of seconds since Netscape\'s public stock offering.',
    'None of the above.',
  ],
  correctAnswer: 'The number of milliseconds since January 1st, 1970.'
},{
  question: 'How do you comment in JavaScript?',
  answers: [
    '&ltComment Here&gt',
    '&lt!--Comment Here--&gt',
    '/Comment Here/',
    '//Comment Here',
  ],
  correctAnswer: '//Comment Here'
},{
  question: 'How do you define a function in JavaScript?',
  answers: [
    'Function myFunction() { //code here }',
    'run myFunction { // code here }',
    'function myFunction() { // code here }',
    'Functions are defined in a separate file.'
  ],
  correctAnswer: 'function myFunction() { // code here }'
},{
  question: 'What is the expected output of: \n &ltscript type = \"text/javascript\"&gt \n x = 4 + \"4\";\ndocument.write(x);\n&lt/script&gt',
  answers: [
    '44',
    '8',
    '4',
    'Error output.',
  ],
  correctAnswer: '44'
},{
  question: 'What is the correct JavaScript syntax to write \"Hello World\"?',
  answers: [
    'System.out.printIn(\"Hello World\")',
    'printIn(\"Hello World\")',
    'document.write(\"Hello World\")',
    'response.write(\"Hello World\")',
  ],
  correctAnswer: 'document.write(\"Hello World\")'
},{
  question: 'Where is the JavaScript placed inside an HTML document or page?',
  answers: [
    'JavaScript cannot be placed inside an HTML document.',
    'In the &ltbody&gt and &lthead&gt sections.',
    'Only in the &lthead&gt section.',
    'Only in the &ltbody&gt section.',
  ],
  correctAnswer: 'Only in the &ltbody&gt section.'
},{
  question: 'What is meant by the \"this\" keyword in JavaScript?',
  answers: [
    'It refers to the current object.',
    'It refers to the previous object.',
    'It is a variable which contains a value.',
    'None of the above.',
  ],
  correctAnswer: 'It refers to the current object.'
},{
  question: 'JavaScript is a case sensitive language.',
  answers: [
    'True',
    'False'
  ],
  correctAnswer: 'True'
},{
  question: 'Which group of array methods are used in JavaScript?',
  answers: [
    'splice(), concat(), delete(), toString()',
    'toString(), bubbleSort(), order(), quicksort()',
    '&ltarray&gt, &ltdeque&gt, &ltset&gt, &ltvector&gt',
    'SELECT, BREACH, FROM, INSERT',
  ],
  correctAnswer: 'splice(), concat(), delete(), toString()'
}];

function QuestionObject (question, answers, correctAnswer) {
  this.Question = question,
  this.Answers = answers,
  this.Correct = correctAnswer
}

function QuestionViewModel() {
  var self = this;
  self.question = ko.observable("");
  self.answers = ko.observable("");
  self.correctAnswer = ko.observable("")

  self.QuizQuestions = ko.observableArray(quizQuestions);

  self.questionCounter = 0;
  self.userAnswer = [];

  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < self.QuizQuestions.answers.length; i++) {
      item= $('<li>');
      input = '<input type="radio" name="answer" value=' + i + '/>';
      input += self.questions[index].self.answers[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  function chooseAnswer() {
    userAnswer[questionCounter] =
    +$('input[name="answer":checked').val();
  }
  function displayNext() {
    self.quiz.fadeOut(function() {
      $('#question').remove();
      
    if(self.questionCounter < self.question.length){
      self.nextQuestion = createQuestionElement(self.questionCounter);
      quiz.append(self.nextQuestion).fadeIn();
      if (!(isNaN(self.userAnswer[questionCounter]))) {
        $('input[value='+self.userAnswer[questionCounter]+']').prop('checked', true);
      }
    }
    }) 
  } 
  function displayScore() {
    self.score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < userAnswer.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    self.score.append('You got ' + numCorrect + ' questions out of ' +
                  self.questions.length + ' right!');
    return self.score * 10;
  }
  self.questionCounter = 0; //Tracks question number
  self.quiz = $('#quiz'); //Quiz div object

// Display initial question
self.quiz.displayNext();
  
// Click handler for the 'next' button
$('#next').on('click', function (e) {
  e.preventDefault();
  
  // Suspend click listener during fade animation
  if(quiz.is(':animated')) {        
    return false;
  }
  choose();
  
  // If no user selection, progress is stopped
  if (isNaN(selections[questionCounter])) {
    alert('Please make a selection!');
  } else {
    questionCounter++;
    displayNext();
  }
});

// Click handler for the 'prev' button
$('#prev').on('click', function (e) {
  e.preventDefault();
  
  if(quiz.is(':animated')) {
    return false;
  }
  choose();
  questionCounter--;
  displayNext();
});
    }

ko.applyBindings(new QuestionViewModel());
