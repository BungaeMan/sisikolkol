import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigation from './BottomTabNavigator'
import BottomTabNavigator from "./BottomTabNavigator";

export default function Navigation(){
    return (
        <NavigationContainer linking={LinkingConfiguration} >
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