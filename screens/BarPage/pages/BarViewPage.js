import {StyleSheet, View, Text, ScrollView, useWindowDimensions, Keyboard, Platform, Pressable, Image} from 'react-native';
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


//더미 데이터
const mapList = [{
    id: 1,
    latitude: 37.5505,
    longitude: 126.9255,
    address: "서울특별시 마포구 와우산로 94",
    name:"홍대 바 본점"
}];

const markerSize = {
    width: 21,
    height: 30
};


export default function BarViewPage() {
    const _height = useSharedValue(1000);
    const isFocused = useIsFocused();
    const [location, setLocation] = useState(null); // 위경도
    const [level, setLevel] = useState(14); // 지도 확대축소 level 담는 state
    const [loading, setLoading] = useState(true);
    const [clickedCenterId, setClickedCenterId] = useState(null); // 클릭한 시설 아이디
    const [centerOfMap, setCenterOfMap] = useState(null);
    const [mapStabled, setMapStabled] = useState(false); // NaverMap generates onCameraChange event when it is first initialized.
 
    
    const handleClickMarker = (id) => {
        const marker = mapList.find(e => e.id === id);
        
        if (id === clickedCenterId) {
            setClickedCenterId(null);
        } else {
            setClickedCenterId(marker.id);
            setCenterOfMap({lat: marker.latitude, lng: marker.longitude});
        }
    }
    
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
    }, [isFocused])
    
    const viewAnimated = useAnimatedStyle(() => {
        return {
            height: withTiming(_height.value, {
                delay: 0
            })
        }
    })
    
    console.log(mapList);
    console.log(clickedCenterId);
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
                                // console.log("onCameraChange is called:", e.latitude, e.longitude, e.zoom);
                                if (mapStabled) {
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
                                    <Marker key={item.id}
                                            coordinate={{latitude: item.latitude, longitude: item.longitude}}
                                            onClick={() => handleClickMarker(item.id)}
                                            image={markerPin}
                                            width={item.id === clickedCenterId ? markerSize.width * 1.4 : markerSize.width}
                                            height={item.id === clickedCenterId ? markerSize.height * 1.4 : markerSize.height}
                                    />
                                ))
                            }
                        </NaverMapView>
                        <CenterModal _height={_height}>
                            <Animated.View style={viewAnimated}>
                                {
                                    !clickedCenterId ?
                                        <BarListTemplate mapList={mapList} />
                                        :
                                        <BarInfoTemplate />
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
    const offset = useSharedValue({y: 350});
    const layout = useWindowDimensions();
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
                : offset.value.y <= layout.height * 0.7 && offset.value.y > layout.height * 0.3 ? layout.height * 0.5
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
                backgroundColor: "white"
            }, animatedStyles]}>
                <GestureDetector gesture={gesture}>
                    <View style={{
                        width: "100%",
                        height: 30,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
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