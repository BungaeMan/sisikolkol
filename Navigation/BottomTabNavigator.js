import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import BarViewPage from "../screens/BarPage/pages/BarViewPage";
import {colors} from "../components/common/style/colors";
import {HomeIcon, PubIcon, MyPageIcon, DrinkIcon} from "../components/TabBarIcon";
import MyPageStack from "./MyPageStack";
import BarStack from "./BarStack";
import RecommendationStack from "./RecommendationStack";


export default function BottomTabNavigator(){
    const BottomTab = createBottomTabNavigator();
    return(
        
        <BottomTab.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor:colors.mainOrange,
                tabBarInactiveTintColor: colors.darkGrey20,
                tabBarLabelStyle: {
                    fontSize: 12,
                }
            }}>
            <BottomTab.Screen
                name="HomeStack"
                component={HomeStack}
                options={({navigation}) => ({
                    tabBarLabel: '홈',
                    tabBarIcon: ({focused}) => <HomeIcon focused={focused} />
                })}
                />
            <BottomTab.Screen
                name="BarStack"
                component={BarStack}
                options={({navigation}) => ({
                    tabBarLabel: '가게',
                    tabBarIcon: ({focused}) => <PubIcon focused={focused} />
                })}
            />
            <BottomTab.Screen
                name="RecommendationStack"
                component={RecommendationStack}
                options={({navigation}) => ({
                    tabBarLabel: '주류추천',
                    tabBarIcon: ({focused}) => <DrinkIcon focused={focused} />
                })}
            />
            <BottomTab.Screen
                name="MyPageStack"
                component={MyPageStack}
                options={({navigation}) => ({
                    tabBarLabel: '마이페이지',
                    tabBarIcon: ({focused}) => <MyPageIcon focused={focused} />
                })}
            />
        </BottomTab.Navigator>
    )
}
