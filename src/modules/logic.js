'use-strict';
import { renderTodos, renderProjects } from './dom';

// NOTE: STATE MANAGEMENT
// {
//   id: "122121224",
//   title: "2?",
//   description: "No",
//   dueDate: "12-12-2025",
//   priority: "low",
//   project: "personal",
//   isCompleted: "false",
//   isDeleted: "false",
// },
export const State = {
  todoArr: [
    {
      id: '122121224',
      title: '2?',
      description: 'No',
      dueDate: '12-12-2025',
      priority: 'low',
      project: 'personal',
      isCompleted: 'false',
      isDeleted: 'false',
    },
  ],
  deletedTodoArr: [],
  completedArr: [],
  projectsArr: [
    { title: 'home', todoArr: [] },
    { title: 'work', todoArr: [] },
  ],
  editingTodoId: null,
};

export const createTodo = (
  id,
  title,
  description,
  dueDate = 'N/A',
  priority,
  project,
  isCompleted = 'false',
  isDeleted = 'false'
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

export const createProject = (title, todoArr = []) => ({ title, todoArr });

export const deleteTodo = (id) => {
  const todoIndex = State.todoArr.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    State.todoArr[todoIndex].isDeleted = 'true';
    State.deletedTodoArr.push(State.todoArr[todoIndex]);
    State.todoArr.splice(todoIndex, 1);
    renderTodos();
    renderProjects();
  }
};

export const completeTodo = (id) => {
  const todoIndex = State.todoArr.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    State.todoArr[todoIndex].isCompleted = 'true';
    State.completedArr.push(State.todoArr[todoIndex]);
    State.todoArr.splice(todoIndex, 1);
    renderTodos();
    renderProjects();
  }
};
