import { login, logoff, passwordRecovery } from "./firebase.js"

// Exibir login-popup
document.querySelector('#show-login').addEventListener('click', function () {
  document.querySelector('.popup').classList.add('active')
})

// Esconder login-popup
document.querySelector('.popup .close-btn').addEventListener('click', function () {
  document.querySelector('.popup').classList.remove('active')
})

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

var forgotPassword = document.querySelector("#forgotPassword");
console.log('forgotPassword', forgotPassword);

forgotPassword.addEventListener("click", function (event) {

  event.preventDefault();
  // const email = {
  //   email: document.querySelector("#forgotPassword").value
  // }
  const email = 'andersonveeck@gmail.com';

  console.log(email);
  passwordRecovery(email);
});