import {
    View,
    Text,
    Pressable,
    Image,
    useWindowDimensions,
    ScrollView,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import {useEffect, useState} from "react";
import backBtn from "../../assets/img/backBtn.png";
import whiskeyDetail1 from "../../assets/img/whiskeyDetail1.png";
import likeBtn from "../../assets/img/heart.png";
import {colors} from "../../components/common/style/colors";
import trash from "../../assets/img/trash.png"
import axios from "axios";
import likeBtnClicked from "../../assets/img/heartClicked.png"
import {UserInfo} from "../../components/recoil/LoginStore";
import {useRecoilValue} from "recoil";


export default function RecommendationDetailPage({navigation, route}) {
    const windowWidth = useWindowDimensions().width - 36;
    const [liquorInfo, setLiquorInfo] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const userInfo = useRecoilValue(UserInfo);
    
    const onClickHeart = async () => {
        await axios.post(`http://localhost:8080/liquor/bookmark/${route.params.id}`, {
            userID:99
        });
        axios.get(`http://localhost:8080/liquor/bookmark/${userInfo.userID}`).then(res =>
            res.data.includes(route.params.id) ?
                setIsLiked(true)
                :
                setIsLiked(false)
        );
    }
    console.log(userInfo);
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
    
    useEffect(() => {
        axios.get(`http://localhost:8080/liquor/info/${route.params.id}`).then(res =>
            setLiquorInfo(res.data)
        );
        axios.get(`http://localhost:8080/liquor/bookmark/${userInfo.userID}`).then(res =>
            res.data.includes(route.params.id) ?
                setIsLiked(true)
                :
                setIsLiked(false)
        );
    }, []);
    
    
    return (
        <>
            {
                !liquorInfo ? <ActivityIndicator/>
                    :
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
                                    <Text style={{opacity: 0.5, fontSize: 17, fontWeight: 400}}>
                                        {liquorInfo.liquorType}
                                    </Text>
                                    <Text style={{fontSize: 18, color: colors.darkGrey}}>
                                        {liquorInfo.liquorName}
                                    </Text>
                                </View>
                                <Pressable style={{marginLeft: 'auto'}} onPress={onClickHeart}>
                                    <Image  source={isLiked ? likeBtnClicked : likeBtn}/>
                                </Pressable>
                            </View>
                            <View style={{marginTop: 24}}>
                                <Text style={{color: colors.darkGrey, fontSize: 20, fontWeight: 900}}>
                                    $ {liquorInfo.liquorPrice}
                                </Text>
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
                                elevation: 1,
                                marginTop: 10,
                            }}>
                                <Text style={{color: colors.darkGrey, fontSize: 18, fontWeight: 700, marginLeft: 14}}>2023
                                    멜론 뮤직
                                    어워드</Text>
                                <Text style={{
                                    color: 'rgba(71, 67, 72, 0.5)',
                                    fontSize: 18,
                                    fontWeight: 700,
                                    marginLeft: 14,
                                    marginTop: 3
                                }}>카카오와 함께하는 MMA</Text>
                            </View>
                            <Text style={styles.subtitle}>IMFORMATION</Text>
                            <View style={{
                                height: 155,
                                backgroundColor: '#F6F9FE',
                                borderRadius: 10,
                                shadowOffset: {width: 0, height: 0},
                                shadowColor: "#000",
                                shadowOpacity: 0.07,
                                shadowRadius: 5,
                                elevation: 1,
                            }}>
                                <View style={{flex: 1, margin: 10}}>
                                    <View style={{flex: 1, flexDirection: "row",}}>
                                        <Text style={{
                                            flex: 1,
                                            fontSize: 17,
                                            fontWeight: 500,
                                            color: colors.darkGrey,
                                            opacity: 0.7
                                        }}>향의 강도</Text>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Circle color={colors.mainOrange} text={'약함'}/>
                                            <Circle color={'rgba(71,67,72,0.5)'} text={'보통'}/>
                                            <Circle color={'rgba(71,67,72,0.5)'} text={'강함'}/>
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Text style={{
                                            flex: 1,
                                            fontSize: 17,
                                            fontWeight: 500,
                                            color: colors.darkGrey,
                                            opacity: 0.7
                                        }}>바디감</Text>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Circle color={'rgba(71,67,72,0.5)'} text={'약함'}/>
                                            <Circle color={colors.mainOrange} text={'보통'}/>
                                            <Circle color={'rgba(71,67,72,0.5)'} text={'강함'}/>
                                        </View>
                                    
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.subtitle}>DETAIL</Text>
                            <Text style={{fontSize: 15, color: colors.darkGrey}}>
                                {liquorInfo.liquorDetail}
                            </Text>
                        </View>
                        <View style={{height: 5, backgroundColor: '#F8F8F8', marginTop: 10}}/>
                    
                    </ScrollView>
            }
        
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
            shadowRadius: 5,
            shadowOpacity: 0.1,
            shadowOffset: {width: 0, height: 0},
            elevation: 1,
            shadowColor: "#000"
        }}>
            <Text style={{
                // color:'rgba(71,67,72,0.5)',
                color: props.color,
                fontSize: 11,
                fontWeight: 500
            }}>
                약함
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    subtitle:{
        color: colors.darkGrey,
        fontSize: 15,
        fontWeight: 700,
        marginTop: 18,
        marginBottom: 10
    }
})