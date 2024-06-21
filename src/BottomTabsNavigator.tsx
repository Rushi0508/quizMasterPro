import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import StartQuiz from './screens/StartQuiz';
import History from './screens/History';
import { MD3Colors } from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator();
const routes = [
    {
        name: "Profile",
        icon: "user"
    },
    {
        name: "StartQuiz",
        icon: "plus-circle"
    },
    {
        name: "History",
        icon: "history"
    },
]
function MyTabs() {
    return (
        <Tab.Navigator backBehavior='history'
            screenOptions={({ route, navigation }) => ({
                tabBarStyle: {
                    backgroundColor: MD3Colors.neutralVariant95,
                    height: 55,
                    paddingVertical: 4
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName = routes.find(item => item.name == route.name)?.icon;
                    return (
                        <View>
                            <Icon
                                name={iconName ?? 'house-chimney'}
                                size={20}
                                color={color}
                                style={focused && { backgroundColor: "#e6cdf3", paddingHorizontal: 25, paddingVertical: 6, borderRadius: 30 }}
                            />

                        </View>
                    );
                },
                // tabBarShowLabel: false,
                tabBarLabelStyle: {
                    fontFamily: "Poppins-Regular"
                },
                tabBarActiveTintColor: MD3Colors.secondary30,
                tabBarInactiveTintColor: MD3Colors.secondary30
            })} >
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="StartQuiz" component={StartQuiz} />
            <Tab.Screen name="History" component={History} />
        </Tab.Navigator>
    );
}

export default MyTabs;