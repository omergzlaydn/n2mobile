import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {observer} from 'mobx-react';
import {postStore} from '../../store/postStore';
import {fetchPosts} from '../../services/api';
import {Sort} from 'iconsax-react-native';
import {appStore} from '../../store/appStore';

const PostScreen = observer(({navigation}) => {
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await fetchPosts(); // Fetch posts from API or any source
        postStore.setPosts(posts); // Set posts in the MobX store
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };

    loadPosts(); // Call the function to load posts when the component mounts
    appStore.setSearchQuery(''); // Reset search query
  }, []); // Empty dependency array ensures this effect runs only once

  const handleSort = () => {
    postStore.setSortOrder(postStore.sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderItem = ({item}) => (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.body}</Text>
      <TouchableOpacity
        style={styles.seeMoreButton}
        onPress={() => navigation.navigate('PostDetail', {postId: item.id})}>
        <Text style={styles.seeMoreText}>See More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Sort size="20" color="gray" />
        <Text style={styles.sortText}>
          Sort ({postStore.sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </Text>
      </TouchableOpacity>

      <FlatList
        data={postStore.paginatedPosts} // Use paginated and sorted posts here
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.pageButton,
            postStore.currentPage === 1 && styles.disabled,
          ]}
          onPress={() =>
            postStore.setCurrentPage(Math.max(postStore.currentPage - 1, 1))
          }
          disabled={postStore.currentPage === 1}>
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumberText}>
          {postStore.currentPage} / {postStore.totalPages}
        </Text>
        <TouchableOpacity
          style={[
            styles.pageButton,
            postStore.currentPage === postStore.totalPages && styles.disabled,
          ]}
          onPress={() =>
            postStore.setCurrentPage(
              Math.min(postStore.currentPage + 1, postStore.totalPages),
            )
          }
          disabled={postStore.currentPage === postStore.totalPages}>
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sortText: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 14,
  },
  postContainer: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    color: '#6C6C6C',
    marginBottom: 16,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  seeMoreText: {
    color: '#6200EE',
    fontSize: 14,
    marginRight: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageButton: {
    padding: 8,
    backgroundColor: '#6200EE',
    borderRadius: 8,
  },
  pageButtonText: {
    color: '#FFFFFF',
  },
  disabled: {
    backgroundColor: '#CCCCCC',
  },
  pageNumberText: {
    fontSize: 16,
  },
});

export default PostScreen;
