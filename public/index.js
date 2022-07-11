import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import {
  login,
  logoff,
  passwordRecovery,
  searchLocal,
  searchProfessionals,
} from "./firebase.js";

$(document).ready(function () {
  // only way that i got to work was putting the config in here, onAuthStateChanged works similar to an observable,
  // but calling the function on another file was returning always null, :(
  var config = {
    apiKey: "AIzaSyBHSpjnyCTnvrJXjDqvm1KrEGMay8fE_Cw",
    authDomain: "plataformafitness-6cfdf.firebaseapp.com",
    databaseURL: "https://plataformafitness-6cfdf-default-rtdb.firebaseio.com",
    projectId: "plataformafitness-6cfdf",
    storageBucket: "plataformafitness-6cfdf.appspot.com",
    messagingSenderId: "479104423229",
    appId: "1:479104423229:web:b31bbd3d56d72a9a962154",
  };

  const firebaseApp = initializeApp(config);
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // console.log(loggedIn);
      // console.log("loguei");
      sessionStorage.setItem("uid", JSON.stringify(uid));
      changeHeaderStyle();
    } else {
      // User is signed out
      // console.log("n loguei");
    }
  });
});

const uid = sessionStorage.getItem("uid");

// LOGOFF SYSTEM
export function logout() {
  document
    .querySelector("#btnSair")
    .addEventListener("click", function (event) {
      logoff();
    });
}
logout();

var isPasswordPopupActive = false;
var isLoginPopupActive = false;

// Exibir login-popup
export function showLoginPopup() {
  if (!uid) {
    var btnLogin = document.querySelector("#show-login");
    isLoginPopupActive = true
    btnLogin.addEventListener("click", function () {
      if (isPasswordPopupActive == false) {
        document.querySelector(".popup").classList.add("active");
      } else {
        document
          .querySelector(".popup.password-recovery")
          .classList.remove("active");
        isPasswordPopupActive = false;
      }
    });
  }
}
showLoginPopup();

// Esconder login-popup
export function hideLoginPopup() {
  document
    .querySelector(".popup .close-btn")
    .addEventListener("click", function () {
      document.querySelector("#email").value = "";
      document.querySelector("#password").value = "";
      document.querySelector(".popup").classList.remove("active");
      isLoginPopupActive = false
    });
}
hideLoginPopup();

// Esconder login-result-popup
export function hideLoginResultPopup() {
  if (!uid && isLoginPopupActive) {
    document
      .querySelector(".popup.login-result .close-btn")
      .addEventListener("click", function () {
        document
          .querySelector(".popup.login-result")
          .classList.remove("active");
        document.querySelector("#login-result-msg").innerHTML = "";
      });
  }
}
hideLoginResultPopup();

// Exibir password-recovery-popup
export function showPasswordRecoveryPopup() {
  if (!uid && isLoginPopupActive) {
    document
      .querySelector("#forgot-password")
      .addEventListener("click", function () {
        document.querySelector("#email").value = "";
        document.querySelector("#password").value = "";
        document.querySelector(".popup").classList.remove("active");
        document
          .querySelector(".popup.password-recovery")
          .classList.add("active");
        isPasswordPopupActive = true;
      });
  }
}
showPasswordRecoveryPopup();

// Esconder password-recovery-popup
export function hidePasswordRecoveryPopup() {
  if (!uid && isLoginPopupActive) {
    document
      .querySelector(".popup.password-recovery .close-btn")
      .addEventListener("click", function () {
        document.querySelector("#recovery-email").value = "";
        document
          .querySelector(".popup.password-recovery")
          .classList.remove("active");
        isPasswordPopupActive = false;
      });
  }
}
hidePasswordRecoveryPopup();

// Esconder password-recovery-result-popup
export function hidePasswordRecoveryResultPopup() {
  if (!uid && isLoginPopupActive) {
    document
      .querySelector(".popup.password-recovery-result .close-btn")
      .addEventListener("click", function () {
        document.querySelector("#recovery-result-msg").innerHTML = "";
        document
          .querySelector(".popup.password-recovery-result")
          .classList.remove("active");
      });
  }
}
hidePasswordRecoveryResultPopup();

// AUTHENTICATION SYSTEM
export function loginPopup() {
  if (!uid && isLoginPopupActive) {
    var btnEntrar = document.querySelector("#btnEntrar");
    // var spanUserInfo = document.querySelector("#userInfo");

    btnEntrar.addEventListener("click", function (event) {
      event.preventDefault();
      const formData = {
        email: document.querySelector("#email").value,
        senha: document.querySelector("#password").value,
      };
      // console.log(formData);
      login(formData);
    });
    isLoginPopupActive = false
  }
}
loginPopup();

// RESET PASSWORD
export function passwordReset() {
  if (!uid && !isLoginPopupActive) {
    var sendRecovery = document.querySelector("#btn-send-recovery");
    sendRecovery.addEventListener("click", function (event) {
      // event.preventDefault();
      const email = document.querySelector("#recovery-email").value;

      // console.log(email);
      passwordRecovery(email);
    });
  }
}
passwordReset();

export function changeHeaderStyle() {
  if (uid) {
    $(".header__links").hide();
    $(".header__links-loggedIn").show();
    $(".header__links-loggedIn").css("display", "flex");

    // GETS THE USER INFO

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    // console.log('userData', userData);
    var name = userData.nome;
    // var fullName = userData.nome + ' ' + userData.sobrenome;
    $("#clientName").text("Olá, " + name);
  }
}

$("#btnProfile").click(function () {
  setTimeout(() => {
    window.location.replace("perfilCliente.html");
  }, 500);
});

//SEARCH
//GET THE TIPE OF SERVICE, CHECK ON DB AND RETURN AVAILABLE CITIES TO SET THE OPTIONS AVAILABLE
////////////////////////////DEPRECATED//////////////////////////////////////////////
// setTimeout(() => {
//   $("#tipo")
//   .find("option")
//   .click(function () {
//     //Clear the session storage to get new cities
//     sessionStorage.removeItem("availableCities");
//     removeOptions();
//     var optionSelected = $(this);

//     var valueSelected = optionSelected.val();
//     var textSelected = optionSelected.text();
//     //sessionStorage.removeItem('availableCities');
//     searchLocal(valueSelected);

//     setTimeout(() => {
//       const cities = JSON.parse(sessionStorage.getItem("availableCities"));
//       setAvailableOptions(cities);
//     }, 500);
//   });
// },1000);

$('#tipo').on('change', function() {
  var value = $(this).val();

  //Clear the session storage to get new cities
  sessionStorage.removeItem("availableCities");
  removeOptions();
  
  //build the cities options
  searchLocal(value);

  setTimeout(() => {
    const cities = JSON.parse(sessionStorage.getItem("availableCities"));
    setAvailableOptions(cities);
  }, 1000);
});

$("#search").click(function () {
  var tipo = $("select[name=tipo] option").filter(":selected").val();
  var cidade = $("select[name=local] option").filter(":selected").val();
  console.log(tipo, cidade);

  searchProfessionals(tipo, cidade);
});

function setAvailableOptions(listCities) {
  listCities.forEach((city) => {
    $("#local").append(
      $("<option>", {
        value: city,
        text: city,
      })
    );
  });
}

function removeOptions() {
  //$("#local option").remove();
  $("#local").html('<option value="">Selecione</option>');
}