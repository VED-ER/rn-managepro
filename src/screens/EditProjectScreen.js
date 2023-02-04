import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Screen from '../components/Screen'
import { Variables } from '../styles/theme'
import InputPrimary from '../components/InputPrimary'
import InputPrimaryPressable from '../components/InputPrimaryPressable'
import { Calendar, Close } from '../components/svg'
import PrimaryButton from '../components/PrimaryButton'
import { Portal } from 'react-native-portalize';
import BottomSheet from '../components/BottomSheet'
import DatePicker from '../components/DatePicker'
import { format } from 'date-fns'
import { updateProjectsCollection } from '../../firebase'
import { Timestamp } from 'firebase/firestore'
import { PROJECT_DETAILS, TEAM } from '../navigations/routes'

const EditProjectScreen = ({ navigation, route }) => {
    const [currentProjectState, setCurrentProjectState] = useState()
    const [project, setProject] = useState()
    const [dueDate, setDueDate] = useState(null)
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (route?.params?.project) {
            setProject(route.params.project)
            setCurrentProjectState(route.params.project)
        }
    }, [route?.params?.project])

    useEffect(() => {
        if (route?.params?.team) {
            setProject(prev => ({ ...prev, team: route.params.team }))
        }
    }, [route?.params?.team])

    const onDueDatePress = () => {
        setShowBottomSheet(true)
    }

    const onSelectedDate = (date) => {
        setShowBottomSheet(false)
        setDueDate(date)
        setProject(prev => ({ ...prev, dueDate: Timestamp.fromDate(date) }))
    }

    const onSaveChangesPress = async () => {
        if (JSON.stringify(currentProjectState) === JSON.stringify(project)) return
        console.log('SAVIng');
        setLoading(true);
        try {
            const updatedProject = { ...project }
            delete updatedProject.id
            await updateProjectsCollection(updatedProject, project.id);

            navigation.navigate(PROJECT_DETAILS, { project })
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    const onBottomSheetDismiss = () => {
        setShowBottomSheet(false)
    }

    const onTeamPress = () => {
        navigation.navigate(TEAM, { project })
    }

    return (
        <Screen style={styles.screen}>
            <View>
                <Text style={styles.title}>Edit Project</Text>
                <InputPrimary
                    placeholder={'Project name'}
                    value={project?.name}
                    onChangeText={(value) => setProject(prev => ({ ...prev, name: value }))}
                    style={{ marginBottom: 30 }}
                />
                <InputPrimary
                    placeholder={'Description'}
                    value={project?.description}
                    onChangeText={(value) => setProject(prev => ({ ...prev, description: value }))}
                    style={{ marginBottom: 30 }}
                />
                <InputPrimaryPressable
                    placeholder={'Due Date'}
                    value={dueDate ? format(dueDate, 'd MMMM yyy') : null}
                    style={{ marginBottom: 30 }}
                    IconRight={<Calendar width={24} height={24} />}
                    onPress={onDueDatePress}
                />
                <InputPrimaryPressable
                    placeholder={'Team'}
                    value={JSON.stringify(project?.team)}
                    style={{ marginBottom: 30 }}
                    onPress={onTeamPress}
                />
            </View>
            <PrimaryButton
                text={'Save Changes'}
                onPress={onSaveChangesPress}
                loading={loading}
            />
            <Portal>
                <BottomSheet
                    isVisible={showBottomSheet}
                    contentContainerStyle={{ paddingHorizontal: 30, paddingBottom: 50 }}
                    onDismiss={onBottomSheetDismiss}
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.subtitle}>Due Date</Text>
                        <Pressable onPress={onBottomSheetDismiss}>
                            <Close width={20} height={20} />
                        </Pressable>
                    </View>
                    <DatePicker onSelectedDate={onSelectedDate} />
                </BottomSheet>
            </Portal>
        </Screen>
    )
}

export default EditProjectScreen

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900,
        marginBottom: 30
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Variables.colors.black.dark900
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    }
})