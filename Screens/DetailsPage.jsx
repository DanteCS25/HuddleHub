import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

const DetailsPage = ({ route }) => {
    const { item } = route.params;
    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           { uri: item.recording }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync(); 
    }

    React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); 
            }
          : undefined;
    }, [sound]);

    return (
        <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
            <Text>Due: {item.due}</Text>
            <Text>Priority: {item.priority ? 'High' : 'Low'}</Text>
            <Button title="Play Recording" onPress={playSound} />
        </View>
    );
}

export default DetailsPage;
