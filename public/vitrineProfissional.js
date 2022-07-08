import { login, logoff, saveEditedProfile } from './firebase.js';

$('.header__links').hide();
$('.header__links-loggedIn').show();

function formataCPF(cpf) {
  // retira os caracteres indesejados
  cpf = cpf.replace(/[^\d]/g, '');

  // realiza a formatação
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

$(document).ready(function () {
  loadInfo();
});

function loadInfo() {
  const userData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'));
  console.log('ProData', userData);

  var fullName = userData.proName + ' ' + userData.sobrenome;
  var name = userData.nome;
  $('#clientName').text('Olá, ' + name);

  userData.cpf = formataCPF(userData.cpf);

  $('#user-title-nome').text(fullName);
  $('#user-title-email').text(userData.email);
  $('#user-cep').text(userData.cep);
  $('#user-address').text(userData.endereco);
  $('#user-number').text(userData.numeroResid);
  $('#user-city').text(userData.cidade);
  $('#user-neighborhood').text(userData.proDistrict);
  $('#user-state').text(userData.uf);
  $('#about').text(userData.aboutMe);
  $('#exp').text(userData.occupationArea);
  $('#mensal').text(userData.planoMensal);
  $('#trimestral').text(userData.planoTrimestral);
  $('#semestral').text(userData.planoSemestral)

  console.log(userData.telefone);
  const numero = userData.telefone
  const numeroString = 'https://wa.me/' + numero
  var linkWA = document.querySelector('.linkWA');
  linkWA.setAttribute('href', numeroString);
}

$('#sendMessage').click(function () {
  showModalProfile();
});

$('.close-btn').click(function () {
  hideModalProfile();
});

function showModalProfile() {
  $('.popup').addClass('active');
}

function hideModalProfile() {
  $('.popup').removeClass('active');
}

$('#hire-pro-services').click(function() {

  setTimeout(() => {
    window.location.href = './contratacaoServicos.html'
  }, 1000)

});