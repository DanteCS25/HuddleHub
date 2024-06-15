import React from 'react';
import { StyleSheet, View, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import TriviaQuestions from './TriviaQuestions';
import { useNavigation } from '@react-navigation/native';

export default function Trivia() {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={require('../assets/Home.png')} // Replace with your background image path
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image
                                source={require('../assets/menu.png')}
                                style={styles.menuButton}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../assets/AppLogo.png')}
                            style={styles.menuLogo}
                        />
                    </View>
                    <TriviaQuestions />
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    menu: {
        marginBottom: '20%',
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
