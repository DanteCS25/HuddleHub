import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { createNewCompUser } from '../services/dbService';

const CreateScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(false);
    const [due, setDue] = useState('');
    const [description, setDescription] = useState('');

    const handleCreation = async () => {
        console.log("handleCreation called");
        const user = {
            title,
            priority,
            due,
            description,
            isCompleted: false
        };

        const success = await createNewCompUser(user);
        if (success) {
            navigation.goBack();
        } else {
            // Optionally add an alert or some error handling here
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Commentary Title"
                    onChangeText={newText => setTitle(newText)}
                    value={title}
                />

                <TextInput
                    style={styles.inputField}
                    placeholder="Your NFL Team"
                    onChangeText={newText => setDue(newText)}
                    value={due}
                />

                <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.inputField}
                    placeholder="Description of your commentary style"
                    onChangeText={newText => setDescription(newText)}
                    value={description}
                />

                <View style={styles.switchContainer}>
                    <Switch
                        trackColor={{ false: 'black', true: '#3e3e3e' }}
                        thumbColor={priority ? 'red' : 'white'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggle => setPriority(toggle)}
                        value={priority}
                    />
                    <Text>Priority?</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleCreation}>
                    <Text style={styles.buttonText}>Create Competition Joiner</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default CreateScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#202B3D', // Match the background color
    },
    container: {
        padding: 20,
        flex: 1,
    },
    inputField: {
        borderWidth: 1, // Match border width
        borderColor: 'grey', // Match border color
        marginTop: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8, // Match border radius
        color: 'white'
    },
    button: {
        backgroundColor: '#D50A0A', // Match button color
        padding: 15,
        marginTop: 30,
        borderRadius: 5, // Match border radius
    },
    buttonText: {
        textAlign: 'center',
        color: 'white', // Ensure text color is white
        fontSize: 16,
    },
    switchContainer: {
        marginTop: 15,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    }
});
