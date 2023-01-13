import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Variables } from '../styles/theme';

const PrimaryButton = ({ text, onPress, textStyle, style, IconRight, disabled }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ([styles.button, style, pressed && { opacity: 0.5 }])}
            disabled={disabled}
        >
            <Text style={[styles.text, textStyle]}>{text}</Text>
            {IconRight ? <View style={styles.iconRight}>{IconRight}</View> : null}
        </Pressable>
    );
};

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Variables.colors.brand.default,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Variables.colors.white,
        textAlign: 'center',
        fontSize: 16
    },
    iconRight: {
        marginLeft: 10
    }
});