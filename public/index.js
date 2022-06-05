import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { login, logoff, passwordRecovery} from "./firebase.js"


  $( document ).ready(function() {
    //only way that i got to work was putting the config in here, onAuthStateChanged works similar to an observable,
    // but calling the function on another file was returning always null, :(
    var config = {
      apiKey: "AIzaSyBHSpjnyCTnvrJXjDqvm1KrEGMay8fE_Cw",
      authDomain: "plataformafitness-6cfdf.firebaseapp.com",
      databaseURL: "https://plataformafitness-6cfdf-default-rtdb.firebaseio.com",
      projectId: "plataformafitness-6cfdf",
      storageBucket: "plataformafitness-6cfdf.appspot.com",
      messagingSenderId: "479104423229",
      appId: "1:479104423229:web:b31bbd3d56d72a9a962154"
    };
    
    const firebaseApp = initializeApp(config);
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //console.log(loggedIn);
        console.log("loguei")
        //loggedIn = true
        sessionStorage.setItem('uid', JSON.stringify(uid))
        changeHeaderStyle();
      } else {
        // User is signed out
        console.log("n loguei")
        //loggedIn = false
      }
    });



  });

  


//LOGOFF SYSTEM
var btnSair = document.querySelector("#btnSair");

btnSair.addEventListener("click", function (event){
  logoff();
})

var isPasswordPopupActive = false;

// Exibir login-popup
document.querySelector('#show-login').addEventListener('click', function () {
  if (isPasswordPopupActive == false) {
    document.querySelector('.popup').classList.add('active');
  } else {
    document.querySelector('.popup.password-recovery').classList.remove('active');
    isPasswordPopupActive = false;
  }
});

// Esconder login-popup
document.querySelector('.popup .close-btn').addEventListener('click', function () {
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('.popup').classList.remove('active')
});

// // Esconder login-result-popup
document.querySelector('.popup.login-result .close-btn').addEventListener('click', function () {
  document.querySelector('.popup.login-result').classList.remove('active');
  document.querySelector('#login-result-msg').innerHTML = '';
});

// Exibir password-recovery-popup
document.querySelector('#forgot-password').addEventListener('click', function () {
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
  document.querySelector('.popup').classList.remove('active');
  document.querySelector('.popup.password-recovery').classList.add('active')
  isPasswordPopupActive = true;
});

// Esconder password-recovery-popup

document.querySelector('.popup.password-recovery .close-btn').addEventListener('click',function () {
  document.querySelector('#recovery-email').value = '';
  document.querySelector('.popup.password-recovery').classList.remove('active');
  isPasswordPopupActive = false;
});

// Esconder password-recovery-result-popup
document.querySelector('.popup.password-recovery-result .close-btn').addEventListener('click', function () {
  document.querySelector('#recovery-result-msg').innerHTML = '';
  document.querySelector('.popup.password-recovery-result').classList.remove('active')
});

//AUTHENTICATION SYSTEM

var btnEntrar = document.querySelector("#btnEntrar");
//var spanUserInfo = document.querySelector("#userInfo");

btnEntrar.addEventListener("click", function (event) {

  event.preventDefault();
  const formData = {
    email: document.querySelector("#email").value,
    senha: document.querySelector("#password").value,
  }
  // console.log(formData);
  login(formData);
});

//RESET PASSWORD

var sendRecovery = document.querySelector("#btn-send-recovery");

sendRecovery.addEventListener("click", function (event) {
  
  // event.preventDefault();
  const email = document.querySelector("#recovery-email").value;

  // console.log(email);
  passwordRecovery(email);
});


function changeHeaderStyle(){
  $(".header__links").hide();
  $(".header__links-loggedIn").show();

  console.log("entrei no changeHeaedr")

  //GETS THE USER INFO
  
  let userData = JSON.parse(sessionStorage.getItem('userData'));
  var fullName = userData.nome + " " + userData.sobrenome

  $("#clientName").text("Bem vindo " + fullName + ".");

}

$("#btnProfile").click(function() {
  setTimeout(() => {
    window.location.replace('perfilCliente.html');
  }, 500)
})