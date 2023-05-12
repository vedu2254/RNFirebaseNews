import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import React, {useEffect, useState,useLayoutEffect,useMemo} from 'react';
import {Colors} from '../constants/Colors';
import { auth } from './firebase'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './LoginScreen';
const Drawer=createDrawerNavigator();

function Profile() {
  const [email, setEmail] = useState('null');
  let emailg;
  useEffect(() => {
      const getemail=(async ()=> {
          try{
           emailg=await AsyncStorage.getItem('email1');
            setEmail(emailg);
         }catch(error){
            console.log("error");
         }
      });

      getemail();
      },[email,emailg]);

  const navigation=useNavigation()
    const handleSignOut = () => {
         AsyncStorage.removeItem('email1'); 
        auth.signOut().then(() => {
            navigation.replace("Login")
        }).catch(error => alert(error.message))
    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome: {email}</Text>
      <Text onPress={handleSignOut} style={styles.bottomCenter}>Sign Out</Text>
      {/* <Text onPress={handleSignOut} style={styles.bottomCenter}>Welcome: {email}</Text> */}
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#282A3A',
  },
  text: {
    fontSize: 14,
    color: 'white',
    marginBottom: 24,
    marginTop:15,
    fontWeight: 'bold',
  },
  bottomCenter: {
  color: 'white',
  justifyContent: 'center',
  alignSelf: 'center',
  alignItems: 'center',
  position: 'absolute', //Here is the trick
  bottom: 10, //Here is the trick
},
  buttonContainer: {
    borderColor: Colors.primary400,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 4,
    backgroundColor: 'black',
    paddingHorizontal: 24,
    paddingVertical:12,
    elevation: 10,
  },
  pressed: {
    opacity: 0.4,
  },
  textStyle: {
    fontWeight: 'bold',
    color:'white'
  },
  button: {
    backgroundColor: "#black",
    bottom: 10, //Here is the trick
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: 700,
    fontSize: 16,
  }
});
