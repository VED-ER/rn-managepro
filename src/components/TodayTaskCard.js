import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'

const TodayTaskCard = ({ task }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.taskName}>{task?.name}</Text>
        </View>
    )
}

export default TodayTaskCard

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        backgroundColor: Variables.colors.white,
        borderWidth: 1,
        borderRadius: Variables.borderRadius,
        marginBottom: 20
    },
    taskName: {
        fontSize: 18,
        color: Variables.colors.black.dark900,
        fontWeight: 'bold'
    }
})