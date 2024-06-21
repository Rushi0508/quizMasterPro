import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import CustomText from './CustomText';
import { MD3Colors } from 'react-native-paper';

interface CustomTabsProps {
    numOfTabs: number;
    activeTab: number;
    onTabPress: (index: number) => void;
    activeTabColor?: string;
    inactiveTabColor?: string;
    tabNames?: string[];
}

const CustomTabs: React.FC<CustomTabsProps> = ({
    numOfTabs,
    activeTab,
    onTabPress,
    tabNames = []
}) => {
    const styles = StyleSheet.create({
        container: {
            position: 'relative',
        },
        tabsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        tabContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            position: 'relative',
            borderRadius: 50
        },
        activeTabIndicator: {
            position: 'absolute',
            bottom: 0,
            height: 3,
            borderRadius: 4,
            width: '100%',
        },
        bottomLine: {
            height: 3,
            borderRadius: 4,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            zIndex: -1, // Ensure the bottom line is behind the active tab indicator
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.tabsContainer}>
                {Array.from({ length: numOfTabs }, (_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onTabPress(index)}
                        activeOpacity={1}
                        style={[styles.tabContainer, { backgroundColor: activeTab === index ? "#8E72AD" : "transparent" }]}
                    >
                        <CustomText font='medium' style={{ color: activeTab === index ? "white" : "black" }}>
                            {tabNames[index] || `Tab ${index + 1}`}
                        </CustomText>
                        {/* {activeTab === index && <View style={[styles.activeTabIndicator, { backgroundColor: MD3Colors.error0 }]} />} */}
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.bottomLine} />
        </View>
    );
};



export default CustomTabs;
