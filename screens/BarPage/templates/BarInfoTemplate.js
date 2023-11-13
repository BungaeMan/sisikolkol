import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useState} from "react";
import {View, Text, ScrollView, Image} from "react-native";
import {colors} from "../../../components/common/style/colors";
import ratingStar from "../../../assets/img/ratingStar.png"
import BarInfoOrganism from "../organisms/BarInfoOrganism";
import ReservationOrganism from "../organisms/ReservationOrganism";
import barBanner from "../../../assets/img/sampleBar.png";
import ReviewOrganism from "../organisms/ReviewOrganism";


export default function BarInfoTemplate({mapList, clickedCenterId}) {
    const [routes] = useState([
        {key: "first", title: "가게정보"},
        {key: "second", title: "예약"},
        {key: "third", title: "리뷰"}
    ]);
    const [index, setIndex] = useState(0);
    const [centerInfo] = useState(mapList.find(e => e.barID === clickedCenterId));
    
    const FirstRoute = () => (
        <BarInfoOrganism info={centerInfo}/>
    )
    
    const SecondRoute = () => (
        <ReservationOrganism info={centerInfo}/>
    )
    
    const ThirdRoute = () => (
        <ReviewOrganism />
    )
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute
    });
    
    const renderTabBar = (props) => (
        <TabBar {...props}
                style={{
                    backgroundColor: 'white',
                    shadowColor: 'white',
                    marginHorizontal: 10,
                    marginBottom: 10,
                    elevation: 0
                }}
                indicatorStyle={{backgroundColor: colors.mainOrange}}
        
                tabStyle={{width: 'auto', height: 40}}
                renderLabel={({route, focused}) => (
                    <Text style={{opacity: focused ? 1 : 0.3, fontWeight: 'bold'}}>
                        {route.title}
                    </Text>
                )}
        
        />
    )
    return (
        
        <ScrollView style={{width:"100%", height:"100%"}}>
            <View style={{alignItems: "center"}}>
                <Image
                    source={barBanner}
                    style={{
                    width: "100%",
                    height: 160,
                    marginBottom: 11
                }}
                />
                <Text style={{
                    fontSize: 18,
                    fontWeight: "500",
                    marginVertical: 2
                }}>{centerInfo.barName}</Text>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={ratingStar} style={{marginRight: 4}}/>
                    <Text>{4}</Text>
                </View>
            </View>
            <TabView style={{height: 800}}
                     navigationState={{index, routes}}
                     renderScene={renderScene}
                     renderTabBar={renderTabBar}
                     onIndexChange={setIndex}
                     swipeEnabled={false}
            />
        
        
        </ScrollView>
    
    
    )
}