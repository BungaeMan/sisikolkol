import {View, Text, Image, StyleSheet, Alert, Pressable} from "react-native";
import nextArrow from "../../../assets/img/nextCalenderArrow.png"
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {SafeAreaView} from "react-native-safe-area-context";
import {colors} from "../../../components/common/style/colors";
import {LoginStatus, UserInfo} from "../../../components/recoil/LoginStore";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";


export default function CommonMyPage(props) {
    const setLoginStatus = useSetRecoilState(LoginStatus); //로그인 상태
    const userInfo = useRecoilValue(UserInfo);
    const [reviewList, setReviewList] = useState(null);
    const [barReviewList, setBarReviewList] = useState(null);
    
    useFocusEffect(
        useCallback(() => {
            axios.get(`http://localhost:8080/liquor/review/${userInfo.userNickname}`)
            .then(res => setReviewList(res.data.reviews));
            axios.get(`http://localhost:8080/bar/review/${userInfo.userNickname}`)
            .then(res => setBarReviewList(res.data.reviewedBars));
        }, []));
    
    
    const logOut = () => {
        Alert.alert(
            "로그아웃 하시겠어요?",
            null,
            [
                {
                    text: "취소", onPress: () => {
                    },
                    style: "cancel"
                },
                {
                    text: "확인",
                    onPress: () => {
                        setLoginStatus(false);
                        props.navigation.navigate("LoginStack");
                    }
                }
            ]
        )
    }
    
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            <View style={{flex: 1, backgroundColor: "white", paddingTop: 30}}>
                <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 18,}}>
                    <Text style={{color: colors.darkGrey, fontWeight: "700", fontSize: 18, marginRight: 7}}>홍길동</Text>
                    <Image source={nextArrow}/>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#F6F9FE",
                    height: 100,
                    borderRadius: 10,
                    marginVertical: 20,
                    paddingHorizontal: 40,
                    marginHorizontal: 18
                }}>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.title}>리뷰</Text>
                        <Text style={styles.content}>10</Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.title}>주류 리뷰</Text>
                        <Text style={styles.content}>{reviewList ? reviewList.length : 0}</Text>
                    
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.title}>가게 리뷰</Text>
                        <Text style={styles.content}>{barReviewList ? barReviewList.length : 0}</Text>
                    </View>
                </View>
                
                <View style={{marginTop: 18, paddingHorizontal: 18}}>
                    <Pressable style={{flexDirection: "row", alignItems: "center", paddingBottom: 14}}
                               onPress={() => props.navigation.navigate("Reservation")}
                    >
                        {/*<Image source={listImg} style={{marginRight: 7}}/>*/}
                        <Text style={styles.rowTitle}>예약 내역</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </Pressable>
                    
                    <Pressable style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: "rgba(0,0,0,0.3)",
                        paddingVertical: 18,
                    }}
                               onPress={() => props.navigation.navigate("BookmarkWhiskey")}
                    >
                        <Text style={styles.rowTitle}>내가 찜한 주류</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </Pressable>
                    
                    <Pressable onPress={() => props.navigation.navigate("BookmarkBar")}
                               style={{flexDirection: "row", alignItems: "center", paddingTop: 16}}>
                        <Text style={styles.rowTitle}>내가 찜한 가게</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </Pressable>
                
                </View>
                <View style={{backgroundColor: "#DFDFDF", height: 7, marginTop: 20}}/>
                
                <View style={{paddingHorizontal: 18}}>
                    
                    <Pressable onPress={() => props.navigation.navigate("LiquorReview", {reviewList: reviewList})}
                               style={{
                                   paddingVertical: 18,
                                   flexDirection: "row", alignItems: "center", paddingTop: 16, borderBottomWidth: 0.5,
                                   borderColor: "rgba(0,0,0,0.3)",
                               }}>
                        <Text style={styles.rowTitle}>주류 리뷰</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </Pressable>
                    
                    <Pressable onPress={() => props.navigation.navigate("BarReview", {reviewList: barReviewList})}
                               style={{flexDirection: "row", alignItems: "center", paddingTop: 16}}>
                        <Text style={styles.rowTitle}>가게 리뷰</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </Pressable>
                </View>
                
                <View style={{marginTop: 40, paddingHorizontal: 18}}>
                    <Text style={styles.underText}>비밀번호 변경</Text>
                    <Pressable onPress={logOut}>
                        <Text style={{...styles.underText, marginVertical: 15}}>로그아웃</Text>
                    </Pressable>
                    <Text style={styles.underText}>계정탈퇴</Text>
                
                </View>
            </View>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: colors.darkGrey,
        fontWeight: "500",
        marginBottom: 9
    },
    content: {
        fontWeight: 700,
        fontSize: 17
    },
    rowTitle: {
        color: colors.darkGrey,
        fontSize: 18,
        fontWeight: "700",
    },
    underText: {
        color: "#C4C4C4",
        
    }
})
