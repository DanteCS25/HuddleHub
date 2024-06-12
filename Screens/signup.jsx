import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    placeholderTextColor="white"
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    placeholderTextColor="white"
                    onChangeText={newEmail => setEmail(newEmail)}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.input}
                    placeholderTextColor="white"
                    onChangeText={newPassword => setPassword(newPassword)}
                />
            </View>
            
            <View style={styles.button}>
                <TouchableOpacity onPress={signup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        zIndex: -1,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputcontainer: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 20,
        color: 'white',
        borderRadius: 8,
        borderColor: 'grey',
    },
    button: {
        backgroundColor: '#D50A0A',
        borderRadius: 5,
        width: '80%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    login: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    loginText: {
        fontSize: 15,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 10,
    },
    other: {
        color: 'white',
        marginBottom: 20,
    },
    loginButton: {
        flexDirection: 'row',
    },
    loginBut: {
        width: 80,
        height: 80,
        borderColor: 'red',
    },
});
