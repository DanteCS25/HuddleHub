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
        // Effect to update recording duration every second
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

    useEffect(() => {
        // Your effect code here
    }, [image]); // Include image in the dependency array

    const handleCreation = async () => {
        // Ensure image is selected before creating the user
        console.log('Current image URI:', image); // Ensure this log is showing the expected URI
        if (!image) {
            console.error('Image not selected.');
            return;
        }
    
        // Create user object with entered data
        const user = {
            title,
            priority,
            due,
            description,
            image,
            recording: recording ? recording.getURI() : null, // Store only the URI of the recording
            isCompleted: false
        };
    
        // Call createNewCompUser function with user object
        const success = await createNewCompUser(user);
        if (success) {
            // Navigate to the competition page
            navigation.navigate('Competition');
        } else {
            // Handle error
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
            allowsEditing: false,  // Set this to false to not force users to edit the photo
            aspect: [4, 3],
            quality: 1,
        });

        console.log('Image picker result:', result); // Add this to inspect the result object
        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            console.log('Set image URI:', result.assets[0].uri);
        } else {
            console.error('No URI found in result or operation cancelled');
        }
    };
    
    const startRecording = async () => {
        try {
            // Request audio recording permissions
            await Audio.requestPermissionsAsync();
            // Set audio recording mode
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Create a new recording instance
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            // Set the recording instance
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
        console.log('Recording stopped and stored at', uri);
        // Load recorded sound for playback
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

                        <Text style={styles.joinText}>Join the</Text>
                        <Text style={ styles.huddleText}>Huddle</Text>


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
                            <Text style={styles.durationText}>{`${Math.floor(recordingDuration / 60)}:${recordingDuration % 60}`
                        }</Text>
                        </View>
                    )}

                    {sound && (
                        <View style={styles.recordingContainer}>
                            <TouchableOpacity style={styles.button} onPress={isPlaying ? stopPlayback : playRecording}>
                                <Text style={styles.buttonText}>{isPlaying ? 'Stop playback' : 'Play recording'}</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity style={styles.createButton} onPress={handleCreation}>
                        <Text style={styles.buttonText}>Create Competition Joiner</Text>
                    </TouchableOpacity>

                    
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
        padding: 20,
        flex: 1,
    },
    joinText: {
        textAlign: 'center',
        letterSpacing: 5, // Add letter spacing
        color: 'white',
        fontSize: 30,
        marginTop: '20%'
    },
    huddleText: {
        color: '#D50A0A', // Different color for "Huddle"
        fontSize: 60,
        textAlign: 'center',
        marginBottom: '20%'
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
        marginTop: '40%',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    recordingContainer: {
        alignItems: 'center',
        marginTop: 20,
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
    }
});

