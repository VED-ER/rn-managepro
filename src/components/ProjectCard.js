import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import { More } from './svg'
import Avatar from './Avatar'
import { format, formatDuration, intervalToDuration, parseISO } from 'date-fns'
import convertFirebaseTimestampToDate from '../utils/convertFirebaseTimestampToDate'
import CachedImageBackground from './CachedImageBackground'

const ProjectCard = ({ project, style, onPress }) => {

    const createdAtDate = convertFirebaseTimestampToDate(project?.createdAt)
    const dueDateDate = convertFirebaseTimestampToDate(project?.dueDate)

    const formatedCreatedAt = format(createdAtDate, 'EEE, MMM dd')
    let formatedDueDate
    if (project?.dueDate) {
        const duration = intervalToDuration({ start: createdAtDate, end: dueDateDate })
        formatedDueDate = formatDuration(duration, { format: ['years', 'months', 'weeks', 'days'] })
    }

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ([styles.container, style, pressed && { opacity: 0.5 }])}
        >
            <CachedImageBackground
                imageStyle={styles.coverImage}
                source={{ uri: project?.coverImage ? project.coverImage : null }}
                resizeMode={'cover'}
                style={[styles.upperContainer, project?.color && { backgroundColor: project.color }]}
            >
                <View style={styles.projectIcon}>
                    <Text style={styles.projectIconText}>PP</Text>
                </View>
                <View style={styles.teamContainer}>
                    {project?.team?.map((i, index) => (<Avatar
                        key={index}
                        textStyle={{ fontSize: 10, color: Variables.colors.white }}
                        style={[styles.teamContainerAvatar, { marginLeft: index > 0 ? -5 : 0 }]}
                    />)
                    )}
                </View>
            </CachedImageBackground>
            <View style={styles.bottomContainer}>
                <View>
                    <View style={styles.projectNameContainer}>
                        <Text style={styles.projectName}>{project.name}</Text>
                        <Pressable style={({ pressed }) => pressed && { opacity: 0.5 }}>
                            <More width={24} height={24} />
                        </Pressable>
                    </View>
                    <View >
                        <Text style={styles.projectTypeText}>{project?.type}. <Text >{formatedCreatedAt}</Text></Text>
                    </View>
                </View>
                <View>
                    <View style={styles.tasksTextContainer}>
                        <Text style={styles.tasksCompletedText}>{project?.tasksCompleted} / <Text style={styles.tasksLeftText} >{project?.tasks?.length}</Text></Text>
                        <Text style={styles.tasksLeftText}>{`${formatedDueDate} left`}</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={styles.progress} />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default ProjectCard

const styles = StyleSheet.create({
    container: {
        height: 270,
        backgroundColor: 'lightblue',
        borderRadius: Variables.borderRadius,
        ...Variables.shadow
    },
    projectName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900
    },
    upperContainer: {
        // fallback color
        borderTopLeftRadius: Variables.borderRadius,
        borderTopRightRadius: Variables.borderRadius,
        flex: 1,
        backgroundColor: Variables.colors.brand.default,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    projectIcon: {
        backgroundColor: Variables.colors.white,
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    projectIconText: {
        fontSize: 12,
        color: Variables.colors.brand.default,
        fontWeight: 'bold'
    },
    teamContainer: {
        flexDirection: 'row'
    },
    teamContainerAvatar: {
        width: 25,
        height: 25,
        borderWidth: 2,
        borderColor: Variables.colors.white,
        backgroundColor: Variables.colors.brand.dark700
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: Variables.colors.white,
        padding: 20,
        justifyContent: 'space-between',
        borderBottomLeftRadius: Variables.borderRadius,
        borderBottomRightRadius: Variables.borderRadius
    },
    projectNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    projectTypeText: {
        fontSize: 12,
        color: Variables.colors.black.light400
    },
    tasksCompletedText: {
        fontSize: 10,
        color: Variables.colors.brand.default,
        fontWeight: 'bold'
    },
    tasksLeftText: {
        fontSize: 10,
        color: Variables.colors.black.light400
    },
    tasksTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressBar: {
        height: 5,
        backgroundColor: Variables.colors.black.light100,
        borderRadius: 5,
        marginTop: 10
    },
    progress: {
        height: 5,
        backgroundColor: Variables.colors.brand.default,
        width: '57%'
    },
    coverImage: {
        borderTopLeftRadius: Variables.borderRadius,
        borderTopRightRadius: Variables.borderRadius
    }
})