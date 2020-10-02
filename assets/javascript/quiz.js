function Question( data ) {
  var self = this;
  self.question = data.question;
  self.choices = ko.observableArray( [] );
  data.choices.forEach( function ( c ) {
      self.choices.push( c );
  } );
  self.answer = data.answer;
};
  
function QuizViewModel(index, config) {
  
  var self = this;
  this.index = index;
  this.text = config.text;
  this.answers = [];
  this.selectedAnswer = ko.observable();
  
  self.questionList = ko.observableArray( [] );

  this.currentQuestion = ko.computed(function () {
    return this.currentQuestionIndex() < this.questions().length ?
        this.questions()[this.currentQuestionIndex()] : null;
  }, this);
  
  // Load initial state from server, convert it to Question instances, then populate self.questions
  $.getJSON( "questions.json", function ( allData ) {
      var mappedQuestions = $.map( allData, function ( item ) {
          return new Question( item )
      } );
      self.questionList( mappedQuestions );
  } );
  
  self.currentQuestion = ko.observable(self.questionList()[0]);
  
  this.previousQuestion = function () {
      var index = self.questionList()[0].indexOf( self.currentQuestion );
      self.currentQuestion( self.questionList()[index - 1] );
  };
  
  this.nextQuestion = function () {
      var index = self.questionList().indexOf( self.currentQuestion );
      self.currentQuestion( self.questionList()[index + 1] );
  };

  $.each(config.questions, function (index, question) {
    self.questions.push(new QuestionViewModel(index + 1, question));
  });

  $.each(config.answers, function (index, answer) {
    // add an index to each answer, and add to our observable array
    answer.index = index + 1;
    self.answers.push(answer);

    // identify the correct answer
    if (answer.isCorrect) {
      self.correctAnswer = answer;
    }
  });

  this.nextQuestion = function () {
    self.currentQuestionIndex(self.currentQuestionIndex() + 1);
  
    if (self.currentQuestionIndex() >= self.questions().length) {
      var correctAnswers = $.grep(self.questions(), function (question) {
        return question.selectedAnswer().isCorrect;
      });
      self.results(new ResultsViewModel(self.questions().length, correctAnswers.length));
    }
  }
  
  };
  
  ko.applyBindings( new QuizViewModel() );

  var viewModel = new QuestionViewModel();
    viewModel.selectedAnswer(foo);