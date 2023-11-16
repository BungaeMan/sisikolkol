import {
    View,
    Text,
    Pressable,
    Image,
    useWindowDimensions,
    ScrollView,
    StyleSheet,
    TextInput,
    SafeAreaView, Alert
} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import backBtn from "../../../assets/img/backBtn.png";
import {colors} from "../../../components/common/style/colors";
import barImg from "../../../assets/img/sampleBar.png"
import axios from "axios";
import {useRecoilValue} from "recoil";
import {UserInfo} from "../../../components/recoil/LoginStore";
import Modal from "react-native-modal";
import {Rating} from "react-native-ratings";

export default function ReservationPage(props) {
    const navigation = useNavigation();
    const userInfo = useRecoilValue(UserInfo);
    const windowSize = useWindowDimensions();
    const [infos, setInfos] = useState([]);
    const [clickedID, setClickedID] = useState(null);
    const [clickedName, setClickedName] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [reviewStar, setReviewStar] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [finish, setFinish] = useState([]);
    
    const onPressReview = async () => {
        if (reviewText.length === 0 || !reviewStar) {
            Alert.alert("리뷰내용 혹은 별점을 입력해주세요.");
            return;
        }
        
        try {
            await axios.post(`http://localhost:8080/bar/review/${clickedID}`, {
                userNickname: userInfo.userNickname,
                barStar: reviewStar,
                barReviewDetail: reviewText
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
        navigation.setOptions({
            headerLeft: () =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{width: 23, marginRight: 7}}
                               onPress={() => navigation.goBack()}>
                        <Image source={backBtn}/>
                    </Pressable>
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>예약 현황</Text>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/bar/reservation/${userInfo.userID}`)
        .then(res => {
            setInfos(res.data);
            res.data.forEach(item => {
                const target = new Date(item.reservationTime);
                const now = new Date();
                //지난 예약이면 false
                setFinish(cur => [...cur, now < target]);
            })
        })
        
    }, []);
    
    
    const dateString = '2023-11-10 23:00';
    const date = new Date(dateString);
    const now = new Date();
    console.log(date < now);
    
    // console.log(infos.reservationTime[0])
    return (
        <ScrollView style={{flex: 1, backgroundColor: "white"}}>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 18,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: "center"
            }}>
                
                {
                    infos.map((item, i) =>
                        <View style={{
                            ...styles.entryBox,
                            opacity: finish[i] ? 1 : 0.8,
                            backgroundColor: finish[i] ? "white" : "#F4F4F4"
                        }}
                              key={item.reservationID}>
                            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                                <View>
                                    <View style={styles.entryEntity}>
                                        <Text style={styles.smallText}>가게</Text>
                                        <Text style={styles.largeText}>{item.barName}</Text>
                                    </View>
                                    <View style={{...styles.entryEntity, marginVertical: 7}}>
                                        <Text style={{...styles.smallText}}>시간</Text>
                                        <Text style={styles.largeText}>{item.reservationTime}</Text>
                                    </View>
                                    <View style={styles.entryEntity}>
                                        <Text style={styles.smallText}>인원</Text>
                                        <Text style={styles.largeText}>{item.reservationNum}</Text>
                                    </View>
                                </View>
                                <Image source={barImg} style={{width: 70, height: 70}}/>
                            </View>
                            <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                                <Pressable style={{
                                    backgroundColor: finish[i] ? "#F57272" : colors.mainOrange,
                                    width: "100%",
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 10
                                }}
                                           onPress={() => {
                                               if(!finish[i]){
                                                   setIsOpen(true);
                                                   setClickedID(item.barID);
                                                   setClickedName(item.barName);
                                               }
                                           }}
                                >
                                    <Text style={{color: "white", fontWeight: "500"}}>
                                        {finish[i] ? "취소" : "리뷰 쓰기"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    )
                }
            
            
            </View>
            {
                <Modal style={{alignItems: "center"}}
                       isVisible={isOpen}
                       onBackdropPress={() => {
                           setIsOpen(false);
                           setReviewStar(null);
                           setReviewText("");
                           setClickedID(null);
                           setClickedName(null);
                       }}
                >
                    <SafeAreaView
                        style={{...styles.modalContainer, width: windowSize.width, height: windowSize.height - 400}}>
                        
                        <View style={{paddingHorizontal: 18, marginTop: 30}}>
                            <Text style={{color: colors.darkGrey, fontWeight: "500", fontSize: 16}}>{clickedName}</Text>
                            {/*<Text style={{color: colors.darkGrey, fontWeight: "700"}}>평가 및 리뷰</Text>*/}
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
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    entryBox: {
        width: "100%",
        height: 150,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 18,
        paddingBottom: 16,
        paddingRight: 14,
        paddingTop: 15,
        marginBottom: 20,
        borderColor: "#F4F4F4"
        //기간 지났을시 #F4F4F4
    },
    entryEntity: {
        flexDirection: "row",
        alignItems: "center",
    },
    smallText: {
        opacity: 0.4,
        fontSize: 11,
        fontWeight: 300
    },
    largeText: {
        color: "#414141",
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 22
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