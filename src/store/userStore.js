import {makeAutoObservable, action} from 'mobx';
import {appStore} from './appStore'; // Access global search query

class UserStore {
  users = [];
  favorites = [];
  sortOrder = 'asc';
  currentPage = 1;
  itemsPerPage = 10;

  constructor() {
    makeAutoObservable(this, {
      addFavorite: action,
      removeFavorite: action,
      setSortOrder: action,
      setCurrentPage: action,
    });
  }

  setUsers(users) {
    this.users = users;
  }

  addFavorite(user) {
    if (!this.isFavorite(user.id)) {
      this.favorites.push(user);
    }
  }

  removeFavorite(userId) {
    this.favorites = this.favorites.filter(user => user.id !== userId);
  }

  isFavorite(userId) {
    return this.favorites.some(user => user.id === userId);
  }

  setSortOrder(order) {
    this.sortOrder = order;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  get filteredUsers() {
    const query = appStore.searchQuery.toLowerCase();
    return this.users.filter(
      user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query),
    );
  }

  get filteredFavorites() {
    const query = appStore.searchQuery.toLowerCase();
    let filtered = this.favorites.filter(
      user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query),
    );

    // Sorting logic
    if (this.sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }

  get paginatedFavorites() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFavorites.slice(
      startIndex,
      startIndex + this.itemsPerPage,
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredFavorites.length / this.itemsPerPage);
  }
}

export const userStore = new UserStore();
