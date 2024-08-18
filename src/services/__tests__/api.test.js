import {fetchUsers, fetchPosts, fetchTodos} from '../api';
import Client from '../instance';
import {USERS_URL, POSTS_URL, TODOS_URL} from '../../utils/url';

// Mocking Client.get
jest.mock('../instance', () => ({
  get: jest.fn(),
}));

describe('fetchUsers', () => {
  it('should fetch users and return the data', async () => {
    const mockUsers = [{id: 1, name: 'John Doe'}];
    Client.get.mockResolvedValueOnce({data: mockUsers});

    const result = await fetchUsers();

    expect(Client.get).toHaveBeenCalledWith(USERS_URL);
    expect(result).toEqual(mockUsers);
  });

  it('should log an error and return an empty array when fetching users fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Network Error');
    Client.get.mockRejectedValueOnce(mockError);

    const result = await fetchUsers();

    expect(Client.get).toHaveBeenCalledWith(USERS_URL);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Kullanıcılar getirilirken bir hata oluştu:',
      mockError,
    );
    expect(result).toEqual([]); // Expect an empty array on error

    consoleSpy.mockRestore();
  });
});

describe('fetchPosts', () => {
  it('should fetch posts and return the data', async () => {
    const mockPosts = [{id: 1, title: 'Post Title'}];
    Client.get.mockResolvedValueOnce({data: mockPosts});

    const result = await fetchPosts();

    expect(Client.get).toHaveBeenCalledWith(POSTS_URL);
    expect(result).toEqual(mockPosts);
  });

  it('should log an error and return an empty array when fetching posts fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Network Error');
    Client.get.mockRejectedValueOnce(mockError);

    const result = await fetchPosts();

    expect(Client.get).toHaveBeenCalledWith(POSTS_URL);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Postlar getirilirken bir hata oluştu:',
      mockError,
    );
    expect(result).toEqual([]); // Expect an empty array on error

    consoleSpy.mockRestore();
  });
});

describe('fetchTodos', () => {
  it('should fetch todos and return the data', async () => {
    const mockTodos = [{id: 1, task: 'Do something'}];
    Client.get.mockResolvedValueOnce({data: mockTodos});

    const result = await fetchTodos();

    expect(Client.get).toHaveBeenCalledWith(TODOS_URL);
    expect(result).toEqual(mockTodos);
  });

  it('should log an error and return an empty array when fetching todos fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockError = new Error('Network Error');
    Client.get.mockRejectedValueOnce(mockError);

    const result = await fetchTodos();

    expect(Client.get).toHaveBeenCalledWith(TODOS_URL);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Yapılacaklar getirilirken bir hata oluştu:',
      mockError,
    );
    expect(result).toEqual([]); // Expect an empty array on error

    consoleSpy.mockRestore();
  });
});
