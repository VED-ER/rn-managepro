import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import { Comment, More, Setting4 } from './svg'
import Avatar from './Avatar'

const ProjectTaskCard = ({ task }) => {
    return (
        <Pressable style={({ pressed }) => ([styles.container, pressed && { opacity: 0.5 }])}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{task?.name}</Text>
                <Pressable style={({ pressed }) => ([pressed && { opacity: 0.5 }])}>
                    <More width={24} height={24} color={Variables.colors.black.dark600} />
                </Pressable>
            </View>
            <Text style={styles.dueDate}>{task?.dueDate}</Text>

            <View style={styles.bottomContainer}>
                <View style={styles.teamContainer}>
                    {task?.team.map((i, index) => (<Avatar
                        key={index}
                        textStyle={{ fontSize: 10, color: Variables.colors.white }}
                        style={{
                            width: 25,
                            height: 25,
                            borderWidth: 2,
                            borderColor: Variables.colors.white,
                            marginLeft: index > 0 ? -5 : 0,
                            backgroundColor: Variables.colors.brand.dark700
                        }}
                    />)
                    )}
                </View>
                <Pressable style={({ pressed }) => ([pressed && { opacity: 0.5 }])}>
                    <Comment width={22} height={22} />
                </Pressable>
            </View>
        </Pressable>
    )
}

export default ProjectTaskCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Variables.colors.white,
        padding: 15,
        borderRadius: Variables.borderRadius
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14,
        color: Variables.colors.black.dark900,
        fontWeight: 'bold'
    },
    dueDate: {
        fontSize: 12,
        color: Variables.colors.black.light400,
        marginTop: 5
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    teamContainer: {
        flexDirection: 'row'
    },
})