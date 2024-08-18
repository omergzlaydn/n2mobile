import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PostScreen from './PostScreen';
import {useDataStore} from '../../store';

jest.mock('../../store');
jest.mock('../../services/api', () => ({
  fetchPosts: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('PostScreen', () => {
  const mockPosts = [
    {id: '1', title: 'First Post', body: 'This is the first post'},
    {id: '2', title: 'Second Post', body: 'This is the second post'},
  ];

  beforeEach(() => {
    useDataStore.mockReturnValue({
      posts: mockPosts,
      setPosts: jest.fn(),
    });
  });

  it('renders the posts correctly', () => {
    const {getByText} = render(<PostScreen navigation={mockNavigation} />);

    expect(getByText('First Post')).toBeTruthy();
    expect(getByText('Second Post')).toBeTruthy();
  });

  it('filters the posts based on search query', () => {
    const {getByText, getByPlaceholderText} = render(
      <PostScreen navigation={mockNavigation} />,
    );

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'First');

    expect(getByText('First Post')).toBeTruthy();
    expect(() => getByText('Second Post')).toThrow('Unable to find an element');
  });

  it('sorts the posts in ascending order', () => {
    const {getByText} = render(<PostScreen navigation={mockNavigation} />);

    fireEvent.press(getByText(/Sort/i));

    const sortedPosts = [...mockPosts].sort((a, b) =>
      a.title.localeCompare(b.title),
    );

    sortedPosts.forEach(post => {
      expect(getByText(post.title)).toBeTruthy();
    });
  });

  it('navigates to post detail on "See More" press', () => {
    const {getAllByText} = render(<PostScreen navigation={mockNavigation} />);

    const seeMoreButtons = getAllByText('See More');
    fireEvent.press(seeMoreButtons[0]);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('PostDetail', {
      postId: '1',
    });
  });
});
