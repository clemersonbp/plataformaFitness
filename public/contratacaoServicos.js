$('#proceed-hiring').prop('disabled', true)

var paymentTypeSelected = ''

var paymentType = $(".choose-payment-form :radio");
paymentType.click(function(){
  // console.log(this.value);
  paymentTypeSelected = this.value
  $('#proceed-hiring').prop('disabled', false)
});

var isUserLoggedIn = { state: false };
$('#proceed-hiring').click(function() {
  console.log('"Continuar" clicado');
  console.log('isUserLoggedIn', isUserLoggedIn);
  
  if (paymentTypeSelected === 'cdc') {
    window.location.href = './selecaoDeCDC.html'
  } else if (paymentTypeSelected === 'boleto') {
    window.location.href = './solicitarBoleto.html'
  } else {
    window.location.href = './solicitarPix.html'
  }

  setTimeout(() => {
    window.location.href
  }, 1000)

  // if (isUserLoggedIn.state === true) {
  //   console.log('paymentTypeSelected', paymentTypeSelected);
    
  // } else {
  //   document.querySelector('.popup').classList.add('active');
  //   isUserLoggedIn.state = true;
  // }

});

// $('.proceed-payment').prop('disabled', true)

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
    // setTimeout(() => {
      //   window.location.href
      // }, 1000)
  });
  
  
