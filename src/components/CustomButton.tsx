import React from "react";
import { Button, ButtonProps } from "react-native-paper";
import CustomText from "./CustomText";

interface CustomButtonProps extends ButtonProps {
    children: React.ReactNode | string;
}

const CustomButton = (props: CustomButtonProps) => {
    return (
        <Button style={{ justifyContent: "center", alignItems: "flex-start", flexDirection: "row" }} {...props}>
            {
                typeof props.children === "string" ?
                    <CustomText color={props.textColor ?? "white"} font="medium" >
                        {props.children}
                    </CustomText>
                    :
                    props.children
            }
        </Button>
    );
};

export default CustomButton;
