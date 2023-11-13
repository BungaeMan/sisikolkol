import {View, Text, TouchableWithoutFeedback, StyleSheet, Keyboard, TextInput, Pressable, Alert, Image} from "react-native"
import {colors} from "../../../components/common/style/colors";
import {useState} from "react";
import {LoginStatus, UserInfo} from "../../../components/recoil/LoginStore";
import {useSetRecoilState} from "recoil";
import {useNavigation} from "@react-navigation/native";
import logo from "../../../assets/img/logoOrange.png"
import axios from "axios"

export default function LoginPage() {
    const [loginID, setLoginID] = useState("");
    const [loginPW, setLoginPW] = useState("");
    const setLoginStatus = useSetRecoilState(LoginStatus); //로그인 상태 관리
    const setUserInfo = useSetRecoilState(UserInfo); //user정보 저장
    const navigation = useNavigation();
    
    
    const onClickLogin = async (text) => {
        
        try {
            await axios.post(`http://localhost:8080/login`,{loginID: loginID, loginPW:loginPW},
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                setLoginStatus(true);
                setUserInfo(res.data);
                console.log(res.data)
            })
            
            navigation.navigate("Root");
            Alert.alert("로그인 성공");
        } catch (err) {
            Alert.alert("error");
            console.log(err);
        }
    }
    // console.log(loginID)
    // console.log(loginPW)
    
    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1, justifyContent: "center", }}>
                    <View style={{alignItems: "center"}}>
                        {/*<Text style={{fontSize:18, fontWeight:700}}>시시콜콜</Text>*/}
                        <Image source={logo} style={{width: 80, height: 80}}/>
                        <TextInput style={styles.textInput}
                                   value={loginID}
                                   onChangeText={text => setLoginID(text)}
                                   placeholder={"아이디"}
                                   placeholderTextColor="#BBBBBB"
                                   autoCapitalize="none"
                                   autoCorrect={false}
                        />
                        <TextInput style={styles.textInput}
                                   value={loginPW}
                                   onChangeText={text => setLoginPW(text)}
                                   placeholder={"비밀번호"}
                                   placeholderTextColor="#BBBBBB"
                                   autoCapitalize="none"
                                   secureTextEntry={true}
                                   autoCorrect={false}
                        />
                        <Pressable style={{...styles.textInput, backgroundColor:"rgb(236,104,55)", alignItems: "center", justifyContent: "center", marginTop: 15}}
                                   onPress={onClickLogin}
                            >
                            <Text style={{color: "white", fontWeight: 500, fontSize: 14}}>
                                로그인
                            </Text>
                        </Pressable>
                        
                        <Pressable style={{marginTop:20}}
                                   onPress={()=>navigation.navigate("Signup")}
                        >
                            <Text style={{fontWeight: 400, fontSize: 12, color:colors.darkGrey}}>
                                회원가입
                            </Text>
                        </Pressable>
                      
                        
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}


const styles = StyleSheet.create({
    textInput: {
        backgroundColor:"white",
        width: 280,
        height: 40,
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.2)",
        marginVertical: 5,
        padding: 5,
        borderRadius:10
    }
})