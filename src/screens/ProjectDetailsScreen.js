import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Variables } from '../styles/theme'
import Avatar from '../components/Avatar'
import ProjectDetailStage from '../components/ProjectDetailStage'
import Screen from '../components/Screen'
import { Notasksplaceholder } from '../components/svg'

const PROJECT_DETAILS_STAGES = [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Completed' }]

const ProjectDetailsScreen = ({ route }) => {
    const [project, setProject] = useState(null)
    const [tasks, setTasks] = useState([])
    console.log(JSON.stringify(project, null, 2));

    const { width } = useWindowDimensions()

    const placeholderWidth = width > 350 ? 350 : width
    const placeholderHeight = (placeholderWidth * 196) / 295

    useEffect(() => {
        if (route?.params?.project)
            setProject(route.params.project)
    }, [route?.params?.project])

    const renderProjectDetailStage = ({ item }) => (<ProjectDetailStage projectTasks={project?.tasks} stage={item} />)

    return (
        <Screen style={styles.screenStyle}>
            <View style={[styles.topImageContainer, { backgroundColor: project?.color ? project.color : Variables.colors.black.light100 }]}>
                <View style={styles.projectIcon}>
                    <Text style={styles.projectIconText}>PP</Text>
                </View>
                <View style={styles.teamContainer}>
                    {project?.team?.map((i, index) => (<Avatar
                        key={index}
                        textStyle={styles.avatarTextStyle}
                        style={[styles.teamAvatarStyle, { marginLeft: index > 0 ? -5 : 0 }]}
                    />)
                    )}
                </View>
            </View>
            <View style={styles.projectDetailsContainer}>
                <View>
                    <Text style={styles.projectTitle}>{project?.name}</Text>
                    <Text style={styles.projectDescription}>{project?.description ? project.description : 'Add description'}</Text>
                </View>
                {tasks.length > 0
                    ?
                    <FlatList
                        data={PROJECT_DETAILS_STAGES}
                        renderItem={renderProjectDetailStage}
                        keyExtractor={(item, index) => index}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={<View style={{ padding: 10 }} />}
                        style={{ marginLeft: -10 }}
                        contentContainerStyle={{ padding: 10 }}
                    />
                    :
                    <View style={styles.noTasksPlaceholderContainer}>
                        <Notasksplaceholder width={placeholderWidth} height={placeholderHeight} />
                        <Text style={styles.noTasksPlaceholderTitle}>No tasks here yet</Text>
                        <Text style={styles.noTasksPlaceholderSubtitle}>Add task first</Text>
                    </View>
                }
            </View>
        </Screen>
    )
}

export default ProjectDetailsScreen

const styles = StyleSheet.create({
    screenStyle: {
        paddingHorizontal: 0,
        paddingVertical: 10
    },
    topImageContainer: {
        height: 225,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    projectIcon: {
        backgroundColor: Variables.colors.white,
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectIconText: {
        fontSize: 15,
        color: Variables.colors.brand.default,
        fontWeight: 'bold'
    },
    teamContainer: {
        flexDirection: 'row'
    },
    projectDetailsContainer: {
        // borderWidth: 1,
        flex: 1,
        backgroundColor: Variables.colors.white,
        padding: 20,
    },
    projectTitle: {
        fontSize: 28,
        color: Variables.colors.black.dark900,
        fontWeight: 'bold'
    },
    projectDescription: {
        fontSize: 14,
        color: Variables.colors.black.light400,
        marginTop: 15,
        marginBottom: 20
    },
    avatarTextStyle: {
        fontSize: 10,
        color: Variables.colors.white
    },
    teamAvatarStyle: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: Variables.colors.white,
        backgroundColor: Variables.colors.brand.dark700
    },
    noTasksPlaceholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noTasksPlaceholderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Variables.colors.black.light400,
        marginTop: 30
    },
    noTasksPlaceholderSubtitle: {
        fontSize: 14,
        color: Variables.colors.black.light300,
        marginTop: 5
    }
})