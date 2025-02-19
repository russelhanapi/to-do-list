"use-strict";

import "./style.css";
import "material-icons/iconfont/material-icons.css";

// NOTE: DOM ELEMENTS
const btnAddProject = document.querySelector(".btn-add-project");
const btnAddTodo = document.querySelector(".btn-add-todo");
const btnDeleteTodo = document.querySelector(".btn-delete-todo");
const btnCompleteTodo = document.querySelector(".btn-complete-todo");
const btnFormCancel = document.querySelector(".btn-form-cancel");
const btnFormSubmit = document.querySelector(".btn-form-submit");
const containerTodos = document.querySelector(".todos-container");
const modal = document.querySelector(".modal-action-todo");
const formModal = document.querySelector(".modal-form");
const listProjects = document.querySelector(".todo-list-projects");

// NOTE: STATE MANAGEMENT
const todoArr = [];

const deletedTodoArr = [];
const completedArr = [];
const projectsArr = [
  { title: "home", todoArr: [] },
  { title: "work", todoArr: [] },
];

// NOTE: UTILITY FUNCTIONS
const exitModal = () => {
  formModal.reset();
  modal.close();
};

const createTodo = (
  id,
  title,
  description,
  dueDate = "N/A",
  priority,
  project,
  isCompleted = "false",
  isDeleted = "false"
) => ({
  id,
  title,
  description,
  dueDate,
  priority,
  project,
  isCompleted,
  isDeleted,
});

const createProject = (title, todoArr = []) => ({ title, todoArr });

const handleFormSubmit = (e) => {
  e.preventDefault();

  console.log("Form Submitted!");

  const title = document.querySelector(".form-todo-title").value.trim();
  const description = document.querySelector(".form-todo-description").value.trim();
  let dueDate = document.querySelector(".form-todo-due-date").value.trim();
  const priority = document.querySelector(".form-todo-priority").value;
  const project = document.querySelector(".form-todo-projects").value;

  if (!dueDate) dueDate = "N/A";

  if (editingTodoId) {
    console.log("Editing a todo");
    const todo = todoArr.find((todo) => todo.id === editingTodoId);
    if (todo) {
      Object.assign(todo, { title, description, dueDate, priority, project });
    }
    editingTodoId = null;
  } else {
    console.log("Creating new todo");
    const newTodo = createTodo(Date.now().toString(), title, description, dueDate, priority, project);
    todoArr.push(newTodo);
    const projectArr = projectsArr.find((p) => p.title === project);
    projectArr.todoArr.push(newTodo); // ✅ Adds todo to the correct project
  }
  console.log(todoArr); // Debugging: Check if todoArr updates
  console.log(projectsArr); // Debugging: Check if projectsArr updates
  renderTodos();
  renderProjects();
  exitModal();
};

const deleteTodo = (id) => {
  const todoIndex = todoArr.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todoArr[todoIndex].isDeleted = "true";
    deletedTodoArr.push(todoArr[todoIndex]);
    todoArr.splice(todoIndex, 1);
    renderTodos();
    renderProjects();
  }
};
