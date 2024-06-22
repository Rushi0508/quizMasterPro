import { View, Text, Touchable, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useCallback, useEffect } from "react";
import BGView from "../components/BGView";
import { Appbar, Icon } from "react-native-paper";
import App, { navigationRef } from "../App";
import { QuizAPI } from "../helpers/quiz";
import useAuth from "../hooks/useAuth";
import CustomText from "../components/CustomText";
import { TopicAPI } from "../helpers/topic";
import DifficultyText from "../components/DifficultyText";
import { useFocusEffect } from "@react-navigation/native";

const History = ({ route }: any) => {
    const [quizzes, setQuizzes] = React.useState([] as any)
    const { user } = useAuth();

    const fetchQuizzes = async () => {
        try {
            const res = await QuizAPI.getUserQuizzes(user?.id);
            if (res) {
                for (let i = 0; i < res.data.length; i++) {
                    const topic = await TopicAPI.getById(res.data[i].topicId);
                    res.data[i].topicName = topic?.data?.name;
                }
                setQuizzes(res.data)
            }
        } catch (error) {
            console.error(error);
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

    useFocusEffect(
        useCallback(() => {
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
                {
                    quizzes && quizzes.length > 0 ? quizzes.slice().reverse().map((quiz: any, index: number) => {
                        return (
                            <View key={index} style={{ gap: 6, paddingVertical: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#ddd" }}>
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
                            </View>
                        )
                    }) :
                        <View style={{ padding: 20 }}>
                            <CustomText style={{ textAlign: "center" }} variant="bodyLarge">No Quiz history found</CustomText>
                        </View>
                }
            </View>
        </BGView>
    );
};

export default History;
