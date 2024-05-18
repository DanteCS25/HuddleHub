import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

// Screens
import HomeScreen from './Screens/home';
import SignUp from './Screens/signup';
import Login from './Screens/login';
import Competition from './Screens/competition'


const Stack = createStackNavigator();

export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User Logged In..." + user.email)
        setLoggedIn(true)
      } else {
        console.log("No User logged in...")
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
    } catch (error) {
      console.error("Error signing up: ", error);
      setError(error.message);
    }
  };

  return (
    <NavigationContainer>
      <>
        {loggedIn ? (
          <HomeScreen />
        ) : (
          <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </>
      <Competition />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111720',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
