import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Dimensions, ImageBackground, margin } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons

const HomeScreen = () => {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.7;
    const margin = screenWidth * 0.05;

    const cardsData = [
        { image: require('../assets/slide1.png'), text: 'Live Commentary', route: 'Competition' },
        { image: require('../assets/slide2.png'), text: 'Trivia', route: 'Trivia' },
        { image: require('../assets/slide3.png'), text: 'Who WON', route: 'Leaderboard' },
    ];

    return (
        <ImageBackground
            source={require('../assets/Home.png')}
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    <View style={styles.search}>
                        <Image
                            source={require('../assets/search.png')}
                            style={styles.searchImage}
                        />
                        <TextInput
                            placeholder="Search"
                            placeholderTextColor="white"
                            style={styles.textInput}
                        />
                        <View style={styles.line}></View>
                        <Image
                            source={require('../assets/mic.png')}
                            style={styles.micImage}
                        />
                    </View>
                    <View style={styles.cards1}>
                        <Text style={styles.header}>
                            Thriving NFL Spotlight
                        </Text>
                        <ScrollView 
                            horizontal 
                            pagingEnabled 
                            snapToInterval={cardWidth + margin} 
                            decelerationRate="fast" 
                            showsHorizontalScrollIndicator={false} 
                            contentContainerStyle={styles.horizontalScroll}
                        >
                            {cardsData.map((card, index) => (
                                <View key={index} style={[styles.card, { width: cardWidth, marginHorizontal: margin / 2 }]}>
                                    <ImageBackground
                                        source={card.image}
                                        style={styles.cardContent}
                                        imageStyle={styles.cardImage}
                                        resizeMode="cover"
                                    >
                                        <View style={styles.competition}>
                                            <Text style={styles.info1}>{card.text}</Text>
                                            <TouchableOpacity onPress={() => navigation.navigate(card.route)} style={styles.button}>
                                                <Text style={styles.buttonText}>
                                                    <Icon name="arrow-right" size={20} color="white" /> {/* Using the arrow icon */}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        resizeMode: 'cover',
        height: '100%',
        width: '100%',
        zIndex: -1,
    },
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    menu: {
        top: 80,
        flexDirection: 'row',
    },
    menuButton: {
        width: 25,
        height: 25,
        marginLeft: 30,
        top: 8,
    },
    menuLogo: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 30,
    },
    search: {
        width: "85%",
        height: 60,
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 1,
        top: 110,
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 2.0,
        shadowRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    searchImage: {
        width: 30,
        height: 30,
        marginLeft: "5%",
    },
    textInput: {
        color: 'white',
        marginLeft: "6%",
        fontSize: 18,
        opacity: 0.5,
        flex: 1,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 20,
        width: 2,
        marginRight: "4%",
        opacity: 0.3,
    },
    micImage: {
        width: 25,
        height: 25,
        marginLeft: 'auto',
        marginRight: "6%",
        opacity: 0.6,
    },
    cards1: {
        height: 550,
        width: '100%',
        top: 150,
        borderRadius: 20,
        alignItems: 'center',
    },
    header: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Verdana_400Regular',
        marginBottom: 10,
    },
    horizontalScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingLeft: margin,
    },
    card: {
        height: 550,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        height: '100%',
        width: '100%',
        borderRadius: 20,
    },
    cardImage: {
        height: 480,
        width: 260,
        borderRadius: 20,
    },
    info1: {
        position: 'absolute',
        color: 'white',
        fontSize: 18,
        width: '100%',
        paddingLeft: 30,
        top: '75%',
    },
    competition: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#D50A0A',
        borderRadius: 10,
        position: 'absolute',
        width: '17%',
        height: 45,
        top: '73%',
        justifyContent: 'center', // Centering the icon
        left: '77%',
        paddingLeft: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
    },
});

export default HomeScreen;
