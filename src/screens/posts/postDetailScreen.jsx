import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {observer} from 'mobx-react';
import {postStore} from '../../store/postStore';

const PostDetailScreen = observer(({route, navigation}) => {
  const {postId} = route.params;
  const comments = postStore.comments.filter(c => c.postId === postId);

  const post = postStore.posts.find(p => p.id === postId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Detail',
      headerBackTitle: 'Back',
    });
  }, [navigation]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Post not found</Text>
      </View>
    );
  }

  const renderComment = ({item}) => (
    <View style={styles.commentContainer}>
      <Image
        source={{uri: 'https://picsum.photos/20'}}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentAuthor}>{item.author}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.body}</Text>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F1F5F9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  commentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    marginBottom: 12,
  },
  commentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default PostDetailScreen;
