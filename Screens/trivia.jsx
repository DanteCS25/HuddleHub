import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function Competition() {
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
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

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
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: "5%",
    },
    text: {
        color: 'white',
        marginLeft: "6%",
        fontSize: 18,
        opacity: 0.5,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 20,
        width: 2,
        marginRight: 'auto',
        marginLeft: "45%",
        opacity: 0.3,
    },
    micImage: {
        width: 25,
        height: 25,
        marginLeft: 18,
        opacity: 0.6,
        marginLeft: 'auto',
        marginRight: "9%",
    },
    cards1: {
        height: 350,
        width: '80%',
        top: 150,
        marginLeft: '10%',
        borderRadius: 20,
        alignItems: 'center',
    },
    header: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Verdana',
    },
    cards2: {
        height: '110%',
        width: '100%',
        borderRadius: 20,
        top: '5%',
    },
    footballer: {
        width: '95%',
        height: 435,
        marginLeft: 'auto',
    },
    info1: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
        top: '15%',
    },
    comptetition: {
        width: '100%',
        height: 130,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        borderRadius: 20,
        top: '70%',
        filter: 'blur(50px)',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#D50A0A',
        borderRadius: 5,
        position: 'absolute',
        width: '50%',
        height: 40,
        top: '50%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        top: 11,
        textDecorationLine: 'none',
    },
    scrollContainer: {
        flexGrow: 1,
    },
});