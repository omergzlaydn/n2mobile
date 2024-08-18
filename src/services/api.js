import {USERS_URL, POSTS_URL, TODOS_URL} from '../utils/url';
import Client from './instance';

export const fetchUsers = async () => {
  try {
    const response = await Client.get(USERS_URL);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Kullanıcılar getirilirken bir hata oluştu:', error);
    return []; // Return an empty array or handle the error as needed
  }
};

export const fetchPosts = async () => {
  try {
    const response = await Client.get(POSTS_URL);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Postlar getirilirken bir hata oluştu:', error);
    return []; // Return an empty array or handle the error as needed
  }
};

export const fetchTodos = async () => {
  try {
    const response = await Client.get(TODOS_URL);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Yapılacaklar getirilirken bir hata oluştu:', error);
    return []; // Return an empty array or handle the error as needed
  }
};
