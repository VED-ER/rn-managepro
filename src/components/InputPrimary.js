import { Animated, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Variables } from '../styles/theme'

const INCREASE_HEIGHT_VALUE = Platform.OS === 'ios' ? -8 : -11
const DECREASE_HEIGHT_VALUE = Platform.OS === 'ios' ? 21 : 19

const InputPrimary = ({ value, onChangeText, placeholder, style, inputStyle, IconRight, onIconRightPress, ...other }) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleOnFocus = () => {
        setIsFocused(true)
    }

    const handleOnBlur = () => {
        setIsFocused(false)
    }

    useEffect(() => {
        if (isFocused || value) {
            if (topAnim !== INCREASE_HEIGHT_VALUE)
                increaseHeight()
        } else if (!value) {
            if (topAnim !== DECREASE_HEIGHT_VALUE)
                decreaseHeight()
        }
    }, [isFocused, value])

    const topAnim = useRef(new Animated.Value(21)).current;

    const increaseHeight = () => {
        Animated.timing(topAnim, {
            useNativeDriver: false,
            toValue: INCREASE_HEIGHT_VALUE,
            duration: 150
        }).start();
    };

    const decreaseHeight = () => {
        Animated.timing(topAnim, {
            useNativeDriver: false,
            toValue: DECREASE_HEIGHT_VALUE,
            duration: 150
        }).start();
    };

    return (
        <View style={[style]}>
            <Animated.View pointerEvents='none' style={[styles.placeholderContainer, { top: topAnim }]}>
                <Text style={{ color: Variables.colors.black.light300 }}>{placeholder}</Text>
            </Animated.View>
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
    },
    placeholderContainer: {
        position: 'absolute',
        left: 21,
        backgroundColor: '#fff',
        zIndex: 1,
        paddingHorizontal: 5,
        borderRadius: 10,

    }
})