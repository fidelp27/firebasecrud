import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';
//auth se importa desde firebase.js. Ya se inicializó allá
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  //Se puede usar async/await o promesas
  //Se puede configurar la validación del email y password
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //Close modal
    const signupModal = document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();
    //Toastify
    showMessage(
      'Bienvenido ' + userCredentials.user.email + '. Debes verificar tu email',
      'success'
    );
    sendEmailVerification(auth.currentUser);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      showMessage('Correo ya se encuentra en uso', 'warning');
    } else if (error.code === 'auth/invalid-email') {
      showMessage('Correo inválido, por favor intenta de vuelta', 'warning');
    } else if (error.code === 'auth/weak-password') {
      showMessage('Password muy corto', 'warning');
    } else if (error.code) {
      showMessage(error.code, 'warning');
    }
  }
});
