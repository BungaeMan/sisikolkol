import {View, Text, Pressable, Image, useWindowDimensions, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import backBtn from "../../assets/img/backBtn.png";
import whiskeyDetail1 from "../../assets/img/whiskeyDetail1.png";
import likeBtn from "../../assets/img/likeBtn.png";
import {colors} from "../../components/common/style/colors";
import trash from "../../assets/img/trash.png"
import melonAD from "../../assets/img/melonAD.png"

export default function ReservationPage() {
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
                    <Text style={{fontSize: 18, fontWeight: '700', color: '#474348'}}>예약 현황</Text>
                </View>,
            headerTitle: () => <></>,
            headerBackVisible: false,
        });
    }, []);
    return (
        <>
            <View style={{flex:1, backgroundColor:'white'}}>
                <Text>준비중</Text>
            </View>
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
            elevation:3,
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