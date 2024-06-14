// TriviaQuestions.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define a larger pool of questions
const allQuestions = [
    { id: 1, question: "Who won the Super Bowl in 2020?", options: ["Chiefs", "49ers"], answer: "Chiefs" },
    { id: 2, question: "What is the NFL's highest-scoring game?", options: ["Rams vs. Chiefs", "Giants vs. Saints"], answer: "Rams vs. Chiefs" },
    { id: 3, question: "Which team has won the most Super Bowls?", options: ["Steelers", "Patriots"], answer: "Steelers" },
    { id: 4, question: "Who is the NFL's all-time leading rusher?", options: ["Emmitt Smith", "Walter Payton"], answer: "Emmitt Smith" },
    { id: 5, question: "Which player holds the record for most career touchdown passes?", options: ["Tom Brady", "Peyton Manning"], answer: "Tom Brady" },
    { id: 6, question: "Which team won the first Super Bowl?", options: ["Packers", "Chiefs"], answer: "Packers" },
    { id: 7, question: "Who holds the record for most receiving yards in a single NFL season?", options: ["Calvin Johnson", "Jerry Rice"], answer: "Calvin Johnson" },
    { id: 8, question: "Which team won the most games in a single NFL season (regular season + playoffs)?", options: ["Patriots", "Dolphins"], answer: "Patriots" },
    { id: 9, question: "Who was the first overall pick in the 2021 NFL Draft?", options: ["Trevor Lawrence", "Zach Wilson"], answer: "Trevor Lawrence" },
    { id: 10, question: "Which player holds the record for the longest field goal in NFL history?", options: ["Justin Tucker", "Matt Prater"], answer: "Justin Tucker" },
    { id: 11, question: "What year did the NFL begin?", options: ["1920", "1930"], answer: "1920" },
    { id: 12, question: "Which NFL team has the most consecutive Super Bowl wins?", options: ["Patriots", "Cowboys"], answer: "Patriots" },
    { id: 13, question: "Who is the only player in NFL history to have won the MVP award unanimously?", options: ["Tom Brady", "LaDainian Tomlinson"], answer: "Tom Brady" },
    { id: 14, question: "Which team has the longest winning streak in NFL history?", options: ["Patriots", "Dolphins"], answer: "Patriots" },
    { id: 15, question: "Which player holds the record for the most career interceptions?", options: ["Paul Krause", "Rod Woodson"], answer: "Paul Krause" },
    { id: 16, question: "Who holds the record for the longest interception return in NFL history?", options: ["Ed Reed", "Deion Sanders"], answer: "Ed Reed" },
    { id: 17, question: "Who is the oldest player to ever play in a Super Bowl?", options: ["Tom Brady", "Adam Vinatieri"], answer: "Adam Vinatieri" },
    { id: 18, question: "Which team has the longest losing streak in NFL history?", options: ["Lions", "Cardinals"], answer: "Lions" },
    { id: 19, question: "Who is the only NFL player to have scored a touchdown in a Super Bowl and a World Series game?", options: ["Deion Sanders", "Bo Jackson"], answer: "Bo Jackson" },
    { id: 20, question: "What was the first year the NFL allowed black players to play?", options: ["1920", "1946"], answer: "1946" },
    { id: 21, question: "What team won the first NFL Super Bowl?", options: ["Green Bay Packers", "Kansas City Chiefs"], answer: "Green Bay Packers" },
    { id: 22, question: "What is the most points ever scored by one player in a single NFL game?", options: ["58", "73"], answer: "73" },
    { id: 23, question: "What quarterback was the MVP of the first Super Bowl?", options: ["Bart Starr", "Jim Kelly"], answer: "Bart Starr" },
    { id: 24, question: "What NFL team did not win a game in 2008?", options: ["Detroit Lions", "Cleveland Browns"], answer: "Detroit Lions" },
    { id: 25, question: "What NFL team was the first to lose 16 games in a season?", options: ["Detroit Lions", "New York Giants"], answer: "Detroit Lions" },
    { id: 26, question: "Who won the Super Bowl in 2021?", options: ["Buccaneers", "Chiefs"], answer: "Buccaneers" },
    { id: 27, question: "Which team has the longest playoff drought in NFL history?", options: ["Browns", "Lions"], answer: "Lions" },
    { id: 28, question: "Who is the only player in NFL history with 200 career rushing touchdowns?", options: ["Emmitt Smith", "LaDainian Tomlinson"], answer: "Emmitt Smith" },
    { id: 29, question: "Which team drafted John Elway before trading him to the Broncos?", options: ["Colts", "Jets"], answer: "Colts" },
    { id: 30, question: "Which team lost four Super Bowls in a row in the early 1990s?", options: ["Bills", "Cowboys"], answer: "Bills" },
    { id: 31, question: "Who is the only quarterback to win a Super Bowl with two different teams?", options: ["Peyton Manning", "Joe Montana"], answer: "Peyton Manning" },
    { id: 32, question: "Who holds the record for most career passing yards in NFL history?", options: ["Drew Brees", "Tom Brady"], answer: "Drew Brees" },
    { id: 33, question: "What team has played in the most Super Bowls?", options: ["Patriots", "Steelers"], answer: "Patriots" },
    { id: 34, question: "Who is the only NFL player to rush for over 2,000 yards in a 14-game season?", options: ["O.J. Simpson", "Barry Sanders"], answer: "O.J. Simpson" },
    { id: 35, question: "Which team's fans are known as the '12th Man'?", options: ["Seahawks", "Packers"], answer: "Seahawks" },
    { id: 36, question: "What was the name of the NFL's first-ever playoff game?", options: ["Divisional Playoff", "Pro Bowl"], answer: "Divisional Playoff" },
    { id: 37, question: "Who is the only quarterback to throw for over 5,000 yards in a season without making the Pro Bowl?", options: ["Drew Brees", "Matt Stafford"], answer: "Drew Brees" },
    { id: 38, question: "What was the first NFL team to have cheerleaders?", options: ["Cowboys", "Raiders"], answer: "Cowboys" },
    { id: 39, question: "What team did the Browns move to after the 1995 season?", options: ["Ravens", "Titans"], answer: "Ravens" },
    { id: 40, question: "Who was the first player to win the NFL MVP award in consecutive seasons?", options: ["Brett Favre", "Peyton Manning"], answer: "Brett Favre" },
    { id: 41, question: "Which NFL team is known for the 'Hail Mary' play?", options: ["Cowboys", "Packers"], answer: "Cowboys" },
    { id: 42, question: "Who is the only running back to win the Heisman Trophy, NFL MVP, Super Bowl MVP, and induction into the Hall of Fame?", options: ["Marcus Allen", "Barry Sanders"], answer: "Marcus Allen" },
    { id: 43, question: "What team did the Dolphins beat in Super Bowl VIII?", options: ["Vikings", "Cowboys"], answer: "Vikings" },
    { id: 44, question: "Who was the first African American to be drafted into the NFL?", options: ["Fritz Pollard", "Jim Thorpe"], answer: "Fritz Pollard" },
    { id: 45, question: "Which team has the most playoff appearances without a Super Bowl win?", options: ["Bengals", "Bills"], answer: "Bills" },
    { id: 46, question: "What was the first NFL team to play its home games indoors?", options: ["Saints", "Vikings"], answer: "Saints" },
    { id: 47, question: "Who was the first African American to be inducted into the Pro Football Hall of Fame?", options: ["Jim Brown", "Fritz Pollard"], answer: "Fritz Pollard" },
    { id: 48, question: "Who was the first quarterback to win five Super Bowls?", options: ["Tom Brady", "Joe Montana"], answer: "Tom Brady" },
    { id: 49, question: "What team won the first AFL-NFL World Championship Game, later known as Super Bowl I?", options: ["Packers", "Chiefs"], answer: "Packers" },
    { id: 50, question: "Which NFL team's fans are known as the 'Dawg Pound'?", options: ["Browns", "Bengals"], answer: "Browns" },
    { id: 51, question: "Who was the first player to score a touchdown in a Super Bowl?", options: ["Max McGee", "Bart Starr"], answer: "Max McGee" },
    { id: 52, question: "Which team was the first to win the Super Bowl as a wildcard team?", options: ["Raiders", "Giants"], answer: "Raiders" },
    { id: 53, question: "Who holds the record for most career sacks in NFL history?", options: ["Bruce Smith", "Reggie White"], answer: "Bruce Smith" },
    { id: 54, question: "What team won the first AFL-NFL World Championship Game, later known as Super Bowl II?", options: ["Packers", "Raiders"], answer: "Packers" },
    { id: 55, question: "Who was the first quarterback to pass for over 4,000 yards in a season?", options: ["Dan Fouts", "Joe Namath"], answer: "Dan Fouts" },
    { id: 56, question: "Which team is known for the 'Immaculate Reception'?", options: ["Steelers", "Raiders"], answer: "Steelers" },
    { id: 57, question: "Who was the first defensive player to win the NFL MVP award?", options: ["Alan Page", "Lawrence Taylor"], answer: "Alan Page" },
    { id: 58, question: "What team holds the record for most consecutive playoff appearances?", options: ["Colts", "Patriots"], answer: "Colts" },
    { id: 59, question: "Who was the first player to rush for over 2,000 yards in a season?", options: ["O.J. Simpson", "Eric Dickerson"], answer: "O.J. Simpson" },
    { id: 60, question: "Which quarterback has won the most Super Bowl MVP awards?", options: ["Tom Brady", "Joe Montana"], answer: "Tom Brady" },
    { id: 61, question: "What team won the first Super Bowl after the AFL-NFL merger?", options: ["Jets", "Chiefs"], answer: "Jets" },
    { id: 62, question: "Who is the only player to score six touchdowns in a single NFL game?", options: ["Ernie Nevers", "Gale Sayers"], answer: "Ernie Nevers" },
    { id: 63, question: "What was the first team to win three Super Bowls?", options: ["Steelers", "49ers"], answer: "Steelers" },
    { id: 64, question: "Who is the oldest player to ever be named NFL MVP?", options: ["Tom Brady", "Peyton Manning"], answer: "Tom Brady" },
    { id: 65, question: "What team was the first to use a no-huddle offense?", options: ["Bengals", "Bills"], answer: "Bengals" },
    { id: 66, question: "Who is the only person to score touchdowns in the NFL and MLB?", options: ["Deion Sanders", "Bo Jackson"], answer: "Bo Jackson" },
    { id: 67, question: "Which team did the Seahawks beat to win their first Super Bowl?", options: ["Broncos", "Panthers"], answer: "Broncos" },
    { id: 68, question: "What is the longest field goal in NFL history?", options: ["66 yards", "64 yards"], answer: "66 yards" },
    { id: 69, question: "Who holds the record for the most career interceptions returned for touchdowns?", options: ["Rod Woodson", "Deion Sanders"], answer: "Rod Woodson" },
    { id: 70, question: "What team was the first to use a cheerleading squad?", options: ["Cowboys", "Raiders"], answer: "Raiders" },
    { id: 71, question: "Who was the first African American quarterback to win a Super Bowl?", options: ["Doug Williams", "Warren Moon"], answer: "Doug Williams" },
    { id: 72, question: "What team won the first Super Bowl in the 1990s?", options: ["49ers", "Cowboys"], answer: "49ers" },
    { id: 73, question: "Who holds the record for most career fumble recoveries?", options: ["Jim Marshall", "Jason Taylor"], answer: "Jim Marshall" },
    { id: 74, question: "What is the only NFL team to go an entire season undefeated, including the Super Bowl?", options: ["Dolphins", "Patriots"], answer: "Dolphins" },
    { id: 75, question: "Who is the only player in NFL history to win the Heisman Trophy and be inducted into the Pro Football Hall of Fame?", options: ["Paul Hornung", "Barry Sanders"], answer: "Paul Hornung" },
    { id: 76, question: "Which NFL team had a perfect season, including the playoffs, in 1972?", options: ["Dolphins", "Steelers"], answer: "Dolphins" },
    { id: 77, question: "Who holds the record for the longest touchdown pass in NFL history?", options: ["Patrick Mahomes", "Baker Mayfield"], answer: "Patrick Mahomes" },
    { id: 78, question: "What is the only team to win a Super Bowl with a perfect season?", options: ["Dolphins", "Patriots"], answer: "Dolphins" },
    { id: 79, question: "Who is the only player in NFL history to score a touchdown in 21 consecutive games?", options: ["Ladanian Tomlinson", "Emmitt Smith"], answer: "Ladanian Tomlinson" },
    { id: 80, question: "What team has won the most NFL championships?", options: ["Packers", "Bears"], answer: "Packers" },
    { id: 81, question: "Who holds the record for most career safeties?", options: ["Ted Hendricks", "John Lynch"], answer: "Ted Hendricks" },
    { id: 82, question: "What team did the Ravens defeat to win their first Super Bowl?", options: ["Giants", "49ers"], answer: "Giants" },
    { id: 83, question: "Who is the only quarterback to lead two different teams to Super Bowl victories?", options: ["Peyton Manning", "Tom Brady"], answer: "Peyton Manning" },
    { id: 84, question: "What team was the first to win four Super Bowls?", options: ["Steelers", "49ers"], answer: "Steelers" },
    { id: 85, question: "Who was the first African American head coach to win a Super Bowl?", options: ["Tony Dungy", "Mike Tomlin"], answer: "Tony Dungy" },
    { id: 86, question: "What team is known as 'America's Team'?", options: ["Cowboys", "Patriots"], answer: "Cowboys" },
    { id: 87, question: "Who was the first team to win three Super Bowls in four years?", options: ["49ers", "Cowboys"], answer: "49ers" },
    { id: 88, question: "What was the first team to win the Super Bowl on a last-second field goal?", options: ["Giants", "Patriots"], answer: "Giants" },
    { id: 89, question: "Who was the first team to win the Super Bowl as a wild card?", options: ["Raiders", "Steelers"], answer: "Raiders" },
    { id: 90, question: "What team has the most Hall of Fame inductees?", options: ["Bears", "Packers"], answer: "Bears" },
    { id: 91, question: "Who holds the record for the most career forced fumbles?", options: ["Robert Mathis", "Julius Peppers"], answer: "Robert Mathis" },
    { id: 92, question: "What was the first team to win five Super Bowls?", options: ["49ers", "Steelers"], answer: "Steelers" },
    { id: 93, question: "Who was the first NFL player to rush for over 2,000 yards in a season?", options: ["O.J. Simpson", "Eric Dickerson"], answer: "O.J. Simpson" },
    { id: 94, question: "Who was the first NFL player to rush for over 2,000 yards in a season?", options: ["O.J. Simpson", "Eric Dickerson"], answer: "O.J. Simpson" },
    { id: 95, question: "Which team has the longest playoff drought in NFL history?", options: ["Browns", "Lions"], answer: "Lions" },
    { id: 96, question: "Who is the only player to win five Super Bowl MVP awards?", options: ["Tom Brady", "Joe Montana"], answer: "Tom Brady" },
    { id: 97, question: "What team did the Buccaneers defeat to win their first Super Bowl?", options: ["Raiders", "Chiefs"], answer: "Raiders" },
    { id: 98, question: "Who was the first quarterback to throw for over 5,000 yards in a season?", options: ["Dan Marino", "Drew Brees"], answer: "Dan Marino" },
    { id: 99, question: "Which team's fans are known as the '12th Man'?", options: ["Seahawks", "Packers"], answer: "Seahawks" },
    { id: 100, question: "Who holds the record for the longest punt in NFL history?", options: ["Sam Martin", "Steve O'Neal"], answer: "Steve O'Neal" },
    { id: 101, question: "What team won the first AFL-NFL World Championship Game, later known as Super Bowl I?", options: ["Packers", "Chiefs"], answer: "Packers" },
    { id: 102, question: "Who was the first player to score a touchdown in a Super Bowl?", options: ["Max McGee", "Bart Starr"], answer: "Max McGee" },
    { id: 103, question: "Which team was the first to win the Super Bowl as a wildcard team?", options: ["Raiders", "Giants"], answer: "Raiders" },
    { id: 104, question: "Who holds the record for most career sacks in NFL history?", options: ["Bruce Smith", "Reggie White"], answer: "Bruce Smith" },
    { id: 105, question: "What team won the first AFL-NFL World Championship Game, later known as Super Bowl II?", options: ["Packers", "Raiders"], answer: "Packers" },
    { id: 106, question: "Who was the first quarterback to pass for over 4,000 yards in a season?", options: ["Dan Fouts", "Joe Namath"], answer: "Dan Fouts" },
    { id: 107, question: "Which team is known for the 'Immaculate Reception'?", options: ["Steelers", "Raiders"], answer: "Steelers" },
    { id: 108, question: "Who was the first defensive player to win the NFL MVP award?", options: ["Alan Page", "Lawrence Taylor"], answer: "Alan Page" },
    { id: 109, question: "What team holds the record for most consecutive playoff appearances?", options: ["Colts", "Patriots"], answer: "Colts" },
    { id: 110, question: "Who was the first player to rush for over 2,000 yards in a season?", options: ["O.J. Simpson", "Eric Dickerson"], answer: "O.J. Simpson" },
    { id: 111, question: "Which quarterback has won the most Super Bowl MVP awards?", options: ["Tom Brady", "Joe Montana"], answer: "Tom Brady" },
    { id: 112, question: "What team won the first Super Bowl after the AFL-NFL merger?", options: ["Jets", "Chiefs"], answer: "Jets" },
    { id: 113, question: "Who is the only player to score six touchdowns in a single NFL game?", options: ["Ernie Nevers", "Gale Sayers"], answer: "Ernie Nevers" },
    { id: 114, question: "What was the first team to win three Super Bowls?", options: ["Steelers", "49ers"], answer: "Steelers" },
    { id: 115, question: "Who is the oldest player to ever be named NFL MVP?", options: ["Tom Brady", "Peyton Manning"], answer: "Tom Brady" },
    { id: 116, question: "What team was the first to use a no-huddle offense?", options: ["Bengals", "Bills"], answer: "Bengals" },
    { id: 117, question: "Who is the only person to score touchdowns in the NFL and MLB?", options: ["Deion Sanders", "Bo Jackson"], answer: "Bo Jackson" },
    { id: 118, question: "Which team did the Seahawks beat to win their first Super Bowl?", options: ["Broncos", "Panthers"], answer: "Broncos" },
    { id: 119, question: "What is the longest field goal in NFL history?", options: ["66 yards", "64 yards"], answer: "66 yards" },
    { id: 120, question: "Who holds the record for the most career interceptions returned for touchdowns?", options: ["Rod Woodson", "Deion Sanders"], answer: "Rod Woodson" },
    { id: 121, question: "What team was the first to use a cheerleading squad?", options: ["Cowboys", "Raiders"], answer: "Raiders" },
    { id: 122, question: "Who was the first African American quarterback to win a Super Bowl?", options: ["Doug Williams", "Warren Moon"], answer: "Doug Williams" },
    { id: 123, question: "What team won the first Super Bowl in the 1990s?", options: ["49ers", "Cowboys"], answer: "49ers" },
    { id: 124, question: "Who holds the record for most career fumble recoveries?", options: ["Jim Marshall", "Jason Taylor"], answer: "Jim Marshall" },
    { id: 125, question: "What is the only NFL team to go an entire season undefeated, including the Super Bowl?", options: ["Dolphins", "Patriots"], answer: "Dolphins" },
    { id: 126, question: "Who is the only player in NFL history to win the Heisman Trophy and be inducted into the Pro Football Hall of Fame?", options: ["Paul Hornung", "Barry Sanders"], answer: "Paul Hornung" },
    { id: 127, question: "Which NFL team had a perfect season, including the playoffs, in 1972?", options: ["Dolphins", "Steelers"], answer: "Dolphins" },
    { id: 128, question: "Who holds the record for the longest touchdown pass in NFL history?", options: ["Patrick Mahomes", "Baker Mayfield"], answer: "Patrick Mahomes" },
    { id: 129, question: "What is the only team to win a Super Bowl with a perfect season?", options: ["Dolphins", "Patriots"], answer: "Dolphins" },
    { id: 130, question: "Who is the only player in NFL history to score a touchdown in 21 consecutive games?", options: ["Ladanian Tomlinson", "Emmitt Smith"], answer: "Ladanian Tomlinson" },
    { id: 131, question: "What team has won the most NFL championships?", options: ["Packers", "Bears"], answer: "Packers" },
    { id: 132, question: "Who holds the record for most career safeties?", options: ["Ted Hendricks", "John Lynch"], answer: "Ted Hendricks" },
    { id: 133, question: "What team did the Ravens defeat to win their first Super Bowl?", options: ["Giants", "49ers"], answer: "Giants" },
    { id: 134, question: "Who is the only quarterback to lead two different teams to Super Bowl victories?", options: ["Peyton Manning", "Tom Brady"], answer: "Peyton Manning" },
    { id: 135, question: "What team was the first to win four Super Bowls?", options: ["Steelers", "49ers"], answer: "Steelers" },
    { id: 136, question: "Who was the first African American head coach to win a Super Bowl?", options: ["Tony Dungy", "Mike Tomlin"], answer: "Tony Dungy" },
    { id: 137, question: "What team is known as 'America's Team'?", options: ["Cowboys", "Patriots"], answer: "Cowboys" },
    { id: 138, question: "Who was the first team to win three Super Bowls in four years?", options: ["49ers", "Cowboys"], answer: "49ers" },
    { id: 139, question: "What was the first team to win the Super Bowl on a last-second field goal?", options: ["Giants", "Patriots"], answer: "Giants" },
];

const TriviaQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        refreshQuiz();
    }, []);

    const refreshQuiz = () => {
        // Shuffle and select a random subset of questions from allQuestions
        const shuffledQuestions = shuffleArray(allQuestions).slice(0, 10);
        setQuestions(shuffledQuestions);
        setSelectedAnswers({});
        setScore(null);
    };

    const handleOptionPress = (questionId, option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: option,
        });
    };

    const calculateBackgroundColor = (questionId, option) => {
        if (selectedAnswers[questionId] === option) {
            return option === questions.find(q => q.id === questionId).answer ? styles.correct : styles.incorrect;
        }
        return null;
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach(q => {
            if (selectedAnswers[q.id] === q.answer) {
                correctCount++;
            }
        });
        return correctCount;
    };

    const handleFinish = () => {
        const userScore = calculateScore();
        setScore(userScore);
    };

    // Function to shuffle array (Fisher-Yates shuffle algorithm)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Do you even know NFL?</Text>
            {questions.map((q) => (
                <LinearGradient
                    key={q.id}
                    colors={['#202B3D', '#121521']}
                    style={styles.questionContainer}
                >
                    <Text style={styles.questionText}>{q.question}</Text>
                    {q.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.option,
                                calculateBackgroundColor(q.id, option),
                            ]}
                            onPress={() => handleOptionPress(q.id, option)}
                            disabled={selectedAnswers[q.id] !== undefined}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </LinearGradient>
            ))}
            {score !== null && (
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>Your Score: {score} / 10</Text>
                </View>
            )}
            <TouchableOpacity
                style={styles.finishButton}
                onPress={handleFinish}
                disabled={score !== null} // Disable finish button once score is calculated
            >
                <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.refreshButton}
                onPress={refreshQuiz}
            >
                <Text style={styles.refreshButtonText}>Refresh Quiz</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginBottom: '5%'
    },
    questionContainer: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
    },
    questionText: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
    option: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    correct: {
        backgroundColor: 'green',
    },
    incorrect: {
        backgroundColor: 'red',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
    },
    finishButton: {
        backgroundColor: '#202B3D',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    finishButtonText: {
        fontSize: 18,
        color: 'white',
    },
    refreshButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    refreshButtonText: {
        fontSize: 18,
        color: 'white',
    },
    scoreContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    scoreText: {
        fontSize: 20,
        color: 'white',
    },
});

export default TriviaQuestions;
