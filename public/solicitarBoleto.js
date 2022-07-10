import { changeHeaderStyle, logout, hideLoginResultPopup } from './index.js';

const userData = JSON.parse(sessionStorage.getItem('userData'))
const proData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'))
let selectedPlan = ''
let hiredPlan = ''
let hiredPlanValue = ''

$(document).ready(function () {
  loadInfo()
  changeHeaderStyle()
  hideLoginResultPopup() 
  logout()
  proceed()
});

function loadInfo() {
  var fullName = proData.proName + ' ' + proData.sobrenome; 
  $('.payment-pro-name').text(fullName);

  const importedSelectedPlan = sessionStorage.getItem('selectedPlan').replace(/['"]+/g, '');

  if (importedSelectedPlan == 'planoMensal') {
    selectedPlan = 'Plano Mensal'
  } else if (importedSelectedPlan == 'planoTrimestral') {
    selectedPlan = 'Plano Trimestral'
  } else if (importedSelectedPlan == 'planoSemestral') {
    selectedPlan = 'Plano Semestral'
  }

  for (const data in proData) {
    if (data == importedSelectedPlan) {
      if (Object.hasOwnProperty.call(proData, data)) {
        hiredPlanValue = proData[data];
        $('.payment-hired-plan-value').text(selectedPlan.padEnd(40, '.') + 'R$ ' + parseFloat(hiredPlanValue).toFixed(2))
      }
    }
  }
}

function proceed() {
  $('#boleto-proceed-payment').click(function() {
  
    hiredPlan = selectedPlan
    hiredPlanValue = hiredPlanValue

    let clientName = document.querySelector('#client-name')
    clientName.value = userData.nome + ' ' + userData.sobrenome
    let clientEmail = document.querySelector('#client-email')
    clientEmail.value = userData.email
    let clientPurchaseData = document.querySelector('#client-purchase-data')
    clientPurchaseData.innerHTML =
    'CONTRATANTE: ' + userData.nome + ' ' + userData.sobrenome + '<br>' + 
    'Serviço contratado: ' + hiredPlan + '<br>' + 
    'Valor do serviço: ' + hiredPlanValue + '<br>' +
    'CPF: ' + userData.cpf  + '<br>' + 
    '...' + '<br><br>' +
    'CONTRATADO: ' + proData.proName  + ' ' + proData.sobrenome + '<br>' + 
    'CPF: ' + proData.cpf  + '<br>' + 
    'e-mail: ' + proData.email  + '<br>' + 
    'Contato: ' + proData.telefone  + '<br><br>' + 
    '...'
  
    document.querySelector('#showConfirmPopup').classList.add('active');
    document.querySelector('#btnConfirmPurchase').addEventListener('click', function () {
      document.querySelector('#btnSubmitForm').click()

      setTimeout(() => {
        document.querySelector('#showConfirmPopup').classList.remove('active');
        document.querySelector('#purchaseConfirmationPopup').classList.add('active');
      }, 500)
    });
  });
}

document.querySelector('.popup .close-btn').addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('active');
});

$("#staticform").submit(function(event) {
  event.preventDefault();

  $.ajax({
    url: 'https://api.staticforms.xyz/submit',
    type: "POST",
    dataType: 'json',
    data: $("#staticform").serialize(),
    success: function(result) {
      console.log('SUCESSO!');
      setTimeout(() => {
        window.location.href = './index.html'
      }, 10000)
    },
    error: function(xhr, resp, text) {
      alert(xhr, resp, text);
    }
  })
});