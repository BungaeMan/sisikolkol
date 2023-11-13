import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReservationPage from "../screens/MyPage/pages/ReservationPage"
import {Pressable} from "react-native";
import CommonMyPage from "../screens/MyPage/pages/CommonMyPage";


export default function MyPageStack(){
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false
            }}>
            <Stack.Screen
                name="MyPage"
                component={CommonMyPage}
                options={({navigation}) => ({
                    headerShown:false
                })}
            />
            <Stack.Screen
                name="Reservation"
                component={ReservationPage}
                
            />
        </Stack.Navigator>
    )
}