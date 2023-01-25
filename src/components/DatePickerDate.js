import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { format, isToday } from 'date-fns';
import { Variables } from '../styles/theme';

const DatePickerDate = ({ date, isCurrentMonthDay, onPress }) => {
    const [height, setHeight] = useState(50)
    const today = isToday(date);

    const onLayout = (event) => {
        setHeight(event.nativeEvent.layout.width);
    };

    if (!isCurrentMonthDay) return <View style={[styles.container, { height }]} />

    return (
        <Pressable style={({ pressed }) => ([styles.container,
        isCurrentMonthDay ? {} : { backgroundColor: '#f0f0f0' },
        { height },
        pressed && { opacity: 0.5 }])}
            onPress={() => onPress(date)}
            onLayout={onLayout}
        >
            <View style={today ? styles.activeDay : {}}>
                <Text style={today ? styles.dayNumberActive : styles.dayNumber}>{format(date, "d")}</Text>
            </View>
        </Pressable>
    )
}

export default DatePickerDate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        // paddingTop: 10,
        // paddingHorizontal: 4,
    },
    dayNumber: {
        textAlign: 'center',
        fontSize: 14,
        color: Variables.colors.black.dark900
    },
    dayNumberActive: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
    },
    activeDay: {
        width: '75%',
        backgroundColor: Variables.colors.brand.default,
        borderRadius: 50,
        // width: 50,
        flex: 0.75,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // marginTop: -2.5
    },
    monthDayText: {
        color: 'white',
        fontSize: 12
    },
})