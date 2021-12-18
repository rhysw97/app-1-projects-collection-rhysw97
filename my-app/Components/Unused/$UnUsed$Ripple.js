import React, {useRef} from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView} from "react-native";

export default function Ripple() {
    const ripple= useRef(new Animated.Value(30)).current;
    const makeRipple = () => {  
        Animated.timing(ripple, {
            toValue: 800,
            duration: 5000
        }).start();
    };
    
    return (
        <View style={styles.container}>
            <Animated.View style={{
                width: ripple,
                height: ripple
            }}>
                <View style={styles.circle} oPress={makeRipple}></View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f77f',
        alignItems: 'center',
        justifyContent: 'center'
    },

    circle: {

        width: 100,
        height: 100,
        borderRadius: 15,
        backgroundColor: "purple"
    }
});
