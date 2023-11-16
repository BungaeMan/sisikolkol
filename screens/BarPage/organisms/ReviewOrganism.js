import {View, Text, StyleSheet, Image} from "react-native"
import {Rating} from "react-native-ratings";
import {colors} from "../../../components/common/style/colors";
import star from "../../../assets/img/reviewStar.png"


export default function ReviewOrganism({info}) {
    
    console.log(info.barReview)
    return (
        <View>
            <View style={{alignItems: "center", marginTop: 23, marginBottom: 20}}>
                <Text style={styles.starText}>{info.barStarAverage ? info.barStarAverage : 0}</Text>
                <Rating type={"custom"}
                        ratingColor="#FFC008"
                        imageSize={24}
                        readonly={true}
                        fractions={1}
                        startingValue={info.barStarAverage}
                />
                <Text style={{color: "#888", fontSize: 12, marginTop: 10}}>{info.barReview.length}개의 리뷰</Text>
            </View>
            
            <View style={{width: "100%", height: 5, backgroundColor: "#F8F8F8"}}/>
            
            
            {
                info.barReview &&
                info.barReview.map((item, i) => (
                    <View key={i} style={styles.reviewEntry}>
                        
                        <View style={styles.reviewBox}>
                            <Text style={{color: "#BFBFBF", fontWeight: "700"}}>{item.userNickname}</Text>
                            <Text style={{opacity: 0.5}}>{item.barReviewTime.slice(0, 10)}</Text>
                        </View>
                        
                        
                        <View style={styles.reviewBox}>
                            <Text style={{
                                color: colors.darkGrey,
                                fontSize: 16,
                                fontWeight: "500"
                            }}>{item.barReviewDetail}</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Image source={star}/>
                                <Text style={styles.starText}>{item.barStar}</Text>
                            </View>
                        </View>
                    
                    </View>
                ))
            }
        
        
        </View>
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
        paddingBottom: 14,
        justifyContent: "space-between"
    },
    reviewBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    }
})