import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (email.trim() === '') {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setIsSubmitted(true);
    }
  };

  const handleGoToLogin = () => {
    setIsSubmitted(false);
    navigation.navigate('LOGIN');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsSubmitted(false)}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'} Şifremi Unuttum</Text>
      </TouchableOpacity>

      {isSubmitted ? (
        <>
          <Text style={styles.title}>Şifremi Unuttum</Text>
          <Text style={styles.confirmationText}>
            Şifre sıfırlama linki <Text style={styles.boldText}>{email}</Text>{' '}
            e-posta adresinize gönderilmiştir. Linke tıklayarak şifrenizi
            sıfırlayabilirsiniz.
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleGoToLogin}>
            <Text style={styles.resetButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Şifremi Unuttum</Text>
          <Text style={styles.instructionText}>
            Şifrenizi sıfırlamak için lütfen sisteme kayıtlı olan kullanıcı
            adınızı ve kayıtlı e-posta adresinizi girin.
          </Text>
          <Text style={[styles.label, !isEmailValid && {color: 'red'}]}>
            E-posta Adresi:
          </Text>
          <TextInput
            style={[styles.input, !isEmailValid && {borderColor: 'red'}]}
            placeholder="E-posta Adresi"
            placeholderTextColor="#999"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setIsEmailValid(true);
            }}
            autoCapitalize="none"
          />
          {!isEmailValid && (
            <Text style={styles.errorText}>
              Sisteme kayıtlı e-posta adresi bulunamadı. Girdiğiniz bilgileri
              kontrol edin ve tekrar deneyin.
            </Text>
          )}
          <Text style={styles.noteText}>
            Not: Şifre sıfırlama işlemi hakkında daha fazla yardım veya destek
            için müşteri hizmetleriyle iletişime geçebilirsiniz.
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>Onayla</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Vazgeç</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#FFF',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
    marginTop: 20,
    textAlign: 'center',
  },
  resetButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 15,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  cancelText: {
    color: '#0000FF',
    fontSize: 14,
    textAlign: 'center',
  },
  confirmationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default ResetPasswordScreen;
