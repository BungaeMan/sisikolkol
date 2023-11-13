import {StyleSheet, View, Text, TextInput, useWindowDimensions, Keyboard, Platform, Pressable, Image} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useEffect, useState} from "react"
import {useIsFocused,} from '@react-navigation/native';
import * as Location from 'expo-location'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import NaverMapView, {Marker} from "react-native-nmap"
import markerPin from "../../../assets/img/marker.png"
import BarListTemplate from "../templates/BarListTemplate";
import BarInfoTemplate from "../templates/BarInfoTemplate";
import axios from "axios";
import search from "../../../assets/img/searchImg.png"


//더미 데이터
// const mapList = [{
//     id: 1,
//     name:"홍대 바 본점",
//     latitude: 37.5505,
//     longitude: 126.9255,
//     address: "서울특별시 마포구 와우산로 94",
//     ratings: 4.5
// }];

const markerSize = {
    width: 21,
    height: 30
};


export default function BarViewPage() {
    const _height = useSharedValue(280);
    const isFocused = useIsFocused();
    const [location, setLocation] = useState(null); // 위경도
    const [level, setLevel] = useState(14); // 지도 확대축소 level 담는 state
    const [loading, setLoading] = useState(true);
    const [clickedCenterId, setClickedCenterId] = useState(null); // 클릭한 시설 아이디
    const [centerOfMap, setCenterOfMap] = useState(null);
    const [mapStabled, setMapStabled] = useState(false); // NaverMap generates onCameraChange event when it is first initialized.
    const [mapList, setMapList] = useState(null);
    
    
    const handleClickMarker = (id) => {
        const marker = mapList.find(e => e.barID === id);
        if (id === clickedCenterId) {
            setClickedCenterId(null);
        } else {
            setClickedCenterId(marker.barID);
            setCenterOfMap({lat: marker.barLatitude, lng: marker.barLongitude});
        }
    }
    
    const viewAnimated = useAnimatedStyle(() => {
        return {
            height: withTiming(_height.value, {
                delay: 0
            })
        }
    })
    
    useEffect(() => {
        if (!isFocused) return;
        
        (async () => {
                try {
                    let {status} = await Location.requestForegroundPermissionsAsync();
                    if (status !== "granted") {
                        console.log("Permission to access loaction was denied.");
                        return
                    }
                    
                    let location = await Location.getLastKnownPositionAsync({});
                    //location을 못불러올 시
                    if (!location) {
                        location = await Location.getCurrentPositionAsync({});
                    }
                    if (location.coords.longitude < 0) {
                        location.coords.longitude = Math.abs(location.coords.longitude);
                    }
                    
                    setLocation({lat: location.coords.latitude, lng: location.coords.longitude});
                    if (33 < location.coords.latitude && location.coords.latitude < 43
                        && 124 < location.coords.longitude && location.coords.longitude < 132) {
                        setLocation({lat: location.coords.latitude, lng: location.coords.longitude});
                    } else {
                        alert("현재 위치가 한국이 아니므로, 위치를 임의로 정합니다.");
                        setLocation({lat: 37.5505, lng: 126.9255}) //홍대위치
                    }
                } catch (err) {
                    console.log("Error in expo Location service", err);
                    setLocation({lat: 37.5505, lng: 126.9255});
                    
                }
                setLoading(false);
                
            }
        )();
    }, [isFocused]);
    
    useEffect(()=> {
        axios.get(`http://localhost:8080/bar/coordinate`).then(res => setMapList(res.data));
    }, []);
    
   
    return (
        <>
            {
                loading ? <Text>load...</Text>
                    : <View style={{flex: 1}}>
                        <NaverMapView
                            style={{flex: 1}}
                            showsMyLocationButton={true}
                            useTextureView={true}
                            onMapClick={() => {
                                Keyboard.dismiss();
                                setClickedCenterId(null);
                            }}
                            center={
                                centerOfMap ?
                                    {latitude: centerOfMap.lat, longitude: centerOfMap.lng, zoom: level}
                                    : {latitude: location.lat, longitude: location.lng, zoom: level}
                            }
                            onCameraChange={(e) => {
                                
                                if (mapStabled) {
                                    console.log("onCameraChange is called:", e.latitude, e.longitude, e.zoom);
                                    setCenterOfMap({
                                        lat: e.latitude,
                                        lng: e.longitude,
                                    });
                                    setLevel(e.zoom);
                                    // setButtonShow(true);
                                    Keyboard.dismiss();
                                } else {
                                    if (centerOfMap && e.latitude - centerOfMap.lat < 0.001 && e.longitude - centerOfMap.lng < 0.001 && e.zoom === level)
                                        setMapStabled(true);
                                }
                            }}
                        >
                            {
                                mapList &&
                                mapList.map((item) => (
                                    <Marker key={item.barID}
                                            coordinate={{latitude: item.barLatitude, longitude: item.barLongitude}}
                                            onClick={() => handleClickMarker(item.barID)}
                                            image={markerPin}
                                            width={item.barID === clickedCenterId ? markerSize.width * 1.4 : markerSize.width}
                                            height={item.barID === clickedCenterId ? markerSize.height * 1.4 : markerSize.height}
                                    />
                                ))
                            }
                        </NaverMapView>
                        <View style={styles.searchBar}>
                            <Pressable style={{ position: 'absolute', top: 12, left: 30, zIndex: 1000}}>
                                <Image source={search} style={{opacity: 0.7}}/>
                            </Pressable>
                            <TextInput placeholder="시설 이름 검색" placeholderTextColor={'#D9D9D9'} style={styles.searchInput}  />
                        </View>
                        <CenterModal _height={_height}>
                            <Animated.View style={viewAnimated}>
                                {
                                    !clickedCenterId ?
                                        <BarListTemplate mapList={mapList} setClickedCenterId={setClickedCenterId}
                                                         setCenterOfMap={setCenterOfMap}
                                        />
                                        :
                                        <BarInfoTemplate mapList={mapList}
                                                         clickedCenterId={clickedCenterId}
                                        />
                                }
                            </Animated.View>
                        </CenterModal>
                    </View>
            }
        </>
    )
}

