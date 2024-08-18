import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FavoritesScreen from './FavoritesScreen';
import {useDataStore} from '../../store';

jest.mock('../../store');

describe('FavoritesScreen', () => {
  const mockFavorites = [
    {id: '1', name: 'John Doe', username: 'johndoe'},
    {id: '2', name: 'Jane Smith', username: 'janesmith'},
  ];

  const mockRemoveFavorite = jest.fn();

  beforeEach(() => {
    useDataStore.mockReturnValue({
      favorites: mockFavorites,
      removeFavorite: mockRemoveFavorite,
    });
  });

  it('renders the favorites correctly', () => {
    const {getByText} = render(<FavoritesScreen />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });

  it('filters the favorites based on search query', () => {
    const {getByText, getByPlaceholderText, queryByText} = render(
      <FavoritesScreen />,
    );

    const searchInput = getByPlaceholderText('Search by name...');
    fireEvent.changeText(searchInput, 'John');

    expect(getByText('John Doe')).toBeTruthy();
    expect(queryByText('Jane Smith')).toBeNull(); // Jane should not be in the list
  });

  it('sorts the favorites in ascending and descending order', () => {
    const {getByText, getByTestId} = render(<FavoritesScreen />);

    const sortButton = getByText('A-Z');
    fireEvent.press(sortButton);

    // After pressing, the sort order should change and the button should reflect it
    expect(getByText('Z-A')).toBeTruthy();

    // Press again to toggle back to ascending order
    fireEvent.press(sortButton);
    expect(getByText('A-Z')).toBeTruthy();
  });

  it('removes a favorite when remove button is pressed', () => {
    const {getByTestId} = render(<FavoritesScreen />);

    const removeButton = getByTestId('remove-button-1'); // Assuming this button has a testID set
    fireEvent.press(removeButton);

    expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
  });

  it('displays "No favorites found" when the list is empty', () => {
    useDataStore.mockReturnValue({
      favorites: [],
      removeFavorite: mockRemoveFavorite,
    });

    const {getByText} = render(<FavoritesScreen />);

    expect(getByText('No favorites found.')).toBeTruthy();
  });
});
