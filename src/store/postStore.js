import {makeAutoObservable} from 'mobx';
import {appStore} from './appStore'; // Import AppStore for accessing filtered posts

class PostStore {
  posts = [];
  sortOrder = 'asc';
  currentPage = 1;
  itemsPerPage = 10;

  constructor() {
    makeAutoObservable(this);
  }

  setPosts(posts) {
    this.posts = posts || []; // Ensure posts is always an array
  }

  setSortOrder(order) {
    this.sortOrder = order;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  get filteredPosts() {
    if (!Array.isArray(this.posts) || this.posts.length === 0) {
      return [];
    }

    const filtered = this.posts.filter(post =>
      post.title.toLowerCase().includes(appStore.searchQuery.toLowerCase()),
    );

    if (this.sortOrder === 'asc') {
      return filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  get sortedPosts() {
    const posts = this.filteredPosts || [];

    if (posts.length === 0) {
      return [];
    }

    if (this.sortOrder === 'asc') {
      return posts.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return posts.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  get paginatedPosts() {
    const sortedPosts = this.sortedPosts || [];

    if (sortedPosts.length === 0) {
      return [];
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return sortedPosts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    const sortedPosts = this.sortedPosts || [];
    return Math.ceil(sortedPosts.length / this.itemsPerPage);
  }
}

export const postStore = new PostStore();
