import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    Alert.alert('Login', `Username: ${username}\nPassword: ${password}`);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <LinearGradient
      colors={['#c71874', '#20779a']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Image
              source={{
                uri: 'https://s3-alpha-sig.figma.com/img/456d/7db5/e693290dc5d16a99329a298385ce5cc8?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZBS9oL915eZ~SeeDE6pl-M0xkCP82NAyYO9eB0eWyn0-TX5u~Pq4PFiUqcCji7XYXsrI5RtCzAJoA9XXsqh3iuZJPeUS-2Lg5dsMX6fgTSq62ArBc-GC6rqfMnp7Xus7jGypVsdBhaINVFxPePf2QSyhmcLCIsHXw4eEdJb4MsLuNrxGQKxYRd-JW-hoHD-brwQ9no~Vg1Pesk51pEo36rh1ym56Ysng6nqoEV6Enq9mAPE0mv8zJlGHK8k9gODbruhaa3gTxrgSTPje0F9oYgPLtqbt4SGc-ZRN3X9xbaDdndKUG68Ew~d1BuaSsNfjmJdfT8Cgr64xMFCJjoKg5A__',
              }}
              style={styles.logo}
            />
            <Text style={styles.welcomeText}>N2Mobil CRM'e Hoş Geldiniz</Text>

            <Text style={styles.label}>Kullanıcı Adı:</Text>
            <TextInput
              style={styles.input}
              placeholder="Kullanıcı Adı"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Parola:</Text>
            <TextInput
              style={styles.input}
              placeholder="Parola"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
    fontFamily: 'Roboto-Bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#0000FF',
    fontSize: 14,
  },
});

export default LoginScreen;
