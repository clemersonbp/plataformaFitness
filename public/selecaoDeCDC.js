import { changeHeaderStyle, logout } from './index.js';

const userData = JSON.parse(sessionStorage.getItem('userData'))
const proData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'))
let selectedPlan = ''
let hiredPlan = ''
let hiredPlanValue = ''

$(document).ready(function () {
  loadInfo()
  changeHeaderStyle()
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

  var installments = {}

  let installmentsTwo = $('#two-times').val()
  let installmentsThree = $('#three-times').val()

  function taxesCalculation(hiredPlanValue, times) {
    if (times == 2) {
      installments = {
        planValue: hiredPlanValue * 1.05,
        installmentsValue: (hiredPlanValue * 1.05) / times
      }
      return installments
    } else if (times == 3) {
      installments = {
        planValue: hiredPlanValue * 1.1,
        installmentsValue: (hiredPlanValue * 1.1) / times
      }
      return installments
    }
  }

  $('#one-time').text('1x R$ ' + parseFloat(hiredPlanValue).toFixed(2))
  $('#two-times').text('2x R$ ' + parseFloat(taxesCalculation(hiredPlanValue, installmentsTwo).installmentsValue).toFixed(2) + ' = R$ ' + parseFloat(taxesCalculation(hiredPlanValue, 2).planValue).toFixed(2))
  $('#three-times').text('3x R$ ' + parseFloat(taxesCalculation(hiredPlanValue, installmentsThree).installmentsValue).toFixed(2) + ' = R$ ' + parseFloat(taxesCalculation(hiredPlanValue, 3).planValue).toFixed(2))
}

let cdcNumber = document.querySelector('#credit-card-number')
let validCdcNumber = false
let cdcExpDate = document.querySelector('#credit-card-name')
let validCdcExpDate = false
let cdcCpf = document.querySelector('#exp-date')
let validCdcCpf = false
let cdcCvv = document.querySelector('#credit-card-cvv-number')
let validCdcCvv = false
let cdcName = document.querySelector('#credit-card-owner-cpf')
let validCdcName = false
let cdcInstallments = document.querySelector('#installments')
let validCdcInstallments = false

cdcNumber.addEventListener('keyup', () => {
  cdcNumber.value ? validCdcNumber = true : validCdcNumber = false
})
cdcExpDate.addEventListener('keyup', () => {
  cdcExpDate.value ? validCdcExpDate = true : validCdcExpDate = false
})
cdcCpf.addEventListener('keyup', () => {
  cdcCpf.value ? validCdcCpf = true : validCdcCpf = false
})
cdcCvv.addEventListener('keyup', () => {
  cdcCvv.value ? validCdcCvv = true : validCdcCvv = false
})
cdcName.addEventListener('keyup', () => {
  cdcName.value ? validCdcName = true : validCdcName = false
})
cdcInstallments.addEventListener('change', () => {
  cdcInstallments.value ? validCdcInstallments = true : validCdcInstallments = false

  if (validCdcNumber && validCdcExpDate && validCdcCpf && validCdcCvv && validCdcName && validCdcInstallments) {
    $('#cdc-proceed-payment').prop('disabled', false)
  }
})
function proceed() {
  $('#cdc-proceed-payment').click(function() {
  
    cdcNumber = $('#credit-card-number').val()
    cdcName = $('#credit-card-name').val()
    cdcExpDate = $('#exp-date').val()
    cdcCvv = $('#credit-card-cvv-number').val()
    cdcCpf = $('#credit-card-owner-cpf').val()
    cdcInstallments = $('#installments').val()
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
    '...' + '<br><br>' +
    'DADOS PARA PAGAMENTO: '  + '<br>' + 
    'Número do cartão: ' + cdcNumber  + '<br>' + 
    'Nome impresso no cartão: ' + cdcName + '<br>' + 
    'Data de vencimento do cartão: ' + cdcExpDate  + '<br>' + 
    'Código CVV: ' + cdcCvv + '<br>' + 
    'CPF do titular: ' + cdcCpf + '<br>' + 
    'Número de parcelas: ' + cdcInstallments
  
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