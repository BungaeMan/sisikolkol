import {Image, Pressable, ScrollView, Text, View} from "react-native";
import barImg from "../../../assets/img/barImgSample.png";
import barBanner from "../../../assets/img/sampleBar.png"


export default function BarListTemplate({mapList, setClickedCenterId, setCenterOfMap}) {
    
    
    return (
            <ScrollView>
            {
                mapList &&
                mapList.map((item) => (
                    
                    <Pressable key={item.barID}
                        style={({pressed}) => ({
                        opacity: pressed ? 0.5 : 1,
                        justifyContent: 'center',
                        alignItems: "center",
                        borderBottomWidth: 3, borderBottomStyle: 'solid', borderBottomColor: '#F8F8F8',
                    })}
                               onPress={() => {
                                   setClickedCenterId(item.barID);
                                   setCenterOfMap({lat: item.barLatitude, lng: item.barLongitude})
                               }}
                    >
                        <View style={{
                            width: "100%",
                            paddingVertical: 12,
                            height: 94,
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingHorizontal: 18
                        }}>
                            <Image style={{
                                width: 72,
                                height: 72,
                                borderRadius: 10
                            }}
                                   source={barBanner}/>
                            <View style={{
                                paddingLeft: 12,
                                justifyContent: "center"
                            }}>
                                <Text>{item.barName}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    opacity: 0.7,
                                    marginVertical: 6
                                }}>{item.barAddress}</Text>
                                <Text style={{
                                    color: "rgba(251, 128, 39, 0.83)",
                                    fontSize: 12
                                }}>#바 #펍</Text>
                            </View>
                        </View>
                    </Pressable>
                ))
            }
        </ScrollView>
    )
}