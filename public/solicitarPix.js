import { changeHeaderStyle, logout, hideLoginResultPopup } from './index.js';

const userData = JSON.parse(sessionStorage.getItem('userData'))
const proData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'))
var selectedPlan = ''
var hiredPlanValue = ''
const hiringData = []

$(document).ready(function () {
  loadInfo()
  changeHeaderStyle()
  hideLoginResultPopup() 
  logout()
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

$('#pix-proceed-payment').click(function() {  

  let paymentData = {
    hiredPlan: selectedPlan,
    hiredPlanValue: hiredPlanValue
  }

  hiringData.push(proData)
  hiringData.push(userData)
  hiringData.push(paymentData)

  console.log('hiringData', hiringData);

  document.querySelector('.popup').classList.add('active');
});