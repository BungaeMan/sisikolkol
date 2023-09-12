import {Text, View, Image, Pressable} from "react-native";
import {colors} from "../../../components/common/style/colors";
import clockImg from "../../../assets/img/clockImg.png"
import calenderImg from "../../../assets/img/calendarImg.png"
import downArrow from "../../../assets/img/downArrow.png"
import upArrow from "../../../assets/img/upArrow.png"
import {useState} from "react";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
import nextArrow from "../../../assets/img/nextCalenderArrow.png"
import backArrow from "../../../assets/img/backCalenderArrow.png"
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function ReservationOrganism() {
    const [openCalender, setOpenCalender] = useState(false);
    const [openClock, setOpenClock] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    
    //선택 날짜 변화 계산
    const onDateChange = (date) => {
        // setSelectedDay(date);
        const tmp = String(moment(date).format("MM-DD"));
        const tmp2 = tmp.split("-");
        const tmpDate = new Date(date);
        const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
        const dayIndex = tmpDate.getDay();
        const dayOfWeek = daysOfWeek[dayIndex];
        console.log(dayOfWeek);
        setSelectedDay(`${tmp2[0]}월 ${tmp2[1]}일 ${dayOfWeek}요일`);
    }
    
    const TimeBtn = (props) => {
        
        return (
            <Pressable style={{
                justifyContent: "center",
                alignItems: "center",
                width: 80,
                height: 40,
                borderWidth: 2,
                borderColor: colors.mainOrange,
                backgroundColor: selectedTime === props.title ? colors.mainOrange : "white",
                borderRadius: 5
            }}
                       onPress={() => {
                           if (selectedTime === props.title) {
                               setSelectedTime(null);
                           } else {
                               setSelectedTime(props.title);
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
    
    return (
        <View style={{paddingHorizontal: 18}}>
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
                                nextComponent={<Image  source={nextArrow}/>}
                                headerWrapperStyle={{justifyContent:"center"}}
                
                />
            }
            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.5,
                borderColor: "rgba(25, 13, 11, 0.50)",
                paddingBottom: 11,
                marginTop: 10
            }}
                       onPress={() => setOpenClock(cur => !cur)}
            >
                <Image source={clockImg}/>
                <Text style={{marginLeft: 6, fontWeight: 500}}>{selectedTime ? selectedTime : "시간 선택"}</Text>
                <Image source={openClock ? upArrow : downArrow} style={{marginLeft: "auto"}}/>
            </Pressable>
            {
                openClock &&
                <View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                        {
                            ["9:00", "10:00", "11:00", "12:00"].map(item => (
                                <TimeBtn key={item} title={item}/>
                            ))
                        }
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                        {
                            ["13:00", "14:00", "15:00", "16:00"].map(item => (
                                <TimeBtn key={item} title={item}/>
                            ))
                        }
                    </View>
                    <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                        {
                            ["17:00", "18:00", "19:00", "20:00"].map(item => (
                                <TimeBtn key={item} title={item}/>
                            ))
                        }
                    </View>
                    
                </View>
            }
    
            <Pressable style={({pressed})=>({
                opacity: pressed ? 0.5 : 1,
                marginTop: 50
            })}
            >
                <View style={{
                    width: "100%",
                    height: 50,
                    backgroundColor: colors.mainOrange,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
            
                }}>
                    <Text style={{color:'white', fontWeight:700, fontSize:16 }}>예약</Text>
                </View>
            </Pressable>
        </View>
    )
}

