import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';

const signinForm = document.querySelector('#login-form');
signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signinForm['signin-email'].value;
  const password = signinForm['signin-password'].value;
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const signinModal = document.querySelector('#signinModal');
    const modal = bootstrap.Modal.getInstance(signinModal);

    showMessage('Bienvenido ' + credentials.user.email, 'success');
    modal.hide();
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/user-not-found') {
      showMessage(
        'Correo no registrado, por favor intenta de vuelta',
        'warning'
      );
    } else if (error.code === 'auth/wrong-password') {
      showMessage(
        'Password incorrecto, por favor intenta de vuelta',
        'warning'
      );
    } else if (error.code) {
      showMessage(error.code, 'warning');
    }
  }
});
