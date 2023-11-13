import {View, Text, Pressable, Image, useWindowDimensions, ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect} from "react";
import backBtn from "../../../assets/img/backBtn.png";
import {colors} from "../../../components/common/style/colors";
import barImg from "../../../assets/img/sampleBar.png"

export default function ReservationPage(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const windowWidth = useWindowDimensions().width - 36;
    
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
    return (
            <ScrollView style={{flex:1 , backgroundColor: "white"}}>
                <View style={{flex:1, backgroundColor: 'white', paddingHorizontal: 18, marginTop:20, justifyContent: 'center', alignItems: "center"}}>
                    <View style={styles.entryBox}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                            <View>
                                <View style={styles.entryEntity}>
                                    <Text style={styles.smallText}>가게</Text>
                                    <Text style={styles.largeText}>홍대 바 본점</Text>
                                </View>
                                <View style={{...styles.entryEntity, marginVertical: 7}}>
                                    <Text style={{...styles.smallText}}>시간</Text>
                                    <Text style={styles.largeText}>2023/3/24 10:00</Text>
                                </View>
                                <View style={styles.entryEntity}>
                                    <Text style={styles.smallText}>인원</Text>
                                    <Text style={styles.largeText}>2명</Text>
                                </View>
                            </View>
                            <Image source={barImg} style={{width: 70, height: 70}} />
                        </View>
                        <View style={{alignItems: "center", justifyContent:"center", marginTop:20}}>
                            <View style={{backgroundColor: "#F57272", width: "100%", height:30, justifyContent:"center", alignItems: "center", borderRadius: 10}}>
                                <Text style={{color:"white", fontWeight: "500"}}>
                                    취소
                                </Text>
                            </View>
                        </View>
                    </View>
    
                    <View style={{...styles.entryBox, backgroundColor: "#F4F4F4", opacity: 0.8}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
                            <View>
                                <View style={styles.entryEntity}>
                                    <Text style={styles.smallText}>가게</Text>
                                    <Text style={styles.largeText}>홍대 바 본점</Text>
                                </View>
                                <View style={{...styles.entryEntity, marginVertical: 7}}>
                                    <Text style={{...styles.smallText}}>시간</Text>
                                    <Text style={styles.largeText}>2023/3/24 10:00</Text>
                                </View>
                                <View style={styles.entryEntity}>
                                    <Text style={styles.smallText}>인원</Text>
                                    <Text style={styles.largeText}>2명</Text>
                                </View>
                            </View>
                            <Image source={barImg} style={{width: 70, height: 70}} />
                        </View>
                        <View style={{alignItems: "center", justifyContent:"center", marginTop:20}}>
                            <View style={{backgroundColor: colors.mainOrange, width: "100%", height:30, justifyContent:"center", alignItems: "center", borderRadius: 10}}>
                                <Text style={{color:"white", fontWeight: "500"}}>
                                    리뷰 쓰기
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                    
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    entryBox:{
        width:"100%",
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
        alignItems:"center",
    },
    smallText:{
        opacity: 0.4,
        fontSize: 11,
        fontWeight: 300
    },
    largeText: {
        color: "#414141",
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 22
    }
})