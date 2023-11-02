import {View, TextInput, Pressable, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard} from "react-native"
import {useEffect} from "react"
import backBtn from "../../../assets/img/backBtn.png"
import {colors} from "../../../components/common/style/colors";

export default function SignupPage({navigation}) {
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<View style={{flexDirection: "row", alignItems: "row"}}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image source={backBtn}/>
                </Pressable>
                <Text style={{fontSize: 17, fontWeight: "700", color: colors.darkGrey, marginLeft: 8}}>회원가입</Text>
            </View>), headerTitle: () => <></>, headerBackVisible: false,
        });
    }, []);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
            <View style={{flex: 1, paddingHorizontal: 50}}>
                <Text style={{alignSelf: "center", marginTop: 27, marginBottom: 20, fontWeight: "700"}}>기본정보</Text>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <TextInput style={styles.inputStyle}
                               placeholder={"아이디"}
                               autoCapitalize="none"
                    />
                    <Pressable style={({pressed})=> ({
                        ...styles.bth,
                        opacity: pressed ? 0.5 : 1
                    })}>
                        <Text style={styles.btnText}>아이디 확인</Text>
                    </Pressable>
                </View>
                
                <TextInput style={{...styles.inputStyle, width: "100%"}}
                           placeholder={"비밀번호 (영문, 특수문자 포함 8자리 이상)"}
                           secureTextEntry
                           autoCapitalize="none"
                />
                <TextInput style={{...styles.inputStyle, width: "100%"}}
                           placeholder={"비밀번호 확인"}
                           secureTextEntry
                           autoCapitalize="none"
                />
                
                
                <TextInput style={{...styles.inputStyle, width: "100%", marginTop: 15}}
                           placeholder={"이름"}
                           autoCapitalize="none"
                           
                />
                
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <TextInput style={styles.inputStyle}
                               placeholder={"닉네임"}
                               autoCapitalize="none"
                               
                    />
                    <Pressable style={({pressed})=> ({
                        ...styles.bth,
                        opacity: pressed ? 0.5 : 1
                    })}>
                        <Text style={styles.btnText}>닉네임 확인</Text>
                    </Pressable>
                </View>
                
                <Pressable style={({pressed}) => ({
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 40,
                    backgroundColor: colors.mainOrange,
                    borderRadius: 10,
                    marginTop: 100,
                    opacity: pressed ? 0.5 : 1
                })}>
                    <Text style={styles.btnText}>
                        가입 완료
                    </Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        width: "70%",
        height: 40,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.2)",
        padding: 10,
        marginVertical: 5
    }, bth: {
        width: 80,
        height: 40,
        backgroundColor: colors.mainOrange,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    }, btnText: {
        color: "white", fontWeight: "500", fontSize: 12
    }
})