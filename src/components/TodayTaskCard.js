import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import { Greencheckmark } from './svg'

const TodayTaskCard = ({ task }) => {
    return (
        <Pressable style={({ pressed }) => ([styles.container, pressed && { opacity: 0.5 }])}>
            <View>
                <Text style={styles.taskName}>{task?.name}</Text>
                <Text style={styles.taskTime}>{task?.time}</Text>
            </View>
            {task?.completed
                ?
                <Pressable style={({ pressed }) => (pressed && { opacity: 0.5 })}>
                    <Greencheckmark width={25} height={25} />
                </Pressable>
                :
                <Pressable style={({ pressed }) => ([styles.checkbox, pressed && { opacity: 0.5 }])} />
            }
        </Pressable>
    )
}

export default TodayTaskCard

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        backgroundColor: Variables.colors.white,
        borderRadius: Variables.borderRadius,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...Variables.shadow
    },
    taskName: {
        fontSize: 18,
        color: Variables.colors.black.dark900,
        fontWeight: 'bold'
    },
    taskTime: {
        fontSize: 12,
        color: Variables.colors.black.light400,
        marginTop: 10
    },
    checkbox: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: Variables.colors.black.light100,
        borderRadius: 25
    }
})