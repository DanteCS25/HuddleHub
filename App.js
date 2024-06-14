import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth, db } from './firebase'; // Import Firebase services
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { onAuthStateChanged } from 'firebase/auth';

// Screens
import HomeScreen from './Screens/home';
import SignUp from './Screens/signup';
import Login from './Screens/login';
import Competition from './Screens/competition';
import Trivia from './Screens/trivia';
import Leaderboard from './Screens/leaderboard';
import JoinUs from './Screens/JoinUs'; // Make sure the import path is correct
import DetailsPage from './Screens/DetailsPage'; // Import the DetailsPage component

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const handleSignOut = async (navigation) => {
    try {
        await auth.signOut();
        navigation.navigate('Login');
    } catch (error) {
        console.error('Sign out error:', error);
    }
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
    <View style={styles.drawerBackground}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>HuddleHub</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.bottomSpacer}></View>
      <TouchableOpacity style={styles.signOutButton} onPress={() => handleSignOut(props.navigation)}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  </DrawerContentScrollView>
);

const DrawerContent = ({ setDrawerOpen }) => (
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
      overlayColor: 'transparent',
    }}
    onDrawerOpen={() => setDrawerOpen(true)}
    onDrawerClose={() => setDrawerOpen(false)}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Competition" component={Competition} />
    <Drawer.Screen name="Join Us" component={JoinUs} options={({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Competition')}>
          <Text>Back</Text>
        </TouchableOpacity>
      ),
      headerLeftContainerStyle: {
        paddingLeft: 10,
      }
    })} />
    <Drawer.Screen name="Trivia" component={Trivia} />
    <Drawer.Screen name="Leaderboard" component={Leaderboard} />
    <Drawer.Screen name="DetailsPage" component={DetailsPage} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailsPage" component={DetailsPage} />
        <Stack.Screen name="Login" component={Login} /> {/* Added this line for the 'Login' screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User is logged in:', currentUser);
        setLoggedIn(true);
      } else {
        console.log('No user is logged in');
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
        <View style={{ flex: 1 }}>
          {drawerOpen && (
            <Pressable style={styles.overlay} onPress={() => setDrawerOpen(false)} />
          )}
          <DrawerContent setDrawerOpen={setDrawerOpen} />
        </View>
      ) : (
        <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DetailsPage" component={DetailsPage} />
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
  drawerBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)', // Darker, semi-transparent background
  },
  drawerHeader: {
    marginTop: '12%',
    padding: 20,
  },
  drawerHeaderText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    flex: 1,
  },
  signOutButton: {
    backgroundColor: 'red',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
