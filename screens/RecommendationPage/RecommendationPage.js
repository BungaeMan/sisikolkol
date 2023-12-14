import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    SafeAreaView,
    ScrollView, Pressable, StyleSheet,
    ActivityIndicator, Alert, useWindowDimensions
} from "react-native"
import {useState, useEffect, useCallback} from "react";
import {colors} from "../../components/common/style/colors";
import searchImg from "../../assets/img/searchImg.png"
import axios from "axios"
import whiskeyBanner from "../../assets/img/johnnie.jpeg";
import star from "../../assets/img/ratingStar.png";
import {useFocusEffect} from "@react-navigation/native";
import {useRecoilValue} from "recoil";
import {UserInfo} from "../../components/recoil/LoginStore";
import heart from "../../assets/img/redHeart.png"
import voidHeart from "../../assets/img/brokenHeart.png"

import {liquorPath} from "../../components/common/style/photo";

export default function RecommendationPage({navigation}) {
    const [liquorList, setLiquorList] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [bookmarkList, setBookmarkList] = useState([]);
    const userInfo = useRecoilValue(UserInfo);
    const windowWidth = useWindowDimensions();
    
    
    const handleSearch = async () => {
        
        try {
            if (searchText === "") {
                axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/info`).then(res => setLiquorList(res.data));
            } else {
                await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/search/${searchText}`)
                .then(res => setLiquorList(res.data));
            }
            
            
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 500)
        } catch (err) {
            Alert.alert("주류 정보를 찾을 수 없습니다.")
        }
    }
    
    useFocusEffect(
        useCallback(() => {
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/info`).then(res => setLiquorList(res.data));
            axios.get(`${process.env.REACT_APP_IP_ADDRESS}/liquor/bookmark/${userInfo.userID}`)
            .then(res => setBookmarkList(res.data));
        }, []));
    
    console.log(bookmarkList)
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={{display: "flex", flex: 1, backgroundColor: "white"}}>
                <View style={{
                    flexDirection: "row",
                    height: 40,
                    marginHorizontal: 18,
                    padding: 10,
                    backgroundColor: "#F9F7F8",
                    borderRadius: 10,
                    alignItems: "center",
                    marginBottom: 20
                    
                }}>
                    <Pressable>
                        <Image source={searchImg}
                               style={{marginRight: 10}}
                        />
                    </Pressable>
                    <TextInput style={{width: 300}}
                               value={searchText}
                               onChangeText={(text) => setSearchText(text)}
                               onSubmitEditing={handleSearch}
                               placeholder={"원하는 주류를 검색해보세요!"}
                               autoCapitalize="none"
                               autoCompleteType="off"
                    />
                
                </View>
                <ScrollView style={{flex: 1}}>
                    <Pressable>
                        <Pressable style={{alignItems: "center"}} onPress={()=>navigation.navigate("RecommendationDetail",{id: 1})}>
                            <Image style={{width: windowWidth.width + 10, height: 300}} source={whiskeyBanner}/>
                        </Pressable>
                        
                        {/*<View style={{flexDirection: "row", marginTop: 25, marginHorizontal: 18}}>*/}
                        {/*    <View style={styles.filterStyle}>*/}
                        {/*        <Text style={styles.filterText}>*/}
                        {/*            블랜딩*/}
                        {/*        </Text>*/}
                        {/*        <Image style={{marginLeft: "auto"}} source={downArrow}/>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.filterStyle}>*/}
                        {/*        <Text style={styles.filterText}>*/}
                        {/*            #향*/}
                        {/*        </Text>*/}
                        {/*        <Image style={{marginLeft: "auto"}} source={downArrow}/>*/}
                        {/*    */}
                        {/*    </View>*/}
                        {/*    <View style={styles.filterStyle}>*/}
                        {/*        <Text style={styles.filterText}>*/}
                        {/*            #바디감*/}
                        {/*        </Text>*/}
                        {/*        <Image stlye={{marginLeft: "auto"}} source={downArrow}/>*/}
                        {/*    */}
                        {/*    </View>*/}
                        {/*</View>*/}
                        
                        <View
                            style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 18, marginTop: 20}}>
                            <Text style={{
                                color: colors.darkGrey,
                                fontSize: 12,
                                fontWeight: "500"
                            }}>총 {liquorList && liquorList.length} 개</Text>
                            
                            
                        
                        </View>
                        
                        {
                            loading ? <ActivityIndicator style={{marginTop: 100}}/>
                                :
                                <View style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    marginTop: 12,
                                    paddingHorizontal: 22,
                                    justifyContent: "space-between"
                                }}>
                                    {
                                        !liquorList ?
                                            <View style={{flex: 1, alignItems: "center", marginTop: 100}}>
                                                <ActivityIndicator/>
                                            </View>
                                            :
                                            liquorList.map(item => (
                                                <Pressable key={item.liquorID}
                                                           style={{paddingBottom: 15, flexWrap: "wrap"}}
                                                           onPress={() => navigation.navigate("RecommendationDetail", {id: item.liquorID})}
                                                >
                                                    <View>
                                                        <View style={{
                                                            width: 160,
                                                            height: 150,
                                                            marginBottom: 10,
                                                            backgroundColor: colors.darkGrey4,
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}
                                                        >
                                                            <Image style={{width:80 ,height: 120}} source={{uri: liquorPath(item.liquorID)}} />
                                                        </View>
                                                        {
                                                            bookmarkList.includes(item.liquorID) ?
                                                                <Image style={{position: "absolute", right:10, top:10}} source={heart} />
                                                                :
                                                                <Image style={{position: "absolute", right:10, top:10}} source={voidHeart} />
                                                        }
                                                    </View>
                                                    
                                                    <Text style={{
                                                        color: colors.darkGrey,
                                                        fontWeight: "700",
                                                        width: 160,
                                                        marginBottom: 5
                                                    }}>
                                                        {item.liquorName}
                                                    </Text>
                                                    <Text style={{
                                                        color: colors.darkGrey,
                                                        fontSize: 12
                                                    }}>$ {item.liquorPrice}</Text>
                                                    <View style={{flexDirection: "row", marginTop: 3}}>
                                                        <Image source={star}/>
                                                        <Text style={{
                                                            marginRight: 12,
                                                            fontSize: 10,
                                                            fontWeight: "500",
                                                            marginLeft: 2
                                                        }}>{item.liquorAvgStar ? item.liquorAvgStar.toFixed(1) : 0}</Text>
                                                        {/*<Image source={reviewImg}/>*/}
                                                        {/*<Text*/}
                                                        {/*    style={{*/}
                                                        {/*        fontSize: 10,*/}
                                                        {/*        fontWeight: "500",*/}
                                                        {/*        marginLeft: 3*/}
                                                        {/*    }}>{bookmarkList.includes(item.liquorID) && "찜"}</Text>*/}
                                                    </View>
                                                </Pressable>
                                            ))
                                    }
                                
                                </View>
                        }
                    
                    </Pressable>
                
                
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
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