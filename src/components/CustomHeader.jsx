import React from 'react';
import {HambergerMenu, SearchNormal, User} from 'iconsax-react-native';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {appStore} from '../store/appStore'; // Import the global store
import {observer} from 'mobx-react';

const CustomHeader = observer(({placeholder = 'Search'}) => {
  const navigation = useNavigation();

  const handleSearchChange = text => {
    appStore.setSearchQuery(text); // Update the global search query
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>{}}>
          <HambergerMenu size="25" color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <SearchNormal size="20" color="#fff" />
          </View>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={handleSearchChange} // Update search query globally
          />
        </View>
        <TouchableOpacity>
          <User size="30" color="#6B7280" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    gap: 8,
  },
  inputContainer: {
    backgroundColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
  },
});

export default CustomHeader;
