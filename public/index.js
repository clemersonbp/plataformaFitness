import { login, logoff, passwordRecovery } from "./firebase.js"

// Exibir login-popup
document.querySelector('#show-login').addEventListener('click', function () {
  document.querySelector('.popup').classList.add('active')
});

// document.querySelector('.popup.password-recovery .close-btn').addEventListener('click', hidePasswordRecovery);
// function hidePasswordRecovery() {
//     document.querySelector('.popup.password-recovery').classList.remove('active');
// }

// Esconder login-popup
document.querySelector('.popup .close-btn').addEventListener('click', function () {
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('.popup').classList.remove('active')
});

// Exibir password-recovery-popup
document.querySelector('#forgot-password').addEventListener('click', function () {
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('.popup').classList.remove('active');
  document.querySelector('.popup.password-recovery').classList.add('active')
});

// Esconder password-recovery-popup
function hidePasswordRecovery() {
  document.querySelector('#recovery-email').value = '';
  document.querySelector('.popup.password-recovery').classList.remove('active');
}

document.querySelector('.popup.password-recovery .close-btn').addEventListener('click', hidePasswordRecovery);


// document.querySelector('.popup.password-recovery .close-btn').addEventListener('click', function () {
//   document.querySelector('#recovery-email').value = '';
//   document.querySelector('.popup.password-recovery').classList.remove('active')
// });

//AUTHENTICATION SYSTEM

var btnEntrar = document.querySelector("#btnEntrar");
//var spanUserInfo = document.querySelector("#userInfo");

btnEntrar.addEventListener("click", function (event) {

  event.preventDefault();
  const formData = {
    email: document.querySelector("#email").value,
    senha: document.querySelector("#password").value,
  }
  console.log(formData);
  login(formData);
});

//RESET PASSWORD

var sendRecovery = document.querySelector("#btn-send-recovery");

sendRecovery.addEventListener("click", function (event) {
  
  // event.preventDefault();
  const email = document.querySelector("#recovery-email").value;

  console.log(email);
  // passwordRecovery(email);
  hidePasswordRecovery();
});