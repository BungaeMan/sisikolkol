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
    useWindowDimensions,
    TextInput
} from 'react-native';
import {useEffect, useState} from "react";
import backBtn from "../../../assets/img/backBtn.png";
import {colors} from "../../../components/common/style/colors";
import {UserInfo} from "../../../components/recoil/LoginStore";
import {useRecoilValue} from "recoil";
import axios from "axios"
import closeBtn from "../../../assets/img/closeBtn.png"
import star from "../../../assets/img/ratingStar.png"
import Modal from "react-native-modal";
import {Rating} from "react-native-ratings";


export default function BookmarkWhiskey({navigation}) {
    const userInfo = useRecoilValue(UserInfo);
    const [bookmarkList, setBookmarkList] = useState(null);
    const [infos, setInfos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const windowSize = useWindowDimensions();
    const [clickedID, setClickedID] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [reviewStar, setReviewStar] = useState(null);
    const onPressClose = (liquorId) => {
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
                        await axios.post(`http://localhost:8080/liquor/bookmark/${liquorId}`, {userID: userInfo.userID});
                        await axios.get(`http://localhost:8080/liquor/bookmark/${userInfo.userID}`).then(res => setBookmarkList(res.data));
                        setInfos([]);
                    }
                }
            ]
        )
        
    }
    
    const onPressReview = async () => {
        if (reviewText.length === 0 || !reviewStar) {
            Alert.alert("리뷰내용 혹은 별점을 입력해주세요.");
            return;
        }
        
        try {
            await axios.post(`http://localhost:8080/liquor/review/${clickedID}`, {
                userNickname: userInfo.userNickname,
                liquorStar: reviewStar,
                liquorReviewDetail: reviewText
            }).then(() => {
                Alert.alert("리뷰가 등록되었습니다.");
                setReviewStar(null);
                setReviewText("");
            })
        } catch (err) {
            Alert.alert(err.response.data.error);
        }
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8080/liquor/bookmark/${userInfo.userID}`).then(res => setBookmarkList(res.data));
    }, []);
    
    useEffect(() => {
        if (!bookmarkList) return;
        
        bookmarkList.forEach(item => axios.get(`http://localhost:8080/liquor/info/${item}`)
        .then(res => setInfos(cur => [...cur, res.data[0]])));
    }, [bookmarkList])
    
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{width: 23, marginRight: 7}}
                               onPress={() => navigation.goBack()}>
                        <Image source={backBtn}/>
                    </Pressable>
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>찜한 주류</Text>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    
    
    return (
        <ScrollView style={{flex: 1, backgroundColor: "white"}}>
            <View style={{flex: 1}}>
                <View style={{backgroundColor: colors.darkGrey20, height: 1}}/>
                {
                    infos.length === 0 ?
                        <Text style={{alignSelf: "center", marginTop: 300}}>찜한 주류가 없습니다.</Text>
                        :
                        infos.map(item => (
                            <Pressable key={item.liquorID}
                                       style={{
                                           flexDirection: "row",
                                           borderBottomWidth: 1,
                                           borderBottomColor: colors.darkGrey20,
                                           paddingVertical: 15,
                                           paddingHorizontal: 15
                                       }}
                                       onPress={() => navigation.navigate("WhiskeyDetail", {id: item.liquorID})}
                            >
                                <View style={{width: 80, height: 100, backgroundColor: "red", borderRadius: 10}}/>
                                <View style={{paddingVertical: 5, marginLeft: 10}}>
                                    <Text style={styles.title}>{item.liquorName}</Text>
                                    <Text style={styles.price}>$ {item.liquorPrice}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center"}}>
                                        <Image source={star}/>
                                        <Text style={{marginLeft:3}}>{item.averageLiquorStar ? item.averageLiquorStar : 0}</Text>
                                    </View>
                                    <Pressable onPress={() => {
                                        setClickedID(item.liquorID);
                                        setIsOpen(true);
                                    }}
                                               style={styles.btn}>
                                        <Text style={{color: "white", fontWeight: "500"}}>리뷰쓰기</Text>
                                    
                                    </Pressable>
                                </View>
                                <Pressable onPress={() => onPressClose(item.liquorID)}
                                           style={{marginLeft: "auto"}}>
                                    <Image source={closeBtn}/>
                                </Pressable>
                            
                            </Pressable>
                        ))
                }
                
                
                <Modal style={{alignItems: "center"}}
                       isVisible={isOpen}
                       onBackdropPress={() => {
                           setIsOpen(false);
                           setReviewStar(null);
                           setReviewText("");
                           setClickedID(null);
                       }}
                >
                    <SafeAreaView
                        style={{...styles.modalContainer, width: windowSize.width, height: windowSize.height - 400}}>
                        
                        <View style={{paddingHorizontal: 18, marginTop: 30}}>
                            <Text style={{color: colors.darkGrey, fontWeight: "700"}}>평가 및 리뷰</Text>
                            <Rating style={{marginTop: 10, alignSelf: "flex-start"}}
                                    type={"custom"}
                                    ratingColor="#FFC008"
                                    imageSize={24}
                                    startingValue={0}
                                    jumpValue={1}
                                    onFinishRating={(value) => setReviewStar(value)}
                            />
                        </View>
                        <View style={styles.textBox}>
                            <TextInput style={{...styles.input, width: windowSize.width - 72}}
                                       placeholder={"욕설, 불법 배포, 허위매물 사기 등 금지\n리뷰를 안전하고 유익하게 쓰시기 바랍니다."}
                                       value={reviewText}
                                       onChangeText={(text) => setReviewText(text)}
                                       autoCapitalize="none"
                                       autoCompleteType="off"
                                       multiline={true}
                            />
                        </View>
                        
                        <Pressable style={({pressed}) => ({
                            ...styles.reviewBtn,
                            opacity: pressed ? 0.5 : 1
                        })}
                                   onPress={() => onPressReview()}
                        >
                            <Text style={{color: "white", fontWeight: 500}}>리뷰 작성</Text>
                        </Pressable>
                    
                    </SafeAreaView>
                </Modal>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#000",
        opacity: 0.9,
        marginBottom: 5,
        fontWeight: "500",
        width: "70%"
    },
    price: {
        color: colors.darkGrey,
        fontWeight: "700",
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
        paddingHorizontal: 18,
        marginTop: 400,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'rgba(255,255,255, 1)',
    },
    textBox: {
        height: 200,
        marginHorizontal: 18,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.darkGrey20,
        padding: 15,
        marginTop: 20,
        alignItems: "center"
    },
    input: {
        color: colors.darkGrey,
    },
    reviewBtn: {
        marginHorizontal: 18,
        height: 40,
        backgroundColor: colors.mainOrange,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    }
})