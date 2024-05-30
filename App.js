import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

// Screens
import HomeScreen from './Screens/home';
import SignUp from './Screens/signup';
import Login from './Screens/login';
import Competition from './Screens/competition';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} style={styles.drawerContent}>
    <View style={styles.drawerHeader}>
      <Text style={styles.drawerHeaderText}>HuddleHub</Text>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const DrawerContent = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: styles.drawer,
      drawerContentOptions: {
        activeTintColor: '#e91e63',
        inactiveTintColor: '#fff',
      },
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Competition" component={Competition} />
  </Drawer.Navigator>
);

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User Logged In...' + user.email);
        setLoggedIn(true);
      } else {
        console.log('No User logged in...');
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully');
    } catch (error) {
      console.error('Error signing up: ', error);
      setError(error.message);
    }
  };

  return (
    <NavigationContainer>
      {loggedIn ? (
        <DrawerContent />
      ) : (
        <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
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
  drawer: {
    backgroundColor: '#333',
    width: 250,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#444',
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#555',
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
