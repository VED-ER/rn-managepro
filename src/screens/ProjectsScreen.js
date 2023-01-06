import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import PrimaryButton from '../components/PrimaryButton'
import ProjectsTabSelector from '../components/ProjectsTabSelector'
import ProjectCard from '../components/ProjectCard'

const recentProjectsDemo = [
    {
        id: 1,
        name: 'Protergo Project',
        description: 'This is projects description',
        createdAt: 'createdAt',
        createdBy: { name: 'Mario M' },
        dueDate: 'Tue, Jun 29',
        type: 'External Project',
        tasks: 50,
        tasksInProgress: 5,
        tasksCompleted: 20,
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
        color: Variables.colors.black.light400
    },
]

const ProjectsScreen = () => {
    const [activeTab, setActiveTab] = useState({ name: 'To Do' })

    const onTabPress = (tab) => {
        setActiveTab(tab)
    }

    const renderProjectCard = ({ item }) => (<ProjectCard project={item} />)

    const keyExtractor = (item) => item.id

    return (
        <Screen style={{ padding: 0 }}>
            <ProjectsTabSelector activeTab={activeTab} onTabPress={onTabPress} style={{ padding: 20 }} />
            <FlatList
                data={recentProjectsDemo}
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