import {View, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleProp, Image, SafeAreaView} from "react-native"
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useState} from "react";
import {colors} from "../../components/common/style/colors";
import searchImg from "../../assets/img/searchImg.png"
import RecommendationWhisky from "./templates/RecommendationWhisky";

const FirstRoute = () => (
    <RecommendationWhisky/>
)
const SecondRoute = () => (
    <View><Text>22</Text></View>
)
const ThirdRoute = () => (
    <View><Text>33</Text></View>
)
const FourthRoute = () => (
    <View><Text>44</Text></View>
)

export default function RecommendationPage() {
    const [routes] = useState([
        {key: "first", title: "위스키"},
        {key: "second", title: "와인"},
        {key: "third", title: "보드카"},
        {key: "fourth", title: "전통주"},
    ])
    const [index, setIndex] = useState(0);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute
    })
    
    const renderTabBar = (props) => (
        <TabBar {...props}
                style={{
                    width:"100%",
                    backgroundColor: "white",
                    shadowColor: 'white',
                    marginHorizontal: 10,
                    marginBottom: 10,
                    alignSelf: "center"
                }}
                indicatorStyle={{backgroundColor: colors.mainOrange}}
                tabStyle={{justifyContent:"center", alignItems:"center"}}
                
                renderLabel={({route, focused}) => (
                    <Text style={{opacity: focused ? 1 : 0.3, fontWeight: '700'}}>
                        {route.title}
                    </Text>
                )}
        />
    )
    return (
        <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
            <SafeAreaView style={{display: "flex", flex: 1,backgroundColor: "white"}}>
                <View style={{
                    flexDirection:"row",
                    height: 40,
                    marginHorizontal: 18,
                    padding:10,
                    backgroundColor: "#F9F7F8",
                    borderRadius:10,
                    alignItems: "center"
                    
                }}>
                    <Image source={searchImg}
                           style={{marginRight: 10}}
                    />
                    <TextInput style={{ width: 300}}
                               placeholder={"원하는 주류를 검색해보세요!"}
                    />
                </View>
                
                <TabView navigationState={{index, routes}}
                         renderScene={renderScene}
                         renderTabBar={renderTabBar}
                         onIndexChange={setIndex}
                         swipeEnabled={false}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}