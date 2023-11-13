import {View, Text, Image, StyleSheet, Alert, Pressable} from "react-native";
import nextArrow from "../../../assets/img/nextCalenderArrow.png"
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {SafeAreaView} from "react-native-safe-area-context";
import {colors} from "../../../components/common/style/colors";
import heartImg from "../../../assets/img/heart.png"
import listImg from "../../../assets/img/listImg.png"
import {LoginStatus} from "../../../components/recoil/LoginStore";


export default function CommonMyPage(props) {
    const setLoginStatus = useSetRecoilState(LoginStatus); //로그인 상태
    
    
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
            <View style={{flex: 1, backgroundColor: "white", paddingHorizontal: 18, paddingTop: 30}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={{color: colors.darkGrey, fontWeight: "700", fontSize: 18, marginRight: 7}}>홍길동</Text>
                    <Image source={nextArrow}/>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#F6F9FE",
                    width: "100%",
                    height: 100,
                    borderRadius: 10,
                    marginVertical: 20,
                    paddingHorizontal: 40
                }}>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.title}>리뷰</Text>
                        <Text style={styles.content}>10</Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.title}>리뷰</Text>
                        <Text style={styles.content}>10</Text>
                    
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.title}>리뷰</Text>
                        <Text style={styles.content}>10</Text>
                    </View>
                </View>
                
                <View style={{marginTop: 18}}>
                    <Pressable style={{flexDirection: "row", alignItems: "center", paddingBottom: 14}}
                               onPress={()=>props.navigation.navigate("Reservation")}
                    >
                        <Image source={listImg} style={{marginRight: 7}}/>
                        <Text style={styles.rowTitle}>예약 내역</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </Pressable>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: "rgba(0,0,0,0.3)",
                        paddingVertical: 18,
                    }}>
                        <Image source={heartImg} style={{marginRight: 7}}/>
                        <Text style={styles.rowTitle}>내가 찜한 주류</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", paddingTop: 16}}>
                        <Image source={listImg} style={{marginRight: 7}}/>
                        <Text style={styles.rowTitle}>내가 찜한 가게</Text>
                        <Image source={nextArrow} style={{marginLeft: "auto"}}/>
                    </View>
                </View>
                <View style={{marginTop: 40}}>
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
