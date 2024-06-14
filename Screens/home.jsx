import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
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
                    <View style={styles.shadow}>
                        <LinearGradient
                            start={[0, 1]}
                            end={[1, 0]}
                            intensity={50}
                            colors={['#202B3D', '#202B3D']}
                            style={styles.search}
                        >
                            <Image
                                source={require('../assets/search.png')}
                                style={styles.searchImage}
                            />
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor="white"
                                style={styles.textInput}
                            />
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
                        <View style={styles.cards2}>
                            <LinearGradient
                                start={[1, 0.5]}
                                end={[1, 0]}
                                colors={['#161D26', '#111720']}
                                style={styles.cards2}
                            >
                                <Image
                                    source={require('../assets/Green.png')}
                                    style={styles.footballer}
                                />

                                <View style={styles.comptetition}>
                                    <Text style={styles.info1}>Live Comentary</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Competition')} style={styles.button}>
                                        <Text title="Sign Up" style={styles.buttonText}>Join Us</Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </View>
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
        marginLeft: 30,
        top: 8,
    },
    menuLogo: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 30,
    },
    search: {
        width: "85%", // Adjust width as needed
        height: 60,
        borderRadius: 10,
        top: 110, // Adjust vertical position as needed
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 2.0,
        shadowRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center', // Center horizontally
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
    textInput: {
        color: 'white',
        marginLeft: "6%",
        fontSize: 18,
        opacity: 0.5,
        flex: 1,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 20,
        width: 2,
        marginRight: "4%",
        opacity: 0.3,
    },
    micImage: {
        width: 25,
        height: 25,
        marginLeft: 18,
        opacity: 0.6,
        marginLeft: 'auto',
        marginRight: "6%",
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
        fontFamily: 'Verdana_400Regular',
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

export default HomeScreen;
