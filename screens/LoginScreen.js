import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {auth} from './firebase';
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import Logo from '../assets/images/Logo_1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {SocialIcon} from 'react-native-elements';
// import AppLoader from '../components/AppLoader';
import { log } from 'react-native-reanimated';
const LoginScreen = () => {
  const {height} = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [loginPending, setLoginPending] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const changePassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(' password rest mail sent');
      })
      .catch(error => {
        alert(error);
      });
  };

  useEffect(() => {
   
    let emailg;
    const getemail = async () => {
      try {
        emailg = await AsyncStorage.getItem('email1');
        if (emailg != null) {
     
        navigation.navigate('News');
        }

      } catch (error) {
        console.log('error');
      }
    };
    
    getemail();

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('News');     
      }   
    });

    return unsubscribe;
    }, [email]);

  const handleSignup = async () => {
    setLoginPending(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        auth.currentUser
          .sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://fir-auth-703bc.firebaseapp.com',
          })
          .then(() => {
            alert('Verification mail sent');
          })
          .catch(err => {
            alert(err.message);
          });
        console.log('Registered with email: ' + user.email);
        AsyncStorage.setItem('email1', email);
      })
      .catch(error => {
        alert(error.message);
          setLoginPending(false);
      });
      if(user)
    setLoginPending(false);
  };

  const handleLogin = async () => {
    setLoginPending(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;

        console.log('Logged in with email: ' + user.email);
        AsyncStorage.setItem('email1', email);
      })
      .catch(error => {
        alert(error.message);
          setLoginPending(false);
      });
  };

  GoogleSignin.configure({
    webClientId:
      '782605860487-0kr0l847tgq2t61imak41avavup3ej1d.apps.googleusercontent.com',
  });

  let email2;

  const signIn = async () => {
    setLoginPending(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      email2 = userInfo.user.email;
      console.log('Signed in as ' + email2);
      AsyncStorage.setItem('email1', email2);
      navigation.navigate('News');

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in cancelled');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progress');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play_services_not_available');
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('error occurred: ');
        // console.log(error);
        AsyncStorage.setItem('email1', email2);
      navigation.navigate('News');
      }
    }
    setLoginPending(false);
  };
  return (
    <>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
          />
        </View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={'#c0c0c0'}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={'#c0c0c0'}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        
        <SocialIcon
          style={styles.button1}
          backgroundColor="red"
          onPress={signIn}
          title="Sign In with Google"
          button
          type="google"
        />
        <TouchableOpacity
          onPress={() => {
            changePassword();
          }}
        >
          <Text style={{ color: "darkgrey",marginVertical:5}}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    
    {/* {loginPending ? <AppLoader/> : null} */}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  inputContainer: {
    width: '80%',
  },

  input: {
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: 700,
    fontSize: 16,
  },
  button1: {
    backgroundColor: 'red',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonOutline1: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText1: {
    color: 'white',
    fontWeight: 700,
    fontSize: 16,
  },
});
