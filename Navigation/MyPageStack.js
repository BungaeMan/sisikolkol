import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ReservationPage from "../screens/MyPage/pages/ReservationPage"
import CommonMyPage from "../screens/MyPage/pages/CommonMyPage";
import BookmarkWhiskey from "../screens/MyPage/pages/BookmarkWhiskey";
import RecommendationDetailPage from "../screens/RecommendationPage/RecommendationDetailPage";
import BookmarkBar from "../screens/MyPage/pages/BookmarkBar";
import MyLiquorReview from "../screens/MyPage/pages/MyLiquorReview";
import MyBarReview from "../screens/MyPage/pages/MyBarReview";
import ManagePage from "../screens/MyPage/pages/ManagePage";

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
            <Stack.Screen
                name="BookmarkWhiskey"
                component={BookmarkWhiskey}
            />
            <Stack.Screen
                name="LiquorReview"
                component={MyLiquorReview}
            />
            <Stack.Screen
                name="BarReview"
                component={MyBarReview}
            />
            <Stack.Screen
                name="WhiskeyDetail"
                component={RecommendationDetailPage}
            />
            <Stack.Screen
                name="BookmarkBar"
                component={BookmarkBar}
            />
            <Stack.Screen
                name="Manage"
                component={ManagePage}
            />
            
        </Stack.Navigator>
    )
}