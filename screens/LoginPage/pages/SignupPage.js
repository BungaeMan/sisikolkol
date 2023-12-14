import {View, TextInput, Pressable, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, Alert} from "react-native"
import {useEffect, useState} from "react"
import backBtn from "../../../assets/img/backBtn.png"
import {colors} from "../../../components/common/style/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupPage({navigation}) {
    const [check, setCheck] = useState({
        id: false,
        nickname: false,
        email: false
    })
    const [info, setInfo] = useState({
        id:"",
        pw:"",
        pwCheck: "",
        name: "",
        nickname:"",
        email:""
    })
    
    const [inputID, setInputID] = useState("");
    const [inputNickname, setInputNickname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    
    const pwErrCheck = () => {
        const pw = info.pw;
        const pwCheck = info.pwCheck;
        const regex = /[a-zA-Z!@#$%^&*?]/;
        if(pw !== pwCheck){
            throw "비밀번호 확인을 다시 입력해주세요.";
        }
        if (pw.length < 8 || pw.length > 16
            || pw !== pwCheck || !regex.test(pw)) {
            throw "비밀번호양식이 잘못되었습니다.";
        }
        
    }
    
    const checkID = async() => { //아이디 확인
        if (inputID.replace(/^\s+|\s+$/g, '') === "") { //빈칸 입력 시
            setInfo({...info, id: ""});
            setCheck({...check, id: false});
            Alert.alert('아이디를 입력해주세요.');
        }
        else {
            const checkStr = /\s/;
            if(checkStr.test(inputID)){
                setInfo({...info, id: ""});
                setCheck({...check, id: false});
                Alert.alert("아이디에 공백을 포함할 수 없습니다.")
                return;
            }
            else if(inputID.length < 5){
                setInfo({...info, id: ""});
                setCheck({...check, id: false});
                Alert.alert("아이디는 최소 5자 이상이여야합니다.");
                return;
            }
            await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/signup/loginID/${inputID}`)  //api호출
            .then(() => {
                Alert.alert('사용 가능한 아이디입니다.')
                setCheck({...check, id: true}); //아이디중복 확인을 했다는 표시
                setInfo({...info, id: inputID});
            })
            .catch((err) => {
                Alert.alert(err.response.data.error);
                setCheck({...check, id: false});//아이디 중복 실패시 false
                setInfo({...info, id: ""});
            })
        }
    };
    
    const checkNickname = async() => { //닉네임 확인
        if (inputNickname.replace(/^\s+|\s+$/g, '') === "") { //빈칸 입력 시
            setInfo({...info, nickname: ""});
            setCheck({...check, nickname: false});
            
            Alert.alert('닉네임을 입력해주세요.')
        }
        else if (inputNickname.length > 10 || inputNickname.length < 2) {
            setInfo({...info, nickname: ""});
            setCheck({...check, nickname: false});
            Alert.alert('닉네님은 2~10자로 입력해주세요.')
        }
        else {
            await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/signup/userNickname/${inputNickname}`)   //api호출
            .then((res) => {
                Alert.alert('사용 가능한 닉네임입니다.')
                setCheck({...check, nickname: true});   //nickname중복 확인 표시
                setInfo({...info, nickname: inputNickname});
            })
            .catch((err) => {
                Alert.alert(err.response.data.error);
                setCheck({...check, nickname: false});  //nickname중복 실패시 false
                setInfo({...info, nickname: ""});
                // setInputNickName("");
            });
        }
    };
    const checkEmail = async() => { //이메일 확인
        if (inputEmail.replace(/^\s+|\s+$/g, '') === "") { //빈칸 입력 시
            setInfo({...info, email: ""});
            setCheck({...check, email: false});
            
            Alert.alert('이메일을 입력해주세요.')
        }
        else if (!inputEmail.includes("@")) {
            setInfo({...info, email: ""});
            setCheck({...check, email: false});
            Alert.alert('이메일을 정확하게 기입해주세요')
        }
        else {
            await axios.get(`${process.env.REACT_APP_IP_ADDRESS}/signup/userNickname/${inputEmail}`)   //api호출
            .then((res) => {
                Alert.alert('사용 가능한 닉네임입니다.')
                setCheck({...check, email: true});   //email중복 확인 표시
                setInfo({...info, email: inputEmail});
            })
            .catch((err) => {
                Alert.alert(err.response.data.error);
                setCheck({...check, email: false});  //email중복 실패시 false
                setInfo({...info, email: ""});
                // setInputNickName("");
            });
        }
    };
    
    const onSubmitForm = async () => { //가입하기
        if(!check.id){
            Alert.alert("아이디 확인을 해주세요.");
        }
        else if(!check.nickname){
            Alert.alert("닉네임확인을 해주세요.");
        }
        else{
            Alert.alert(
                "회원가입 하시겠습니까?",
                null,
                [
                    {
                        text: "취소",
                        style: "cancel"
                    },
                    {
                        text: "확인",
                        onPress: async () => {
                            try {
                                pwErrCheck();
                                await axios.post(`${process.env.REACT_APP_IP_ADDRESS}/signup`, {
                                    loginID: info.id,
                                    loginPW: info.pw,
                                    userNickname: info.nickname,
                                    userName: info.name,
                                    userEmail: info.email,
                                    deviceID: await AsyncStorage.getItem("deviceId")
                                })
                                .then(()=> {
                                    Alert.alert("회원가입이 완료되었습니다.");
                                    navigation.navigate("Home")
                                })
                                .catch((err)=>Alert.alert(err.response.data.error))
                            }
                            catch (err){
                                Alert.alert(err);
                            }
                            
                        }
                    }
                ]
            )
        }
        
    }
    
    
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<View style={{flexDirection: "row", alignItems: "center"}}>
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
                               value={inputID}
                               onChangeText={(text)=>setInputID(text)}
                    />
                    <Pressable style={({pressed})=> ({
                        ...styles.bth,
                        opacity: pressed ? 0.5 : 1
                    })}
                        onPress={checkID}
                    >
                        <Text style={styles.btnText}>아이디 확인</Text>
                    </Pressable>
                </View>
                
                <TextInput style={{...styles.inputStyle, width: "100%"}}
                           placeholder={"비밀번호 (영문, 특수문자 포함 8자리 이상)"}
                           secureTextEntry
                           autoCapitalize="none"
                           value={info.pw}
                           onChangeText={(text)=>setInfo({...info, pw:text})}
                />
                <TextInput style={{...styles.inputStyle, width: "100%"}}
                           placeholder={"비밀번호 확인"}
                           secureTextEntry
                           autoCapitalize="none"
                           value={info.pwCheck}
                           onChangeText={(text)=>setInfo({...info, pwCheck:text})}
                />
                
                
                <TextInput style={{...styles.inputStyle, width: "100%", marginTop: 15}}
                           placeholder={"이름"}
                           autoCapitalize="none"
                           value={info.name}
                           onChangeText={(text)=>setInfo({...info, name:text})}
                           
                />
                
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <TextInput style={styles.inputStyle}
                               placeholder={"닉네임"}
                               autoCapitalize="none"
                               value={inputNickname}
                               onChangeText={(text)=>setInputNickname(text)}
                               
                    />
                    <Pressable style={({pressed})=> ({
                        ...styles.bth,
                        opacity: pressed ? 0.5 : 1
                    })}
                                onPress={checkNickname}
                    >
                        <Text style={styles.btnText}>닉네임 확인</Text>
                    </Pressable>
                </View>
    
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop:10}}>
                    <TextInput style={{...styles.inputStyle, width: "100%"}}
                               placeholder={"이메일"}
                               autoCapitalize="none"
                               value={info.email}
                               onChangeText={(text)=>setInfo({...info, email:text})}
        
                    />
                    {/*<Pressable style={({pressed})=> ({*/}
                    {/*    ...styles.bth,*/}
                    {/*    opacity: pressed ? 0.5 : 1*/}
                    {/*})}*/}
                    {/*>*/}
                    {/*    <Text style={styles.btnText}>이메일 확인</Text>*/}
                    {/*</Pressable>*/}
                </View>
                
                <Pressable style={({pressed}) => ({
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: 40,
                    backgroundColor: colors.mainOrange,
                    borderRadius: 10,
                    marginTop: 50,
                    opacity: pressed ? 0.5 : 1
                })}
                    onPress={onSubmitForm}
                >
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