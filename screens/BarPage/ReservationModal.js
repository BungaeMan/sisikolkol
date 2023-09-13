import Modal from "react-native-modal";
import {View, Text, Pressable, Alert} from "react-native";
import {colors} from "../../components/common/style/colors";

const ReservationModal = (props) => {
    
    
    return (
        <Modal isVisible={props.open} style={{alignItems: 'center'}}
               onBackdropPress={() => {
                   props.setOpen(false);
               }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFF',
                width: props.width,
                height: 700,
                marginTop: 200,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }}>
                <Pressable style={({pressed})=>({
                    opacity: pressed ? 0.5 : 1
                })}
                           onPress={()=>{
                               props.setStatus({id: null});
                               Alert.alert("예약이 취소되었습니다.")
                               props.setOpen(false);
                           }}
                
                >
                    <View style={{
                        width: 300,
                        height: 50,
                        backgroundColor: colors.mainOrange,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        
                    }}>
                        <Text style={{color:'white', fontWeight:700, fontSize:16 }}>예약취소</Text>
                    </View>
                </Pressable>
            </View>
        </Modal>
    )
}

export default ReservationModal;