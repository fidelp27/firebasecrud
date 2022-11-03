import {
  saveTask,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
} from './firebase.js';

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');
const btnAction = document.getElementById('btn-task-save');

let editStatus = false;
let id = '';

window.addEventListener('DOMContentLoaded', async () => {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const task = doc.data();
      taskContainer.innerHTML += `
      <div class="card border border-2 mb-2" style="width: 25rem" >
        <div class="card-body mt-2">
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
          <div class="d-flex ">
            <button class="btn btn-danger m-1 btn-delete " data-id="${doc.id}">Delete</button>
            <button class="btn btn-warning m-1 btn-edit " data-id="${doc.id}">Edit</button>
          </div>
        </div>
      </div>
    `;
    });

    const btnsDelete = document.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        deleteTask(e.target.dataset.id);
      });
    });

    const btnsEdit = document.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();
        taskForm['task-title'].value = task.title;
        taskForm['task-description'].value = task.description;
        editStatus = true;
        id = doc.id;

        taskForm['btn-task-save'].innerText = 'Update';
      });
    });
  });
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = taskForm['task-title'];
  const description = taskForm['task-description'];

  if (!editStatus) {
    saveTask(title.value, description.value);
  } else {
    updateTask(id, {
      title: title.value,
      description: description.value,
    });
    editStatus = false;
    taskForm['btn-task-save'].innerText = 'Save';
  }

  taskForm.reset();
});
