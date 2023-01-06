import { Animated, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Variables } from '../styles/theme'

const InputPrimary = ({ value, onChangeText, placeholder, style, inputStyle, IconRight, onIconRightPress, ...other }) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleOnFocus = () => {
        setIsFocused(true)
    }

    const handleOnBlur = () => {
        setIsFocused(false)
    }

    useEffect(() => {
        if (isFocused) {
            increaseHeight()
        } else if (!value) {
            decreaseHeight()
        }
    }, [isFocused])

    const topAnim = useRef(new Animated.Value(21)).current;

    const increaseHeight = () => {
        Animated.timing(topAnim, {
            useNativeDriver: false,
            toValue: Platform.OS === 'ios' ? -8 : -11,
            duration: 150
        }).start();
    };

    const decreaseHeight = () => {
        Animated.timing(topAnim, {
            useNativeDriver: false,
            toValue: Platform.OS === 'ios' ? 21 : 19,
            duration: 150
        }).start();
    };

    return (
        <View style={[style]}>
            <Animated.Text pointerEvents='none' style={{
                position: 'absolute',
                top: topAnim,
                left: 21,
                color: Variables.colors.black.light300,
                backgroundColor: '#fff',
                zIndex: 1,
                paddingHorizontal: 5,
                borderRadius: 10,

            }}>{placeholder}</Animated.Text>
            <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                {...other}
            />
            <Pressable style={({ pressed }) => ([styles.iconRightStyle, pressed && { opacity: 0.5 }])} onPress={onIconRightPress}>
                {IconRight ? IconRight : null}
            </Pressable>
        </View>
    )
}

export default InputPrimary

const styles = StyleSheet.create({
    input: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Variables.colors.black.light100,
        paddingVertical: 20,
        paddingHorizontal: 20,
        maxHeight: 60
    },
    iconRightStyle: {
        position: 'absolute',
        right: 17,
        top: 17
    }
})