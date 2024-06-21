import { StyleSheet, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import BGView from "../components/BGView";
import CustomTabs from "../components/CustomTabs";
import { MD3Colors } from "react-native-paper";
import CustomText from "../components/CustomText";
import { generalStyles } from "../styles/general";
import { TopicAPI } from "../helpers/topic";
import SelectDropdown from "react-native-select-dropdown";
import Icon from 'react-native-vector-icons/FontAwesome6';
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { navigationRef } from "../App";
import { QuizAPI } from "../helpers/quiz";
import useAuth from "../hooks/useAuth";

const StartQuiz = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [loading, setLoading] = useState(false);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState<{ id: string, name: string } | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
    const { user } = useAuth();

    const createQuiz = async () => {
        try {
            setLoading(true);
            if (!selectedTopic || !selectedDifficulty || !totalQuestions) {
                ToastAndroid.show("Please select all fields", ToastAndroid.SHORT);
                return
            }
            if (typeof totalQuestions !== 'number') {
                ToastAndroid.show("Please enter a valid number for total questions", ToastAndroid.SHORT);
                return;
            }
            if (totalQuestions > 15) {
                ToastAndroid.show("You can select maximum 15 questions", ToastAndroid.SHORT);
                return;
            }
            const res = await QuizAPI.generateQuiz({ userId: user?.id, topicId: selectedTopic.id, difficulty: selectedDifficulty, totalQuestions: totalQuestions });
            if (res) {
                const quizData = []
                for (let i = 0; i < totalQuestions; i++) {
                    const question = res.data.questions[i];
                    const options = [];
                    for (let j = 0; j < 4; j++) {
                        options.push(res.data.options[i][j]);
                    }
                    quizData.push({ question, options });
                }
                //@ts-ignore
                navigationRef.navigate("Quiz", { quizId: res.data.id, quizData: quizData, topic: selectedTopic.name, difficulty: selectedDifficulty, totalQuestions: totalQuestions });
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }

    }

    const getAllTopics = async () => {
        const data = await TopicAPI.getAllTopics();
        if (data?.data) {
            setTopics(data.data);
        }
    }
    useEffect(() => {
        getAllTopics();
    }, [])
    return (
        <BGView>
            <View style={{ flex: 1 }}>
                <CustomText style={[generalStyles.textCenter, { marginTop: 50, marginBottom: 30 }]} variant="headlineMedium" font="semibold" >Start a Quiz</CustomText>
                <View style={{ backgroundColor: MD3Colors.neutralVariant90, borderRadius: 50 }}>
                    <CustomTabs
                        tabNames={["Topic", "Difficulty", "Questions"]}
                        activeTab={currentTab}
                        numOfTabs={3}
                        onTabPress={(index) => { setCurrentTab(index) }}
                    />
                </View>
                <View style={{ alignItems: "center", height: 300 }}>
                    {currentTab == 0 && <View>
                        <CustomText font="medium" style={[generalStyles.textCenter, { fontSize: 22, marginVertical: 20 }]} >Select a Topic</CustomText>
                        <SelectDropdown
                            data={topics}
                            onSelect={(selectedItem, index) => {
                                setSelectedTopic(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpen) => {
                                return (
                                    <View style={styles.dropdown1ButtonStyle}>
                                        <CustomText style={styles.dropdown1ButtonTxtStyle}>{selectedTopic?.name || 'Select your topic'}</CustomText>
                                        <Icon style={styles.dropdown1ButtonArrowStyle} name={isOpen ? 'chevron-up' : 'chevron-down'} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            ...styles.dropdown1ItemStyle,
                                            ...(isSelected && { backgroundColor: 'rgb(205 183 215)' }),
                                        }}>
                                        <CustomText style={styles.dropdown1ItemTxtStyle}>{item.name}</CustomText>
                                    </View>
                                );
                            }}
                            dropdownStyle={styles.dropdown1MenuStyle}
                            search
                            searchInputStyle={styles.dropdown1SearchInputStyle}
                            searchInputTxtColor={'black'}
                            searchPlaceHolder={'Search here'}
                            searchPlaceHolderColor={'#585D62'}
                            renderSearchInputLeftIcon={() => {
                                return <Icon name={'magnifying-glass'} color={"black"} size={18} />;
                            }}
                        />
                    </View>}
                    {
                        currentTab == 1 && <View>
                            <CustomText font="medium" style={[generalStyles.textCenter, { fontSize: 22, marginVertical: 20 }]} >Select difficulty</CustomText>
                            <BouncyCheckbox
                                fillColor={"#29AB87"}
                                size={20}
                                isChecked={selectedDifficulty == "Easy"}
                                text={"Easy"}
                                textStyle={{ fontFamily: "Poppins-Regular", textDecorationLine: "none" }}
                                onPress={() => setSelectedDifficulty("Easy")}
                            />
                            <BouncyCheckbox
                                fillColor={"#FED85D"}
                                size={20}
                                isChecked={selectedDifficulty == "Medium"}
                                text={"Medium"}
                                textStyle={{ fontFamily: "Poppins-Regular", textDecorationLine: "none" }}
                                onPress={() => setSelectedDifficulty("Medium")}
                            />
                            <BouncyCheckbox
                                fillColor={"#FC80A5"}
                                size={20}
                                isChecked={selectedDifficulty == "Hard"}
                                text={"Hard"}
                                textStyle={{ fontFamily: "Poppins-Regular", textDecorationLine: "none" }}
                                onPress={() => setSelectedDifficulty("Hard")}
                            />
                        </View>
                    }
                    {
                        currentTab == 2 && <View>
                            <CustomText font="medium" style={[generalStyles.textCenter, { fontSize: 22, marginVertical: 20 }]} >Select no. of questions</CustomText>
                            <CustomTextInput
                                onChangeText={(text) => {
                                    try {
                                        setTotalQuestions(parseInt(text));
                                    } catch (e) {
                                        setTotalQuestions(null);
                                    }
                                }}
                                placeholder="Eg: 10"
                                value={totalQuestions?.toString()}
                                keyboardType="number-pad"
                                mode="outlined"
                                label={"Enter questions count"}
                            />
                        </View>
                    }
                </View>
                <View style={{ paddingHorizontal: 30 }}>
                    <CustomButton loading={loading} onPress={createQuiz} mode="contained" >Create</CustomButton>
                </View>
            </View>
        </BGView>
    );
};

const styles = StyleSheet.create({
    dropdown1ButtonStyle: {
        width: '80%',
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: 'indigo',
    },
    dropdown1ButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    dropdown1ButtonArrowStyle: {
        fontSize: 28,
        color: '#FFFFFF',
    },
    dropdown1MenuStyle: {
        backgroundColor: MD3Colors.neutralVariant95,
        borderRadius: 8,
    },
    dropdown1SearchInputStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#9373B3',
        fontFamily: "Poppins-Regular"
    },
    dropdown1ItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#9373B3',
    },
    dropdown1ItemTxtStyle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
    },
})

export default StartQuiz;
