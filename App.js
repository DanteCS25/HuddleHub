import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { BlurView } from 'expo-blur';

// Screens
import HomeScreen from './Screens/home';
import SignUp from './Screens/signup';
import Login from './Screens/login';
import Competition from './Screens/competition';
import Trivia from './Screens/trivia';
import Leaderboard from './Screens/leaderboard';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const handleSignOut = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully");
        })
        .catch((error) => {
            console.log(error.message);
        });
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
    <BlurView intensity={50} style={StyleSheet.absoluteFill}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>HuddleHub</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </BlurView>
  </DrawerContentScrollView>
);

const DrawerContent = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false,
      drawerType: 'front', // Ensures the drawer comes over the content
      drawerStyle: styles.drawer,
      drawerActiveTintColor: 'white',
      drawerActiveBackgroundColor: 'red',
      drawerInactiveTintColor: 'grey',
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Competition" component={Competition} />
    <Drawer.Screen name="Trivia" component={Trivia} />
    <Drawer.Screen name="Leaderboard" component={Leaderboard} />
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
        setLoggedIn(false); // Update the state to reflect user sign-out
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
    backgroundColor: 'transparent', // Make the drawer itself transparent
    width: 250,
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    marginTop: '20%',
    padding: 20,
  },
  drawerHeaderText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '200%'
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
