import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReservationPage from "../screens/MyPage/ReservationPage"
import {Pressable} from "react-native";
export default function MyPageStack(){
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false
            }}>
            <Stack.Screen
                name="Reservation"
                component={ReservationPage}
                options={({navigation}) => ({
                    headerLeft:()=>(
                        
                        <Pressable onPress={()=>{
                            navigation.navigate('HomeStack', {screen: 'Home'});
                        }
                        }>
                        </Pressable>
                    )
                })}
            />
        </Stack.Navigator>
    )
}