// Exibir login-popup
document.querySelector('#show-login').addEventListener('click', function () {
  document.querySelector('.popup').classList.add('active')
})

// Esconder login-popup
document.querySelector('.popup .close-btn').addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('active')
})