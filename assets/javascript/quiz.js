var questions = [{
  question: "What was the highest grossing movie of that decade?",
  choices: [
    'Harry Potter and the Half-Blood Prince ',
    'The Dark Knight',
    'The Lord of the Rings: The Return of the King',
    'Avatar'
  ],
  correctAnswer: '3'
},{
  question: 'Which year was the first iPod released?',
  choices: [
    '2001',
    '2005',
    '2000',
    '2007',
  ],
  correctAnswer: '0'
},{
  question: 'Which Pixar film was the last of the decade?',
  choices: [
    'Ratatouille',
    'Toy Story 3',
    'WALL-E',
    'Up',
  ],
  correctAnswer: '3'
},{
  question: 'Which of these consoles wasn\'t released in the 2000s?',
  choices: [
    'Nintendo Wii',
    'Sony PlayStation 3',
    'Sega Dreamcast',
    'Nintendo GameCube'
  ],
  correctAnswer: '2'
},{
  question: 'Who was your first friend on MySpace?',
  choices: [
    'Tom',
    'John',
    'Mark',
    'Daniel',
  ],
  correctAnswer: '0'
},{
  question: 'Finish the lyric: "Because when the sun shine, we shine together. Told you I\'ll be here..."',
  choices: [
    '\'til the end',
    'whenever',
    'forever',
    'with ya',
  ],
  correctAnswer: '2'
},{
  question: 'Ashton Kutcher was the host of what TV show?',
  choices: [
    'MTV\'s the 70s House',
    'Dismissed',
    'That 70s Show',
    'Punk\'d'
  ],
  correctAnswer: '3'
},{
  question: 'Which show does the couple Wanda and Cosmo appear in?',
  choices: [
    'Scooby-Doo',
    'The Fairly Oddparents',
    'Ozzy & Drix',
    'The Powerpuff Girls'
  ],
  correctAnswer: '1'
},{
  question: 'To get your music on a blank CD, you do what to it?',
  choices: [
    'Burn it',
    'Sync it',
    'Drag it over',
    'Copy it'
  ],
  correctAnswer: '0'
},{
  question: 'Which Beyoncé song went #1 in the first weeks of 2007?',
  choices: [
    'Crazy In Love',
    'Irreplaceable',
    'Single Ladies',
    'If I Were A Boy'
  ],
  correctAnswer: '1'
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

  var header = $('<h4 class="emphasis">Question ' + (index + 1) + ':</h4><br/>');
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
  var score = $('<h3>',{id: 'question'});

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
  let userLevel = (scorePercent >= 80) ? 'You\'re a <span class="emphasis">2000s Expert</span>!' : 
                  (scorePercent >= 60) ? 'You\'re a <span class="emphasis">Zillennial</span>!' :
                  (scorePercent >= 30) ? 'You\'re either a <span class="emphasis">Boomer</span> or <span class=="emphasis">Zoomer</span>.' : 'You\'re either a <span class="emphasis">Boomer</span> or <span class=="emphasis">Zoomer</span>.' ;

  score.append('You got ' + numCorrect + ' questions out of ' +
                questions.length + ' right!</h3><br/><span class="emphasis">That\'s a ' + 
                scorePercent + '%.</span>' + '<br/>' + userLevel);
  return score;
  }
})