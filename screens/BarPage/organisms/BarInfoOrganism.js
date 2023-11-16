import {Text, View} from "react-native";
import {colors} from "../../../components/common/style/colors";

export default function BarInfoOrganism({info}){
    console.log(info)
    return(
        <View style={{flex:1, paddingHorizontal: 18, marginTop: 20}}>
            <StyledRow title={"가게명"} content={info.barName}/>
            <StyledRow title={"주소"} content={info.barAddress}/>
            <StyledRow title={"가게 유형"} content={info.barType}/>
            <StyledRow title={"콜키지 비용"} content={info.barType}/>
            
            <StyledRow2 title={"영업 시간"} start={info.barStartTime} end={info.barEndTime}/>
            
            {/*<StyledRow title={"운영시간"} content={"오전 7:00 - 오후 6:00"}/>*/}
            <View style={{marginTop:10}}>
                <Text style={{ fontSize:12,
                    fontWeight:"500",
                    color: "#5B5B5B",
                    marginBottom:8
                    }}>가게설명</Text>
                <View style={{
                    width:"100%",
                    minHeight: 82,
                    borderWidth: 0.5,
                    borderRadius: 4,
                    borderColor: colors.darkGrey,
                    padding:10
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: colors.darkGrey,
                    }}>
                        {info.barDetail}
                    </Text>
                </View>
            </View>
            
        </View>
    )
}

const StyledRow = ({content, title}) => {
    
    return(
        <View style={{flexDirection:"row", alignItems:"center", marginBottom:5}}>
            <Text style={{
                fontSize:12,
                fontWeight:"500",
                color: "#5B5B5B",
                width: 80
            }}>{title}</Text>
            <Text style={{
                fontSize: 14,
                fontWeight: "500",
                color: colors.darkGrey,
            }}>{content}</Text>
        </View>
    )
}

const StyledRow2 = ({start, end, title}) => {
    
    return(
        <View style={{flexDirection:"row", alignItems:"center", marginBottom:5}}>
            <Text style={{
                fontSize:12,
                fontWeight:"500",
                color: "#5B5B5B",
                width: 80
            }}>{title}</Text>
            <Text style={{
                fontSize: 14,
                fontWeight: "500",
                color: colors.darkGrey,
            }}>{`${start} ~ ${end}`}</Text>
        </View>
    )
}