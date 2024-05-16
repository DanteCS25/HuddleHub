import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Image
                    source={require('../assets/menu.png')}
                    style={styles.menuButton}
                />
                <Image
                    source={require('../assets/NFLogo.png')}
                    style={styles.menuLogo}
                />
            </View>
            <View>
                <LinearGradient
                    start={[0, 1]}
                    end={[1, 0]}
                    colors={['#161D26', '#111720']}
                    style={styles.search}>
                    <Image
                        source={require('../assets/search.png')}
                        style={styles.searchImage}
                    />
                    <Text style={styles.text}>Search</Text>
                    <View style={styles.line}></View>
                    <Image
                        source={require('../assets/mic.png')}
                        style={styles.micImage}
                    />
                </LinearGradient>
            </View>
            <View style={styles.cards1}>
                <Text style={styles.header}>
                    Thriving NFL Spotlight
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#111720',
        height: '100%',
    },
    menu: {
        top: 80,
        flexDirection: 'row',

    },
    menuButton: {
        width: 25,
        height: 25,
        marginLeft: 40,
        top: 8
    },
    menuLogo: {
        width: 50,
        height: 50,
        marginLeft: 'auto',  // Align to the right
        marginRight: 30,
    },
    search: {
        marginLeft: 30,
        width: "90%",
        height: 60,
        borderRadius: 10,
        top: 110,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 2.0,
        shadowRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: 18,
    },
    text: {
        color: 'white',
        marginLeft: 25,
        fontSize: 18,
        opacity: 0.5
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 20,
        width: 2,
        marginLeft: 168,
        opacity: 0.3
    },
    micImage: {
        width: 25,
        height: 25,
        marginLeft: 18,
        opacity: 0.6,
        marginLeft: 'auto',
        marginRight: 10
    },
    cards1: {
        height: 350,
        width: '80%',
        top: 150,
        marginLeft: '10%',
        borderRadius: 20
    },
    header: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Verdana'
    }
});

export default HomeScreen;
