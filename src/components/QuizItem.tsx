import { View, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CustomText from "./CustomText";

const QuizItem = ({ item, selectedOptionIndex, onSelectOption, questionIndex }: any) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width: width - 40 }]}>
      <CustomText style={{ marginBottom: 20 }} variant="bodyLarge" >{questionIndex + 1}. {item.question}</CustomText>
      {
        item.options.map((option: string, index: number) => (
          <View key={index} style={{ marginBottom: 8, flexDirection: "row", alignItems: "center" }} >
            <BouncyCheckbox
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QuizItem;
