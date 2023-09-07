import {StyleSheet, View} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useState} from "react"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import NaverMapView, { Marker } from "react-native-nmap"


export default function BarViewPage() {
    const [mapStabled, setMapStabled] = useState(false); // NaverMap generates onCameraChange event when it is first initialized.
    
    
    return (
        <View style={{flex: 1}}>
            <NaverMapView
                style={{flex:1}}
                showsMyLocationButton={true}
                useTextureView={true}
                // onCameraChange={(e) => {
                //     // console.log("onCameraChange is called:", e.latitude, e.longitude, e.zoom);
                //     if (mapStabled) {
                //         setCenterOfMap({
                //             lat: e.latitude ,
                //             lng: e.longitude,
                //         });
                //         setLevel(e.zoom);
                //         setButtonShow(true);
                //         Keyboard.dismiss();
                //     } else {
                //         if (e.latitude - centerOfMap.lat < 0.001 && e.longitude - centerOfMap.lng < 0.001 && e.zoom === level)
                //             setMapStabled(true);
                //     }
                // }}
                />
            <Ball/>
        </View>
    )
}

const Ball = () => {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({x: 500, y: 500});
    
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                // {translateX: offset.value.x},
                {translateY: offset.value.y < 100 ? 100 : offset.value.y > 600 ? 600 : offset.value.y},
                // {scale: withSpring(isPressed.value ? 1.2 : 1)}
            ],
            backgroundColor: isPressed.value ? "yellow" : "blue"
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
    })
    .onFinalize(() => {
        "worklet";
        isPressed.value = false;
    })
    
    return (
        <>
            <Animated.View style={[{
                position:"absolute",
                width: "100%",
                height: 1000,
                backgroundColor: 'blue',
                alignSelf: 'center'
            }, animatedStyles]}>
                <GestureDetector gesture={gesture}>
                    <View style={{width: "100%", height: 30, backgroundColor: "red"}}/>
                </GestureDetector>
            </Animated.View>
        </>
    )
}