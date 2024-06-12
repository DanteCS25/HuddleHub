import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'; // Added Alert
import { useNavigation } from '@react-navigation/native';
import { handleLogin } from '../services/authService';

export default function Login() {
    const navigation = useNavigation();

    const navigateToSignUp = () => {
        navigation.navigate('SignUp'); 
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        if (email.trim() === '' || password.trim() === '') {
            // Alert the user that both fields are required
            Alert.alert('Error', 'Both email and password are required.');
            return;
        }

        handleLogin(email, password);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/background.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.content}>
                <Image
                    source={require('../assets/AppLogo.png')}
                    style={styles.logo}
                />
                <Text style={styles.text}>Sign In</Text>

                <View style={styles.inputcontainer}>
                    <TextInput 
                        placeholder="Email" 
                        style={styles.input} 
                        placeholderTextColor="white" 
                        onChangeText={setEmail} 
                        value={email}
                    />
                    <TextInput 
                        placeholder="Password" 
                        secureTextEntry={true} 
                        style={styles.input} 
                        placeholderTextColor="white" 
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>

                <TouchableOpacity onPress={login} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToSignUp} style={styles.login}>
                    <Text style={styles.loginText}>Create an account</Text>
                    <Text style={[styles.loginText, {color: '#D50A0A'}]}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        resizeMode: 'cover',
        height: "100%",
        width: '100%',
        zIndex: 0,
        position: 'absolute',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 40,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputcontainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    login: {
        flexDirection: 'row',
    },
    loginText: {
        color: 'white',
        marginRight: 5,
    },
});
