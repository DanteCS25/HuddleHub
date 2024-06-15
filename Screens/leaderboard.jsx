import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase'; // Ensure you have your Firebase configuration here
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Leaderboard() {
    const navigation = useNavigation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const likesSnapshot = await getDocs(collection(db, 'likes'));
                const itemsArray = await Promise.all(
                    likesSnapshot.docs.map(async docSnapshot => {
                        const data = docSnapshot.data();
                        const itemDoc = await getDoc(doc(db, 'items', data.itemId));
                        const itemData = itemDoc.exists() ? itemDoc.data() : { title: 'Unknown' };
                        return {
                            id: docSnapshot.id,
                            itemId: data.itemId,
                            likes: data.likes,
                            title: itemData.title,
                        };
                    })
                );
                // Sort items by title in ascending order and likes in descending order
                const sortedItems = [...itemsArray].sort((a, b) => {
                    if (a.title === b.title) {
                        return b.likes - a.likes;
                    }
                    return a.title.localeCompare(b.title);
                });
                setItems(sortedItems);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items from Firestore:', error);
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!items || items.length === 0) {
        return <Text style={styles.emptyText}>No items available</Text>;
    }

    return (
        <ImageBackground
        source={require('../assets/comp.png')}
        style={styles.backgroundImage}
    >
        <View style={styles.container}>
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
        padding: 20,
        flex: 1,
    },
    menu: {
        top: 50,
        flexDirection: 'row',
    },
    menuButton: {
        width: 25,
        height: 25,
        top: 8,
        marginRight: -10
    },
    menuLogo: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: -10
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
    emptyText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
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
