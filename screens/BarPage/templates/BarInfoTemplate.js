import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useState, useEffect, useCallback} from "react";
import {View, Text, ScrollView, Image, Alert, Pressable} from "react-native";
import {colors} from "../../../components/common/style/colors";
import ratingStar from "../../../assets/img/ratingStar.png"
import BarInfoOrganism from "../organisms/BarInfoOrganism";
import ReservationOrganism from "../organisms/ReservationOrganism";
import barBanner from "../../../assets/img/sampleBar.png";
import ReviewOrganism from "../organisms/ReviewOrganism";
import likeBtn from "../../../assets/img/heart.png"
import likeBtnClicked from "../../../assets/img/heartClicked.png"
import axios from "axios";
import {UserInfo} from "../../../components/recoil/LoginStore";
import {useRecoilValue} from "recoil";
import {useFocusEffect} from "@react-navigation/native";


export default function BarInfoTemplate({clickedCenterId}) {
    const [routes] = useState([
        {key: "first", title: "가게정보"},
        {key: "second", title: "예약"},
        {key: "third", title: "리뷰"}
    ]);
    const [index, setIndex] = useState(0);
    const [centerInfo, setCenterInfo] = useState(null);
    const [bookmarkList, setBookmarkList] = useState([]);
    const [flag, setFlag] = useState(false)
    const userInfo = useRecoilValue(UserInfo);
    
    useEffect(()=>{
        axios.get(`http://localhost:8080/bar/info/${clickedCenterId}`)
        .then(res => setCenterInfo(res.data[0]))
    },[flag, clickedCenterId])
    
    const FirstRoute = () => (
        <BarInfoOrganism info={centerInfo}/>
    )
    
    const SecondRoute = () => (
        <ReservationOrganism info={centerInfo} setFlag = {setFlag} />
    )
    
    const ThirdRoute = () => (
        <ReviewOrganism info={centerInfo}/>
    )
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute
    });
    
    const onClickLike = async () => {
        await axios.post(`http://localhost:8080/bar/bookmark/${clickedCenterId}`, {userID: userInfo.userID});
        if (bookmarkList.includes(clickedCenterId)) {
            Alert.alert("찜목에서 제거되었습니다.")
        } else {
            Alert.alert("찜목록에 추가되었습니다.")
        }
        await axios.get(`http://localhost:8080/bar/bookmark/${userInfo.userID}`)
        .then(res => setBookmarkList(res.data.bookmarkList));
    }
    
    useFocusEffect(
        useCallback(() => {
            axios.get(`http://localhost:8080/bar/bookmark/${userInfo.userID}`)
            .then(res => setBookmarkList(res.data.bookmarkList));
        }, []));
    
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
        
        <ScrollView style={{width: "100%", height: "100%"}}>
            {
                centerInfo &&
                <>
                    <View style={{alignItems: "center"}}>
                        <Image
                            source={barBanner}
                            style={{
                                width: "100%",
                                height: 160,
                                marginBottom: 11
                            }}
                        />
                        <View style={{flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center"}}>
                            <View style={{alignItems: "center"}}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "500",
                                    marginVertical: 2
                                }}>{centerInfo.barName}</Text>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Image source={ratingStar} style={{marginRight: 4}}/>
                                    <Text>{centerInfo.barStarAverage ? centerInfo.barStarAverage.toFixed(1) : 0}</Text>
                                </View>
                            </View>
                            <Pressable onPress={onClickLike}
                                       style={{position: "absolute", right: 18}}>
                                <Image source={bookmarkList.includes(clickedCenterId) ? likeBtnClicked : likeBtn}/>
                            </Pressable>
                        </View>
    
                    </View>
                    <TabView style={{height: 800}}
                             navigationState={{index, routes}}
                             renderScene={renderScene}
                             renderTabBar={renderTabBar}
                             onIndexChange={setIndex}
                             swipeEnabled={false}
                    />
                </>
            }
       
        
        
        </ScrollView>
    
    
    )
}