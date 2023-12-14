import {View, Text, StyleSheet, Image, ScrollView, Pressable, useWindowDimensions} from "react-native"
import React, {useCallback, useState} from "react"
import {SafeAreaView, SafeAreaProvider} from "react-native-safe-area-context";
import bannerImg from "../../assets/img/bowmore.jpeg";
import {colors} from "../../components/common/style/colors";
import plusBtn from "../../assets/img/plusBtn.png";
import star from "../../assets/img/mainPageStar.png"
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useRecoilState, useRecoilValue} from "recoil";
import barBanner from "../../assets/img/sampleBar.png"
import axios from "axios";
import {UserInfo} from "../../components/recoil/LoginStore";
import {liquorPath, barPath} from "../../components/common/style/photo";
import Modal from "react-native-modal";
import BarInfoTemplate from "../BarPage/templates/BarInfoTemplate";


export default function MainPage({navigation}) {
    const windowWidth = useWindowDimensions();
    const userInfo = useRecoilValue(UserInfo);
    const [reservation, setReservation] = useState(null);
    const [liquorList, setLiquorList] = useState(null);
    const [barList, setBarList] = useState(null);
    const [clickedID, setClickedID] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    
    useFocusEffect(
        useCallback(() => {
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/bar/reservation/${userInfo.userID}`).then(res => {
                const reverse = [...res.data].reverse();
                const tmp = reverse.find(item => {
                    const target = new Date(item.reservationTime);
                    const now = new Date();
                    
                    return target > now
                })
                setReservation(tmp);
            });
            
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/recommendation`).then(res => setLiquorList(res.data))
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/bar/recommendation`).then(res => setBarList(res.data))
            
        }, [])
    )
    
    console.log(reservation)
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: "white", flex: 1}}>
                <SafeAreaView>
                    <Pressable style={styles.container}
                               onPress ={() => navigation.navigate("Recommendation", {
                                   id: 2
                               })}
                               
                    >
                        <Image source={bannerImg} style={{width: windowWidth.width + 10, height: 300}}/>
                    </Pressable>
                    <View>
                        <View style={{marginTop: 28, paddingHorizontal: 18}}>
                            <Text style={{color: colors.darkGrey, fontSize: 16, fontWeight: 700}}>예약 현황</Text>
                            <Text style={{opacity: 0.3, fontSize: 10, fontWeight: 400, marginTop: 3}}>예약 정보를
                                관리해보세요.</Text>
                        </View>
                        <View
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
                            {reservation ?
                                <Pressable style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    padding: 15
                                }}
                                           onPress={() => navigation.navigate("MyPageStack", {screen: "Reservation"})}
                                >
                                    <View style={{marginLeft: 10}}>
                                        <Text style={{
                                            color: colors.darkGrey,
                                            fontSize: 18,
                                            fontWeight: "700"
                                        }}>{reservation.reservationTime.slice(11,17)} 예약</Text>
                                        <Text style={{opacity: 0.5, marginTop: 5}}>{reservation.barName}</Text>
                                    </View>
                                    <Image style={{width: 90, height: 90, borderRadius: 10}} source={{uri: barPath(reservation.barID - 432)}}/>
                                </Pressable>
                                :
                                <Pressable onPress={() => navigation.navigate("BarStack", {screen: "BarPage"})}>
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
                                </Pressable>}
                        </View>
                        {/*주류픽!*/}
                        <View style={{marginTop: 70, paddingHorizontal: 18}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
    
                                <Text style={{color: colors.darkGrey, fontSize: 16, fontWeight: 700}}>LIQUOR </Text>
                                <Text style={{color: colors.mainOrange, fontSize: 16, fontWeight: 700}}>RANK</Text>
                            </View>
                            <Text style={{opacity: 0.3, fontSize: 10, fontWeight: 400, marginTop: 3}}>가장 많이 찜한 주류를
                                만나보세요.</Text>
                        </View>
                        <ScrollView horizontal={true} style={{marginTop: 9}} showsHorizontalScrollIndicator={false}>
                            {
                                liquorList &&
                                liquorList.map((item, i) =>
                                    <Pressable key={item.liquorID}
                                        onPress={() => {
                                            navigation.navigate("Recommendation",  {id: item.liquorID})
                                        }}
                                        style={{paddingHorizontal: 18}}>
                                        <View style={{
                                            width: 180,
                                            height: 130,
                                            backgroundColor: colors.darkGrey4,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 10
                                        }}>
                                            <Image style={{width: 90, height: 100}}
                                                source={{uri: liquorPath(item.liquorID)}}/>
        
                                        </View>
                                        <View style={{flexDirection: "row", marginTop: 7, alignItems: 'center',}}>
                                            <Text style={{color: colors.darkGrey, fontSize: 12, fontWeight: 500, width: 170}}>{item.liquorName}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                                            <Image source={star}/>
                                            <Text style={{marginLeft: 3, marginRight: 5, fontSize: 10}}>{item.averageStar ? item.averageStar.toFixed(1) : 0}</Text>
                                            <Text style={{color: colors.mainOrange, fontSize: 10, fontWeight: "500"}}>{`RANK ${i+1}`}</Text>
                                        </View>
                                    </Pressable>
                                )
                            }
                        </ScrollView>
    
                        {/*가게픽!*/}
                        <View style={{marginTop: 50, paddingHorizontal: 18}}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
            
                                <Text style={{color: colors.darkGrey, fontSize: 16, fontWeight: 700}}>BAR </Text>
                                <Text style={{color: colors.mainOrange, fontSize: 16, fontWeight: 700}}>RANK</Text>
                            </View>
                            <Text style={{opacity: 0.3, fontSize: 10, fontWeight: 400, marginTop: 3}}>가장 많이 찜한 가게를
                                예약해보세요..</Text>
                        </View>
                        <ScrollView horizontal={true} style={{marginTop: 9}} showsHorizontalScrollIndicator={false}>
                            {
                                barList &&
                                barList.map((item, i) =>
                                    <Pressable key={item.barID}
                                               onPress={() => {
                                                   setIsOpen(true);
                                                   setClickedID(item.barID);
                                               }}
                                               style={{paddingHorizontal: 18}}>
                                        <View style={{
                                            width: 180,
                                            height: 130,
                                            backgroundColor: colors.darkGrey4,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Image style={{width: 180, height: 130, borderRadius: 10}}
                                                   source={{uri: barPath(item.barID - 432)}}/>
                    
                                        </View>
                                        <View style={{flexDirection: "row", marginTop: 7, alignItems: 'center',}}>
                                            <Text style={{color: colors.darkGrey, fontSize: 12, fontWeight: 500, width: 170}}>{item.barName}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop:5}}>
                                            <Image source={star}/>
                                            <Text style={{marginLeft: 3, marginRight: 5, fontSize: 10}}>{item.averageStar ? item.averageStar.toFixed(1) : 0}</Text>
                                            <Text style={{color: colors.mainOrange, fontSize: 10, fontWeight: "500"}}>{`RANK ${i+1}`}</Text>
                                        </View>
                                    </Pressable>
                                )
                            }
                        </ScrollView>
                    </View>
                    
                    {/*작대기*/}
                    <View style={{
                        position: "absolute",
                        top: 560,
                        width: windowWidth.width,
                        height: 0.5,
                        backgroundColor: "black",
                        opacity: 0.1
                    }}/>
                    <View style={{
                        position: "absolute",
                        top: 860,
                        width: windowWidth.width,
                        height: 0.5,
                        backgroundColor: "black",
                        opacity: 0.1
                    }}/>
    
                    {
                        <Modal isVisible={isOpen} onBackdropPress={()=> {
                            setIsOpen(false);
                            setClickedID(null);
                        }}>
                            <SafeAreaView style={{...styles.modalContainer, width: windowWidth.width + 36, height: windowWidth.height - 150}}>
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
                                <BarInfoTemplate clickedCenterId={clickedID}/>
                            </SafeAreaView>
                        </Modal>
                    }
                
                </SafeAreaView>
            </ScrollView>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
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