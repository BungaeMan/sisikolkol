import {Alert, Image, Pressable, ScrollView, Text, View} from "react-native";
import barBanner from "../../../assets/img/sampleBar.png"
import likeBtn from "../../../assets/img/heart.png"
import likeBtnClicked from "../../../assets/img/heartClicked.png"
import {UserInfo} from "../../../components/recoil/LoginStore";
import {useRecoilValue} from "recoil";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import star from "../../../assets/img/ratingStar.png"
import {barPath} from "../../../components/common/style/photo";

export default function BarListTemplate({mapList, setClickedCenterId, setCenterOfMap}) {
    const userInfo = useRecoilValue(UserInfo);
    const [bookmarkList, setBookmarkList] = useState([]);
    
    const onClickLike = async (id) => {
        await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/bar/bookmark/${id}`,{userID: userInfo.userID});
        if(bookmarkList.includes(id)){
            Alert.alert("찜목에서 취소되었습니다.")
        }
        else{
            Alert.alert("찜목록에 추가되었습니다.")
        }
        await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/bar/bookmark/${userInfo.userID}`)
        .then(res => setBookmarkList(res.data.bookmarkList));
    }
    
    useFocusEffect(
        useCallback(()=>{
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/bar/bookmark/${userInfo.userID}`)
            .then(res => setBookmarkList(res.data.bookmarkList));
    },[]));
    
    
    return (
        <ScrollView>
            {
                mapList &&
                mapList.map((item) => (
                    
                    <Pressable key={item.barID}
                               style={({pressed}) => ({
                                   opacity: pressed ? 0.5 : 1,
                                   justifyContent: 'center',
                                   alignItems: "center",
                                   borderBottomWidth: 3, borderBottomStyle: 'solid', borderBottomColor: '#F8F8F8',
                               })}
                               onPress={() => {
                                   setClickedCenterId(item.barID);
                                   setCenterOfMap({lat: item.barLatitude, lng: item.barLongitude})
                               }}
                    >
                        <View style={{
                            width: "100%",
                            paddingVertical: 12,
                            height: 94,
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 18
                        }}>
                            <Image style={{
                                width: 72,
                                height: 72,
                                borderRadius: 10
                            }}
                                   source={{uri: barPath(item.barID - 432)}}/>
                            <View style={{
                                paddingLeft: 12,
                                justifyContent: "center"
                            }}>
                                <Text>{item.barName}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    opacity: 0.7,
                                    marginVertical: 6
                                }}>{item.barAddress}</Text>
                                
                                <View style={{flexDirection:"row", alignItems: "center"}}>
                                    <Image source={star} />
                                    <Text style={{
                                        marginLeft:3,
                                        fontSize: 12
                                    }}>{item.barStarAverage ? item.barStarAverage.toFixed(1) : 0 }</Text>
                                </View>
                             
                            </View>
                            <Pressable style={{marginLeft: "auto"}}
                                       onPress={()=>onClickLike(item.barID)}
                            >
                                <Image source={bookmarkList.includes(item.barID) ? likeBtnClicked : likeBtn}/>
                            </Pressable>
                        </View>
                    </Pressable>
                ))
            }
        </ScrollView>
    )
}