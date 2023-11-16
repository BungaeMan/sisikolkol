import {Image, Pressable, StyleSheet, Text, View, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import backBtn from "../../../assets/img/backBtn.png";
import {colors} from "../../../components/common/style/colors";
import star from "../../../assets/img/reviewStar.png";
import Modal from "react-native-modal";


export default function MyLiquorReview({navigation, route}){
    
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable style={{width: 23, marginRight: 7}}
                               onPress={() => navigation.goBack()}>
                        <Image source={backBtn}/>
                    </Pressable>
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>주류 리뷰</Text>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    
    // console.log(route.params.reviewList)
    
    return(
        <ScrollView style={{flex:1 , backgroundColor: "white"}}>
            
            <View style={{width: "100%", height: 2, backgroundColor: "#F8F8F8"}}/>
            
            
            {
                !route.params.reviewList ?
                    <Text>쓴 리뷰가 없습니다</Text>
                    :
                route.params.reviewList.map((item,i)=>(
                    <Pressable key={i}
                               onPress={()=>navigation.navigate("WhiskeyDetail", {id: item.liquorID})}
                               style={styles.reviewEntry}>
                    
                        <View style={styles.reviewBox}>
                            <Text style={{color: "#BFBFBF", fontWeight: "700", width: "80%"}}>{item.liquorName}</Text>
                            <Text style={{opacity:0.5}}>{item.liquorReviewtime.slice(0,10)}</Text>
                        </View>
                    
                    
                        <View style={styles.reviewBox}>
                            <Text style={{color: colors.darkGrey, fontSize:16, fontWeight: "500"}}>{item.liquorReviewDetail}</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Image source={star} />
                                <Text style={styles.starText}>{item.liquorStar}</Text>
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