import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, Modal } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const DetailsPage = ({ route }) => {
    const { item } = route.params;
    const [sound, setSound] = useState();
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [mostLikedComment, setMostLikedComment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
            const newCommentObj = { id: comments.length + 1, text: comment, time: currentTime, likes: 0 }; // Initialize likes to 0
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

    const likeComment = async (commentId) => {
        try {
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, likes: comment.likes + 1 };
                }
                return comment;
            });
            await AsyncStorage.setItem(`comments_${item.id}`, JSON.stringify(updatedComments));
            setComments(updatedComments);
        } catch (error) {
            console.error(`Error liking comment for item ${item.id}`, error);
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

    const showMostLikedComment = () => {
        const mostLiked = comments.reduce((max, comment) => (comment.likes > max.likes ? comment : max), comments[0]);
        setMostLikedComment(mostLiked);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={{ uri: item.image }} style={styles.backgroundImage} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.team}>{item.due}</Text>
                <TouchableOpacity style={styles.button} onPress={playSound}>
                    <Text style={styles.buttonText}>Play Recording</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.likeButton} onPress={incrementLikes}>
                    <Text style={styles.buttonText2}>Like ({likes})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.showMostLikedButton} onPress={showMostLikedComment}>
                    <Text style={styles.buttonText2}>Show Most Liked Comment</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <View style={styles.commentTextContainer}>
                            <Text style={styles.commentText}>{item.text}</Text>
                            <Text style={styles.commentTime}>{item.time}</Text>
                            <Text style={styles.commentLikes}>Likes: {item.likes}</Text>
                        </View>
                        <View style={styles.commentActions}>
                            <TouchableOpacity style={styles.likeCommentButton} onPress={() => likeComment(item.id)}>
                                <Icon name="thumbs-up" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.trash} onPress={() => deleteComment(item.id)}>
                                <Icon name="trash" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.commentsList}
                ListFooterComponent={<View style={{ height: 100 }} />} // Spacer for input field
            />
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
            {mostLikedComment && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Most Liked Comment:</Text>
                        <Text style={styles.modalText}>{mostLikedComment.text}</Text>
                        <Text style={styles.modalText}>Likes: {mostLikedComment.likes}</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
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
        height: '40%',
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    commentsList: {
        paddingBottom: 150, // Add padding to avoid overlap with input field
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#111720',
        position: 'absolute',
        bottom: 0,
        width: '100%',
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
        width: 150,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 50,
    },
    showMostLikedButton: {
        width: 200,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 10,
        borderRadius: 50,
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
        width: '90%',
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
    commentLikes: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 15,
    },
    commentActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeCommentButton: {
        marginRight: 10,
    },
    trash: {
        marginRight: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonClose: {
        backgroundColor: 'red',
    },
});

export default DetailsPage;
