//IMPORT FUNCTIONS FROM FIREBASE/DATABASE FILE.
import { createClient } from "./firebase.js"

let nome = document.querySelector('#nome')
let validNome = false

let sobrenome = document.querySelector('#sobrenome')
let validSobrenome = false

let cpf = document.querySelector('#cpf')
let validCpf = false

let cnpj = document.querySelector('#cnpj')
let validCnpj = true

let telefone = document.querySelector('#telefone')
let validTelefone = false

let email = document.querySelector('#email')
let validEmail = false

let senha = document.querySelector('#senha')
let validSenha = false

let whatsapp = document.querySelector('#whatsapp')
let validWhatsapp = false

let telegram = document.querySelector('#telegram')
let validTelegram = false

let instagram = document.querySelector('#instagram')
let validInstagram = false

let facebook = document.querySelector('#facebook')
let validFacebook = false

let twitter = document.querySelector('#twitter')
let validTwitter = false

let instFinanceira = document.querySelector('#instFinanceira')
let validInstFinanceira = false

let agencia = document.querySelector('#agencia')
let validAgencia = false

let conta = document.querySelector('#conta')
let validConta = false

let pix = document.querySelector('#pix')
let validPix = true

let endereco = document.querySelector('#endereco')
let validEndereco = false

let numeroResi = document.querySelector('#numeroResi')
let validNumeroResi = false

let cep = document.querySelector('#cep')
let validCep = false

let complemento = document.querySelector('#complemento')
let validComplemento = false

let bairro = document.querySelector('#bairro')
let validBairro = false

let cidade = document.querySelector('#cidade')
let validCidade = false

let uf = document.querySelector('#uf')
let validUf = false

// let msgError = document.querySelector('#msgError')
// let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
  if (nome.value) {
    validNome = true
  }
})
sobrenome.addEventListener('keyup', () => {
  if (sobrenome.value) {
    validSobrenome = true
  }
})
cpf.addEventListener('keyup', () => {
  if (cpf.value) {
    validCpf = true
  }
})

telefone.addEventListener('keyup', () => {
  if (telefone.value) {
    validTelefone = true
  }
})
email.addEventListener('keyup', () => {
  if (email.value) {
    validEmail = true
  }
})
senha.addEventListener('keyup', () => {
  if (senha.value) {
    validSenha = true
  }
})
instFinanceira.addEventListener('keyup', () => {
  if (instFinanceira.value) {
    validInstFinanceira = true
  }
})
agencia.addEventListener('keyup', () => {
  if (agencia.value) {
    validAgencia = true
  }
})
conta.addEventListener('keyup', () => {
  if (conta.value) {
    validConta = true
  }
})
pix.addEventListener('keyup', () => {
  if (pix.value) {
    validPix = true
  }
})
endereco.addEventListener('keyup', () => {
  if (endereco.value) {
    validEndereco = true
  }
})
numeroResi.addEventListener('keyup', () => {
  if (numeroResi.value) {
    validNumeroResi = true
  }
})
cep.addEventListener('keyup', () => {
  if (cep.value) {
    validCep = true
  }
})
bairro.addEventListener('keyup', () => {
  if (bairro.value) {
    validBairro = true
  }
})
cidade.addEventListener('keyup', () => {
  if (cidade.value) {
    validCidade = true
  }
})
uf.addEventListener('keyup', () => {
  if (uf.value) {
    validUf = true
  }
})

var btnCadastrar = document.querySelector("#btnCadastrar");
btnCadastrar.addEventListener("click", function () {
  cadastrar();
});

function cadastrar() {
  let showRegisterPopup = document.querySelector('.popup.register').classList.add('active');
  let registerResultMsg = document.querySelector('#professional-register-popup-msg')

  if (validNome && validSobrenome && validCpf && validTelefone
    && validEmail && validSenha && validEndereco && validNumeroResi
    && validCep && validBairro && validCidade
    && validUf && validInstFinanceira && validAgencia && validConta && validPix) {


    //let listaUserProfissionalLocal = JSON.parse(localStorage.getItem('listaUserProfissionalLocal') || '[]')
    let listaUserProfissionalLocal = {}
    listaUserProfissionalLocal =
      {
        nomeCad: nome.value,
        sobrenomeCad: sobrenome.value,
        cpfCad: cpf.value,
        cnpjCad: cnpj.value,
        telefoneCad: telefone.value,
        emailCad: email.value,
        senhaCad: senha.value,
        whatsAppCad: whatsapp.value,
        telegramCad: telegram.value,
        instagramCad: instagram.value,
        facebookCad: facebook.value,
        twitterCad: twitter.value,
        instFinanceiraCad: instFinanceira.value,
        agenciaCad: agencia.value,
        contaCad: conta.value,
        pixCad: pix.value,
        enderecoCad: endereco.value,
        numeroResiCad: numeroResi.value,
        cepCad: cep.value,
        complementoCad: complemento.value,
        bairroCad: bairro.value,
        cidadeCad: cidade.value,
        ufCad: uf.value
      }
    
    localStorage.setItem('listaUserProfissionalLocal', JSON.stringify(listaUserProfissionalLocal))

    // let listaUserProfissional = {}

    // listaUserProfissional =
    // {
    //   nomeCad: nome.value,
    //   sobrenomeCad: sobrenome.value,
    //   cpfCad: cpf.value,
    //   cnpjCad: cnpj.value,
    //   telefoneCad: telefone.value,
    //   emailCad: email.value,
    //   senhaCad: senha.value,
    //   instFinanceiraCad: instFinanceira.value,
    //   agenciaCad: agencia.value,
    //   contaCad: conta.value,
    //   pixCad: pix.value,
    //   enderecoCad: endereco.value,
    //   numeroResiCad: numeroResi.value,
    //   cepCad: cep.value,
    //   complementoCad: senha.value,
    //   bairroCad: bairro.value,
    //   cidadeCad: cidade.value,
    //   ufCad: uf.value
    // };

    // console.log(listaUserProfissionalLocal)

    //CREATES DE DOCUMENT ON DATABASE TEST
    //CALL A SEPARATE CLASS ON THE FIREBASE JS BEFORE SENDING TO THE DB

    // createClient(listaUserProfissional);

    // msgSuccess.setAttribute('style', 'display: block')
    // msgSuccess.innerHTML = '<strong>Carregando...</strong>'
    // msgError.setAttribute('style', 'display: none')
    // msgError.innerHTML = ''

    showRegisterPopup;
    registerResultMsg.innerHTML = 'Aguarde...'

    setTimeout(() => {
      window.location.href = './modalidadeProfissional.html'
    }, 1000)


  } else {
    showRegisterPopup;
    registerResultMsg.innerHTML = 'Preencha todos os campos corretamente.'

    // Esconder register-popup
    document.querySelector('.popup.register .close-btn').addEventListener('click', function () {
      document.querySelector('.popup.register').classList.remove('active')
    });

    // msgError.setAttribute('style', 'display: block')
    // msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    // msgSuccess.innerHTML = ''
    // msgSuccess.setAttribute('style', 'display: none')
  }
}