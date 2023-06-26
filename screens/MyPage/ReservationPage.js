import {View, Text, Pressable, Image, useWindowDimensions, ScrollView} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {useEffect} from "react";
import backBtn from "../../assets/img/backBtn.png";
import whiskeyDetail1 from "../../assets/img/whiskeyDetail1.png";
import likeBtn from "../../assets/img/likeBtn.png";
import {colors} from "../../components/common/style/colors";
import trash from "../../assets/img/trash.png"
import melonAD from "../../assets/img/melonAD.png"

export default function ReservationPage(props) {
    const navigation = useNavigation();
    const route = useRoute();
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
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:"center"}}>
                {route.params ? <Text>에약내역이 있습니다.</Text>
                :
                    <Text>예약 내역이 없습니다</Text>
                }
            </View>
        </>
        
    )
}


