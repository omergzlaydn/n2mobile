import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PostScreen from '../../screens/posts';
import PostDetailScreen from '../../screens/posts/postDetailScreen';

const Stack = createStackNavigator();

function PostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostList"
        component={PostScreen}
        options={{
          headerTitle: '',
          headerTitleStyle: {
            color: 'gray',
          },
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          headerTitle: '',
          headerTintColor: 'gray',
        }}
      />
    </Stack.Navigator>
  );
}

export default PostStack;
