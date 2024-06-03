import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { getCompUser } from '../services/dbService';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Competition() {
    const navigation = useNavigation();
    const [CompUsers, setCompUsers] = useState([]);

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
                        {CompUsers.length > 0 ? (
                            CompUsers.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("Details")}>
                                    <Text>{item.title}</Text>
                                    {item.priority ? <AntDesign name="star" size={24} color="red" /> : null}
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
        marginTop: '40%',
        overflow: 'hidden',
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
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 2,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold',
        marginRight: 5,
    },
    noItemsText: {
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
    },
});
