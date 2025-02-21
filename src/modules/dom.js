'use-strict';
import { State, createTodo } from './logic';

// NOTE: DOM ELEMENTS
export const DOM = {
  btnAddProject: document.querySelector('.btn-add-project'),
  btnAddTodo: document.querySelector('.btn-add-todo'),
  btnDeleteTodo: document.querySelector('.btn-delete-todo'),
  btnCompleteTodo: document.querySelector('.btn-complete-todo'),
  btnFormCancel: document.querySelector('.btn-form-cancel'),
  btnFormSubmit: document.querySelector('.btn-form-submit'),
  containerTodos: document.querySelector('.todos-container'),
  modal: document.querySelector('.modal-action-todo'),
  formModal: document.querySelector('.modal-form'),
  listProjects: document.querySelector('.todo-list-projects'),
};

// NOTE: UTILITY FUNCTIONS
export const exitModal = () => {
  DOM.formModal.reset();
  DOM.modal.close();
};

// NOTE: TODO MANAGEMENT
export const handleFormSubmit = (e) => {
  e.preventDefault();

  console.log('Form Submitted!');

  const title = document.querySelector('.form-todo-title').value.trim();
  const description = document.querySelector('.form-todo-description').value.trim();
  let dueDate = document.querySelector('.form-todo-due-date').value.trim();
  const priority = document.querySelector('.form-todo-priority').value;
  const project = document.querySelector('.form-todo-projects').value;

  if (!dueDate) dueDate = 'N/A';

  if (State.editingTodoId) {
    console.log('Editing a todo');
    const todo = State.todoArr.find((todo) => todo.id === State.editingTodoId);
    if (todo) {
      Object.assign(todo, { title, description, dueDate, priority, project });
    }
    State.editingTodoId = null;
  } else {
    console.log('Creating new todo');
    const newTodo = createTodo(Date.now().toString(), title, description, dueDate, priority, project);
    State.todoArr.push(newTodo);
    const projectArr = State.projectsArr.find((p) => p.title === project);
    projectArr.todoArr.push(newTodo); // ✅ Adds todo to the correct project
  }
  console.log(State.todoArr); // Debugging: Check if todoArr updates
  console.log(State.projectsArr); // Debugging: Check if projectsArr updates
  renderTodos();
  renderProjects();
  exitModal();
};

// NOTE: RENDER FUNCTIONS
export const renderTodos = () => {
  DOM.containerTodos.innerHTML = '';

  if (State.todoArr.length === 0) {
    DOM.containerTodos.innerHTML = `<p class="empty-todo-list-message">No todos? Must be nice. 😏</p>`;
    return;
  }

  State.todoArr.forEach((todo) => {
    const html = `
      <div class="todo-card todo-priority-${todo.priority}" data-id=${todo.id}>
        <div class="todo-information">
          <p class="todo-title">${todo.title}</p>
          <p class="todo-due-date">Due: <span class="todo-date">${todo.dueDate}</span></p>
          <p class="todo-project">#${todo.project}</p>
        </div>
        <div class="todo-actions">
          <span class="material-icons-outlined todo-action btn-complete-todo">check</span>
          <span class="material-icons-outlined todo-action btn-delete-todo">close</span>
        </div>
      </div>`;
    DOM.containerTodos.insertAdjacentHTML('beforeend', html);
  });
};

export const renderProjects = () => {
  DOM.listProjects.innerHTML = '';
  State.projectsArr.forEach((project) => {
    const html = `<li class="todo-list-item">
        <a href="#" class="todo-list-item-link">
          <span class="material-icons-outlined todo-icon">tag</span>
          <p class="todo-group-name">${project.title}</p>
          <p class="todo-count">${project.todoArr.length}</p>
        </a>
      </li>
    `;
    DOM.listProjects.insertAdjacentHTML('beforeend', html);
  });
};

export const renderProjectOptions = function () {
  const projectSelect = document.querySelector('.form-todo-projects');
  projectSelect.innerHTML = '';

  // Add each project dynamically
  State.projectsArr.forEach((project) => {
    const option = `<option value="${project.title}" class="form-todo-project-option"># ${project.title}</option>`;
    projectSelect.insertAdjacentHTML('beforeend', option);
  });
};

export const renderProjectTodos = function () {};

// NOTE: EDITING TODO
export const openTodoEditor = (id) => {
  const todo = State.todoArr.find((todo) => todo.id === id);
  if (!todo) return;

  State.editingTodoId = id;
  document.querySelector('.modal-heading').textContent = 'Edit Todo';
  document.querySelector('.form-todo-title').value = todo.title;
  document.querySelector('.form-todo-description').value = todo.description;
  document.querySelector('.form-todo-due-date').value = todo.dueDate;
  document.querySelector('.form-todo-priority').value = todo.priority;
  document.querySelector('.form-todo-projects').value = todo.project;

  DOM.modal.showModal();
  renderProjectOptions();
};
