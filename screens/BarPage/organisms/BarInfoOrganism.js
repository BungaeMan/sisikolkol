import {Text, View} from "react-native";
import {colors} from "../../../components/common/style/colors";

export default function BarInfoOrganism({info}){
    
    return(
        <View style={{flex:1, paddingHorizontal: 18}}>
            <StyledRow title={"가게명"} content={info.name}/>
            <StyledRow title={"주소"} content={info.address}/>
            <StyledRow title={"운영시간"} content={"오전 7:00 - 오후 6:00"}/>
            <StyledRow title={"전화번호"} content={"02-1234-5678"}/>
            <View>
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
                        최상의 서비스와 맛으로 대접하곘습니다~!
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