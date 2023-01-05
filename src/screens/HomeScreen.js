import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import InputPrimary from '../components/InputPrimary'
import { Setting4 } from '../components/svg'
import ProjectCard from '../components/ProjectCard'
import TodayTaskCard from '../components/TodayTaskCard'

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
        description: 'This is projects description',
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
]

const todayTasksDemo = [
    {
        id: 1,
        name: 'Meeting Project',
        time: 'Today, 8AM'
    },
    {
        id: 2,
        name: 'Client Brief',
        time: 'Today, 2PM'
    },
    {
        id: 3,
        name: 'Create Wireframe',
        time: 'Today, 8PM'
    },
]

const HomeScreen = () => {
    const [searchText, setSearchText] = useState('')

    const renderRecentItem = ({ item }) => <ProjectCard project={item} />

    return (
        <ScrollView style={styles.screenStyle} contentContainerStyle={{ paddingBottom: 50 }} >
            <View style={{ paddingRight: 20 }}>
                <Text style={styles.title}>Hello,</Text>
                <Text style={styles.title}>Pristia Candra</Text>
                <InputPrimary
                    style={{ marginVertical: 30 }}
                    placeholder={'Search projects, tasks...'}
                    IconRight={<Setting4 width={24} height={24} />}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <View style={styles.recentProjectsTextContainer}>
                <Text style={styles.subtitle}>Recent Projects</Text>
                <Pressable>
                    <Text style={styles.recentSeeAllText}>SEE ALL</Text>
                </Pressable>
            </View>
            <FlatList
                data={recentProjectsDemo}
                renderItem={renderRecentItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View style={{ padding: 10 }} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{ paddingRight: 20 }}>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.subtitle}>Tasks for Today</Text>
                    {todayTasksDemo.map((item) => <TodayTaskCard key={item.id} task={item} />)}
                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    screenStyle: {
        paddingLeft: 20,
        paddingTop: 30,
        backgroundColor: Variables.colors.white
    },
    title: {
        marignTop: 0,
        paddingTop: 0,
        fontSize: 36,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900,
        lineHeight: 46
    },
    recentProjectsTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 20,
        paddingRight: 20
    },
    subtitle: {
        fontSize: 18,
        color: Variables.colors.black.dark900,
        fontWeight: 'bold'
    },
    recentSeeAllText: {
        fontSize: 12,
        color: Variables.colors.black.light300,
        fontWeight: 'bold'
    }
})