
$(document).ready(function () {
  var userScore = 50;
  var userRating = userScore + '%';
  $('#stella').css('--percent', userRating);

  var usersEvaluationsQtty = 50;
  var usersEvaluationsText = '';
  if (usersEvaluationsQtty === 1) {
    usersEvaluationsText = 'avaliação';
  } else {
    usersEvaluationsText = 'avaliações';
  }

  $('#evaluationQtty').html(usersEvaluationsQtty);
  $('#evaluationText').html(usersEvaluationsText);
});