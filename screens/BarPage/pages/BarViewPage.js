import {StyleSheet, View, Text, ScrollView, useWindowDimensions} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useEffect, useState} from "react"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import NaverMapView, { Marker } from "react-native-nmap"


export default function BarViewPage() {
    const _height = useSharedValue(100);
    
    const viewAnimated = useAnimatedStyle(()=>{
        return{
            height: withTiming(_height.value, {
                delay: 100
            })
        }
    })
    
    return (
        <View style={{flex: 1}}>
            <NaverMapView
                style={{flex:1}}
                showsMyLocationButton={true}
                useTextureView={true}
                />
            <Ball _height={_height}>
                <Animated.View style={[{ backgroundColor:"blue"}, viewAnimated]}>
                    <ScrollView>
                        <Text style={{fontSize: 70}}>
                            dddddddddddddddsadsadasdasdasdasdsadsadsa
                        </Text>
                        <Text style={{fontSize: 70}}>
                            dddddddddddddddsadsadasdasdasdasdsadsadsa
                        </Text><Text style={{fontSize: 70}}>
                        dddddddddddddddsadsadasdasdasdasdsadsadsa
                    </Text><Text style={{fontSize: 70}}>
                        dddddddddddddddsadsadasdasdasdasdsadsadsa
                    </Text><Text style={{fontSize: 70}}>
                        dddddddddddddddsadsadasdasdasdasdsadsadsa
                    </Text><Text style={{fontSize: 70}}>
                        dddddddddddddddsadsadasdasdasdasdsadsadsa
                    </Text><Text style={{fontSize: 70}}>
                        dddddddddddddddsadsadasdasdasdasdsadsadsa
                    </Text><Text style={{fontSize: 70}}>
                        dddddddddddddddsadsadasdasdasdasdsadsadsa
                    </Text>
                    </ScrollView>
                </Animated.View>
            </Ball>
        </View>
    )
}

const Ball = (props) => {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({x: 500, y: 500});
    const layout = useWindowDimensions();
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                // {translateX: offset.value.x},
                {translateY: offset.value.y < 50 ? withSpring(50) : offset.value.y > 600 ? withSpring(600) : withSpring(offset.value.y) },
                // {scale: withSpring(isPressed.value ? 1.2 : 1)}
            ],
            // backgroundColor: isPressed.value ? "yellow" : "blue"
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
            y: offset.value.y > 500 ? 600
                : offset.value.y <= 500 && offset.value.y > 200 ? 300
                    : offset.value.y <=200 && offset.value.y > 50 ? 50
                        : 50
        };
        props._height.value = layout.height - offset.value.y - 30 - 92 - 80;
        isPressed.value = false;
    })
   
    
    return (
        <>
            <Animated.View style={[{
                position:"absolute",
                width: "100%",
                height:"150%",
                alignSelf: 'center',
                backgroundColor:"white"
            }, animatedStyles]}>
                <GestureDetector gesture={gesture}>
                    <View style={{width: "100%", height: 30, borderTopRightRadius: 10, borderTopLeftRadius:10, backgroundColor:"red"}}/>
                    {/*</View>*/}
                </GestureDetector>
                {props.children}
            </Animated.View>
        </>
    )
}