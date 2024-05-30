import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import your screens
import HomeScreen from '../Screens/home'; // Updated import path
import Leaderboard from '../Screens/leaderboard';
import Trivia from '../Screens/trivia'
import Competition from '../Screens/competition';

// Create drawer navigator
const Drawer = createDrawerNavigator();

function DrawerMenu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Competition" component={Competition} />
        <Drawer.Screen name="LeaderBoard" component={Leaderboard} />
        <Drawer.Screen name="Trivia" component={Trivia} />
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

export default DrawerMenu;
