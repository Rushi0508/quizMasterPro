// LinearGradientBackground.js
import React from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';

const BGView = ({ children }: { children: React.ReactNode }) => {

    return (
        <View
            style={{ flex: 1, backgroundColor: "white" }}
        >
            <SafeAreaView style={{ marginBottom: 65, flex: 1 }}>
                <TouchableWithoutFeedback accessible={false} onPress={() => Keyboard.dismiss()}>
                    {children}
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </View>
    );
};

export default BGView;
