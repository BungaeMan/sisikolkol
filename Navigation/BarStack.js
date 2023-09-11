import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BarViewPage from "../screens/BarPage/pages/BarViewPage";
export default function BarStack(){
    const Stack = createNativeStackNavigator();
    
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="BarPage"
                component={BarViewPage}
                options={()=>({
                    headerShown:false
                })}
                />
        </Stack.Navigator>
    )
}