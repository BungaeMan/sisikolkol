import {
    View,
    Text,
    Pressable,
    Image,
    useWindowDimensions,
    ScrollView,
    ActivityIndicator,
    StyleSheet, Alert
} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import backBtn from "../../assets/img/backBtn.png";
import likeBtn from "../../assets/img/heart.png";
import {colors} from "../../components/common/style/colors";
import axios from "axios";
import likeBtnClicked from "../../assets/img/heartClicked.png"
import {UserInfo} from "../../components/recoil/LoginStore";
import {useRecoilValue} from "recoil";
import {useFocusEffect} from "@react-navigation/native";
import {Rating} from "react-native-ratings";
import star from "../../assets/img/reviewStar.png";
import {liquorPath} from "../../components/common/style/photo";



export default function RecommendationDetailPage({navigation, route}) {
    const windowWidth = useWindowDimensions().width - 36;
    const [liquorInfo, setLiquorInfo] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const userInfo = useRecoilValue(UserInfo);
    
    const onClickHeart = async () => {
        await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/liquor/bookmark/${route.params.id}`, {
            userID: userInfo.userID
        })
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/bookmark/${userInfo.userID}`).then(res => {
                if (res.data.includes(route.params.id)) {
                    setIsLiked(true);
                    Alert.alert("찜목록에 추가되었습니다.")
                } else {
                    setIsLiked(false);
                    Alert.alert("찜목록에서 제거되었습니다.")
                }
            }
        );
    }
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{width: 23, marginRight: 7}}
                               onPress={() => navigation.goBack()}>
                        <Image source={backBtn}/>
                    </Pressable>
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>상세 보기</Text>

                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    
    useFocusEffect(
        useCallback(() => {
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/info/${route.params.id}`).then(res =>
                setLiquorInfo(res.data[0])
            );
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/bookmark/${userInfo.userID}`).then(res =>
                res.data.includes(route.params.id) ?
                    setIsLiked(true)
                    :
                    setIsLiked(false)
            );
        }, [route.params.id]));
    
    
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
                            <Image style={{width: 180, height: 240}} source={{uri: liquorPath(route.params.id)}}/>
                        </View>
                        <View style={{width: windowWidth, alignSelf: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                <View>
                                    <Text style={{opacity: 0.5, fontSize: 17, fontWeight: 400}}>
                                        {liquorInfo.liquorType}
                                    </Text>
                                    <Text style={{fontSize: 18, color: colors.darkGrey, width: 300}}>
                                        {liquorInfo.liquorName}
                                    </Text>
                                </View>
                                <Pressable style={{marginLeft: 'auto'}} onPress={onClickHeart}>
                                    <Image source={isLiked ? likeBtnClicked : likeBtn}/>
                                </Pressable>
                            </View>
                            <View style={{marginTop: 24}}>
                                <Text style={{color: colors.darkGrey, fontSize: 20, fontWeight: 900}}>
                                    $ {liquorInfo.liquorPrice}
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                                    <Rating type={"custom"}
                                            ratingColor= {colors.mainOrange}
                                            imageSize={16}
                                            readonly={true}
                                            fractions={1}
                                            startingValue={liquorInfo.averageLiquorStar}
                                    />
                                    <Text style={{
                                        color: colors.darkGrey,
                                        marginLeft: 3,
                                        marginRight: 10,
                                        fontSize: 15,
                                        fontWeight: 500
                                    }}>{liquorInfo.averageLiquorStar ? liquorInfo.averageLiquorStar.toFixed(1) : 0}</Text>
                                    <Text style={{
                                        color: 'rgba(71, 67, 72, 0.7)',
                                        fontSize: 12,
                                        textDecorationLine: 'underline'
                                    }}>{`리뷰(${liquorInfo.liquorReview.length})`}</Text>
                                </View>
                            </View>
                            {/*<Image style={{marginTop: 10, width: windowWidth}} source={melonAD}/>*/}
                            <Text style={styles.subtitle}>IMFORMATION</Text>
                            <View style={{
                                backgroundColor: '#F6F9FE',
                                borderRadius: 10,
                                shadowOffset: {width: 0, height: 0},
                                shadowColor: "#000",
                                shadowOpacity: 0.07,
                                shadowRadius: 5,
                                elevation: 1,
                                marginBottom: 10
                            }}>
                                <View style={{flex: 1, margin: 10}}>
                                    <Text style={{fontSize: 15, color: colors.darkGrey}}>
                                        {liquorInfo.liquorDetail}...
                                    </Text>
                                </View>
                            </View>
                        
                        </View>
                        <View style={{height: 7, backgroundColor: '#F8F8F8', marginTop: 10}}/>
                        
                        <View>
                            <View style={{alignItems: "center", marginTop: 23, marginBottom: 20}}>
                                <Text style={styles.starText}>{liquorInfo.averageLiquorStar ? liquorInfo.averageLiquorStar.toFixed(1) : 0}</Text>
                                <Rating type="custom"
                                        ratingColor={colors.mainOrange}
                                        imageSize={24}
                                        readonly={true}
                                        fractions={1}
                                        startingValue={liquorInfo.averageLiquorStar}
                                />
                                <Text style={{color: "#888", fontSize: 12, marginTop: 10}}>{liquorInfo.liquorReview.length}개의 리뷰</Text>
                            </View>
                            
                            <View style={{width: "100%", height: 5, backgroundColor: "#F8F8F8"}}/>
                            
                            
                            {
                                liquorInfo.liquorReview.map((item, i) => (
                                    <View key={i} style={styles.reviewEntry}>
                                        
                                        <View style={styles.reviewBox}>
                                            <Text
                                                style={{color: "#BFBFBF", fontWeight: "700"}}>{item.userNickname}</Text>
                                            <Text style={{opacity: 0.5}}>{item.liquorReviewTime.slice(0,10)}</Text>
                                        </View>
                                        
                                        
                                        <View style={styles.reviewBox}>
                                            <Text style={{
                                                color: colors.darkGrey,
                                                fontSize: 16,
                                                fontWeight: "500"
                                            }}>{item.liquorReviewDetail}</Text>
                                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                                <Image source={star}/>
                                                <Text style={styles.starText}>{item.liquorStar}</Text>
                                            </View>
                                        </View>
                                    
                                    </View>
                                ))
                            }
                        
                        
                        </View>
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
    subtitle: {
        color: colors.darkGrey,
        fontSize: 15,
        fontWeight: 700,
        marginTop: 18,
        marginBottom: 10
    },
    starText: {
        color: colors.mainOrange,
        fontSize: 18,
        fontWeight: "700"
    },
    reviewEntry: {
        height: 90,
        borderBottomWidth: 2,
        borderBottomColor: "#F8F8F8",
        paddingHorizontal: 18,
        paddingTop: 17,
        paddingBottom: 14,
        justifyContent: "space-between"
    },
    reviewBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    }
})