import {View, Text, Image, useWindowDimensions, StyleSheet, ScrollView, Pressable} from "react-native"
import {useEffect, useState} from "react"
import whiskeyBanner from "../../../assets/img/whiskeyBanner.png"
import {colors} from "../../../components/common/style/colors";
import downArrow from "../../../assets/img/filterDownArrow.png"
import star from "../../../assets/img/ratingStar.png"
import reviewImg from "../../../assets/img/reviewImg.png"
import axios from "axios";


/*
    작성날짜: 2023/10/30 3:37 PM
    작성자: 박근우
    작성내용: 주류추천 페이지 위스키 페이지
*/
export default function RecommendationWhisky() {
    const windowWidth = useWindowDimensions().width;
    const [liquorList, setLiquorList] = useState(null);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/info`).then(res => setLiquorList(res.data))
    }, [])
    
    return (
        <ScrollView style={{flex: 1}}>
            <Pressable>
                <View>
                    <Image style={{width: "100%"}} source={whiskeyBanner}/>
                </View>
                
                <View style={{flexDirection: "row", marginTop: 25, marginHorizontal: 18}}>
                    <View style={styles.filterStyle}>
                        <Text style={styles.filterText}>
                            블랜딩
                        </Text>
                        <Image style={{marginLeft: "auto"}} source={downArrow}/>
                    </View>
                    <View style={styles.filterStyle}>
                        <Text style={styles.filterText}>
                            #향
                        </Text>
                        <Image style={{marginLeft: "auto"}} source={downArrow}/>
                    
                    </View>
                    <View style={styles.filterStyle}>
                        <Text style={styles.filterText}>
                            #바디감
                        </Text>
                        <Image stlye={{marginLeft: "auto"}} source={downArrow}/>
                    
                    </View>
                </View>
                
                <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 18, marginTop: 10}}>
                    <Text style={{color: colors.darkGrey, fontSize: 12, fontWeight: "500"}}>총 00 개</Text>
                    
                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: "auto"}}>
                        <Text
                            style={{marginRight: 3, color: colors.darkGrey, fontSize: 12, fontWeight: "500"}}>전체</Text>
                        <Image source={downArrow}/>
                    </View>
                
                </View>
                
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 12,
                    paddingHorizontal: 22,
                    justifyContent: "space-between"
                }}>
                    {
                        !liquorList ?
                            <Text>loading...</Text>
                            :
                            liquorList.map(item => (
                                <View style={{paddingBottom: 15, flexWrap: "wrap"}}>
                                    <View style={{width: 160, height: 150, marginBottom: 10, backgroundColor: "black"}}
                                        />
                                    <Text style={{color: colors.darkGrey, fontWeight: "700", width:160, marginBottom: 5}}>
                                        {item.liquorName}
                                    </Text>
                                    <Text style={{color: colors.darkGrey, fontSize: 12}}>${item.liquorPrice}</Text>
                                    <View style={{flexDirection: "row", marginTop: 3}}>
                                        <Image source={star}/>
                                        <Text style={{
                                            marginRight: 12,
                                            fontSize: 10,
                                            fontWeight: "500",
                                            marginLeft: 2
                                        }}>4</Text>
                                        <Image source={reviewImg}/>
                                        <Text style={{fontSize: 10, fontWeight: "500", marginLeft: 3}}>123</Text>
                                    </View>
                                </View>
                            ))
                    }
                
                </View>
            </Pressable>
        
        </ScrollView>)
}


const styles = StyleSheet.create({
    filterStyle: {
        paddingHorizontal: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 10,
        width: 60,
        height: 22,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgba(0,0,0,0.3)",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowColor: "#000",
        shadowRadius: 5,
        marginRight: 7
    },
    filterText: {
        fontSize: 12,
        fontWeight: "500",
        color: colors.darkGrey,
        
    }
    
})