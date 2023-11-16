import {Text, View, Image, Pressable, StyleSheet} from "react-native";
import {colors} from "../../../components/common/style/colors";
import clockImg from "../../../assets/img/clockImg.png"
import calenderImg from "../../../assets/img/calendarImg.png"
import downArrow from "../../../assets/img/downArrow.png"
import upArrow from "../../../assets/img/upArrow.png"
import {useState, useEffect} from "react";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
import nextArrow from "../../../assets/img/nextCalenderArrow.png"
import backArrow from "../../../assets/img/backCalenderArrow.png"
import {Alert} from "react-native";
import {useRecoilState, useRecoilValue} from "recoil";
import peopleImg from "../../../assets/img/peopleImg.png"
import plus from "../../../assets/img/plus.png";
import minus from "../../../assets/img/minus.png"
import axios from "axios";
import {UserInfo} from "../../../components/recoil/LoginStore";


export default function ReservationOrganism({info, setFlag}) {
    const [openCalender, setOpenCalender] = useState(false);
    const [openClock, setOpenClock] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [peopleNum, setPeopleNum] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [reservedTime, setReservedTime] = useState([]);
    const userInfo = useRecoilValue(UserInfo);
    const [dateFlag, setDateFlag] = useState(false);
    
    //선택 날짜 변화 계산
    const onDateChange = (date) => {
        const tmp = String(moment(date).format("MM-DD"));
        const tmp2 = tmp.split("-");
        const tmp3 = String(moment(date).format("YYYY-MM-DD"))
        const tmpDate = new Date(date);
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const dayIndex = tmpDate.getDay();
        const dayOfWeek = daysOfWeek[dayIndex];
        setSelectedDay(`${tmp2[0]}월 ${tmp2[1]}일 ${dayOfWeek}요일`);
        setSelectedDate(tmp3);
        setReservedTime([]);
        console.log("seectedDate", tmp3);
        setDateFlag(cur => !cur);
    }
    
    useEffect(()=>{
        if(!selectedDate)return;
    
        info.barReservation.map(item => {
            if(item.includes(selectedDate)){
                setReservedTime(cur => [...cur, item])
            }
        });
    }, [selectedDate, dateFlag])
    
    console.log(reservedTime)
    
    
    const TimeBtn = (props) => {
        let bool = false;
        const tL = props.title.length;
        const sL = props.start.length;
        const eL = props.end.length;
        
    
        if(tL === 5){
            if(sL === 5 && eL === 5){
                bool = props.title >= props.start && props.title < props.end;
            }
            else if(sL === 5 && eL === 4){
                bool = props.title >= props.start;
            }
        }
        else{
            if(sL === 5 && eL === 5){
                bool = false;
            }
            else if(sL === 5 && eL === 4){
                bool = props.title < props.end;
            }
        }
        reservedTime.forEach(item => bool = item.includes(props.title) ? false : bool)
        
        return (
            
                    <Pressable style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 80,
                        height: 40,
                        borderWidth: 1,
                        borderColor: "#BFBFBF",
                        backgroundColor: selectedTime === props.title ? colors.mainOrange : "white",
                        borderRadius: 5,
                        marginHorizontal: 3,
                        marginVertical: 4,
                        opacity: !bool ? 0.5 : 1
                    }}
                               onPress={() => {
                                   if(bool){
                                       if (selectedTime === props.title) {
                                           setSelectedTime(null);
                                       } else {
                                           setSelectedTime(props.title);
                                       }
                                   }
                               }}
                    >
                        <Text style={{
                            fontWeight: "500",
                            color: selectedTime === props.title ? "white" : "black"
                        }}>{props.title}</Text>
                    </Pressable>
                    
             
    
        )
    }
    
    // console.log(info);
    
    
    return (
        <View style={{paddingHorizontal: 18, marginTop:20}}>
            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.5,
                borderColor: "rgba(25, 13, 11, 0.10)",
                paddingBottom: 11
            }}
                       onPress={() => setOpenCalender((cur) => !cur)}
            
            >
                
                <Image source={calenderImg}/>
                <Text style={{marginLeft: 6, fontWeight: 500}}>{selectedDay ? selectedDay : "날짜 선택"}</Text>
                <Image style={{marginLeft: "auto"}} source={openCalender ? upArrow : downArrow}/>
            </Pressable>
            {
                openCalender &&
                <CalendarPicker weekdays={["일", "월", "화", "수", "목", "금", "토"]}
                                months={["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]}
                                selectedDayStyle={{borderRadius: 0, backgroundColor: colors.mainOrange}}
                                todayBackgroundColor={"white"}
                                onDateChange={(date) => onDateChange(date)}
                                dayLabelsWrapper={{borderWidth: 0}}
                                previousComponent={<Image source={backArrow}/>}
                                nextComponent={<Image source={nextArrow}/>}
                                headerWrapperStyle={{justifyContent: "center"}}
                
                />
            }
            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.5,
                borderColor: "rgba(25, 13, 11, 0.50)",
                paddingBottom: 11,
                marginTop: 10,
                opacity: selectedDate ? 1 : 0.5
            }}
                       onPress={() => selectedDate && setOpenClock(cur => !cur)}
            >
                <Image source={clockImg}/>
                <Text style={{marginLeft: 6, fontWeight: 500}}>{selectedTime ? selectedTime : "시간 선택"}</Text>
                <Image source={openClock ? upArrow : downArrow} style={{marginLeft: "auto"}}/>
            </Pressable>
            {
                selectedDate && openClock &&
                <View>
                    <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10, flexWrap:"wrap"}}>
                        {
                            ["17:00", "18:00", "19:00", "20:00","21:00", "22:00", "23:00", "24:00", "1:00",
                                "2:00", "3:00", "4:00"
                            ].map(item => (
                                <TimeBtn key={item} title={item} start={info.barStartTime} end={info.barEndTime}/>
                            ))
                        }
                    </View>
                
                </View>
            }
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
                borderBottomWidth: 1,
                borderColor: "rgba(25, 13, 11, 0.10)",
                paddingBottom: 10
            }}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image source={peopleImg}/>
                    <Text style={{fontWeight: "500", marginLeft: 6}}>인원</Text>
                </View>
                
                {/*예약 인원수 버튼*/}
                <View style={{width: 100, height: 30, flexDirection: "row", justifyContent: "space-between"}}>
                    <Pressable
                        style={({pressed}) => ({...styles.personBtn, borderRightWidth: 0, opacity: pressed ? 0.5 : 1})}
                        onPress={() => setPeopleNum(cur => cur + 1)}
                    >
                        <Image source={plus}/>
                    </Pressable>
                    
                    <View style={{
                        borderWidth: 1,
                        borderColor: colors.mainOrange,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{color: colors.mainOrange, fontWeight: "500"}}>{peopleNum}</Text>
                    </View>
                    
                    <Pressable
                        style={({pressed}) => ({...styles.personBtn, borderLeftWidth: 0, opacity: pressed ? 0.5 : 1})}
                        onPress={() => setPeopleNum(cur => cur !== 0 ? cur - 1 : 0)}
                    >
                        <Image source={minus}/>
                    </Pressable>
                </View>
            </View>
            
            <Pressable style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
                marginTop: 50
            })}
                       onPress={async () => {
                           if (selectedTime && selectedDate && peopleNum) {
                               await axios.post(`http://localhost:8080/bar/reservation/${info.barID}`,{
                                   userID: userInfo.userID,
                                   reservationTime: selectedDate + ' ' + selectedTime,
                                   reservationNum: peopleNum
                               })
                               setFlag(cur => !cur);
                               Alert.alert("예약되었습니다.")
                           } else {
                               Alert.alert("예약 작성을 완료해주세요.")
                           }
                
                       }}
            >
                <View style={{
                    width: "100%",
                    height: 50,
                    // backgroundColor: colors.mainOrange,
                    backgroundColor: colors.navy,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    
                }}>
                    <Text style={{color: 'white', fontWeight: 700, fontSize: 16}}>예약</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    personBtn: {
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#BFBFBF"
    },
    timeBtn:{
    
    }
})


