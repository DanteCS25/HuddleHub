import { StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function Login() {
    const handleGoogleSignUp = () => {
        // Add your Google sign-up logic here
    };

    const handleFacebookSignUp = () => {
        // Add your Facebook sign-up logic here
    };

    const navigation = useNavigation();

    const navigateToSignUp = () => {
        navigation.navigate('SignUp'); 
    };

    const navigateToHome = () => {
        navigation.navigate('Home'); 
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/background.jpg')}
                style={styles.backgroundImage}
            />
            <Image
                source={require('../assets/AppLogo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Sign In</Text>

            <View style={styles.inputcontainer}>
                <TextInput placeholder="Email" style={styles.input} placeholderTextColor="white" />
                <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} placeholderTextColor="white" />
            </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={navigateToHome}>
                <Text title="Sign Up" style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={navigateToSignUp}  style={styles.login}>
                <Text style={[styles.loginText, {color: 'white'}]}>Register</Text>
            </TouchableOpacity>


            <View style={styles.line}></View>
            <Text style={styles.other}>or Sign In with</Text>
            <View style={styles.loginButton}>
                <Image source={require('../assets/Google.png')} onPress={handleGoogleSignUp} style={[styles.loginBut, { marginRight: 60, borderColor: 'red' }]} />
                <Image source={require('../assets/facebook.png')} onPress={handleFacebookSignUp} style={[styles.loginBut, { marginRight: 10, borderColor: 'red' }]} />
            </View>
        </View>
    )
}

// Styling
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 1000,
        width: '100%',
        zIndex: 0,
    },
    logo: {
        width: 150,
        height: 150,
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        top: 300,
        left: 40,
        fontFamily: 'Verdana',
        textAlign: 'center',
    },
    inputcontainer: {
        top: 330,
        position: 'absolute',
        width: '100%',
        left: 40
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 20,
        width: '80%',
        top: 40,
        marginBottom: 20,
        color: 'white',
        borderRadius: 8,
        borderColor: 'grey',
    },
    loginButton: {
        position: 'absolute',
        top: 740,
        flexDirection: 'row',
    },
    loginBut: {
        width: 80,
        height: 80,
        borderColor: 'red',
    },
    other: {
        position: 'absolute',
        color: 'white',
        top: 685
    },
    button: {
        backgroundColor: '#D50A0A',
        borderRadius: 5,
        position: 'absolute',
        width: '80%',
        height: 40,
        top: 540,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        top: 11,
        textDecorationLine: 'none',
    },
    login: {
        position: 'absolute',
        color: 'white',
        fontSize: 15,
        top: 600
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 10,
        position: 'absolute',
        top: 650
    }
});

