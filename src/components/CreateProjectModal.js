import { Alert, Keyboard, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Variables } from '../styles/theme'
import { Add } from './svg'
import BottomSheet from './BottomSheet'
import InputPrimary from './InputPrimary'
import PrimaryButton from './PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import { CREATE_PROJECT, PROJECT_DETAILS } from '../navigations/routes'
import { Timestamp } from 'firebase/firestore'
import { AuthContext } from '../store/AuthContext'

const EMPTY_COMMENT = {
    id: null,
    author: null,
    comment: '',
    createdAt: null
}
const EMPTY_TASK = {
    id: null,
    name: '',
    createdAt: null,
    dueDate: null,
    team: [],
    comments: [

    ]
}

const EMPTY_PROJECT = {
    name: '',
    description: '',
    createdAt: null,
    createdBy: null,
    dueDate: null,
    type: null,
    tasks: [],
    tasksInProgress: 0,
    tasksCompleted: 0,
    team: [],
    color: Variables.colors.black.light100
}

const CreateProjectModal = () => {
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [project, setProject] = useState(EMPTY_PROJECT)

    const { currentUser } = useContext(AuthContext)

    const navigation = useNavigation()

    const onDismiss = () => {
        setShowBottomSheet(false)
        Keyboard.dismiss()
    }

    const onCreateWorkspacePress = () => {

        if (!project.name) {
            Alert.alert('Project name error', 'Please enter a name for your project')
            return
        }

        if (!project.type) {
            Alert.alert('Project type error', 'Please enter your project type')
            return
        }

        const createdProject = {
            ...project,
            createdAt: Timestamp.now(),
            createdBy: {
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
                id: currentUser.uid
            }
        }
        onDismiss()
        navigation.navigate(PROJECT_DETAILS, { project: createdProject })
    }

    useEffect(() => {
        if (showBottomSheet) {
            setProject({ name: '' })
        }
    }, [showBottomSheet])

    return (
        <>
            <Pressable onPress={() => setShowBottomSheet(true)} style={styles.addButton}>
                <Add width={34} height={34} color={Variables.colors.white} />
            </Pressable>
            <BottomSheet contentContainerStyle={{}} onDismiss={onDismiss} isVisible={showBottomSheet}>
                <ScrollView keyboardShouldPersistTaps="handled" style={[styles.container, Platform.OS === 'ios' ? { paddingBottom: 30 } : null]}>
                    <Text style={styles.title}>Create Project</Text>
                    <InputPrimary
                        placeholder={'Project Name'}
                        style={{ marginVertical: 30 }}
                        value={project.name}
                        onChangeText={(value) => setProject(prev => ({ ...prev, name: value }))}
                    />
                    <InputPrimary
                        placeholder={'Project Type'}
                        style={{ marginBottom: 30 }}
                        value={project.type}
                        onChangeText={(value) => setProject(prev => ({ ...prev, type: value }))}
                    />
                    <PrimaryButton text={'Create Workspace'} onPress={onCreateWorkspacePress} />
                </ScrollView>
            </BottomSheet>
        </>
    )
}

export default CreateProjectModal

const styles = StyleSheet.create({
    addButton: {
        width: 55,
        height: 55,
        backgroundColor: Variables.colors.brand.default,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        ...Variables.shadow,
        marginTop: -15
    },
    title: {
        fontSize: 18,
        color: Variables.colors.black.dark900,
        fontWeight: 'bold'
    },
    container: {
        padding: 20,
        paddingTop: 10
    }
})