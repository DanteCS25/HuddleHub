import { StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { handleSignUp } from '../services/createAuth';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

export default function SignUp() {
    const handleGoogleSignUp = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Handle sign-up result
            })
            .catch((error) => {
                // Handle sign-up error
            });
    };

    const handleFacebookSignUp = () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // Handle sign-up result
            })
            .catch((error) => {
                // Handle sign-up error
            });
    };

    const navigation = useNavigation();

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //   TODO: Login Function
    const signup = () => {
        handleSignUp(email, password)
    }

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
            <Text style={styles.text}>Get Registered</Text>

            <View style={styles.inputcontainer}>
                <TextInput placeholder="Username" style={styles.input} placeholderTextColor="white" />
                <TextInput placeholder="Email" style={styles.input} placeholderTextColor="white" onChangeText={newEmail => setEmail(newEmail)} />
                <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} placeholderTextColor="white" onChangeText={newPassword => setPassword(newPassword)} />
            </View>
            
            <View style={styles.button}>
                <TouchableOpacity onPress={signup}>
                    <Text title="Sign Up" style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={navigateToLogin} style={styles.login}>
            <Text style={[styles.loginText, { color: 'white' }]}>Already have an account</Text>
                <Text style={[styles.loginText, { color: '#D50A0A' }]}> Sign In</Text>
            </TouchableOpacity>

            <View style={styles.line}></View>
            <Text style={styles.other}>or SignUp with</Text>
            <View style={styles.loginButton}>
                <TouchableOpacity onPress={handleGoogleSignUp}>
                    <Image source={require('../assets/Google.png')} style={[styles.loginBut, { marginRight: 60, borderColor: 'red' }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookSignUp}>
                    <Image source={require('../assets/facebook.png')} style={[styles.loginBut, { marginRight: 10, borderColor: 'red' }]} />
                </TouchableOpacity>
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
        height: "100%",
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
        left: 40,
        color: 'white'
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
        color: 'white'
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
        top: 700
    },
    button: {
        backgroundColor: '#D50A0A',
        borderRadius: 5,
        position: 'absolute',
        width: '80%',
        height: 40,
        top: 570,
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
        top: 630,
        flexDirection: 'row',
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 10,
        position: 'absolute',
        top: 680
    }
});
