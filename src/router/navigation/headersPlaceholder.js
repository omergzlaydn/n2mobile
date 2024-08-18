import React from 'react';
import CustomHeader from '../../components/CustomHeader';

export const headersPlaceholder = route => {
  let placeholderText = '';
  switch (route.name) {
    case 'USERS':
      placeholderText = 'Kullanıcıları Ara';
      break;
    case 'POSTS':
      placeholderText = 'Gönderileri Ara';
      break;
    case 'TASKS':
      placeholderText = 'Görevleri Ara';
      break;
    case 'FAVORITES':
      placeholderText = 'Favorileri Ara';
      break;
    default:
      placeholderText = 'Ara';
  }
  return <CustomHeader placeholder={placeholderText} />;
};
