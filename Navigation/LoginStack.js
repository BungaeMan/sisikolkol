import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginPage from "../screens/LoginPage/pages/LoginPage";
import SignupPage from "../screens/LoginPage/pages/SignupPage";

export default function LoginStack(){
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false
            }}>
            <Stack.Screen
                name="Home"
                component={LoginPage}
                options={(navigation) => ({
                    headerShown: false
                })}
            />
            <Stack.Screen
                name="Signup"
                component={SignupPage}
            />
        </Stack.Navigator>
    )
}