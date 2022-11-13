import {
  FacebookAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';
import { hideModal } from './hideModal.js';
/*
  1) Se importan FacebookAuthProvider y signInWithPopup
      1.1) FacebookAuthProvider se encarga de la verificación
      1.2) signInWithPopup abre el pop up con la solicitud
  2) se instancia  el provider de GoogleAuthProvider
  3) Se cierra el modal y se da mensaje de bienvenida
  */
const welcomeMessage = document.querySelector('#welcomeMessage');
const facebook_button = document.querySelector('#login-facebook');
facebook_button.addEventListener('click', async () => {
  const provider = new FacebookAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider);
    hideModal('signinModal');
    showMessage('Bienvenido ' + credentials.user.displayName, 'success');
    welcomeMessage.classList.remove('d-flex');
    welcomeMessage.classList.add('d-none');
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      showMessage('Ya te has autenticado con otra plataforma', 'warning');
    } else {
      showMessage(error.message, 'warning');
    }
  }
});
