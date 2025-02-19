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
