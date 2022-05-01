//FIREBASE CDN IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, setDoc, query, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHSpjnyCTnvrJXjDqvm1KrEGMay8fE_Cw",
  authDomain: "plataformafitness-6cfdf.firebaseapp.com",
  databaseURL: "https://plataformafitness-6cfdf-default-rtdb.firebaseio.com",
  projectId: "plataformafitness-6cfdf",
  storageBucket: "plataformafitness-6cfdf.appspot.com",
  messagingSenderId: "479104423229",
  appId: "1:479104423229:web:b31bbd3d56d72a9a962154"
};
//FIM IMPORT

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

//path to clients collection on firebase
const clientsCollection = collection(db, 'clientes');

//path to clients collection on firebase
const profCollectionEsp = collection(db, 'profissionais A. Esportiva');

//path to clients collection on firebase
const profCollectionNut = collection(db, 'profissionais A. Nutricional');

//MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createClient(clientData) {
  
  //addNewDocument(clientData, clientsCollection);

  createUserWithEmailAndPassword(auth, clientData.emailCad ,clientData.senhaCad)
    .then(data => {
      
      //referencia ao novo id criado
      const uid = data.user.uid;

      //referencia a coleção passando o novo id a ser adicionado
      const newUserDocument = doc(clientsCollection, uid);

      //funcaao que cria o novo usuário + id na coleção passada
      writeDocument(newUserDocument, clientData);
      
      //Preciso remover a senha, pois não é necessário salvar no firestore
      console.log(clientsCollection);
      //clientsCollection.doc(uid).set(clientData);
      console.log("Conta criada com sucesso");
    })
    .catch(error => {
      
      if(error.code == 'auth/email-already-in-use'){
        console.log("esse email já esta em uso por outro usuário");
      }else{
        console.log(error.message);
      }
      console.log(error);
    })


}

//MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createProfessionalEsp(profEspData) {

  createUserWithEmailAndPassword(auth, profEspData.emailCad, profEspData.senhaCad)

    .then(data => {
      console.log("entrei")
      //referencia ao novo id criado
      const uid = data.user.uid;

      //referencia a coleção passando o novo id a ser adicionado
      const newUserDocument = doc(profCollectionEsp, uid);

      //funcaao que cria o novo usuário + id na coleção passada
      writeDocument(newUserDocument, profEspData);
      
      //Preciso remover a senha, pois não é necessário salvar no firestore
      //console.log(clientsCollection);
      //clientsCollection.doc(uid).set(clientData);
      console.log("Conta criada com sucesso");
    })
    .catch(error => {
      
      if(error.code == 'auth/email-already-in-use'){
        console.log("esse email já esta em uso por outro usuário");
      }else{
        console.log(error.message);
      }
      console.log(error);
    })

  //addNewDocument(profEspData, profCollectionEsp);
}

//MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createProfessionalNut(profNutData) {
  //console.log(profNutData[0].emailCad, profNutData[0].senhaCad);
  createUserWithEmailAndPassword(auth, profNutData.emailCad ,profNutData.senhaCad)
    .then(data => {

      //referencia ao novo id criado
      const uid = data.user.uid;

      //referencia a coleção passando o novo id a ser adicionado
      const newUserDocument = doc(profCollectionNut, uid);

      //funcaao que cria o novo usuário + id na coleção passada
      writeDocument(newUserDocument, profNutData);
      
      //Preciso remover a senha, pois não é necessário salvar no firestore
      //console.log(clientsCollection);
      //clientsCollection.doc(uid).set(clientData);
      console.log("Conta criada com sucesso");
    })
    .catch(error => {
      
      if(error.code == 'auth/email-already-in-use'){
        console.log("esse email já esta em uso por outro usuário");
      }else{
        console.log(error.message);
      }
      console.log(error);
    })

  //addNewDocument(profNutData, profCollectionNut);
}

//CREATE THE DOCUMENT ON THE FIREBASE DB(OLD)
// async function addNewDocument(data, collection) {
//   const newDoc = await addDoc(collection, data);
//   console.log(`documento criado em ${newDoc.path}`);
// }

function writeDocument(newUserDocument, data) {
  console.log("cai aqui")
  setDoc(newUserDocument, data);
}

/////////////////////////////////////////////////////LOGIN SYSTEM///////////////////////////////////////////////////////////////////////////////////

export function login(user){
  const userEmail = user.email;
  
  signInWithEmailAndPassword(auth, user.email, user.senha)
  
  .then((data) =>{
    console.log("entrei");
    const uid = data.user.uid;
    const user = data.user;
    // console.log(uid, user);
    // console.log(data);
    console.log(userEmail);
    alert("usuario autenticado");

    const cliente = query(collection(db, "clientes"), where("emailCad", "==", userEmail));
      (async () => { 
        const queryCliente = await getDocs(cliente);
        
        queryCliente.forEach((doc) => {
          let user = doc.data();
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
  
          console.log('userData', userData);
  
          localStorage.setItem('userData', JSON.stringify(userData));
        });
        
        // window.location.replace('initial-page.html');

      })()

   })

   .catch((error) =>{
     const errorCode = error.code;
     const errorMessage = error.message
     
     console.log(errorCode, errorMessage);
     alert("falha ao autenticar");
   })
 }


 export function logoff(){
  signOut(auth).then(() => {
    alert("usuário desconectado");
    window.location.replace('index.html');
  }).catch((error) => {
    // An error happened.
    alert("ocorreu um erro");
  });
}

//// PASSWORD RECOVERY /////

export function passwordRecovery(email) {
  var userEmail = email;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('Verifique seu e-mail :)')
  }).catch((error) => {
    alert("Ocorreu um erro");
  });

}

//// TESTES DE CONSULTA DE BANCO DE DADOS ////

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


