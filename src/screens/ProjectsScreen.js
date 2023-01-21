import { Alert, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import ProjectsTabSelector from '../components/ProjectsTabSelector'
import ProjectCard from '../components/ProjectCard'
import { PROJECT_DETAILS } from '../navigations/routes'
import { collection, db } from '../../firebase'
import { getDocs } from 'firebase/firestore'

const recentProjectsDemo = [
    {
        id: 1,
        name: 'Protergo Project',
        description: 'Mobile application for security device mobile & dekstop',
        createdAt: 'createdAt',
        createdBy: { name: 'Mario M' },
        dueDate: 'Tue, Jun 29',
        type: 'External Project',
        tasks: [
            {
                id: 1,
                name: 'Brainstorming',
                createdAt: 'date',
                dueDate: '13 Oct, 2023',
                team: [{ name: 'John C' }, { name: 'Mario M' }],
                comments: [
                    {
                        id: 1,
                        author: { name: 'John C', id: 1 },
                        comment: 'This is a comment for a projects task',
                        createdAt: 'date that will be formated to something like x time ago'
                    }
                ]
            },
            {
                id: 2,
                name: 'Design Sprint #1',
                createdAt: 'date',
                dueDate: '25 Oct, 2023',
                team: [{ name: 'Marco C' }, { name: 'Cena M' }],
                comments: [
                    {
                        id: 1,
                        author: { name: 'Mario M', id: 1 },
                        comment: 'This is a comment for a projects task',
                        createdAt: 'date that will be formated to something like x time ago'
                    }
                ]
            }
        ],
        tasksInProgress: 1,
        tasksCompleted: 1,
        team: [{ name: 'John Doe' }, { name: 'Test demo' }],
        color: Variables.colors.brand.dark800
    },
    {
        id: 2,
        name: 'Maladin Web',
        description: 'Mobile application for security device mobile & dekstop',
        createdAt: 'createdAt',
        createdBy: { name: 'Cena C' },
        dueDate: 'Wed, Jul 23',
        type: 'External Project',
        tasks: 30,
        tasksInProgress: 5,
        tasksCompleted: 10,
        team: [{ name: 'John Doe' }, { name: 'Mario M' }],
        color: Variables.colors.brand.light300
    },
    {
        id: 3,
        name: 'NFT Ui Kit',
        description: 'This is projects description',
        createdAt: 'createdAt',
        createdBy: { name: 'Marc C' },
        dueDate: 'Wed, Jul 23',
        type: 'External Project',
        tasks: 40,
        tasksInProgress: 5,
        tasksCompleted: 10,
        team: [{ name: 'John Doe' }, { name: 'Mario M' }],
        color: Variables.colors.black.light300
    },
    {
        id: 4,
        name: 'M Banking App',
        description: 'This is projects description',
        createdAt: 'createdAt',
        createdBy: { name: 'Marc C' },
        dueDate: 'Wed, Jul 23',
        type: 'External Project',
        tasks: 45,
        tasksInProgress: 5,
        tasksCompleted: 10,
        team: [{ name: 'John Doe' }, { name: 'Cena M' }],
        color: Variables.colors.white
    },
]

const ProjectsScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState({ name: 'To Do' })
    const [projects, setProjects] = useState([])

    const collectionRef = collection(db, 'projects')

    useEffect(() => {
        console.log('FETCHING ALL PROJECTS');
        getDocs(collectionRef)
            .then(snapshot => {
                const snapshotData = []
                snapshot.docs.forEach(doc => {
                    snapshotData.push({ ...doc.data(), id: doc.id })
                })
                setProjects(snapshotData)
            })
            .catch(err => {
                Alert.alert(err.message)
            })
    }, [])

    const onTabPress = (tab) => {
        setActiveTab(tab)
    }

    const renderProjectCard = ({ item }) => (<ProjectCard project={item} onPress={onProjectCardPress.bind(this, item)} />)

    const keyExtractor = (item) => item.id

    const onProjectCardPress = (project) => {
        navigation.navigate(PROJECT_DETAILS, { project })
    }

    return (
        <Screen style={{ paddingVertical: 0, paddingHorizontal: 0 }}>
            <ProjectsTabSelector activeTab={activeTab} onTabPress={onTabPress} style={{ padding: 20 }} />
            <FlatList
                data={projects}
                renderItem={renderProjectCard}
                keyExtractor={keyExtractor}
                style={{ padding: 20 }}
                contentContainerStyle={{ paddingBottom: 40 }}
                ItemSeparatorComponent={<View style={{ padding: 10 }} />}
            />
        </Screen>
    )
}

export default ProjectsScreen

const styles = StyleSheet.create({

})