// Updated Trivia.jsx file

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TriviaQuestions from './TriviaQuestions'; // Import the TriviaQuestions component

export default function Trivia() {
    return (
        <LinearGradient
            colors={['#202B3D', '#121521']}
            start={[1, 0]}
            end={[1, 1]}
            style={styles.gradient}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.menu}>
                        {/* Remove the navigation related code */}
                        <Image
                            source={require('../assets/menu.png')}
                            style={styles.menuButton}
                        />
                        <Image
                            source={require('../assets/AppLogo.png')}
                            style={styles.menuLogo}
                        />
                    </View>
                    {/* Instead of a button, render the TriviaQuestions component directly */}
                    <TriviaQuestions />
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    menu: {
        top: 80,
        flexDirection: 'row',
    },
    menuButton: {
        width: 25,
        height: 25,
        marginLeft: 40,
        top: 8,
    },
    menuLogo: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 30,
    },
    scrollContainer: {
        flexGrow: 1,
    },
});
