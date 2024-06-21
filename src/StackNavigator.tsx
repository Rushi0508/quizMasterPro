import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import useAuth from './hooks/useAuth';
import Quiz from './screens/Quiz';

const Stack = createNativeStackNavigator();

function StackNavigator() {
    const { user } = useAuth();

    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="Home" component={Quiz} options={{ headerShown: false }} />
                </>
            ) : (
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
}

export default StackNavigator;
