import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryButton from './PrimaryButton'
import { Variables } from '../styles/theme'

const PROJECTS_TABS = [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Completed' }]

const ProjectsTabSelector = ({ activeTab, onTabPress, style }) => {

    return (
        <View style={[styles.tabsContainer, style]}>
            {PROJECTS_TABS.map((tab, index) => {
                const isActive = activeTab?.name === tab.name
                return (
                    <React.Fragment key={index}>
                        <PrimaryButton
                            key={tab.name}
                            text={tab.name}
                            style={[{ paddingVertical: 10, paddingHorizontal: 5 }, isActive ? { flex: 1 } : styles.tab]}
                            textStyle={isActive ? {} : styles.tabText}
                            onPress={() => onTabPress(tab)}
                        />
                        {index < PROJECTS_TABS.length - 1 ? <View style={{ width: 10 }} /> : null}
                    </React.Fragment>
                )
            })}
        </View>
    )
}

export default ProjectsTabSelector

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row'
    },
    tab: {
        backgroundColor: 'transparent',
        flex: 1
    },
    tabText: {
        color: Variables.colors.black.dark900,
    }
})