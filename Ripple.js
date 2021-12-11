import React, {useRef} from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView} from "react-native";

export default function Ripple() {
    const ripple= useRef(new Animated.Value(30)).current;
    const makeRipple = () => {
        Animatted.timing(ripple, {
            toValue: 800,
            duration: 5000
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{
                width: ripple,
                height: ripple
            }}
            oPress={makeRipple}>
                <View style={styles.circle}></View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "purple"
    }
});
