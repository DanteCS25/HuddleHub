import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from '../Screens/home'; // Updated import path
import Leaderboard from '../Screens/leaderboard';
import Trivia from '../Screens/trivia'

// Create stack navigator for pages
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LeaderBoard" component={Leaderboard} />
      <Stack.Screen name="Trivia" component={Trivia} />
      {/* Add more screens as needed */}
    </Stack.Navigator>
  );
}

// Create drawer navigator
const Drawer = createDrawerNavigator();

function Drawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
        drawerStyle={styles.drawerStyle} 
        drawerContentOptions={{
          activeTintColor: '#ffffff',
          inactiveTintColor: '#000000',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#c6cbef',
    width: 240,
  },
});

export default Drawer;
