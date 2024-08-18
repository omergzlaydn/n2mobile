import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {observer} from 'mobx-react';
import {fetchUsers} from '../../services/api';
import {userStore} from '../../store/userStore';
import {HeartAdd} from 'iconsax-react-native';
import {appStore} from '../../store/appStore';

const UserScreen = observer(() => {
  const [favoriteList, setFavoriteList] = React.useState(userStore.favorites);
  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      userStore.setUsers(users); // Update UserStore with fetched users
    };

    loadUsers();
    appStore.setSearchQuery(''); // Reset search query
  }, []);

  useEffect(() => {}, [favoriteList]);

  const toggleFavorite = user => {
    if (userStore.isFavorite(user.id)) {
      userStore.removeFavorite(user.id);
    } else {
      userStore.addFavorite(user);
    }
  };

  const renderItem = ({item}) => {
    const isFavorite = userStore.isFavorite(item.id);
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image
              source={{uri: `https://picsum.photos/200/300?random=${item.id}`}}
              style={styles.image}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.mail}>{item.email}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleFavorite(item)}>
            <HeartAdd
              size="24"
              color={isFavorite ? '#ff0000' : '#172554'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={userStore.filteredUsers} // Use filtered users from UserStore
        renderItem={renderItem}
        extraData={userStore.favorites.length} // Ensure FlatList re-renders on favorite change
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageWrapper: {
    width: 68,
    height: 68,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  mail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  icon: {
    padding: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default UserScreen;
