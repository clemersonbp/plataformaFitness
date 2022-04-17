//FIREBASE CDN IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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

//path to clients collection on firebase
const clientsCollection = collection(db, 'clientes');

//path to clients collection on firebase
const profCollectionEsp = collection(db, 'profissionais A. Esportiva');

//path to clients collection on firebase
const profCollectionNut = collection(db, 'profissionais A. Nutricional');

//MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createClient(clientData) {
  addNewDocument(clientData);
}

//MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createProfessionalEsp(profEspData) {
  addNewDocument(profEspData, profCollectionEsp);
}

//MIDLEWARE TO TREAT THE DATA BEFORE SENDINGO TROUGH THE DATABASE
export function createProfessionalNut(profNutData) {
  addNewDocument(profNutData, profCollectionNut);
}

//CREATE THE DOCUMENT ON THE FIREBASE DB
async function addNewDocument(data, collection) {
  const newDoc = await addDoc(collection, data);
  console.log(`documento criado em ${newDoc.path}`);
}
