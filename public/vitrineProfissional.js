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
  const proData = JSON.parse(sessionStorage.getItem('profissionalSelecionado'));
  console.log('ProData', proData);

  var fullName = proData.proName + ' ' + proData.sobrenome;
  var name = proData.nome;
  $('#clientName').text('Olá, ' + name);

  proData.cpf = formataCPF(proData.cpf);

  $('#user-title-nome').text(fullName);
  $('#user-title-email').text(proData.email);
  $('#user-cref').text(proData.crefCadastrado);
  $('#user-cep').text(proData.cep);
  $('#user-address').text(proData.endereco);
  $('#user-number').text(proData.numeroResid);
  $('#user-city').text(proData.cidade);
  $('#user-neighborhood').text(proData.proDistrict);
  $('#user-state').text(proData.uf);
  $('#about').text(proData.aboutMe);
  $('#exp').text(proData.occupationArea);
  $('#mensal').text(parseFloat(proData.planoMensal).toFixed(2))
  $('#trimestral').text(parseFloat(proData.planoTrimestral).toFixed(2))
  $('#semestral').text(parseFloat(proData.planoSemestral).toFixed(2))

  if (proData.whatsApp !== (null || undefined)) {
    const proWhatsApp = 'https://wa.me/' + proData.whatsApp
    var linkWA = document.querySelector('.linkWA');
    linkWA.setAttribute('href', proWhatsApp);
  } else {
    var linkWA = document.querySelector('.linkWA');
    linkWA.setAttribute('disabled', true);
  }
  if (proData.telegram) {
    const proTelegram = 'https://t.me/' + proData.telegram
    var linkTelegram = document.querySelector('.linkTelegram');
    linkTelegram.setAttribute('href', proTelegram);
  } else {
    var linkTelegram = document.querySelector('.linkTelegram');
    linkTelegram.setAttribute('disabled', true);
  }
  if (proData.instagram) {
    const proInstagram = 'https://instagram.com/' + proData.instagram
    var linkInstagram = document.querySelector('.linkInstagram');
    linkInstagram.setAttribute('href', proInstagram);
  } else {
    var linkInstagram = document.querySelector('.linkInstagram');
    linkInstagram.setAttribute('disabled', true);
  }
  if (proData.facebook) {
    const proFacebook = 'https://facebook.com/' + proData.facebook
    var linkFacebook = document.querySelector('.linkFacebook');
    linkFacebook.setAttribute('href', proFacebook);
  } else {
    var linkFacebook = document.querySelector('.linkFacebook');
    linkFacebook.setAttribute('disabled', true);
  }
  if (proData.twitter) {
    const proTwitter = 'https://twitter.com/' + proData.twitter
    var linkTwitter = document.querySelector('.linkTwitter');
    linkTwitter.setAttribute('href', proTwitter);
  } else {
    var linkTwitter = document.querySelector('.linkTwitter');
    linkTwitter.setAttribute('disabled', true);
  }
  const proEmail = 'mailto:' + proData.email + '?subject=Plataforma%20Fitness&body=Olá!'
  var linkEmail = document.querySelector('.linkEmail');
  linkEmail.setAttribute('href', proEmail);
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