import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RecommendationPage from "../screens/RecommendationPage/RecommendationPage";
import RecommendationDetailPage from "../screens/RecommendationPage/RecommendationDetailPage";

export default function RecommendationStack(){
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShadowVisible: false
            }}>
            <Stack.Screen
                name="Recommendation"
                component={RecommendationPage}
                options={(navigation) => ({
                    headerShown: false
                })}
            />
            <Stack.Screen
                name="RecommendationDetail"
                component={RecommendationDetailPage}
                options={(navigation) => ({
                    headerShown: false
                })}
            />

        </Stack.Navigator>
    )
}