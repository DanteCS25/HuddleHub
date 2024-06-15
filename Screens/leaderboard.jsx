import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { db } from '../firebase'; // Ensure you have your Firebase configuration here
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Leaderboard() {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            const likesSnapshot = await getDocs(collection(db, 'likes'));
            const itemsArray = await Promise.all(
                likesSnapshot.docs.map(async (docSnapshot) => {
                    const data = docSnapshot.data();
                    const itemDoc = await getDoc(doc(db, 'items', docSnapshot.id));
                    const itemData = itemDoc.exists() ? itemDoc.data() : { title: 'Unknown' };
                    return {
                        id: docSnapshot.id,
                        likes: data.count, // Assuming 'count' field holds the number of likes
                        title: itemData.title,
                    };
                })
            );

            // Sort items by likes in descending order and title in ascending order
            const sortedItems = [...itemsArray].sort((a, b) => b.likes - a.likes || a.title.localeCompare(b.title));
            setItems(sortedItems);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items from Firestore:', error);
            setLoading(false);
        }
    };

    // Fetch items on initial load and when the screen is focused
    useEffect(() => {
        fetchItems();
    }, []);

    // Use useFocusEffect to reload data when the screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            fetchItems();
        }, [])
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!items || items.length === 0) {
        return (
            <View style={[styles.container, styles.emptyContainer]}>
                <Text style={styles.emptyText}>No items available</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/comp.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../assets/menu.png')}
                            style={styles.menuButton}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/AppLogo.png')}
                        style={styles.menuLogo}
                    />
                </View>
                <Text style={styles.header}>Leaderboard</Text>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {items.map((item, index) => (
                        <View key={item.id} style={styles.card}>
                            <Text style={styles.rank}>{index + 1}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.likes}>Likes: {item.likes}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        zIndex: -1,
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 60, // Adjust as necessary to avoid overlapping with the header
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    menuButton: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    menuLogo: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22272A',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#22272A',
    },
    emptyText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    header: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: 'rgba(40, 40, 40, 0.85)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rank: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    title: {
        color: 'white',
        fontSize: 18,
        flex: 1,
    },
    likes: {
        color: 'white',
        fontSize: 16,
    },
});
