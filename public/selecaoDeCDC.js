const userData = JSON.parse(sessionStorage.getItem('userData'))
const proData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'))
var selectedPlan = ''
var hiredPlanValue = ''
const hiringData = []

$(document).ready(function () {
  loadInfo();
  // changeHeaderStyle();
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

$('#cdc-proceed-payment').click(function() {

  let paymentData = {
    cdcNumber: $('#credit-card-number').val(),
    cdcName: $('#credit-card-name').val(),
    cdcExpDate: $('#exp-date').val(),
    cdcCvv: $('#credit-card-cvv-number').val(),
    cdcCpf: $('#credit-card-owner-cpf').val(),
    cdcInstallments: $('#installments').val(),
    hiredPlan: selectedPlan,
    hiredPlanValue: hiredPlanValue
  }

  hiringData.push(proData)
  hiringData.push(userData)
  hiringData.push(paymentData)

  console.log('hiringData', hiringData);

  document.querySelector('.popup').classList.add('active');
});

document.querySelector('.popup .close-btn').addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('active');
});