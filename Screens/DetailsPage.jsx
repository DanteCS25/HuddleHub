import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore'; // Import addDoc and collection

const DetailsPage = ({ route }) => {
    const { item } = route.params;
    const [sound, setSound] = useState();
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const itemKey = `likes_${item.id}`;

    useEffect(() => {
        loadLikes();
        loadComments();
    }, [item.id]);

    const loadLikes = async () => {
        try {
            const likesString = await AsyncStorage.getItem(itemKey);
            if (likesString !== null) {
                setLikes(parseInt(likesString, 10));
            }
        } catch (error) {
            console.error(`Error loading likes for item ${item.id}`, error);
        }
    };

    const saveLikes = async (likes) => {
        try {
            await addDoc(collection(db, "likes"), { itemId: item.id, likes: likes });
            console.log(`Likes saved for item ${item.id}: ${likes}`);
        } catch (error) {
            console.error(`Error saving likes for item ${item.id}`, error);
        }
    };

    const loadComments = async () => {
        try {
            const commentsString = await AsyncStorage.getItem(`comments_${item.id}`);
            if (commentsString !== null) {
                setComments(JSON.parse(commentsString));
            }
        } catch (error) {
            console.error(`Error loading comments for item ${item.id}`, error);
        }
    };

    const saveComment = async () => {
        try {
            const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const newCommentObj = { id: comments.length + 1, text: comment, time: currentTime };
            const updatedComments = [newCommentObj, ...comments]; // New comment added at the top
            await AsyncStorage.setItem(`comments_${item.id}`, JSON.stringify(updatedComments));
            setComments(updatedComments);
            setComment('');
        } catch (error) {
            console.error(`Error saving comment for item ${item.id}`, error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            await AsyncStorage.setItem(`comments_${item.id}`, JSON.stringify(updatedComments));
            setComments(updatedComments);
        } catch (error) {
            console.error(`Error deleting comment for item ${item.id}`, error);
        }
    };

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync({ uri: item.recording });
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const incrementLikes = () => {
        const newLikes = likes + 1;
        setLikes(newLikes);
        saveLikes(newLikes);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.commentSection}>
                <View style={styles.content}>
                    <Image source={{ uri: item.image }} style={styles.backgroundImage} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.team}>{item.due}</Text>
                    <TouchableOpacity style={styles.button} onPress={playSound}>
                        <Text style={styles.buttonText}>Play Recording</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.likeButton} onPress={incrementLikes}>
                    <Text style={styles.buttonText2}>Like ({likes})</Text>
                </TouchableOpacity>
                <FlatList
                    data={comments}
                    renderItem={({ item }) => (
                        <View style={styles.commentContainer}>
                            <View style={styles.commentTextContainer}>
                                <Text style={styles.commentText}>{item.text}</Text>
                                <Text style={styles.commentTime}>{item.time}</Text>
                            </View>
                            <TouchableOpacity style={styles.trash} onPress={() => deleteComment(item.id)}>
                                <Icon name="trash" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    inverted // Display new comments at the top
                />
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    placeholderTextColor="gray"
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity style={styles.sendButton} onPress={saveComment}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111720',
    },
    content: {
        backgroundColor: 'rgba(40, 40, 40, 0.85)',
        padding: 20,
        borderRadius: 10,
        height: 420,
    },
    backgroundImage: {
        marginTop: 25,
        width: '100%',
        height: '40%',
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
        color: 'white',
    },
    description: {
        color: 'white',
    },
    team: {
        fontStyle: 'italic',
        marginBottom: 25,
        color: 'white',
    },
    commentSection: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#111720',
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        color: 'white',
    },
    sendButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    likeButton: {
        width: 80,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 50,
        marginLeft: 'auto',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText2: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#161D26',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: '5%',
        width: '92%'
    },
    commentTextContainer: {
        flex: 1,
    },
    commentText: {
        color: 'white',
        marginLeft: 15,
        borderRadius: 10,
        backgroundColor: '#161D26',
    },
    commentTime: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 15,
    },
    trash: {
        marginRight: 10
    }
});

export default DetailsPage;
