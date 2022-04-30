import { login, logoff} from "./firebase.js"

var btnSair = document.querySelector("#btnSair");

btnSair.addEventListener("click", function (event){
  logoff();
})