import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react';
import {fetchTodos} from '../../services/api';
import {taskStore} from '../../store/taskStore';
import {appStore} from '../../store/appStore';
import CheckBox from '@react-native-community/checkbox';
import {Sort} from 'iconsax-react-native';

const TaskScreen = observer(() => {
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        taskStore.setTodos(fetchedTodos); // Update TaskStore with fetched todos
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    loadTodos();
    appStore.setSearchQuery(''); // Reset search query
  }, []);

  const handleCheckboxToggle = todo => {
    if (taskStore.isFavorite(todo.id)) {
      taskStore.removeFavorite(todo.id);
    } else {
      taskStore.addFavorite(todo);
    }
  };

  const handleSearchChange = query => {
    appStore.setSearchQuery(query); // Update the global search query in AppStore
  };

  const handleSort = () => {
    taskStore.setSortOrder(taskStore.sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <CheckBox
        value={taskStore.isFavorite(item.id)} // Check if the todo is a favorite
        onValueChange={() => handleCheckboxToggle(item)}
      />
      <Text style={styles.itemText}>{item.title || 'No Title'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Sort size="20" color="gray" />
          <Text style={styles.sortText}>
            Sort ({taskStore.sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={taskStore.filteredTodos} // Use filtered and sorted todos from TaskStore
        renderItem={renderItem}
        keyExtractor={item =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F1F5F9',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginLeft: 5,
    color: 'gray',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default TaskScreen;
