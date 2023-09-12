import {View, Text, StyleSheet, Image, ScrollView, Pressable, useWindowDimensions} from "react-native"
import React, {useState} from "react"
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import bannerImg from "../../assets/img/bannerImg1.png";
import {colors} from "../../components/common/style/colors";
import plusBtn from "../../assets/img/plusBtn.png";
import whiskey1 from "../../assets/img/whiskey1.png";
import star from "../../assets/img/mainPageStar.png"
import {useNavigation} from "@react-navigation/native";
import ReservationModal from "../BarPage/ReservationModal";

export default function MainPage() {
    const windowWidth = useWindowDimensions().width;
    const navigation = useNavigation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReserved, setIsReserved ] = useState(false);
    
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "white", flex: 1}}>
                <SafeAreaView>
                    {/*<ScrollView style={{height:100}}horizontal={true} showsHorizontalScrollIndicator={false}>*/}
                    <View style={styles.container}>
                        <Image source={bannerImg} style={{width: "100%"}}/>
                    </View>
                    {/*</ScrollView>*/}
                    <View>
                        <View style={{marginTop: 28, paddingHorizontal: 18}}>
                            <Text style={{color: colors.darkGrey, fontSize: 16, fontWeight: 700}}>예약 현황</Text>
                            <Text style={{opacity: 0.3, fontSize: 10, fontWeight: 400, marginTop: 3}}>예약 정보를
                                관리해보세요.</Text>
                        </View>
                        <Pressable
                            onPress={() => {
                                    navigation.navigate("BarStack");
                            }}
                            style={{
                                backgroundColor: "white",
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: 18,
                                height: 120,
                                shadowColor: "#000",
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.07,
                                shadowRadius: 5,
                                elevation: 1,
                                borderRadius: 10,
                                marginTop: 10
                            }}>
                            {isReserved ? <Text>예약정보 바로가기</Text>
                                :
                            <View >
                                <Text style={{fontSize: 10, opacity: 0.5, fontWeight: 500, textAlign: 'center'}}>
                                    예약된 정보가 없습니다.</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 4,
                                }}>
                                    <Image source={plusBtn}/>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: colors.mainOrange,
                                        marginLeft: 5,
                                        fontSize: 14,
                                        fontWeight: 500
                                    }}>예약하기</Text>
                                </View>
                            </View>}
                        </Pressable>
                        {/*주류픽!*/}
                        <View style={{marginTop: 70, paddingHorizontal: 18}}>
                            <Text style={{color: colors.darkGrey, fontSize: 16, fontWeight: 700}}>오늘의 주류 PICK</Text>
                            <Text style={{opacity: 0.3, fontSize: 10, fontWeight: 400, marginTop: 3}}>다양한 주류를
                                만나보세요.</Text>
                        </View>
                        <ScrollView horizontal={true} style={{marginTop: 9}} showsHorizontalScrollIndicator={false}>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("Recommendation")
                                }}
                                style={{paddingHorizontal: 18}}>
                                <View style={{
                                    width: 180,
                                    height: 130,
                                    backgroundColor: "rgb(248,246,253)",
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image source={whiskey1}/>
                                
                                </View>
                                <View style={{flexDirection: "row", marginTop: 7, alignItems: 'center', }}>
                                    <Text style={{color: colors.darkGrey, fontSize: 12, fontWeight: 400}}>[박근우 픽] 잭 다니엘
                                        99년산</Text>
                                    <View style={{
                                        width: 24,
                                        height: 12,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: "#F57171",
                                        marginLeft: 3
                                    }}>
                                        <Text style={{color: "white", fontSize: 9, fontWeight: 700}}>추천</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', }}>
                                    <Image source={star}/>
                                    <Text style={{marginLeft: 3, marginRight: 5, fontSize: 10}}>5.0</Text>
                                    <Text style={{color: colors.mainOrange, fontSize: 10}}>#향 강함 #바디감 약함</Text>
                                </View>
                            </Pressable>
                            {/*중복*/}
                            <Pressable
                                onPress={() => {
                                    navigation.navigate("Recommendation")
                                }}
                            >
                                <View style={{
                                    width: 180,
                                    height: 130,
                                    backgroundColor: "rgb(248,246,253)",
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image source={whiskey1}/>
                                
                                </View>
                                <View style={{flexDirection: "row", marginTop: 7, alignItems: 'center'}}>
                                    <Text style={{color: colors.darkGrey, fontSize: 12, fontWeight: 400}}>[박근우 픽] 잭 다니엘
                                        99년산</Text>
                                    <View style={{
                                        width: 24,
                                        height: 12,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: "#F57171",
                                        marginLeft: 3
                                    }}>
                                        <Text style={{color: "white", fontSize: 9, fontWeight: 700}}>추천</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={star}/>
                                    <Text style={{marginLeft: 3, marginRight: 5, fontSize: 10}}>5.0</Text>
                                    <Text style={{color: colors.mainOrange, fontSize: 10}}>#향 강함 #바디감 약함</Text>
                                </View>
                            </Pressable>
                        
                        </ScrollView>
                    </View>
                    
                    {/*작대기*/}
                    <View style={{
                        position: "absolute",
                        top: 560,
                        width: windowWidth,
                        height: 0.5,
                        backgroundColor: "black",
                        opacity: 0.1
                    }}/>
                
                </SafeAreaView>
            </ScrollView>
            <ReservationModal open={isModalOpen} setOpen={setIsModalOpen} width={windowWidth} setReserved={setIsReserved}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    }
})