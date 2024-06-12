// // TriviaQuestions.js or TriviaQuestions.jsx

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const questions = [
//     { question: "Who won the Super Bowl in 2020?", options: ["Chiefs", "49ers"], answer: "Chiefs" },
//     { question: "What is the NFL's highest-scoring game?", options: ["Rams vs. Chiefs", "Giants vs. Saints"], answer: "Rams vs. Chiefs" },
//     // Add more questions here
// ];

// const TriviaQuestions = () => {
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null);

//     useEffect(() => {
//         // Randomize questions on each component mount
//         questions.sort(() => Math.random() - 0.5);
//     }, []);

//     const handleOptionPress = (option) => {
//         setSelectedOption(option);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.question}>{questions[currentQuestion].question}</Text>
//             {questions[currentQuestion].options.map((option, index) => (
//                 <TouchableOpacity
//                     key={index}
//                     style={[
//                         styles.option,
//                         selectedOption === option
//                             ? option === questions[currentQuestion].answer ? styles.correct : styles.incorrect
//                             : null,
//                     ]}
//                     onPress={() => handleOptionPress(option)}
//                 >
//                     <Text style={styles.optionText}>{option}</Text>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//     },
//     question: {
//         fontSize: 20,
//         marginBottom: 20,
//     },
//     option: {
//         padding: 10,
//         marginVertical: 5,
//         backgroundColor: 'lightgrey',
//         borderRadius: 5,
//     },
//     correct: {
//         backgroundColor: 'green',
//     },
//     incorrect: {
//         backgroundColor: 'red',
//     },
//     optionText: {
//         fontSize: 18,
//     },
// });

// export default TriviaQuestions; // Ensure default export
