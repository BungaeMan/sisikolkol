import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {useState} from "react";
import {View, Text, ScrollView} from "react-native";


export default function BarInfoTemplate(){
    const [routes] = useState([
        {key: "first", title: "가게정보"},
        {key: "second", title: "예약" },
        {key: "third", title: "리뷰"}
    ]);
    const [index, setIndex] = useState(0);
    
    const FirstRoute = () => (
        <View >
            <Text>ddd</Text>
        </View>
    )
    
    const SecondRoute = () => (
        <View>
            <Text>2222</Text>
        </View>
    )
    
    const ThirdRoute = () => (
        <View>
            <Text>3333</Text>
        </View>
    )
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute
    });
    
    const renderTabBar = (props) => (
        <TabBar style={{backgroundColor: "black"}} />
    )
    
    return(
        <>
            <ScrollView>
                <TabView navigationState={{index, routes}}
                         renderScene={renderScene}
                         renderTabBar={renderTabBar}
                         onIndexChange={setIndex}
                         swipeEnabled={false}/>
            </ScrollView>
            
            
        </>
    )
}