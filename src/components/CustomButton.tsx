import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import CustomText from "./CustomText";

interface CustomButtonProps extends ButtonProps {
    children: React.ReactNode | string;
}

const CustomButton = (props: CustomButtonProps) => {
    return (
        <Button {...props}>
            {
                typeof props.children === "string" ?
                    <CustomText color="white" font="medium" >
                        {props.children}
                    </CustomText>
                    :
                    props.children
            }
        </Button>
    );
};

export default CustomButton;
