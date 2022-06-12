// FIREBASE CDN IMPORT
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, setDoc, query, where, updateDoc } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHSpjnyCTnvrJXjDqvm1KrEGMay8fE_Cw',
  authDomain: 'plataformafitness-6cfdf.firebaseapp.com',
  databaseURL: 'https://plataformafitness-6cfdf-default-rtdb.firebaseio.com',
  projectId: 'plataformafitness-6cfdf',
  storageBucket: 'plataformafitness-6cfdf.appspot.com',
  messagingSenderId: '479104423229',
  appId: '1:479104423229:web:b31bbd3d56d72a9a962154'
};
// FIM IMPORT

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// path to clients collection on firebase
const clientsCollection = collection(db, 'clientes');

// path to clients collection on firebase
const profCollectionEsp = collection(db, 'profissionais A. Esportiva');

// path to clients collection on firebase
const profCollectionNut = collection(db, 'profissionais A. Nutricional');

// MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createClient (clientData) {
  // addNewDocument(clientData, clientsCollection);

  createUserWithEmailAndPassword(auth, clientData.emailCad , clientData.senhaCad)
    .then(data => {
      // referencia ao novo id criado
      const uid = data.user.uid;

      // referencia a coleção passando o novo id a ser adicionado
      const newUserDocument = doc(clientsCollection, uid);

      // funcaao que cria o novo usuário + id na coleção passada
      writeDocument(newUserDocument, clientData);

      // Preciso remover a senha, pois não é necessário salvar no firestore
      console.log(clientsCollection);
      // clientsCollection.doc(uid).set(clientData);
      console.log('Conta criada com sucesso');
    })
    .catch(error => {
      if (error.code == 'auth/email-already-in-use') {
        console.log('esse email já esta em uso por outro usuário');
      }else {
        console.log(error.message);
      }
      console.log(error);
    });
}

// MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createProfessionalEsp (profEspData) {
  createUserWithEmailAndPassword(auth, profEspData.emailCad, profEspData.senhaCad)

    .then(data => {
      console.log('entrei');
      // referencia ao novo id criado
      const uid = data.user.uid;

      // referencia a coleção passando o novo id a ser adicionado
      const newUserDocument = doc(profCollectionEsp, uid);

      // funcaao que cria o novo usuário + id na coleção passada
      writeDocument(newUserDocument, profEspData);

      // Preciso remover a senha, pois não é necessário salvar no firestore
      // console.log(clientsCollection);
      // clientsCollection.doc(uid).set(clientData);
      console.log('Conta criada com sucesso');
    })
    .catch(error => {
      if (error.code == 'auth/email-already-in-use') {
        console.log('esse email já esta em uso por outro usuário');
      }else {
        console.log(error.message);
      }
      console.log(error);
    });

  // addNewDocument(profEspData, profCollectionEsp);
}

// MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createProfessionalNut (profNutData) {
  // console.log(profNutData[0].emailCad, profNutData[0].senhaCad);
  createUserWithEmailAndPassword(auth, profNutData.emailCad , profNutData.senhaCad)
    .then(data => {
      // referencia ao novo id criado
      const uid = data.user.uid;

      // referencia a coleção passando o novo id a ser adicionado
      const newUserDocument = doc(profCollectionNut, uid);

      // funcaao que cria o novo usuário + id na coleção passada
      writeDocument(newUserDocument, profNutData);

      // Preciso remover a senha, pois não é necessário salvar no firestore
      // console.log(clientsCollection);
      // clientsCollection.doc(uid).set(clientData);
      console.log('Conta criada com sucesso');
    })
    .catch(error => {
      if (error.code == 'auth/email-already-in-use') {
        console.log('esse email já esta em uso por outro usuário');
      }else {
        console.log(error.message);
      }
      console.log(error);
    });

  // addNewDocument(profNutData, profCollectionNut);
}

// CREATE THE DOCUMENT ON THE FIREBASE DB(OLD)
// async function addNewDocument(data, collection) {
//   const newDoc = await addDoc(collection, data);
//   console.log(`documento criado em ${newDoc.path}`);
// }

function writeDocument (newUserDocument, data) {
  console.log('cai aqui');
  setDoc(newUserDocument, data);
}

