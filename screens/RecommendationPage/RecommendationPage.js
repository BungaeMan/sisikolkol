import {View, Text, Pressable, Image, useWindowDimensions, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import backBtn from "../../assets/img/backBtn.png";
import whiskeyDetail1 from "../../assets/img/whiskeyDetail1.png";
import likeBtn from "../../assets/img/likeBtn.png";
import {colors} from "../../components/common/style/colors";
import trash from "../../assets/img/trash.png"
import melonAD from "../../assets/img/melonAD.png"

export default function RecommendationPage() {
    const navigation = useNavigation();
    const windowWidth = useWindowDimensions().width - 36;
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{width: 23, marginLeft: -8, marginRight: 15}}
                               onPress={() => navigation.goBack()}>
                        <Image source={backBtn}/>
                    </Pressable>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    return (
        <>
            <ScrollView style={{flex: 1, backgroundColor: "white"}}>
                <View style={{
                    height: 290,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(247,246,247)'
                }}>
                    <Image source={whiskeyDetail1}/>
                </View>
                <View style={{width: windowWidth, alignSelf: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <View>
                            <Text style={{opacity: 0.5, fontSize: 17, fontWeight: 400}}>Jack Daniels</Text>
                            <Text style={{fontSize: 18, color: colors.darkGrey}}>잭 다니엘스 99년산</Text>
                        </View>
                        <Image style={{marginLeft: 'auto'}} source={likeBtn}/>
                    </View>
                    <View style={{marginTop: 24}}>
                        <Text style={{color: colors.darkGrey, fontSize: 22, fontWeight: 900}}>720,000원</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={trash}/>
                            <Text style={{
                                color: colors.darkGrey,
                                marginLeft: 3,
                                marginRight: 10,
                                fontSize: 15,
                                fontWeight: 500
                            }}>3.5</Text>
                            <Text style={{
                                color: 'rgba(71, 67, 72, 0.7)',
                                fontSize: 12,
                                textDecorationLine: 'underline'
                            }}>리뷰(30)</Text>
                        </View>
                    </View>
                    {/*<Image style={{marginTop: 10, width: windowWidth}} source={melonAD}/>*/}
                    <View style={{
                        justifyContent: 'center',
                        height: 90,
                        backgroundColor: '#F6F9FE',
                        borderRadius: 10,
                        shadowOffset: {width: 0, height: 0},
                        shadowColor: "#000",
                        shadowOpacity: 0.07,
                        shadowRadius: 5,
                        elevation:1,
                        marginTop: 10,
                    }}>
                        <Text style={{color: colors.darkGrey, fontSize: 18, fontWeight: 700, marginLeft: 14}}>2023 멜론 뮤직
                            어워드</Text>
                        <Text style={{
                            color: 'rgba(71, 67, 72, 0.5)',
                            fontSize: 18,
                            fontWeight: 700,
                            marginLeft: 14,
                            marginTop: 3
                        }}>카카오와 함께하는 MMA</Text>
                    </View>
                    <Text style={{
                        color: colors.darkGrey,
                        fontSize: 15,
                        fontWeight: 700,
                        marginTop: 18,
                        marginBottom: 10
                    }}>IMFORMATION</Text>
                    <View style={{
                        height: 155,
                        backgroundColor: '#F6F9FE',
                        borderRadius: 10,
                        shadowOffset: {width: 0, height: 0},
                        shadowColor: "#000",
                        shadowOpacity: 0.07,
                        shadowRadius: 5,
                        elevation:1,
                    }}>
                        <View style={{flex: 1, margin: 10}}>
                            <View style={{flex: 1, flexDirection: "row",}}>
                                <Text style={{flex: 1, fontSize:17, fontWeight:500, color:colors.darkGrey, opacity:0.7}}>향의 강도</Text>
                                <View style={{flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Circle color={colors.mainOrange} text={'약함'}/>
                                    <Circle color={'rgba(71,67,72,0.5)'} text={'보통'}/>
                                    <Circle color={'rgba(71,67,72,0.5)'} text={'강함'}/>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection:'row'}}>
                                <Text style={{flex: 1, fontSize:17, fontWeight:500, color:colors.darkGrey, opacity:0.7}}>바디감</Text>
                                <View style={{flex: 1, flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Circle color={'rgba(71,67,72,0.5)'} text={'약함'}/>
                                    <Circle color={colors.mainOrange} text={'보통'}/>
                                    <Circle color={'rgba(71,67,72,0.5)'} text={'강함'}/>
                                </View>
                            
                            </View>
                        </View>
                    </View>
                    <Text style={{marginTop:15, fontSize:15, color:colors.darkGrey}}>잭 다니엘스는 1866년 미국 테네시주의 린치버그에 재스퍼 뉴튼 다니엘(Jasper Newton "Jack" Daniel)이 설립한 양조장에서 처음 탄생했다...</Text>
                </View>
                <View style={{height:5, backgroundColor:'#F8F8F8', marginTop:10}}/>
            
            </ScrollView>
        </>
    
    )
}

const Circle = (props) => {
    return (
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: props.color,
            shadowRadius:5,
            shadowOpacity:0.1,
            shadowOffset:{width:0, height:0},
            elevation:1,
            shadowColor:"#000"
        }}>
            <Text style={{
                // color:'rgba(71,67,72,0.5)',
                color:props.color,
                fontSize:11,
                fontWeight:500
            }}>
                약함
            </Text>
        </View>
    )
}