import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react';
import {userStore} from '../../store/userStore';
import {HeartRemove, Sort} from 'iconsax-react-native';
import {appStore} from '../../store/appStore';

const FavoritesScreen = observer(() => {
  const {paginatedFavorites, pageSize, page, filteredFavorites} = userStore;

  useEffect(() => {
    // Assuming favorites are already managed in userStore, no need to reset here.
    // If you need to load favorites from a server or local storage, do it here.
    // userStore.loadFavorites(); // Uncomment if there's a loading method
    appStore.setSearchQuery(''); // Reset search query
  }, []);

  const handleLoadMore = () => {
    if (page * pageSize < filteredFavorites.length) {
      userStore.setPage(page + 1);
    }
  };

  const handleSort = () => {
    userStore.setSortOrder(userStore.sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleRemoveFavorite = id => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this item from favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            userStore.removeFavorite(id);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <Sort size="20" color="gray" />
          <Text style={styles.sortText}>
            Sort ({userStore.sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </Text>
        </TouchableOpacity>
      </View>

      {paginatedFavorites.length > 0 ? (
        <FlatList
          data={paginatedFavorites}
          renderItem={({item}) => (
            <View style={styles.container} key={item.id.toString()}>
              <View style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{
                      uri: `https://picsum.photos/200/300?random=${item.id}`,
                    }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.mail}>{item.email}</Text>
                  <Text style={styles.phone}>{item.phone}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
                  <HeartRemove size="24" color="#ff0000" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore} // Load more data when reaching end
          onEndReachedThreshold={0.5} // Trigger loading when reaching 50% of the end
          ListFooterComponent={
            userStore.loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={userStore.loading}
              />
            )
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites added yet.</Text>
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default FavoritesScreen;
