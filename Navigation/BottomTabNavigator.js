import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MainPage from "../screens/MainPage/Mainpage";
import HomeStack from "./HomeStack";
import {colors} from "../components/common/style/colors";
import bottomTabHomeSelected from "../assets/img/bottomTabHomeSelected.png"

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
                    // tabBarIcon: ({focused}) => <Image source={bottomTabHomeSelected}
                })}
                />
        </BottomTab.Navigator>
    )
}
