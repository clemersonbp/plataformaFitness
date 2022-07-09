//IMPORT FUNCTIONS FROM FIREBASE/DATABASE FILE.
import { createProfessionalEsp } from "./firebase.js"

let cref = document.querySelector('#cref')
let validCref = false

let planoMensal = document.querySelector('#planoMensal')
let validPlanoMensal = false

let planoTrimestral = document.querySelector('#planoTrimestral')
let validPlanoTrimestral = false

let planoSemestral = document.querySelector('#planoSemestral')
let validPlanoSemestral = false

let sobreMim = document.querySelector('#sobreMim')
let validSobreMim = true

let experiencia = document.querySelector('#experiencia')
let validExperiencia = true

// let msgError = document.querySelector('#msgError')
// let msgSuccess = document.querySelector('#msgSuccess')

cref.addEventListener('keyup', () => {
  if (cref.value) {
    validCref = true
  }
})
planoMensal.addEventListener('keyup', () => {
  if (planoMensal.value) {
    validPlanoMensal = true
  }
})
planoTrimestral.addEventListener('keyup', () => {
  if (planoTrimestral.value) {
    validPlanoTrimestral = true
  }
})
planoSemestral.addEventListener('keyup', () => {
  if (planoSemestral.value) {
    validPlanoSemestral = true
  }
})
sobreMim.addEventListener('keyup', () => {
  if (sobreMim.value) {
    validSobreMim = true
  }
})
experiencia.addEventListener('keyup', () => {
  if (experiencia.value) {
    validExperiencia = true
  }
})

var btnCadastrar = document.querySelector("#btnCadastrar");
btnCadastrar.addEventListener("click", function () {
  cadastrar();
});

function cadastrar() {
  let showRegisterPopup = document.querySelector('.popup.register').classList.add('active');
  let registerResultMsg = document.querySelector('#coach-register-popup-msg')

  if (validCref && validPlanoMensal && validPlanoTrimestral && validPlanoSemestral
    && validSobreMim && validExperiencia) {

    let listaUserProfissional = JSON.parse(localStorage.getItem('listaUserProfissionalLocal'))
    // console.log(listaUserProfissional)
    
    Object.assign(listaUserProfissional, {
      crefCad: cref.value,
      servico: 'Elaboração de Treinos',
      planoMensalCad: planoMensal.value,
      planoTrimestralCad: planoTrimestral.value,
      planoSemestralCad: planoSemestral.value,
      sobreMimCad: sobreMim.value,
      experienciaCad: experiencia.value
    });

    //CREATES DE DOCUMENT ON DATABASE TEST
    //CALL A SEPARATE CLASS ON THE FIREBASE JS BEFORE SENDING TO THE DB
    createProfessionalEsp(listaUserProfissional);

    showRegisterPopup;
    registerResultMsg.innerHTML = 'Cadastro realizado!'

    setTimeout(() => {
      window.location.href = './index.html'
    }, 2000)


  } else {

    showRegisterPopup;
    registerResultMsg.innerHTML = 'Preencha todos os campos corretamente.'

    // Esconder register-popup
    document.querySelector('.popup.register .close-btn').addEventListener('click', function () {
      document.querySelector('.popup.register').classList.remove('active')
    });
  }
}