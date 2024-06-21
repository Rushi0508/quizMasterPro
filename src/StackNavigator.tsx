import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import useAuth from './hooks/useAuth';
import Quiz from './screens/Quiz';
import StartQuiz from './screens/StartQuiz';
import History from './screens/History';
import Register from './screens/Register';
import Profile from './screens/Profile';
import MyTabs from './BottomTabsNavigator';

const Stack = createNativeStackNavigator();

function StackNavigator() {
    const { user } = useAuth();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            {user ? (
                <>
                    <Stack.Screen name="MyTabs" component={MyTabs} />
                    <Stack.Screen name="Quiz" component={Quiz} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </>
            )}
        </Stack.Navigator>
    );
}

export default StackNavigator;
