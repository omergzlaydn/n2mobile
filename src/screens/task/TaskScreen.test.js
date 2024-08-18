import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import TaskScreen from './TaskScreen';
import {useDataStore} from '../../store';
import {fetchTodos} from '../../services/api';

jest.mock('../../store');
jest.mock('../../services/api');

describe('TaskScreen', () => {
  const mockTodos = [
    {id: '1', title: 'First Task'},
    {id: '2', title: 'Second Task'},
  ];

  const mockSetTodos = jest.fn();
  const mockAddFavorite = jest.fn();

  beforeEach(() => {
    useDataStore.mockReturnValue({
      todos: mockTodos,
      setTodos: mockSetTodos,
      addFavorite: mockAddFavorite,
    });

    fetchTodos.mockResolvedValue(mockTodos);
  });

  it('renders todos correctly', async () => {
    const {getByText} = render(<TaskScreen />);

    await waitFor(() => {
      expect(getByText('First Task')).toBeTruthy();
      expect(getByText('Second Task')).toBeTruthy();
    });
  });

  it('calls setTodos on fetchTodos success', async () => {
    render(<TaskScreen />);

    await waitFor(() => {
      expect(mockSetTodos).toHaveBeenCalledWith(mockTodos);
    });
  });

  it('handles checkbox toggle correctly', async () => {
    const {getAllByRole} = render(<TaskScreen />);

    const checkboxes = getAllByRole('checkbox');

    fireEvent(checkboxes[0], 'onValueChange', true);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockTodos[0]);
  });

  it('displays error message on fetchTodos failure', async () => {
    const mockError = 'Error fetching todos';
    fetchTodos.mockRejectedValueOnce(new Error(mockError));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<TaskScreen />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching todos:',
        new Error(mockError),
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
