import { login, logoff} from "./firebase.js"

var btnSair = document.querySelector("#btnSair");

btnSair.addEventListener("click", function (event){
  logoff();
})

let userData = JSON.parse(sessionStorage.getItem('userData'));
// console.log(userData);

document.getElementById('user-nome').innerHTML = userData.nome;
document.getElementById('user-sobrenome').innerHTML = userData.sobrenome;
document.getElementById('user-telefone').innerHTML = userData.telefone;
document.getElementById('user-email').innerHTML = userData.email;
document.getElementById('user-endereco').innerHTML = userData.endereco;
document.getElementById('user-numeroResi').innerHTML = userData.numeroResid;
document.getElementById('user-cep').innerHTML = userData.cep;
document.getElementById('user-complemento').innerHTML = userData.complemento;
document.getElementById('user-bairro').innerHTML = userData.bairro;
document.getElementById('user-cidade').innerHTML = userData.cidade;
document.getElementById('user-uf').innerHTML = userData.uf;