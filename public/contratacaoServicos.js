$('#proceed-hiring').prop('disabled', true)

$(document).ready(function () {
  loadInfo();
});

function loadInfo() {
  const userData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'));
  console.log('ProData', userData);

  var fullName = userData.proName + ' ' + userData.sobrenome;
  var name = userData.nome;
  $('#clientName').text('Olá, ' + name);
  
  $('#service-hiring-pro-name').text(fullName);
  $('#service-hiring-plan-one').text('Mensal'.padEnd(25, '.') + 'R$ ' + parseFloat(userData.planoMensal).toFixed(2));
  $('#service-hiring-plan-two').text('Trimestral'.padEnd(25, '.') + 'R$ ' + parseFloat(userData.planoTrimestral).toFixed(2));
  $('#service-hiring-plan-three').text('Semestral'.padEnd(25, '.') + 'R$ ' + parseFloat(userData.planoSemestral).toFixed(2))
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
console.log('user', user);

function isUserLoggedIn(user) {
  if (user === null) {
    document.querySelector('.popup').classList.add('active');
  }
}

function proceedToPayment() {
  if (paymentType === 'cdc') {
    window.location.href = './selecaoDeCDC.html'
  } else if (paymentType === 'boleto') {
    window.location.href = './solicitarBoleto.html'
  } else {
    window.location.href = './solicitarPix.html'
  }
}

$('#proceed-hiring').click(function() {
  if (user === null) {
    document.querySelector('.popup').classList.add('active');
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

$('#boleto-proceed-payment').click(function() {  

  var paymentData = {
    // falta pegar os dados do usuário
    cdcNumber: $('#credit-card-number').val(),
    cdcName: $('#credit-card-name').val(),
    cdcExpDate: $('#exp-date').val(),
    cdcCvv: $('#credit-card-cvv-number').val(),
    cdcCpf: $('#credit-card-owner-cpf').val(),
    cdcInstallments: $('#installments').val()
  }

  document.querySelector('.popup').classList.add('active');
  // setTimeout(() => {
    //   window.location.href
    // }, 1000)
});

$('#pix-proceed-payment').click(function() {  

  var paymentData = {
    // falta pegar os dados do usuário
    cdcNumber: $('#credit-card-number').val(),
    cdcName: $('#credit-card-name').val(),
    cdcExpDate: $('#exp-date').val(),
    cdcCvv: $('#credit-card-cvv-number').val(),
    cdcCpf: $('#credit-card-owner-cpf').val(),
    cdcInstallments: $('#installments').val()
  }

  document.querySelector('.popup').classList.add('active');
});
  
  
