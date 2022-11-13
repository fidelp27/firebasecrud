import {
  saveTask,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
} from './scripts/firebase.js';
//Es un observer que chequea cuando la autenticación cambia de estado
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './scripts/firebase.js';
import './scripts/signupForm.js';
import './scripts/logout.js';
import './scripts/signinForm.js';
import './scripts/googleLogin.js';
import './scripts/facebookLogin.js';
import './scripts/githubLogin.js';
import { loginCheck } from './scripts/loginCheck.js';

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');
const btnAction = document.getElementById('btn-task-save');
const containerNotes = document.querySelector('#tasks-container');
const containerFormAddTask = document.querySelector('.form-add-task');
const welcomeMessage = document.querySelector('#welcomeMessage');
const navUser = document.querySelector('.nav-user');
const navUserName = document.querySelector('.nav-user-name');

let editStatus = false;
let id = '';
let userId = '';

window.addEventListener('DOMContentLoaded', async () => {
  taskContainer.innerHTML = '';

  onAuthStateChanged(auth, async (user) => {
    loginCheck(user);
    if (user) {
      containerFormAddTask.classList.remove('d-none');
      containerFormAddTask.classList.add('d-flex');
      taskContainer.classList.remove('d-none');
      taskContainer.classList.add('d-block');

      navUser.classList.remove('d-none');
      navUser.classList.add('d-flex');
      navUserName.textContent = `Welcome ${
        user.displayName ? user.displayName : user.email
      }`;

      userId = auth.currentUser.uid;

      onGetTasks(user.uid, (querySnapshot) => {
        taskContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
          const task = doc.data();
          const cardContainer = document.createElement('div');
          cardContainer.classList.add(
            'card',
            'border',
            'border-primary',
            'mb-2',
            'me-2',
            'rounded',
            'container-notes'
          );
          taskContainer.style.width = '60rem';
          cardContainer.style.opacity = '1';
          cardContainer.style.width = '300px';
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body', 'mt-2');
          const title = document.createElement('h3');
          title.classList.add('h5');
          title.textContent = task.title;
          const description = document.createElement('p');
          description.textContent = task.description;
          const buttonContainer = document.createElement('div');
          buttonContainer.classList.add('d-flex');
          const btnEdit = document.createElement('button');
          btnEdit.classList.add('btn', 'btn-warning', 'm-1', 'btn-edit');
          btnEdit.setAttribute('data-id', doc.id);
          btnEdit.textContent = 'Edit';
          const btnDelete = document.createElement('button');
          btnDelete.classList.add('btn', 'btn-danger', 'm-1', 'btn-delete');
          btnDelete.setAttribute('data-id', doc.id);
          btnDelete.textContent = 'Delete';

          buttonContainer.append(btnEdit, btnDelete);
          cardBody.append(title, description, buttonContainer);
          cardContainer.append(cardBody);
          taskContainer.append(cardContainer);
        });

        const btnsDelete = document.querySelectorAll('.btn-delete');
        btnsDelete.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            deleteTask(user.uid, e.target.dataset.id);
          });
        });

        const btnsEdit = document.querySelectorAll('.btn-edit');

        btnsEdit.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            const doc = await getTask(user.uid, e.target.dataset.id);
            const task = doc.data();
            taskForm['task-title'].value = task.title;
            taskForm['task-description'].value = task.description;
            editStatus = true;
            id = doc.id;

            taskForm['btn-task-save'].innerText = 'Update';
          });
        });
      });
    } else {
      containerFormAddTask.classList.remove('d-flex');
      containerFormAddTask.classList.add('d-none');
      taskContainer.classList.remove('d-block');
      taskContainer.classList.add('d-none');
      welcomeMessage.classList.remove('d-none');
      welcomeMessage.classList.add('d-flex');
      navUser.classList.remove('d-flex');
      navUser.classList.add('d-none');
    }
  });
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = taskForm['task-title'];
  const description = taskForm['task-description'];

  if (!editStatus) {
    saveTask(userId, title.value, description.value);
  } else {
    updateTask(userId, id, {
      title: title.value,
      description: description.value,
    });
    editStatus = false;
    taskForm['btn-task-save'].innerText = 'Save';
  }

  taskForm.reset();
});