const CenterModal = (props) => {
    const isPressed = useSharedValue(false);
    const layout = useWindowDimensions();
    const offset = useSharedValue({y: layout.height * 0.55});
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateY: offset.value.y < layout.height * 0.1 ? withSpring(layout.height * 0.1) : offset.value.y > layout.height * 0.85 ? withSpring(layout.height * 0.85) : withSpring(offset.value.y)},
            ],
        };
    });
    
    
    const gesture = Gesture.Pan()
    .onBegin(() => {
        'worklet';
        isPressed.value = true;
    })
    .onChange((e) => {
        "worklet";
        offset.value = {
            // x: e.changeX + offset.value.x,
            y: e.changeY + offset.value.y
        };
        props._height.value = layout.height - offset.value.y;
    })
    .onFinalize(() => {
        "worklet";
        offset.value = {
            y: offset.value.y > layout.height * 0.7 ? layout.height * 0.85
                : offset.value.y <= layout.height * 0.7 && offset.value.y > layout.height * 0.4 ? layout.height * 0.55
                    : layout.height * 0.1
        };
        props._height.value = Platform.OS === "ios" ? layout.height - offset.value.y - 30 - 85
            : layout.height - offset.value.y - 30 - 92 - 100;
        isPressed.value = false;
    })
    
    return (
        <>
            <Animated.View style={[{
                position: "absolute",
                width: "100%",
                height: "150%",
                alignSelf: 'center',
                backgroundColor: "white",
                borderRadius:10
            }, animatedStyles]}>
                <GestureDetector gesture={gesture}>
                    <View style={{
                        width: "100%",
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center"
                        // backgroundColor: "red"
                    }}>
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            width: 50,
                            height: 3,
                            borderRadius: 10
                        }}/>
                    </View>
                    {/*</View>*/}
                </GestureDetector>
                {props.children}
            </Animated.View>
        </>
    )
}


const styles = StyleSheet.create({
    searchBar:{
        paddingHorizontal: 18,
        position: 'absolute',
        top: 60,
        flexDirection: 'row',
        borderRadius: 10,
    },
    searchInput: {
        backgroundColor: "#F9F7F8",
        width: '100%',
        height: 40,
        borderRadius: 10,
        fontSize: 12, fontWeight: '400',
        color: '#474348',
        paddingHorizontal: 38,
    },
})