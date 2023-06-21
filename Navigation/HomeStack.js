import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainPage from "../screens/MainPage/Mainpage";
import ReservationPage from "../screens/MyPage/ReservationPage"
import RecommendationPage from "../screens/RecommendationPage/RecommendationPage"
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
                })}
                />
            <Stack.Screen
                name="Reservation"
                component={ReservationPage}
            />
            <Stack.Screen
                name="Recommendation"
                component={RecommendationPage}
            />
          
        </Stack.Navigator>
    )
}