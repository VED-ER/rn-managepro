import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
    addMonths,
    addWeeks,
    daysToWeeks,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths
} from 'date-fns';
import DatePickerDate from './DatePickerDate';
import { ArrowLeft, ArrowLeftSmall, ArrowRightSmall, Close } from './svg';
import { Variables } from '../styles/theme';

const DatePicker = ({ onSelectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const firstWeekStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const lastWeekEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
    const currentMonthDays = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });

    const checkNumberOfWeeks = (days) => {
        const numOfWeeks = daysToWeeks(days.length);

        if (numOfWeeks < 6) {
            const sixthWeek = addWeeks(days[days.length - 1], 1);
            const monthDaysWithSixthWeek = eachDayOfInterval({ start: firstWeekStart, end: sixthWeek });

            return monthDaysWithSixthWeek;
        }
        return days;
    };

    const nextMonthBtnHandler = () => {
        setCurrentDate(prevDate => addMonths(prevDate, 1));
    };

    const prevMonthBtnHandler = () => {
        setCurrentDate(prevDate => subMonths(prevDate, 1));
    };

    const todayBtnHandler = () => {
        setCurrentDate(new Date());
    };

    const renderItem = ({ item, index }) => {

        const isCurrentMonthDay = isSameMonth(item, currentDate);
        return (
            <DatePickerDate
                date={item}
                height={40}
                index={index}
                isCurrentMonthDay={isCurrentMonthDay}
                onPress={onSelectedDate}
            />
        );
    };
    return (
        <View style={{ paddingBottom: 50 }}>

            <View style={styles.headerContainer}>
                <Text style={styles.subtitle}>{format(currentDate, 'MMMM yyyy')}</Text>
                <View style={styles.headerContainer}>
                    <Pressable style={{ marginRight: 10 }} onPress={prevMonthBtnHandler}>
                        <ArrowLeftSmall color={Variables.colors.black.dark900} width={20} height={20} />
                    </Pressable>
                    <Pressable onPress={nextMonthBtnHandler}>
                        <ArrowRightSmall color={Variables.colors.black.dark900} width={20} height={20} />
                    </Pressable>
                </View>
            </View>
            <FlatList
                data={checkNumberOfWeeks(currentMonthDays)}
                renderItem={renderItem}
                keyExtractor={(_item, index) => index.toString()}
                numColumns={7}
                bounces={false}
            />
        </View>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Variables.colors.black.dark600
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    }
})