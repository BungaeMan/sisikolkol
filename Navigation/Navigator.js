import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigation from './BottomTabNavigator'
import BottomTabNavigator from "./BottomTabNavigator";
import MyPageStack from "./MyPageStack";

export default function Navigation(){
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
        // <View>
        //     <Text>
        //         dkkkkkkkkkk
        //     </Text>
        // </View>
    );
}


function RootNavigator() {
    const Stack = createNativeStackNavigator();
    
    return(
        <Stack.Navigator initialRouteName="Root" screenOptions={{gestureEnabled: false, autoHideHomeIndicator: true}}>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
    
}