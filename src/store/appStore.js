import {makeAutoObservable} from 'mobx';

class AppStore {
  searchQuery = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }
}

export const appStore = new AppStore();
