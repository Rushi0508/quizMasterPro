import { View, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomText from "./CustomText";
import { Icon } from "react-native-paper";

interface QuizItemProps {
  item: any;
  selectedOptionIndex: number;
  onSelectOption: (index: number) => void;
  questionIndex: number;
  isCompleted: boolean;
  answers?: any;
}

const QuizItem = ({ item, selectedOptionIndex, onSelectOption, questionIndex, isCompleted, answers }: any) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width: width - 40 }]}>
      <CustomText style={{ marginBottom: 20 }} variant="bodyLarge" >{questionIndex + 1}. {item.question}</CustomText>
      {
        item.options.map((option: string, index: number) => (
          <View key={index} style={{ marginBottom: 8, flexDirection: "row", alignItems: "center" }} >
            <BouncyCheckbox
              disabled={isCompleted}
              bounceEffectIn={0.9}
              fillColor={index == 0 ? "#29AB87" : index == 1 ? "#FED85D" : index == 2 ? "#C9A0DC" : "#FC80A5"}
              size={20}
              isChecked={selectedOptionIndex === index}
              text={option}
              textStyle={{ fontFamily: "Poppins-Regular", textDecorationLine: "none" }}
              onPress={() => onSelectOption(index)}
            />
          </View>
        ))
      }
      {
        isCompleted &&
        <>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20 }}>
            <Icon color={selectedOptionIndex === answers[questionIndex] - 1 ? "green" : "red"} source={selectedOptionIndex === answers[questionIndex] - 1 ? "check" : "close"} size={35} />
            {
              selectedOptionIndex === answers[questionIndex] - 1 ?
                <CustomText variant="bodyLarge" font="medium">Correct Answer</CustomText>
                :
                <CustomText variant="bodyLarge" font="medium">Wrong Answer</CustomText>
            }
          </View>
          <View>
            {
              selectedOptionIndex !== answers[questionIndex] - 1 &&
              <View style={{ marginTop: 10 }}>
                <CustomText variant="bodyMedium">Correct Answer: <CustomText variant="bodyMedium" font="medium" >{item.options[answers[questionIndex] - 1]}</CustomText></CustomText>
              </View>

            }
          </View>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QuizItem;
