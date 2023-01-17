import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Variables } from '../styles/theme'
import Avatar from '../components/Avatar'
import ProjectDetailStage from '../components/ProjectDetailStage'
import Screen from '../components/Screen'

const PROJECT_DETAILS_STAGES = [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Completed' }]

const ProjectDetailsScreen = ({ route }) => {
    const [project, setProject] = useState(null)


    useEffect(() => {
        // if (route?.params?.project)
        setProject(route.params.project)
    }, [])

    const renderProjectDetailStage = ({ item }) => (<ProjectDetailStage projectTasks={project?.tasks} stage={item} />)

    return (
        <Screen style={{ paddingHorizontal: 0, paddingVertical: 10 }}>
            <View style={[styles.topImageContainer, { backgroundColor: project?.color }]}>
                <View style={styles.projectIcon}>
                    <Text style={styles.projectIconText}>PP</Text>
                </View>
                <View style={styles.teamContainer}>
                    {project?.team.map((i, index) => (<Avatar
                        key={index}
                        textStyle={styles.avatarTextStyle}
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
            <View style={styles.projectDetailsContainer}>
                <View>
                    <Text style={styles.projectTitle}>{project?.name}</Text>
                    <Text style={styles.projectDescription}>{project?.description}</Text>
                </View>
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
            </View>
        </Screen>
    )
}

export default ProjectDetailsScreen

const styles = StyleSheet.create({
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
        borderWidth: 1,
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
    }
})