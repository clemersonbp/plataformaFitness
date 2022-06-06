import { login, logoff, saveEditedProfile } from './firebase.js';

$('.header__links').hide();
$('.header__links-loggedIn').show();

function formataCPF (cpf) {
  // retira os caracteres indesejados
  cpf = cpf.replace(/[^\d]/g, '');

  // realiza a formatação
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

$(document).ready(function () {
  loadInfo();
});
var btnSair = document.querySelector('#btnSair');

btnSair.addEventListener('click', function (event) {
  logoff();
});

// Esconder login-result-popup
// document.querySelector('.popup.logout-result .close-btn').addEventListener('click', function () {
//   document.querySelector('.popup.logout-result').classList.remove('active')
// });

function loadInfo () {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(userData);

  var fullName = userData.nome + ' ' + userData.sobrenome;
  var name = userData.nome;
  $('#clientName').text('Olá, ' + name);

  userData.cpf = formataCPF(userData.cpf);

  $('#user-title-nome').text(fullName);
  $('#user-title-email').text(userData.email);
  $('#user-nome').text(fullName);
  $('#user-email').text(userData.email);
  $('#user-cpf').text(userData.cpf);
  $('#user-fone').text(userData.telefone);
  $('#user-cep').text(userData.cep);
  $('#user-address').text(userData.endereco);
  $('#user-number').text(userData.numeroResid);
  $('#user-city').text(userData.cidade);
  $('#user-neighborhood').text(userData.bairro);
  $('#user-state').text(userData.uf);
}

$('#editProfile').click(function () {
  populateModalProfile();
  showModalProfile();
});

$('.close-btn').click(function () {
  // clearModalProfile()
  hideModalProfile();
});

$('#btnCancelar').click(function () {
  // clearModalProfile()
  hideModalProfile();
});

$('#btnSalvar').click(function () {
  let payload = {};
  const userUid = JSON.parse(sessionStorage.getItem('uid'));

  payload =
    {
      nome: nome.value,
      sobrenome: sobrenome.value,
      cpf: cpf.value,
      telefone: telefone.value,
      email: email.value,
      endereco: endereco.value,
      numeroResid: numero.value,
      cep: cep.value,
      complemento: complemento.value,
      bairro: bairro.value,
      cidade: cidade.value,
      uf: uf.value
    };

  saveEditedProfile(userUid, payload);
});

function showModalProfile () {
  $('.popup').addClass('active');
}

function hideModalProfile () {
  // clearModalProfile()
  $('.popup').removeClass('active');
}

function populateModalProfile () {
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  userData.cpf = formataCPF(userData.cpf);

  $('#nome').val(userData.nome);
  $('#sobrenome').val(userData.sobrenome);
  $('#email').val(userData.email);
  $('#cpf').val(userData.cpf);
  $('#telefone').val(userData.telefone);
  $('#cep').val(userData.cep);
  $('#endereco').val(userData.endereco);
  $('#numero').val(userData.numeroResid);
  $('#cidade').val(userData.cidade);
  $('#bairro').val(userData.bairro);
  $('#uf').val(userData.uf);
  $('#complemento').val(userData.complemento);
}
