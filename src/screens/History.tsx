import { View, Text, Touchable, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useCallback, useEffect } from "react";
import BGView from "../components/BGView";
import { ActivityIndicator, Appbar, Icon, MD3Colors } from "react-native-paper";
import App, { navigationRef } from "../App";
import { QuizAPI } from "../helpers/quiz";
import useAuth from "../hooks/useAuth";
import CustomText from "../components/CustomText";
import { TopicAPI } from "../helpers/topic";
import DifficultyText from "../components/DifficultyText";
import { useFocusEffect } from "@react-navigation/native";
import CustomTabs from "../components/CustomTabs";

const History = ({ route }: any) => {
    const [quizzes, setQuizzes] = React.useState([] as any)
    const { user } = useAuth();
    const [currentTab, setCurrentTab] = React.useState(0)
    const [pageLoading, setPageLoading] = React.useState(true)

    const filteredQuizzes = quizzes.slice().reverse().filter((quiz: any) => {
        if (currentTab === 0) {
            return quiz.completed;
        } else {
            return !quiz.completed;
        }
    });

    const fetchQuizzes = async () => {
        try {
            const res = await QuizAPI.getUserQuizzes(user?.id);
            if (res) {
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].topicName = res.data[i].topic.name
                }
                setQuizzes(res.data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPageLoading(false)
        }
    }

    const deleteQuiz = async (quizId: string) => {
        try {
            const res = await QuizAPI.deleteQuiz(quizId);
            if (res) {
                ToastAndroid.show("Quiz deleted successfully", ToastAndroid.SHORT);
                fetchQuizzes();
            }
        } catch (error) {
            console.error(error);
        }

    }

    const handleQuiz = (quiz: any) => {
        const quizData = [];
        for (let i = 0; i < quiz.totalQuestions; i++) {
            const question = quiz.questions[i];
            const options = [];
            for (let j = 0; j < quiz.options[i].length; j++) {
                options.push(quiz.options[i][j]);
            }
            quizData.push({ question, options });
        }
        if (quiz.completed) {
            //@ts-ignore
            return navigationRef.navigate("Quiz", { completed: true, userResponses: quiz.userResponses, answers: quiz.answers, quizId: quiz.id, quizData: quizData, topic: quiz.topicName, difficulty: quiz.difficulty, totalQuestions: quiz.totalQuestions });
        }
        else {
            //@ts-ignore
            return navigationRef.navigate("Quiz", { completed: false, quizId: quiz.id, quizData: quizData, topic: quiz.topicName, difficulty: quiz.difficulty, totalQuestions: quiz.totalQuestions });
        }
    }

    useFocusEffect(
        useCallback(() => {
            setCurrentTab(0);
            fetchQuizzes();
        }, [])
    )
    return (
        <BGView>
            <View>
                <Appbar.Header mode="center-aligned">
                    <Appbar.BackAction onPress={() => navigationRef.navigate("StartQuiz" as never)} />
                    <Appbar.Content titleStyle={{ fontFamily: "Poppins-Medium" }} title="Quiz History" />
                </Appbar.Header>
                <View style={{ backgroundColor: MD3Colors.neutralVariant90, borderRadius: 50, margin: 10 }}>
                    <CustomTabs
                        tabNames={["Completed", "Pending"]}
                        activeTab={currentTab}
                        numOfTabs={2}
                        onTabPress={(index) => { setCurrentTab(index) }}
                    />
                </View>
                {
                    pageLoading ? <View style={{ padding: 20 }}>
                        <ActivityIndicator animating={true} color={"indigo"} />
                    </View> :
                        filteredQuizzes && filteredQuizzes.length > 0 ? filteredQuizzes.map((quiz: any, index: number) => {
                            return (
                                <TouchableOpacity onPress={() => handleQuiz(quiz)} activeOpacity={0.5} key={index} style={{ gap: 6, paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <CustomText>Topic: <CustomText font="medium" variant="bodyLarge">{quiz.topicName}</CustomText></CustomText>
                                        <CustomText>Date: <CustomText font="medium">{quiz.dateTaken.substring(0, 10)}</CustomText></CustomText>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <CustomText>Total Questions: <CustomText font="medium" variant="bodyLarge">{quiz.totalQuestions}</CustomText></CustomText>
                                        <CustomText>Difficulty: <DifficultyText difficulty={quiz.difficulty} /></CustomText>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                        <CustomText>Score: <CustomText font="medium" variant="bodyLarge">{quiz.correctAnswers}</CustomText></CustomText>
                                        <TouchableOpacity style={{ borderRadius: 5, borderColor: "red", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5 }} onPress={() => deleteQuiz(quiz.id)}>
                                            <Icon source="delete" size={22} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        }) :
                            <View style={{ padding: 20 }}>
                                <CustomText style={{ textAlign: 'center' }} variant="bodyLarge">
                                    {currentTab === 0
                                        ? 'No completed quizzes found'
                                        : 'No pending quizzes found'}
                                </CustomText>
                            </View>
                }
            </View>
        </BGView>
    );
};

export default History;
