import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Variables } from '../styles/theme'
import { More } from './svg'
import Avatar from './Avatar'

const ProjectCard = ({ project }) => {
    return (
        <View>
            <Pressable style={({ pressed }) => ([styles.container, pressed && { opacity: 0.5 }])}>
                <View style={[styles.upperContainer, project?.color && { backgroundColor: project.color }]}>
                    <View style={styles.projectIcon}>
                        <Text style={styles.projectIconText}>PP</Text>
                    </View>
                    <View style={styles.teamContainer}>
                        {project?.team.map((i, index) => (<Avatar
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
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <View style={styles.projectNameContainer}>
                            <Text style={styles.projectName}>{project.name}</Text>
                            <Pressable style={({ pressed }) => pressed && { opacity: 0.5 }}>
                                <More width={24} height={24} />
                            </Pressable>
                        </View>
                        <View >
                            <Text style={styles.projectTypeText}>{project?.type}. <Text >{project?.dueDate}</Text></Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.tasksTextContainer}>
                            <Text style={styles.tasksCompletedText}>{project?.tasksCompleted} / <Text style={styles.tasksLeftText} >{project?.tasks}</Text></Text>
                            <Text style={styles.tasksLeftText}>7 days left</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={styles.progress} />
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default ProjectCard

const styles = StyleSheet.create({
    container: {
        height: 270,
        width: 315,
        backgroundColor: 'lightblue',
        borderWidth: 1,
        borderRadius: Variables.borderRadius,
        overflow: 'hidden'
    },
    projectName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900
    },
    upperContainer: {
        // fallback color
        flex: 1,
        backgroundColor: Variables.colors.brand.default,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
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
    bottomContainer: {
        flex: 1,
        backgroundColor: Variables.colors.white,
        padding: 20,
        justifyContent: 'space-between'
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
    }
})