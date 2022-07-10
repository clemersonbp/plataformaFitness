
// $(document).ready(function () {
//   var userScore = 50;
//   var userRating = userScore + '%';
//   $('#stella').css('--percent', userRating);

//   var usersEvaluationsQtty = 50;
//   var usersEvaluationsText = '';
//   if (usersEvaluationsQtty === 1) {
//     usersEvaluationsText = 'avaliação';
//   } else {
//     usersEvaluationsText = 'avaliações';
//   }

//   $('#evaluationQtty').html(usersEvaluationsQtty);
//   $('#evaluationText').html(usersEvaluationsText);
// });

// avaliação é recebida e o valor duplicado antes de entrar no BD
// avaliação é de 1 a 5
var searchResults;
$(document).ready(function(){
  var searchResults = JSON.parse(sessionStorage.getItem('availableProfessionals'));
  // console.log('searchResults', searchResults);
  fillPage(searchResults);
  $(".linkVitrine").find('span').click(function () {
    var nome = $(this).text()
    searchResults.forEach(professional => {
      profissionais = {};
      if (nome == professional.proName + ' ' + professional.sobrenome) {
        profissionais = professional;
        sessionStorage.setItem('profissionalSelecionado', JSON.stringify(profissionais));
      }
    })
    setTimeout(() => {
      window.location.href = './vitrineProfissional.html'
    }, 500)
  })

})

