//IMPORT FUNCTIONS FROM FIREBASE/DATABASE FILE.
import { createProfessionalNut } from "./firebase.js"

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

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

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
  if (validCref && validPlanoMensal && validPlanoTrimestral && validPlanoSemestral
    && validSobreMim && validExperiencia) {

    let listaUserProfissional = JSON.parse(localStorage.getItem('listaUserProfissionalLocal'))
    console.log(listaUserProfissional)

    let listaUserProfissionalAdd = {}
    listaUserProfissionalAdd =
    {
      crefCad: cref.value,
      planoMensalCad: planoMensal.value,
      planoTrimestralCad: planoTrimestral.value,
      planoSemestralCad: planoSemestral.value,
      sobreMimCad: sobreMim.value,
      experienciaCad: experiencia.value
    }

    console.log(listaUserProfissionalAdd)

    var listaUserProfissionalNutriCadastro = Object.assign({}, listaUserProfissional, listaUserProfissionalAdd);

    console.log(listaUserProfissionalNutriCadastro)
    //CREATES DE DOCUMENT ON DATABASE TEST
    //CALL A SEPARATE CLASS ON THE FIREBASE JS BEFORE SENDING TO THE DB

    createProfessionalNut(listaUserProfissionalNutriCadastro);

    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando Profissional...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''

    setTimeout(() => {
      window.location.href = './index.html'
    }, 1000)


  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}