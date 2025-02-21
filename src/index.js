'use-strict';
import '../src/style.css';
import 'material-icons/iconfont/material-icons.css';

import {
  DOM,
  renderTodos,
  renderProjects,
  renderProjectOptions,
  exitModal,
  handleFormSubmit,
  openTodoEditor,
} from './modules/dom';
import { State, completeTodo, deleteTodo, createProject } from './modules/logic';

// NOTE: EVENT LISTENERS
DOM.btnAddTodo.addEventListener('click', () => {
  DOM.modal.showModal();
  renderProjectOptions();
});
DOM.btnFormCancel.addEventListener('click', exitModal);
DOM.formModal.addEventListener('submit', handleFormSubmit);

DOM.containerTodos.addEventListener('click', (e) => {
  const btnDelete = e.target.classList.contains('btn-delete-todo');
  const btnComplete = e.target.classList.contains('btn-complete-todo');
  const todoCard = e.target.closest('.todo-card');
  if (!todoCard) return;

  const id = todoCard.dataset.id;
  if (btnDelete) deleteTodo(id);
  if (btnComplete) completeTodo(id);
  if (!btnDelete && !btnComplete) openTodoEditor(id);
});

DOM.btnAddProject.addEventListener('click', function () {
  const containerProjects = document.querySelector('.todo-list-projects');
  const newProjectForm = `
  <li class="todo-list-item new-project">
      <a href="#" class="todo-list-item-link">
        <span class="material-icons-outlined todo-icon">tag</span>
        <input type="text" class="todo-group-name new-project-name" />
      </a>
    </li>`;
  containerProjects.insertAdjacentHTML('beforeend', newProjectForm);
  const newProjectInput = document.querySelector('.new-project-name');
  newProjectInput.focus();

  // Wait for the user to press Enter
  newProjectInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const projectName = newProjectInput.value.trim();

      if (!projectName) return;
      const newProject = createProject(projectName);
      State.projectsArr.push(newProject);
      renderProjects();
    }
  });

  // Remove input if clicked outside
  newProjectInput.addEventListener('blur', function () {
    if (newProjectInput.value.trim() === '') {
      newProjectInput.closest('.new-project').remove();
    }
  });
});

// NOTE: INIT RENDER
renderProjects();
renderTodos();

//// Create projects
//// Render projects
//// Add todos to  projects

// Implement filters (per group, project, priorities)

// Create modules
// App logic
// DOM implementation
// Per projects

// Implement local storage
// Use fnt-date (npm)