function fillPage(searchResults){
$('.search-results-value').html(searchResults.length);
// console.log(searchResults);
searchResults.forEach(professional => {

  // card e seus elementos
  var linkProfile = document.createElement('a')
  linkProfile.setAttribute('class', 'linkVitrine');

  var card = document.createElement('article');
  card.setAttribute('class', 'card');
  linkProfile.appendChild(card);

  // div card-pro-photo
  var cardProPhoto = document.createElement('div');
  cardProPhoto.setAttribute('class', 'card-pro-photo');
  card.appendChild(cardProPhoto);

  // section card-pro-data
  var cardProData = document.createElement('section');
  cardProData.setAttribute('class', 'card-pro-data');
  card.appendChild(cardProData);

  // section card-occupation-area
  var cardOccupationArea = document.createElement('section');
  cardOccupationArea.setAttribute('class', 'card-occupation-area');
  card.appendChild(cardOccupationArea);

  // SUBDIVISÕES

  // card-pro-data: 
  // h2 card-pro-data-name
  var cardProDataName = document.createElement('h2');
  cardProDataName.setAttribute('class', 'card-pro-data-name');
  cardProData.appendChild(cardProDataName);

  // h2 > span card-name
  var cardName = document.createElement('span');
  cardName.setAttribute('id', 'card-name');
    cardProDataName.appendChild(cardName);
  // cardName.innerHTML = professional.proName;

  // -------- div card-pro-data-evaluation - INÍCIO --------
  var cardProDataEvaluation = document.createElement('div');
  cardProDataEvaluation.setAttribute('class', 'card-pro-data-evaluation');
  cardProData.appendChild(cardProDataEvaluation);

  // div > div barra
  var barra = document.createElement('div');
  barra.setAttribute('class', 'barra');
  cardProDataEvaluation.appendChild(barra);
  // cardProDataEvaluation.appendChild(barra);

  // div barra > span bg
  // var bg = document.createElement('span');
  // bg.setAttribute('class', 'bg');
  // barra.appendChild(bg);

  // div barra > div estrelas
  // var estrelas = document.createElement('div');
  // estrelas.setAttribute('class', 'estrelas');
  // barra.appendChild(estrelas);

  // div barra > div estrelas > span star
  // var star = document.createElement('span');
  // star.setAttribute('class', 'star');
  // star.setAttribute('id', 'stella');
  // barra.appendChild(star);

  // div sem classe
  var div = document.createElement('div');
  cardProDataEvaluation.appendChild(div);

  // div span evaluationQtty
  var evaluationQtty = document.createElement('span');
  evaluationQtty.setAttribute('id', 'evaluationQtty');
  div.appendChild(evaluationQtty);

  // div span evaluationQtty
  var evaluationText = document.createElement('span');
  evaluationText.setAttribute('id', 'evaluationText');
  div.appendChild(evaluationText);
  // -------- div card-pro-data-evaluation - FIM --------

  // -------- div card-pro-data-min-value - INÍCIO --------
  var cardProDataMinValue = document.createElement('div');
  cardProDataMinValue.setAttribute('class', 'card-pro-data-min-value');
  cardProData.appendChild(cardProDataMinValue);
  cardProDataMinValue.innerHTML = 'A partir de R$ ';

  // div card-pro-data-min-value > span card-service-value
  var cardServiceValue = document.createElement('span');
  cardServiceValue.setAttribute('id', 'card-service-value');
  cardProDataMinValue.appendChild(cardServiceValue);

  // div card-pro-data-min-value > span /mês
  var cardServiceTime = document.createElement('span');
  cardProDataMinValue.appendChild(cardServiceTime);
  cardServiceTime.innerHTML = ' / mês';
  // -------- div card-pro-data-min-value - FIM --------

  // -------- div card-pro-data-address - INÍCIO --------
  var cardProDataAddress = document.createElement('div');
  cardProDataAddress.setAttribute('class', 'card-pro-data-address');
  cardProData.appendChild(cardProDataAddress);

  var cardDistrict = document.createElement('span');
  cardDistrict.setAttribute('id', 'card-district');
  cardProDataAddress.appendChild(cardDistrict);

  var cardCity = document.createElement('span');
  cardCity.setAttribute('id', 'card-city');
  cardProDataAddress.appendChild(cardCity);
  // -------- div card-pro-data-address - FIM --------

  // -------- section occupation-area-title - INÍCIO --------
  var cardOccupationArea = document.createElement('section');
  cardOccupationArea.setAttribute('class', 'card-occupation-area');
  card.appendChild(cardOccupationArea);

  // section occupation-area-title > h3 occupation-area-title
  var occupationAreaTitle = document.createElement('h3');
  occupationAreaTitle.setAttribute('class', 'occupation-area-title');
  cardOccupationArea.appendChild(occupationAreaTitle);
  occupationAreaTitle.innerHTML = 'Área de atuação:';

  // section occupation-area-title > p occupation-area-description
  var occupationAreaDescription = document.createElement('p');
  occupationAreaDescription.setAttribute('class', 'occupation-area-description');
  cardOccupationArea.appendChild(occupationAreaDescription);

  // section > p > span card-occupation-area
  var cardOccupationAreaSpan = document.createElement('span');
  cardOccupationAreaSpan.setAttribute('id', 'card-occupation-area');
  occupationAreaDescription.appendChild(cardOccupationAreaSpan);
  // -------- section occupation-area-title - FIM --------
  
  // var userScore = professional.evaluationTotal;
  var userScore = 5;
  
  // var usersEvaluationsQtty = professional.evaluationsQtty;
  var usersEvaluationsQtty = 1;
  
  var userRating = (userScore / usersEvaluationsQtty) * 10 + '%';

  $('#stella').css('--percent', userRating);

  var usersEvaluationsText = '';
  if(usersEvaluationsQtty != undefined){
    if (usersEvaluationsQtty === 1) {
      usersEvaluationsText = 'avaliação';
    } else {
      usersEvaluationsText = 'avaliações';
    }
  }else{
    usersEvaluationsText = '0 avaliações';
    usersEvaluationsQtty = ""
  }
  
  if(professional.proPhoto == undefined){
      cardProPhoto.setAttribute('class', 'card-pro-photo-default');
     
  }else{
      cardProPhoto.innerHTML = professional.proPhoto;  
  }
  
  cardName.innerHTML = professional.proName + " " + professional.sobrenome;
  // evaluationQtty.innerHTML = usersEvaluationsQtty;
  // evaluationText.innerHTML = usersEvaluationsText;
  cardServiceValue.innerHTML = professional.serviceValue;
  cardDistrict.innerHTML = professional.proDistrict + ', \n';
  cardCity.innerHTML = professional.proCity;
  cardOccupationAreaSpan.innerHTML = professional.occupationArea;

  $('main').append(linkProfile);
});
}
