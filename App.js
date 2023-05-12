import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react'
import { AuthContext } from './components/context';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Profile from './screens/Profile';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from "./screens/SearchScreen";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry } from 'react-native-web';
console.disableYellowBox = true;

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer=createDrawerNavigator();

function AppBottomStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#191825',
          borderTopWidth: 0,
          borderTopEndRadius: 24,
          borderTopStartRadius: 24,
          height: 60,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#3A98B9',
      }}>
      
      <BottomTab.Screen
        name="News"
        component={HomeScreen}
        options={{
          tabKeyToHideLabel: true,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabKeyToHideLabel: true,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
function Navigation() {
  return (
      <Drawer.Navigator 
      drawerContent={props=> <Profile{...props}/>} 
      ScreenOptions={{ 
        drawerType: "slide",
        headerStyle: {
          height: 60, // Specify the height of your custom header
          backgroundColor: "blue",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: true ,
        headerTitle: "News",   
        headerColor: "black",
        headerTitleAlign: "center",}}
      >
        <Drawer.Screen name=" " component={AppBottomStack } 
         headerShown={false} 
         />
      </Drawer.Navigator> 
  ); 
}

export default function App() {

  // const [isLoading,setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState={
    isLoading:true,
    userName: null,
    userToken:null,
   };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      
        case 'LOGIN':
          return {
            ...prevState,
            userName: action.id,
            userToken: action.token,
            isLoading: false,
          };
        
          case 'LOGOUT':
            return {
              ...prevState,
              userName:null,
              userToken:null,
              isLoading:false,
            };

            case 'REGISTER':
              return {
                ...prevState,
                userName:null,
                userToken:null,
                isLoading:false,
              };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

  const authContext= React.useMemo(()=>({
    signIn: async(userName, password) => {
      let userToken;
      userToken=null;

      if(userName == 'user' && password == 'pass'){
        try{
          userToken = 'dfgdfg';
          await AsyncStorage.setItem('userToken', userToken);
        } catch(e){
          console.log(e);
        }
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: async()=>{
      try{
        await AsyncStorage.removeItem('userToken');
      } catch(e){
        console.log(e);
      }
      dispatch({ type: 'LOGOUT'});
    },
    signUp: ()=>{;
    },
  }),[]);

  useEffect(()=>{
    setTimeout(async()=>{
      // setIsLoading(false);
      let userToken;
      userToken=null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e){
        console.log(e);
      }
      dispatch({ type: 'REGISTER',  token: userToken});

    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  return (
    <AuthContext.Provider value = {authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false}} name="News" component={Navigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
