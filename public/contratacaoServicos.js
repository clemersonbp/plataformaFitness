$('#plano').val('selecione-seu-plano').change()
$('input[type="radio"]').prop('checked', false).change();
$('#proceed-hiring').prop('disabled', true)

$(document).ready(function () {
  loadInfo();
});

function loadInfo() {
  const proData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'));
  console.log('ProData', proData);

  var fullName = proData.proName + ' ' + proData.sobrenome;
  var name = proData.nome;
  $('#clientName').text('Olá, ' + name);
  
  $('#service-hiring-pro-name').text(fullName);
  $('#service-hiring-plan-one').text('Mensal'.padEnd(25, '.') + 'R$ ' + parseFloat(proData.planoMensal).toFixed(2));
  $('#service-hiring-plan-two').text('Trimestral'.padEnd(25, '.') + 'R$ ' + parseFloat(proData.planoTrimestral).toFixed(2));
  $('#service-hiring-plan-three').text('Semestral'.padEnd(25, '.') + 'R$ ' + parseFloat(proData.planoSemestral).toFixed(2))
}

var selectedPlan = 'selecione-seu-plano'
var paymentType = ''

$('#plano').change(function () {
  selectedPlan = this.value

  if (selectedPlan !== 'selecione-seu-plano' && paymentType !== '') {
    $('#proceed-hiring').prop('disabled', false)
  } else {
    $('#proceed-hiring').prop('disabled', true)
  }

  if (selectedPlan !== 'selecione-seu-plano') {
    sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
  }
});

$(".choose-payment-form :radio").change(function(){
  paymentType = this.value

  if (selectedPlan !== 'selecione-seu-plano' && paymentType !== '') {
    $('#proceed-hiring').prop('disabled', false)
  } else {
    $('#proceed-hiring').prop('disabled', true)
  }
});

const user = sessionStorage.getItem('uid');

$('#proceed-hiring').click(function() {
  if (user === null) {
    document.querySelector('.popup').classList.add('active');
    $('#plano').val('selecione-seu-plano').change()
    $('input[type="radio"]').prop('checked', false).change();
    paymentType = ''
  } else {
    if (paymentType === 'cdc') {
      window.location.href = './selecaoDeCDC.html'
    } else if (paymentType === 'boleto') {
      window.location.href = './solicitarBoleto.html'
    } else {
      window.location.href = './solicitarPix.html'
    }
    
    setTimeout(() => {
      window.location.href
    }, 1000)
  }
})

document.querySelector('.popup .close-btn').addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('active');
});