import React from 'react';
import { fonts } from '../constants/fonts';
import { TextInput, TextInputProps } from 'react-native-paper';

type Font = 'bold' | 'regular' | 'semibold' | 'light' | 'medium';

interface CustomTextInputProps extends TextInputProps {
    font?: Font;
}

const CustomTextInput = ({ style, font = 'regular', ...props }: CustomTextInputProps) => {
    const fontFamily = getFontFamily(font);

    return (
        <TextInput
            style={[{ fontFamily, height: 40, justifyContent: "center" }, style]}
            {...props}
        />
    );
};

const getFontFamily = (type: Font) => {
    switch (type) {
        case 'bold':
            return fonts.bold;
        case 'semibold':
            return fonts.semibold;
        case 'light':
            return fonts.light;
        case 'medium':
            return fonts.medium;
        default:
            return fonts.regular;
    }
};

export default CustomTextInput;
