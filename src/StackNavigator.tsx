import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import useAuth from './hooks/useAuth';
import Quiz from './screens/Quiz';
import StartQuiz from './screens/StartQuiz';
import History from './screens/History';

const Stack = createNativeStackNavigator();

function StackNavigator() {
    const { user } = useAuth();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            {user ? (
                <>
                    <Stack.Screen name="StartQuiz" component={StartQuiz} />
                    <Stack.Screen name="Quiz" component={Quiz} />
                    <Stack.Screen name="History" component={History} />
                </>
            ) : (
                <Stack.Screen name="Login" component={Login} />
            )}
        </Stack.Navigator>
    );
}

export default StackNavigator;
