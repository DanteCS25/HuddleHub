import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch, ImageBackground, Image } from 'react-native';
import { createNewCompUser } from '../services/dbService';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

const CreateScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(false);
    const [due, setDue] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingDuration(prevDuration => prevDuration + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const handleCreation = async () => {
        if (!image) {
            console.error('Image not selected.');
            return;
        }
    
        const user = {
            title,
            priority,
            due,
            description,
            image,
            recording: recording ? recording.getURI() : null,
            isCompleted: false
        };
    
        const success = await createNewCompUser(user);
        if (success) {
            navigation.navigate('Competition');
        } else {
            console.error('Error creating competition');
        }
    };

    const getPermissionAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access media library was denied');
            return false;
        }
        return true;
    };
  
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.status !== 'granted') {
            console.error('Permission to access media library was denied');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        } else {
            console.error('No URI found in result or operation cancelled');
        }
    };
    
    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
            setIsRecording(true);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        const { sound } = await Audio.Sound.createAsync({ uri });
        setSound(sound);
    };

    const playRecording = async () => {
        if (sound) {
            try {
                await sound.playAsync();
                setIsPlaying(true);
            } catch (error) {
                console.error('Failed to play the sound', error);
            }
        }
    };

    const stopPlayback = async () => {
        if (sound) {
            try {
                await sound.stopAsync();
                setIsPlaying(false);
            } catch (error) {
                console.error('Failed to stop the sound', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.joinText}>Join the</Text>
                        <Text style={styles.huddleText}>Huddle</Text>

                        <TextInput
                            style={styles.inputField}
                            placeholder="Commentary Title"
                            placeholderTextColor="white"
                            onChangeText={newText => setTitle(newText)}
                            value={title}
                        />

                        <TextInput
                            style={styles.inputField}
                            placeholder="Your NFL Team"
                            placeholderTextColor="white"
                            onChangeText={newText => setDue(newText)}
                            value={due}
                        />

                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={styles.inputField}
                            placeholder="Description of your commentary style"
                            placeholderTextColor="white"
                            onChangeText={newText => setDescription(newText)}
                            value={description}
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.button} onPress={pickImage}>
                                <Text style={styles.buttonText}>Pick an image</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : startRecording}>
                                <Text style={styles.buttonText}>{isRecording ? 'Stop recording' : 'Start recording'}</Text>
                            </TouchableOpacity>
                        </View>

                        {image && <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />}

                        {isRecording && (
                            <View style={styles.recordingContainer}>
                                <Text style={styles.recordingText}>Recording...</Text>
                                <View style={styles.soundWave} />
                                <Text style={styles.durationText}>{`${Math.floor(recordingDuration / 60)}:${recordingDuration % 60}`}</Text>
                            </View>
                        )}

                        {sound && (
                            <View style={styles.recordingContainer}>
                                <TouchableOpacity style={styles.button} onPress={isPlaying ? stopPlayback : playRecording}>
                                    <Text style={styles.buttonText}>{isPlaying ? 'Stop playback' : 'Play recording'}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={styles.bottomButtonContainer}>
                        <TouchableOpacity style={styles.createButton} onPress={handleCreation}>
                            <Text style={styles.buttonText}>Create Competition Joiner</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default CreateScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
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
        justifyContent: 'space-between', // Ensure the content is spaced between
    },
    joinText: {
        textAlign: 'center',
        letterSpacing: 5,
        color: 'white',
        fontSize: 30,
        marginTop: '20%',
    },
    huddleText: {
        color: '#D50A0A',
        fontSize: 60,
        textAlign: 'center',
        marginBottom: '10%',
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 15,
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
        color: 'white',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#D50A0A',
        padding: 15,
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    createButton: {
        backgroundColor: '#D50A0A',
        padding: 15,
        borderRadius: 5,
    },
    bottomButtonContainer: {
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    recordingContainer: {
        alignItems: 'center',
        marginTop: 20,
        height: 50,
    },
    recordingText: {
        color: 'red',
        fontSize: 18,
        marginBottom: 10,
    },
    soundWave: {
        width: 100,
        height: 20,
        backgroundColor: 'grey',
    },
    durationText: {
        marginTop: 10,
        fontSize: 16,
        color: 'white',
    },
});
