import React, { useState, useRef } from 'react';
import { FlatList, Animated, View } from 'react-native';
import BGView from '../components/BGView';
import QuizItem from '../components/QuizItem';
import { Appbar, Button, MD3Colors, ProgressBar } from 'react-native-paper';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';

const questions = [
    {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "answer": "Paris"
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Saturn"],
        "answer": "Mars"
    },
    {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "options": ["Harper Lee", "Mark Twain", "F. Scott Fitzgerald", "Ernest Hemingway"],
        "answer": "Harper Lee"
    },
    {
        "question": "What is the smallest prime number?",
        "options": ["0", "1", "2", "3"],
        "answer": "2"
    },
    {
        "question": "Which element has the chemical symbol 'O'?",
        "options": ["Gold", "Oxygen", "Silver", "Iron"],
        "answer": "Oxygen"
    },
    {
        "question": "In which year did the Titanic sink?",
        "options": ["1912", "1905", "1918", "1923"],
        "answer": "1912"
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        "answer": "Leonardo da Vinci"
    },
    {
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        "answer": "Pacific Ocean"
    },
    {
        "question": "What is the capital of Japan?",
        "options": ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        "answer": "Tokyo"
    },
    {
        "question": "Which country is known as the Land of the Rising Sun?",
        "options": ["China", "Japan", "South Korea", "Thailand"],
        "answer": "Japan"
    }
]

const Quiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number | undefined }>({});
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const handleSelectOption = (questionIndex: number, optionIndex: number) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = { ...prevSelectedOptions };
            if (newSelectedOptions[questionIndex] === optionIndex) {
                delete newSelectedOptions[questionIndex];
            } else {
                newSelectedOptions[questionIndex] = optionIndex;
                if (currentIndex != questions.length - 1) {
                    handleNext();
                }
            }
            return newSelectedOptions;
        });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
            setCurrentIndex(currentIndex - 1);
        }
    };

    const calculateProgress = (): number => {
        const answeredQuestions = Object.keys(selectedOptions).filter(key => selectedOptions[parseInt(key)] !== undefined).length;
        return answeredQuestions / questions.length;
    };

    return (
        <BGView>
            <>
                <Appbar.Header mode='center-aligned' style={{ backgroundColor: "whitesmoke" }} >
                    <Appbar.BackAction />
                    <Appbar.Content titleStyle={{ fontFamily: "Poppins-Medium" }} title="Quiz - Indian History" />
                </Appbar.Header>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 20 }} >
                    <CustomText>Difficulty: <CustomText>Hard</CustomText></CustomText>
                    <CustomText>Questions: <CustomText>15</CustomText></CustomText>
                </View>
                <View style={{ paddingVertical: 10, paddingHorizontal: 20 }} >
                    <ProgressBar progress={calculateProgress()} color="mediumpurple" />
                </View>
                <View style={{ padding: 20, flex: 1 }}>
                    <FlatList
                        data={questions}
                        renderItem={({ item, index }) => (
                            <QuizItem
                                questionIndex={index}
                                selectedOptionIndex={selectedOptions[index]}
                                onSelectOption={(optionIndex: number) => handleSelectOption(index, optionIndex)}
                                item={item} />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        keyExtractor={(item, index) => index.toString()}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                            useNativeDriver: false
                        })}
                        scrollEventThrottle={32}
                        onViewableItemsChanged={viewableItemsChanged}
                        viewabilityConfig={viewConfig}
                        ref={flatListRef}
                    />
                    <View style={{ gap: 8 }}>
                        <CustomButton disabled={currentIndex === 0} onPress={handleBack} mode="outlined" textColor="indigo">Back</CustomButton>
                        {
                            currentIndex === questions.length - 1 ?
                                <CustomButton onPress={() => { }} mode='contained' >Submit</CustomButton> :
                                <CustomButton onPress={handleNext} mode='contained' >Next</CustomButton>
                        }
                    </View>
                </View>
            </>
        </BGView>
    );
};

export default Quiz;
