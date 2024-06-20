import React from 'react';
import { ColorValue } from 'react-native';
import { fonts } from '../constants/fonts';
import { Text, TextProps } from 'react-native-paper';

type Font = 'bold' | 'regular' | 'semibold' | 'light' | 'medium';

interface CustomTextProps<T> extends TextProps<T> {
    font?: Font;
    color?: ColorValue,
}

const CustomText = ({ children, style, color, font = 'regular', ...props }: CustomTextProps<any>) => {
    const fontFamily = getFontFamily(font);

    return (
        <Text style={[{ fontFamily }, { color: color ? color : "black", }, style]} {...props}>
            {children}
        </Text>
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

export default CustomText;