/// //////////////////////////////////////////////////LOGIN SYSTEM///////////////////////////////////////////////////////////////////////////////////

export function login (user) {
  const userEmail = user.email;
  const showLoginResultPopup = document.querySelector('.popup.login-result').classList.add('active');
  const loginResultMsg = document.querySelector('#login-result-msg');

  signInWithEmailAndPassword(auth, user.email, user.senha)

    .then((data) => {
    // console.log("entrei");
      const uid = data.user.uid;
      const user = data.user;
      // document.querySelector('.popup.login-result').classList.add('active');
      // document.querySelector('#login-result-msg').innerHTML = 'Login realizado com sucesso :)';
      showLoginResultPopup;
      loginResultMsg.innerHTML = 'Login realizado com sucesso :)';

      const cliente = query(collection(db, 'clientes'), where('emailCad', '==', userEmail));
      (async () => {
        const queryCliente = await getDocs(cliente);

        queryCliente.forEach((doc) => {
          const user = doc.data();
          var userData =
          {
            nome: user.nomeCad,
            sobrenome: user.sobrenomeCad,
            cpf: user.cpfCad,
            telefone: user.telefoneCad,
            email: user.emailCad,
            endereco: user.enderecoCad,
            numeroResid: user.numeroResiCad,
            cep: user.cepCad,
            complemento: user.complementoCad,
            bairro: user.bairroCad,
            cidade: user.cidadeCad,
            uf: user.ufCad
          };

          // console.log('userData', userData);

          sessionStorage.setItem('userData', JSON.stringify(userData));
        });

        setTimeout(() => {
          // window.location.replace('initial-page.html');
          window.location.reload();
        }, 2000);
      })();
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      // document.querySelector('.popup.login-result').classList.add('active');
      // document.querySelector('#login-result-msg').innerHTML = 'Falha ao autenticar :(<br> Revise os dados informados.';

      showLoginResultPopup;
      loginResultMsg.innerHTML = 'Falha ao autenticar :(<br> Revise os dados informados.';
    });
}

export function logoff () {
  const showLoginResultPopup = document.querySelector('.popup.logout-result').classList.add('active');
  const loginResultMsg = document.querySelector('#logout-result-msg');

  signOut(auth).then(() => {
    showLoginResultPopup;
    loginResultMsg.innerHTML = 'Logout realizado com sucesso :)';
    // alert("usuário desconectado");
    sessionStorage.clear();
    setTimeout(() => {
      window.location.replace('index.html');
      loginResultMsg.innerHTML = '';
    }, 2000);
  }).catch((error) => {
    // An error happened.
    // alert("ocorreu um erro");
    showLoginResultPopup;
    loginResultMsg.innerHTML = 'Falha ao realizar o logout :(';
  });
}

/// / PASSWORD RECOVERY /////

export function passwordRecovery (email) {
  var userEmail = email;

  const showPasswordRecoveryResultPopup = document.querySelector('.popup.password-recovery-result').classList.add('active');

  const recoveryResultMsg = document.querySelector('#recovery-result-msg');

  sendPasswordResetEmail(auth, email)
    .then(() => {
      showPasswordRecoveryResultPopup;
      recoveryResultMsg.innerHTML = '';
      recoveryResultMsg.innerHTML = 'Verifique seu e-mail :)';
    }).catch((error) => {
      showPasswordRecoveryResultPopup;
      recoveryResultMsg.innerHTML = '';
      recoveryResultMsg.innerHTML = 'Ocorreu um erro :(<br> Revise os dados informados.';
    });
}

export function getUserInfo () {
  const cliente = query(collection(db, 'clientes'), where('emailCad', '==', userEmail));
  (async () => {
    const queryCliente = await getDocs(cliente);

    queryCliente.forEach((doc) => {
      const user = doc.data();
      var userData =
          {
            nome: user.nomeCad,
            sobrenome: user.sobrenomeCad,
            cpf: user.cpfCad,
            telefone: user.telefoneCad,
            email: user.emailCad,
            endereco: user.enderecoCad,
            numeroResid: user.numeroResiCad,
            cep: user.cepCad,
            complemento: user.complementoCad,
            bairro: user.bairroCad,
            cidade: user.cidadeCad,
            uf: user.ufCad
          };

      // console.log('userData', userData);

      sessionStorage.setItem('userData', JSON.stringify(userData));
    });

    setTimeout(() => {
      window.location.replace('initial-page.html');
    }, 2000);
  })();
}

