import {
    View,
    Text,
    Pressable,
    Image,
    ScrollView,
    StyleSheet,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    useWindowDimensions
} from "react-native";
import backBtn from "../../../assets/img/backBtn.png";
import {useEffect, useState} from "react"
import {colors} from "../../../components/common/style/colors";
import star from "../../../assets/img/ratingStar.png";
import closeBtn from "../../../assets/img/closeBtn.png";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {UserInfo} from "../../../components/recoil/LoginStore";
import Modal from "react-native-modal";
import BarInfoTemplate from "../../BarPage/templates/BarInfoTemplate";

export default function BookmarkBar({navigation}) {
    const [bookmarkList, setBookmarkList] = useState([]);
    const [infos, setInfos] = useState([]);
    const [loading, setLoading] = useState(true);
    const userInfo = useRecoilValue(UserInfo);
    const windowWidth = useWindowDimensions();
    const [clickedCenterID, setClickedCenterID] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const onPressClose = (id) => {
        Alert.alert(
            "목록에서 삭제하시겠습니까?",
            null,
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {
                    text: "삭제",
                    onPress: async () => {
                        await axios.post(`http://localhost:8080/bar/bookmark/${id}`, {userID: userInfo.userID});
                        await axios.get(`http://localhost:8080/bar/bookmark/${userInfo.userID}`).then(res => setBookmarkList(res.data.bookmarkList));
                        setInfos([]);
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                        }, 500)
                        
                    }
                }
            ]
        )
        
    }
    
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{width: 23, marginRight: 7}}
                               onPress={() => navigation.goBack()}>
                        <Image source={backBtn}/>
                    </Pressable>
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>찜한 가게</Text>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/bar/bookmark/${userInfo.userID}`)
        .then(res => setBookmarkList(res.data.bookmarkList));
        setInfos([]);
        setLoading(false);
    }, []);
    
    useEffect(() => {
        if (!bookmarkList.length) return;
        bookmarkList.forEach(item => axios.get(`http://localhost:8080/bar/info/${item}`)
        .then(res => setInfos(cur => [...cur, res.data[0]])));
    }, [bookmarkList])
    
    
    return (
        <ScrollView style={{flex: 1, backgroundColor: "white"}}>
            <View style={{flex: 1}}>
                <View style={{backgroundColor: colors.darkGrey20, height: 1}}/>
                
                {
                    loading ? <ActivityIndicator style={{marginTop: 300}}/>
                        :
                        infos.length === 0 ?
                            <Text style={{alignSelf: "center", marginTop: 300}}>찜한 가게가 없습니다.</Text>
                            :
                            infos.map(item => (
                                <Pressable key={item.barID}
                                           style={({pressed}) => ({
                                               flexDirection: "row",
                                               borderBottomWidth: 1,
                                               borderBottomColor: colors.darkGrey20,
                                               paddingVertical: 15,
                                               paddingHorizontal: 15,
                                               opacity: pressed ? 0.5 : 1
                                           })}
                                    onPress={()=> {
                                        setClickedCenterID(item.barID);
                                        setIsOpen(true);
                                    }}
                                >
                                    <View style={{width: 80, height: 80, backgroundColor: "red", borderRadius: 10}}/>
                                    <View style={{paddingVertical: 5, marginLeft: 10}}>
                                        <Text style={styles.title}>{item.barName}</Text>
                                        <Text style={styles.price}>{item.barAddress}</Text>
                                        <View style={{flexDirection: "row", alignItems: "center"}}>
                                            <Image source={star}/>
                                            <Text style={{marginLeft: 3}}>{item.barStarAverage ? item.barStarAverage : 0}</Text>
                                        </View>
                                        {/*<Text style={styles.rating}>review</Text>*/}
                                    </View>
                                    <Pressable onPress={() => onPressClose(item.barID)}
                                               style={{marginLeft: "auto"}}>
                                        <Image source={closeBtn}/>
                                    </Pressable>
                                
                                </Pressable>
                            ))
                }
            </View>
            {
                <Modal isVisible={isOpen} onBackdropPress={()=>setIsOpen(false)}>
                    <SafeAreaView style={{...styles.modalContainer, width: windowWidth.width, height: windowWidth.height - 150}}>
                        <View style={{width: "100%", height: 30, justifyContent: "center", alignItems: "center"}}
                              onMoveShouldSetResponder={(evt) => true}
                              onResponderRelease={(evt) => {
                                  if (evt.nativeEvent.pageY > windowWidth.height / 3) setIsOpen(false)
                              }}
                        >
                            <Pressable style={{width: "100%", height: 20, justifyContent: "center", alignItems: "center"}}>
                                <View style={{width: 50, height: 3, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10}}/>
                            </Pressable>
                        </View>
                    <BarInfoTemplate clickedCenterId={clickedCenterID}/>
                    </SafeAreaView>
                </Modal>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        color: "#000",
        marginBottom: 5,
    },
    price: {
        color: "rgba(0,0,0,0.7)",
        marginBottom: 5
    },
    rating: {
        fontSize: 11,
        opacity: 0.5
        
    },
    btn: {
        width: 200,
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 8,
        marginTop: 10,
        backgroundColor: colors.mainOrange,
        marginLeft: 30
    },
    modalContainer: {
        // width: Layout.window.width,
        // height: Layout.window.height - 150,
        paddingHorizontal: 18,
        marginTop: 200, marginBottom: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'rgba(255,255,255, 1)',
        alignSelf: "center"
    }
})