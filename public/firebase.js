//FIREBASE CDN IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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
  // var spanUserInfo = document.querySelector("#userInfo");
   
   // signInWithEmailAndPassword(auth, user.email, user.senha).then(async (data) =>{
   //   console.log("entrei");
   //   const uid = data.user.uid;
   //   try{
   //     const doc2 = await doc(clientsCollection + '/' +uid).get();
   //     console.log(doc2.data());
   //     //.innerHTML = JSON.stringify(doc.data());
   //   }catch(e){
   //     console.log(e);
   //     //spanUserInfo.innerHTML = "Error"
   //   }
   // })
 
   signInWithEmailAndPassword(auth, user.email, user.senha).then((data) =>{
     console.log("entrei");
     const uid = data.user.uid;
     const user = data.user;
     console.log(uid, user);
 
     
     // const clientInfo = doc(clientsCollection,uid);
     // console.log(clientInfo);
 
    //  const docReference = doc(db, "clientes", uid);
    //  const docsnap = getDoc(docReference);
 
    //  console.log(docsnap)
    //  if(docsnap.exists()){
    //    console.log("Document data:", docSnap.data());
    //    } else {
    //      // doc.data() will be undefined in this case
    //      console.log("No such document!");
    //    }
     //console.log(docsnap);
 
 
 
 
     //.log(clientInfo); 
    
   })
   .catch((error) =>{
     const errorCode = error.code;
     const errorMessage = error.message
 
     console.log(errorCode, errorMessage);
   })
 }

 export function logoff(){
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
 }
