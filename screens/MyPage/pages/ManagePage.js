import {View, Text, ScrollView, Pressable, Image, StyleSheet, useWindowDimensions, Alert} from "react-native";
import backBtn from "../../../assets/img/backBtn.png";
import {useEffect, useState, useCallback} from "react"
import {colors} from "../../../components/common/style/colors";
import {useRecoilValue} from "recoil";
import {UserInfo} from "../../../components/recoil/LoginStore";
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import barImg from "../../../assets/img/sampleBar.png";

export default function ManagePage({navigation}){
    const userInfo = useRecoilValue(UserInfo);
    const windowSize = useWindowDimensions();
    const [infos, setInfos] = useState(null);
    const [finish, setFinish] = useState([]);
    const [trigger, setTrigger] = useState(false);
    
    const onPressCancel = async (reservationID, userID) => {
        
        Alert.alert(
            "취소하시겠습니까?",
            null,
            [{
                text: "취소",
                style: "cancel"
            },
                {
                    text: "확인",
                    onPress: async () => {
                        await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/bar/reservation/cancel/${reservationID}`,{
                            userID: userID
                        })
                        .then(res => {
                            Alert.alert("취소되었습니다.");
                            setTrigger(cur => !cur);
                        })
                        .catch(err => Alert.alert(err.response.data.error))
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
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>가게 관리</Text>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    
    useFocusEffect(
        useCallback(() => {
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/bar/reservation/manage/${userInfo.manageBarID}`)
            .then(res => {
                
                console.log("ddd", res.data)
                setInfos(res.data);

                const tmp = res.data.map(item => {
                    const target = new Date(item.reservationTime);
                    const now = new Date();
                    //지난 예약이면 false
                    return target > now;
                })
                setFinish(tmp);
            })
            
        }, [trigger]));
    return(
        <ScrollView style={{flex:1, backgroundColor: "white"}}>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 18,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: "center"
            }}>
    
                {
                    infos &&
                    infos.map((item, i) =>
                        <View style={{
                            ...styles.entryBox,
                            opacity: finish[i] ? 1 : 0.8,
                            backgroundColor: finish[i] ? "white" : "#F4F4F4"
                        }}
                              key={item.reservationID}>
                            <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                                <View>
                                    <View style={{...styles.entryEntity, marginBottom: 7}}>
                                        <Text style={styles.smallText}>예약자</Text>
                                        <Text style={{...styles.largeText, marginLeft: 13}}>{item.userNickname}</Text>
                                    </View>
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
                                {/*<Image source={barImg} style={{width: 70, height: 70}}/>*/}
                            </View>
                            {
                                finish[i] &&
                                <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                                    <Pressable style={{
                                        backgroundColor: finish[i] ? "#F57272" : colors.mainOrange,
                                        width: "100%",
                                        height: 30,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 10
                                    }}
                                               onPress={() => onPressCancel(item.reservationID, item.userID)}
                                    >
                                        <Text style={{color: "white", fontWeight: "500"}}>
                                            {finish[i] ? "취소" : "리뷰 쓰기"}
                                        </Text>
                                    </Pressable>
                                </View>
                            }
                            
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    entryBox: {
        width: "100%",
        // height: 150,
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