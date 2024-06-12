import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsPage = ({ route }) => {
    const { item } = route.params;
    const [sound, setSound] = useState();
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

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
            await AsyncStorage.setItem(itemKey, likes.toString());
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
            const newComment = { id: comments.length + 1, text: comment };
            const updatedComments = [...comments, newComment];
            await AsyncStorage.setItem(`comments_${item.id}`, JSON.stringify(updatedComments));
            setComments(updatedComments);
            setNewComment(comment);
            setComment('');
        } catch (error) {
            console.error(`Error saving comment for item ${item.id}`, error);
        }
    };

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            { uri: item.recording }
        );
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
            <View style={styles.content}>
                <Image source={{ uri: item.image }} style={styles.backgroundImage} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.team}>{item.team}</Text>
                <Button title="Play Recording" onPress={playSound} />
            </View>
            <View style={styles.commentSection}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={setComment}
                />
                <Button title="Send" onPress={saveComment} />
                {newComment !== '' && (
                    <Text style={styles.newComment}>{newComment}</Text>
                )}
                <FlatList
                    data={comments}
                    renderItem={({ item }) => <Text style={styles.comment}>{item.text}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <Button title={`Like (${likes})`} onPress={incrementLikes} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Change background color to black
    },
    content: {
        flex: 0,
        backgroundColor: 'rgba(40, 40, 40, 0.85)', // Change to a bit lighter grey
        padding: 20,
        paddingTop: 40, // Add paddingTop to push content below the status bar
        borderRadius: 10,
        height: '40%'
    },
    backgroundImage: {
        width: '100%',
        height: '45%', // Display only 25% of the page
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5, // Reduce marginBottom for the title
        marginTop: 20
    },
    description: {
        marginBottom: 5, // Reduce marginBottom for the description
    },
    team: {
        fontStyle: 'italic',
        marginBottom: 10,
    },
    commentSection: {
        flex: 1,
        padding: 20,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    comment: {
        marginBottom: 5,
    },
    newComment: {
        marginBottom: 5,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    }
});

export default DetailsPage;
