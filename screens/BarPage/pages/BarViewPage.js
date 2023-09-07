import {StyleSheet, View} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

export default function BarViewPage() {
    
    
    return (
        <View style={{flex: 1, backgroundColor: "white"}}>
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