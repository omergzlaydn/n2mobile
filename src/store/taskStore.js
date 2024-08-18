import {makeAutoObservable} from 'mobx';
import {appStore} from './appStore'; // Import AppStore to access global search query

class TaskStore {
  todos = [];
  favorites = [];
  sortOrder = 'asc';

  constructor() {
    makeAutoObservable(this);
  }

  setTodos(todos) {
    this.todos = todos;
  }

  setSortOrder(order) {
    this.sortOrder = order;
  }

  addFavorite(todo) {
    if (!this.isFavorite(todo.id)) {
      this.favorites.push(todo);
    }
  }

  removeFavorite(todoId) {
    this.favorites = this.favorites.filter(todo => todo.id !== todoId);
  }

  isFavorite(todoId) {
    return this.favorites.some(todo => todo.id === todoId);
  }

  get filteredTodos() {
    const filtered = this.todos.filter(todo =>
      todo.title.toLowerCase().includes(appStore.searchQuery.toLowerCase()),
    );

    if (this.sortOrder === 'asc') {
      return filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return filtered.slice().sort((a, b) => b.title.localeCompare(a.title));
    }
  }
}

export const taskStore = new TaskStore();
