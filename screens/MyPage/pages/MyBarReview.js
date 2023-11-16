import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import backBtn from "../../../assets/img/backBtn.png";
import {useEffect} from "react"
import {colors} from "../../../components/common/style/colors";
import star from "../../../assets/img/reviewStar.png";
import Modal from "react-native-modal";

export default function MyBarReview({navigation, route}){
    
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{width: 23, marginRight: 7}}
                               onPress={() => navigation.goBack()}>
                        <Image source={backBtn}/>
                    </Pressable>
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>찜한 주류</Text>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    
    return(
        <ScrollView style={{flex:1 , backgroundColor: "white"}}>
        
            <View style={{width: "100%", height: 2, backgroundColor: "#F8F8F8"}}/>
        
        
            {
                !route.params.reviewList ?
                    <Text>쓴 리뷰가 없습니다</Text>
                    :
                    route.params.reviewList.map((item,i)=>(
                        <Pressable key={i}
                                   style={styles.reviewEntry}>
                        
                            <View style={styles.reviewBox}>
                                <Text style={{color: "#BFBFBF", fontWeight: "700", width: "80%"}}>{item.barName}</Text>
                                <Text style={{opacity:0.5}}>{item.barReviewTime.slice(0,10)}</Text>
                            </View>
                        
                        
                            <View style={styles.reviewBox}>
                                <Text style={{color: colors.darkGrey, fontSize:16, fontWeight: "500"}}>{item.barReviewDetail}</Text>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Image source={star} />
                                    <Text style={styles.starText}>{item.barStar}</Text>
                                </View>
                            </View>
                            
                        </Pressable>
                    ))
            }
    
            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    starText: {
        color: "#FFC008",
        fontSize: 18,
        fontWeight: "700"
    },
    reviewEntry: {
        height: 90,
        borderBottomWidth: 2,
        borderBottomColor: "#F8F8F8",
        paddingHorizontal: 18,
        paddingTop: 17,
        paddingBottom:14,
        justifyContent: "space-between"
    },
    reviewBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    }
})