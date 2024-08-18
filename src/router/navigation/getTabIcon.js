import React from 'react';
import {
  Add,
  Like1,
  Task,
  User,
  Lock1,
  PasswordCheck,
} from 'iconsax-react-native';

const getTabIcon = (routeName, color) => {
  switch (routeName) {
    case 'USERS':
      return <User size="30" color={color} />;

    case 'POSTS':
      return <Add size="30" color={color} />;

    case 'TASKS':
      return <Task size="30" color={color} />;

    case 'FAVORITES':
      return <Like1 size="30" color={color} />;

    case 'LOGIN':
      return <Lock1 size="30" color={color} />;
    case 'RESET_PASSWORD':
      return <PasswordCheck size="30" color={color} />;

    default:
      return null;
  }
};

export default getTabIcon;
