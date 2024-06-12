import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function Trivia() {
    const navigation = useNavigation();

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
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image
                                source={require('../assets/menu.png')}
                                style={styles.menuButton}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require('../assets/NFLogo.png')}
                            style={styles.menuLogo}
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('TriviaQuestions')}>
                        <Text style={styles.navigateText}>Go to Trivia Questions</Text>
                    </TouchableOpacity>
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
    navigateText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    scrollContainer: {
        flexGrow: 1,
    },
});
