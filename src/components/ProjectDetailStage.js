import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import { Add } from './svg'
import ProjectTaskCard from './ProjectTaskCard'

const ProjectDetailStage = ({ stage, projectTasks }) => {

    const renderProjectTask = ({ item }) => (<ProjectTaskCard task={item} />)

    return (
        <View style={styles.container}>
            <View style={styles.stageInfoContainer}>
                <View style={styles.stageInfoContainer}>
                    <Text style={styles.title}>{stage?.name}</Text>
                    <View style={styles.numOfTasksContainer}>
                        <Text style={styles.numOfTasksText}>2</Text>
                    </View>
                </View>
                <Pressable style={({ pressed }) => ([styles.addTaskContainer, pressed && { opacity: 0.5 }])}>
                    <Add width={18} height={18} color={Variables.colors.black.dark900} />
                </Pressable>
            </View>
            <View style={styles.stageTasksContainer}>
                <FlatList
                    data={projectTasks}
                    renderItem={renderProjectTask}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={<View style={{ padding: 10 }} />}
                />
            </View>
        </View>
    )
}

export default ProjectDetailStage

const styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: Variables.colors.brand.light10,
        padding: 20,
        borderRadius: Variables.borderRadius,
        ...Variables.shadow
    },
    stageInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: Variables.colors.black.dark900,
        fontSize: 15,
        fontWeight: 'bold'
    },
    numOfTasksContainer: {
        borderWidth: 2,
        borderColor: Variables.colors.brand.default,
        borderRadius: 10,
        padding: 4,
        minWidth: 30,
        marginLeft: 20
    },
    numOfTasksText: {
        color: Variables.colors.brand.default,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    addTaskContainer: {
        borderWidth: 2,
        borderColor: Variables.colors.black.dark900,
        borderRadius: 10,
        padding: 4
    },
    stageTasksContainer: {
        marginTop: 25
    },

})