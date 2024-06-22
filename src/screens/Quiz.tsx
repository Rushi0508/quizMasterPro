import React, { useState, useRef } from 'react';
import { FlatList, Animated, View, ToastAndroid } from 'react-native';
import BGView from '../components/BGView';
import QuizItem from '../components/QuizItem';
import { Appbar, Button, Modal, Portal, ProgressBar, Text } from 'react-native-paper';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { navigationRef } from '../App';
import { QuizAPI } from '../helpers/quiz';
import useAuth from '../hooks/useAuth';
import DifficultyText from '../components/DifficultyText';

const Quiz = ({ route }: any) => {
    const [visible, setVisible] = React.useState(false);
    const [questions, setQuestions] = useState<{ question: string, options: [] }[] | null>(route.params.quizData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isCompleted = route.params.completed;
    let answers = null;
    if (route.params.answers) {
        answers = route.params.answers;
    }
    let initialSelectedOptions;
    if (!route.params.completed) {
        initialSelectedOptions = Array(route.params.quizData.length).fill(-1)
    } else {
        console.log(route.params.userResponses)
        initialSelectedOptions = route.params.userResponses.map((response: string) => {
            const decrementedValue = parseInt(response);
            return decrementedValue;
        });
    }
    const [selectedOptions, setSelectedOptions] = useState<number[]>(initialSelectedOptions);
    const flatListRef = useRef<FlatList>(null);
    const [loading, setLoading] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const { user } = useAuth();

    const scrollX = useRef(new Animated.Value(0)).current
    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const handleSelectOption = (questionIndex: number, optionIndex: number) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = [...prevSelectedOptions];
            if (newSelectedOptions[questionIndex] === optionIndex) {
                newSelectedOptions[questionIndex] = -1; // Unchecking the option
            } else {
                newSelectedOptions[questionIndex] = optionIndex;
                if (currentIndex !== questions?.length! - 1) {
                    handleNext();
                }
            }
            return newSelectedOptions;
        });
    };

    const handleNext = () => {
        if (currentIndex < questions?.length! - 1) {
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
        const answeredQuestions = selectedOptions.filter(option => option !== -1).length;
        return answeredQuestions / questions?.length!;
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (isCompleted) {
                return ToastAndroid.show("Quiz already submitted", ToastAndroid.SHORT);
            }
            const res = await QuizAPI.submitQuiz(route.params.quizId, {
                userId: user?.id,
                userResponses: selectedOptions,
            })
            if (res) {
                setCorrectAnswers(res.data.correctAnswers)
                setVisible(true);
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }

    return (
        <BGView>
            <>
                <Appbar.Header mode='center-aligned' >
                    <Appbar.BackAction onPress={() => navigationRef.goBack()} />
                    <Appbar.Content titleStyle={{ fontFamily: "Poppins-Medium" }} title={`Quiz - ${route.params.topic}`} />
                </Appbar.Header>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 20 }} >
                    <CustomText>Difficulty: <DifficultyText difficulty={route.params.difficulty} /></CustomText>
                    <CustomText>Questions: <CustomText>{route.params.totalQuestions}</CustomText></CustomText>
                </View>
                <View style={{ paddingVertical: 10, paddingHorizontal: 20 }} >
                    <ProgressBar progress={calculateProgress()} color="mediumpurple" />
                </View>
                <View style={{ padding: 20, flex: 1 }}>
                    <FlatList
                        data={questions}
                        renderItem={({ item, index }) => (
                            <QuizItem
                                isCompleted={isCompleted}
                                answers={answers}
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
                            currentIndex === questions?.length! - 1 ?
                                <CustomButton loading={loading} onPress={handleSubmit} mode='contained' >Submit</CustomButton> :
                                <CustomButton onPress={handleNext} mode='contained' >Next</CustomButton>
                        }
                    </View>
                </View>
                <Portal>
                    <Modal style={{ marginHorizontal: 10 }} visible={visible} dismissable={false} contentContainerStyle={{
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 10
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center", gap: 16, width: "100%" }}>
                            <CustomText variant='bodyLarge' font='semibold' >Quiz submitted successfully!!</CustomText>
                            <CustomText variant='bodyMedium' font='medium'>Quiz Summary</CustomText>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                <View style={{ gap: 10 }}>
                                    <CustomText font='medium'>Topic: <CustomText>{route.params.topic}</CustomText></CustomText>
                                    <CustomText font='medium'>Total Questions: <CustomText>{route.params.totalQuestions}</CustomText></CustomText>
                                </View>
                                <View style={{ gap: 10 }}>
                                    <CustomText font='medium'>Difficulty: <DifficultyText difficulty={route.params.difficulty} /></CustomText>
                                    <CustomText font='medium'>Questions Attended: <CustomText>{selectedOptions.filter(option => option !== -1).length}</CustomText></CustomText>
                                </View>
                            </View>
                            <CustomText font='medium'>Correct Answers: <CustomText>{correctAnswers}</CustomText></CustomText>
                            <CustomButton onPress={() => {
                                setVisible(false);
                                navigationRef.navigate("History" as never)
                            }} mode='contained'>Save</CustomButton>
                        </View>
                    </Modal>
                </Portal>

            </>
        </BGView>
    );
};

export default Quiz;
