import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js';

//SDK BBDD
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
//Servicios de firebase ---> su buscan database
// https://firebase.google.com/docs/web/setup#available-libraries

//Auth CDN - reemplaza módulos
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBJSNlSlvZV1NROngrvFrvVaPlNAhFqWWA',
  authDomain: 'sharevideosapp-b95d7.firebaseapp.com',
  projectId: 'sharevideosapp-b95d7',
  storageBucket: 'sharevideosapp-b95d7.appspot.com',
  messagingSenderId: '80248373491',
  appId: '1:80248373491:web:05ead8400afd966154f786',
  measurementId: 'G-TSRGF0GCF4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*
1) Crear e importar funciones para crear la BBDD 
2) Se importa el método ***getFirestore*** para crear la conexión con Firestore
    2.1) Se crear un objeto db
3) Se importa ***collection*** (permite crear una BBDD)
    3.1) Collection recibe la conexión con la BBDD (db)
    3.2) Un nombre para la colección
    3.3) Un objeto con la información que recibirá
4) Se importa ***addDoc*** (permite añadir documentos a la BBDD)
5) Se crea la colección en firebase con un ID por cada elemento y la información enviada
6) Consultas al servidor con ***getDocs***
    6.1) Se le pasa la colección con el parámetro de db y la coleccioón que deseo consultar
7) querySnapshot son los datos que existen hasta el momento actual. 
    7.1) Es un nombre aleatorio
    7.2) Es un objeto con toda la información
    7.3) La data está en doc
    7.4) Se convierte a JS con doc.data()
8) Suscripción: firebase detecta cambios y los muestra ****onSnapshot***
    8.1) Creo una función propia para pasarla 
    8.2) onSnapshot escucha cada cambio en la colección tasks  
          export const onGetTasks = (callback) =>
            onSnapshot(collection(db, 'tasks'), callback);
    8.3) Recibe como callback el objeto de respuesta para actualizarlo y devolverlo
    8.4) Suplanta directamente getDocs ya que chequea directamente los cambios en la colección
9) Eliminar elementos con ***deleteDoc*** y ***doc***
    9.1) doc selecciona un elemento único de la colección
    9.2) deleteDoc borra el elemento
    9.3) doc.data() devuelve el id del elemento
    9.4) deleteDoc recibe el documento, db, el nombre de la colección y el id del elemento
10) Para modificar un elemento se usa ***getDoc*** y ***updateDoc***
    10.1) getDoc trae la información de un elemento en particular
    10.2) updateDoc recibe el id y un objeto (data) con la nueva información 
 */

export const db = getFirestore();

//Authentication code
/*
1) Usar CDN para importar la función getAuth
2) app es la inicialización de firebase
*/
export const auth = getAuth(app);

export const saveTask = async (userId, title, description) => {
  await addDoc(collection(db, 'user', userId, 'tasks'), {
    title: title,
    description: description,
  });
};
/*export const getTasks = () => {
  getDocs(collection(db, 'user', 'fuJD2c6aJFOY8HWO9g5j3gA7vs83', 'tasks'));
  // return tasks.then((tasks) => tasks.forEach((elem) => elem.data()));
};*/

export const onGetTasks = async (userId, callback) => {
  await onSnapshot(collection(db, 'user', userId, 'tasks'), callback);
};
export const deleteTask = (userId, taskId) =>
  deleteDoc(doc(db, 'user', userId, 'tasks', taskId));

export const getTask = (userId, taskId) =>
  getDoc(doc(db, 'user', userId, 'tasks', taskId));

export const updateTask = (userId, taskId, data) =>
  updateDoc(doc(db, 'user', userId, 'tasks', taskId), data);