export function saveEditedProfile (uid, payload) {
  // referencia para o cliente em si
  const docRef = doc(db, 'clientes', uid);

  // atualiza as informações do cliente
  updateDoc(docRef, payload);

  // atualiza as informaçoes da sessão, revisar para fazer a busca do banco e não atualizar diretamente
  sessionStorage.setItem('userData', JSON.stringify(payload));

  // recarrega a página para carregar as novas informações
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}


export function searchLocal(selectedValue){

  //const optionSelected = query(collection(db, 'profissionais A. Esportiva'), where('cidadeCad', '==', 'Canela'));  

  const cliente = query(collection(db, selectedValue), where('cidadeCad', '!=', ""));
      (async () => {
        const queryCliente = await getDocs(cliente);
        var cities = []
        queryCliente.forEach((doc) => {
          const user = doc.data();
  
          if(cities.includes(user.cidadeCad)){
            
          }else{
            cities.push(user.cidadeCad);
          }
          
          //console.log('userData', userData);
         // console.log(cities);
        });
        sessionStorage.setItem('availableCities', JSON.stringify(cities));   
      })();
}

export function searchProfessionals(tipo, cidade){

  const cliente = query(collection(db, tipo), where('cidadeCad', '==', cidade));

      (async () => {
        const queryCliente = await getDocs(cliente);
        var availableProfessionals = []
        queryCliente.forEach((doc) => {
          const user = doc.data();
          //use this on next function like this
          var professionalInfo =
          {
            proName: user.nomeCad,
            sobrenome: user.sobrenomeCad,
            cpf: user.cpfCad,
            telefone: user.telefoneCad,
            email: user.emailCad,
            endereco: user.enderecoCad,
            numeroResid: user.numeroResiCad,
            cep: user.cepCad,
            complemento: user.complementoCad,
            proDistrict: user.bairroCad,
            proCity: user.cidadeCad,
            uf: user.ufCad,
            occupationArea:user.experienciaCad,
            serviceValue: user.planoMensalCad,
          };
          availableProfessionals.push(professionalInfo);
          //console.log('userData', userData);
         // console.log(cities);
        });
        sessionStorage.setItem('availableProfessionals', JSON.stringify(availableProfessionals));   
      })();

      setTimeout(() => {
        window.location.replace('resultados.html');
      }, 1000);

}




/// / TESTES DE CONSULTA DE BANCO DE DADOS ////

// Create a reference to the cities collection
// Create a query against the collection.

// const cliente = query(collection(db, "clientes"), where("emailCad", "==", "andersonveeck@gmail.com"));
// // const cliente = query(collection(db, "clientes"), where("numeroResiCad", "==", "55"));

// const queryCliente = await getDocs(cliente);
// queryCliente.forEach((doc) => {
//   let user = doc.data();
//   // doc.data() is never undefined for query doc snapshots
//   // console.log(doc.id, " => ", doc.data());
//   // console.log(user.nomeCad);
//   // console.log(user.sobrenomeCad);
//   // console.log(user.emailCad);
//   // console.log(user.cpfCad);
//   // console.log(user.telefoneCad);
//   // console.log(user.enderecoCad);
//   // console.log(user.numeroResiCad);
//   // console.log(user.cepCad);
//   // console.log(user.bairroCad);
//   // console.log(user.cidadeCad);
//   // console.log(user.ufCad);

//   var userData =
//   {
//     nome: user.nomeCad,
//     sobrenome: user.sobrenomeCad,
//     cpf: user.cpfCad,
//     telefone: user.telefoneCad,
//     email: user.emailCad,
//     endereco: user.enderecoCad,
//     numeroResid: user.numeroResiCad,
//     cep: user.cepCad,
//     complemento: user.complementoCad,
//     bairro: user.bairroCad,
//     cidade: user.cidadeCad,
//     uf: user.ufCad
//   };

//   console.log('userData', userData);

//   localStorage.setItem('userData', JSON.stringify(userData));
// });
