import { addUser } from './components/addUser.js';
import { loadUsers } from './components/loadUsers.js';
import { loadTodo } from './components/loadTodo.js';

export const todoApp = () => {
  loadTodo();
  loadUsers();
  addUser();
};

window.onload = () => {
  todoApp();
};