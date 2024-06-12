import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { getCompUser } from '../services/dbService';
import { AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';

export default function Competition() {
    const navigation = useNavigation();
    const [compUsers, setCompUsers] = useState([]);

    useFocusEffect(
        useCallback(() => {
            handleGettingOfData();
            return () => {
                // Cleanup if needed
            };
        }, [])
    );

    const handleGettingOfData = async () => {
        const allData = await getCompUser();
        setCompUsers(allData);
    };

    // Update the handlePressListen function to navigate to 'DetailsPage'
    const handlePressListen = async (itemId) => {
        const item = compUsers.find(user => user.id === itemId);
        if (item) {
            navigation.navigate('DetailsPage', { item });
        } else {
            console.log("Item not found");
        }
    };

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
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButtonContainer}>
                            <Image
                                source={require('../assets/menu.png')}
                                style={styles.menuButton}
                            />
                        </TouchableOpacity>
                        <View style={styles.spacer} />
                        <Image
                            source={require('../assets/NFLogo.png')}
                            style={styles.menuLogo}
                        />
                    </View>
                    <BlurView intensity={50} style={styles.signupContent}>
                        <View style={styles.signupInnerContent}>
                            <View style={styles.textContainer}>
                                <Text style={styles.drawerHeaderText}>Enter the Huddle</Text>
                            </View>
                            <TouchableOpacity style={styles.signOutButton} onPress={() => navigation.navigate('JoinUs')}>
                                <Text style={styles.signOutButtonText}>Join Us</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                    <SafeAreaView style={styles.dataContainer}>
                        {compUsers.length > 0 ? (
                            compUsers.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.card} onPress={() => handlePressListen(item.id)}>
                                    <LinearGradient
                                        colors={['#161D26', '#111720']}
                                        start={[1, 0.5]}
                                        end={[1, 0]}
                                        style={styles.cardBackground}
                                    >
                                        <View style={styles.cardContent}>
                                            <Text style={styles.cardTitle}>{item.title}</Text>
                                            <Text style={styles.cardDescription}>{item.description}</Text>
                                            {item.priority ? <AntDesign name="star" size={24} color="red" /> : null}
                                            <TouchableOpacity
                                                style={styles.listenButton}
                                                onPress={() => handlePressListen(item.id)}
                                            >
                                                <Text style={styles.listenButtonText}>Listen</Text>
                                                <AntDesign name="arrowright" size={24} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text style={styles.noItemsText}>No Items Found Yet</Text>
                        )}
                    </SafeAreaView>
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
        flex: 1,
        backgroundColor: 'transparent',
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        position: 'absolute',
        top: 80,
    },
    menuButtonContainer: {
        flex: 1,
    },
    menuButton: {
        width: 25,
        height: 25,
    },
    menuLogo: {
        width: 50,
        height: 50,
    },
    spacer: {
        flex: 1,
    },
    signupContent: {
        width: '90%',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        marginTop: '45%',
        overflow: 'hidden',
        marginBottom: '5%'
    },
    signupInnerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    textContainer: {
        flex: 1,
    },
    drawerHeaderText: {
        fontSize: 20,
        color: 'white',
    },
    signOutButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    signOutButtonText: {
        color: 'white',
        fontSize: 16,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    dataContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    card: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardBackground: {
        borderRadius: 10,
    },
    cardContent: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardDescription: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 5,
        paddingBottom: 20
    },
    listenButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    listenButtonText: {
        color: 'white',
        fontSize: 16,
        marginRight: 5,
    },
    noItemsText: {
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
    },
});
