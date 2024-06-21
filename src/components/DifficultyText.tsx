import { View, Text } from "react-native";
import React from "react";
import CustomText from "./CustomText";

const DifficultyText = ({ difficulty }: { difficulty: string }) => {
    return (
        <CustomText color={
            difficulty == "Hard" ? "red" : difficulty == "Medium" ? "yellow" : "green"
        } font="medium">
            {difficulty}
        </CustomText>
    );
};

export default DifficultyText;
