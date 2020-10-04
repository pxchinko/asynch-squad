var questions = [{
  question: "What is the correct way to write a JavaScript array?",
  choices: [
    'arrayName = [item1, item2, item3]',
    'var arrayName = item1, item2, item3',
    'var arrayName = \"item1, item2, item3\"',
    'var arrayName = [item1, item2, item3]'
  ],
  correctAnswer: '3'
},{
  question: 'How does JavaScript store dates in a date object?',
  choices: [
    'The number of milliseconds since January 1st, 1970.',
    'The number of days since January 1st, 1900.',
    'The number of seconds since Netscape\'s public stock offering.',
    'None of the above.',
  ],
  correctAnswer: '0'
},{
  question: 'How do you comment in JavaScript?',
  choices: [
    '&ltComment Here&gt',
    '&lt!--Comment Here--&gt',
    '/Comment Here/',
    '//Comment Here',
  ],
  correctAnswer: '3'
},{
  question: 'How do you define a function in JavaScript?',
  choices: [
    'Function myFunction() { //code here }',
    'run myFunction { // code here }',
    'function myFunction() { // code here }',
    'Functions are defined in a separate file.'
  ],
  correctAnswer: '2'
},{
  question: 'What is the expected output of: \n &ltscript type = \"text/javascript\"&gt \n x = 4 + \"4\";\ndocument.write(x);\n&lt/script&gt',
  choices: [
    '44',
    '8',
    '4',
    'Error output.',
  ],
  correctAnswer: '0'
},{
  question: 'What is the correct JavaScript syntax to write \"Hello World\"?',
  choices: [
    'System.out.printIn(\"Hello World\")',
    'printIn(\"Hello World\")',
    'document.write(\"Hello World\")',
    'response.write(\"Hello World\")',
  ],
  correctAnswer: '2'
},{
  question: 'Where is the JavaScript placed inside an HTML document or page?',
  choices: [
    'JavaScript cannot be placed inside an HTML document.',
    'In the &ltbody&gt and &lthead&gt sections.',
    'Only in the &lthead&gt section.',
    'Only in the &ltbody&gt section.',
  ],
  correctAnswer: '3'
},{
  question: 'What is meant by the \"this\" keyword in JavaScript?',
  choices: [
    'It refers to the current object.',
    'It refers to the previous object.',
    'It is a variable which contains a value.',
    'None of the above.',
  ],
  correctAnswer: '0'
},{
  question: 'JavaScript is a case sensitive language.',
  choices: [
    'True',
    'False'
  ],
  correctAnswer: '0'
},{
  question: 'Which group of array methods are used in JavaScript?',
  choices: [
    'splice(), concat(), delete(), toString()',
    'toString(), bubbleSort(), order(), quicksort()',
    '&ltarray&gt, &ltdeque&gt, &ltset&gt, &ltvector&gt',
    'SELECT, BREACH, FROM, INSERT',
  ],
  correctAnswer: '0'
}];

$(document).ready(function(){
  var questionCounter = 0; // Tracks question number
  var selections = []; 
  var quiz = $('#quiz');

  displayNext();

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

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
  e.preventDefault();

  if(quiz.is(':animated')) {
    return false;
  }
  questionCounter = 0;
  selections = [];
  displayNext();
  $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
  $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
  $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
  var questionEl = $('<div>', {
    id: 'question'
  });

  var header = $('<h4>Question ' + (index + 1) + ':</h4>');
  questionEl.append(header);

  var question = $('<p>').append(questions[index].question);
  questionEl.append(question);

  var radioButtons = createRadios(index);
  questionEl.append(radioButtons);

  return questionEl;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
  var radioList = $('<ul>');
  var item;
  var input = '';
  for (var i = 0; i < questions[index].choices.length; i++) {
    item = $('<li>');
    input = '<input type="radio" name="answer" value=" ' + i + ' " />';
    input += '<label>' +questions[index].choices[i]+'</label>';
    item.append(input);
    radioList.append(item);
    console.log([questions[index].choices[i]])
  }
  return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
  selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  // Displays next requested element
  function displayNext() {
  quiz.fadeOut(function() {
    $('#question').remove();
    
    if(questionCounter < questions.length){
      var nextQuestion = createQuestionElement(questionCounter);
      quiz.append(nextQuestion).fadeIn();
      if (!(isNaN(selections[questionCounter]))) {
        $('input[name='+selections[questionCounter]+']').prop('checked', true);
      }
      
      // Controls display of 'prev' button
      if(questionCounter === 1){
        $('#prev').show();
      } else if(questionCounter === 0){
        
        $('#prev').hide();
        $('#next').show();
      }
    }else {
      var scoreElem = displayScore();
      quiz.append(scoreElem).fadeIn();
      $('#next').hide();
      $('#prev').hide();
      $('#start').show();
    }
  });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
  var score = $('<h4>',{id: 'question'});

  var numCorrect = 0;
  for (var i = 0; i < selections.length; i++) {
    var userAnswer = selections[i];
    var correct = questions[i].correctAnswer;
    console.log(questions[i].correctAnswer)
    console.log(userAnswer)
    if (userAnswer == correct) {
      numCorrect++;
    }
  }
  var scorePercent = Math.round(100* numCorrect/questions.length);
  let userLevel = (scorePercent >= 80) ? 'You\'re an Expert!' :
                  (scorePercent >= 60) ? 'You\'re a Novice! <br>Want to test your skills again?' :
                  (scorePercent >= 30) ? 'You\'re a Beginner. <br>Want to try again?' : 'You\'re a Beginner. <br>Want to try again?' ;

  score.append('You got ' + numCorrect + ' questions out of ' +
                questions.length + ' right! <br> That\'s a ' + 
                scorePercent + '%.' + '<br>' + userLevel);
  return score;
  }
})