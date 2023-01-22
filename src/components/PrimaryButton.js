import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Variables } from '../styles/theme';

const PrimaryButton = ({ text, onPress, textStyle, style, IconRight, IconLeft, disabled, loading }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ([styles.button, style, (pressed || disabled) && { opacity: 0.5 }])}
            disabled={disabled}
        >
            {IconLeft ? <View style={styles.iconLeft}>{IconLeft}</View> : null}
            {loading
                ?
                <ActivityIndicator size={'small'} />
                :
                <Text style={[styles.text, textStyle]}>{text}</Text>
            }
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
    },
    iconLeft: {
        marginRight: 10
    }
});