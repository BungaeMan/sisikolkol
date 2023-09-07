import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from "./BottomTabNavigator";

export default function Navigation(){
    return (
        <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}


    const Stack = createNativeStackNavigator();
function RootNavigator() {
    
    return(
        <Stack.Navigator initialRouteName="Root" screenOptions={{gestureEnabled: false, autoHideHomeIndicator: true}}>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
    
}