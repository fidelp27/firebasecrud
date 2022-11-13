import {
  GithubAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';
import { hideModal } from './hideModal.js';

/*
    1) Se importan GithubAuthProvider y signInWithPopup
        1.1) GithubAuthProvider  se encarga de la verificación
        1.2) signInWithPopup abre el pop up con la solicitud
    2) se instancia  el provider de GithubAuthProvider 
    3) Se cierra el modal y se da mensaje de bienvenida
    */

const github_button = document.querySelector('#login-github');
github_button.addEventListener('click', async () => {
  const provider = new GithubAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provider);
    hideModal('signinModal');
    showMessage('Bienvenido ' + credentials.user.displayName, 'success');
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      showMessage('Ya te has autenticado con otra plataforma', 'warning');
    } else {
      showMessage(error.message, 'warning');
    }
  }
});
