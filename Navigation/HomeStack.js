import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import MainPage from "../screens/MainPage/Mainpage";

export default function HomeStack(){
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false
            }}>
            <Stack.Screen
                name="Home"
                component={MainPage}
                options={(navigation) => ({
                    headerShown: false
                })
                }
                />
        </Stack.Navigator>
    )
}