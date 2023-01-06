import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Variables } from '../styles/theme'
import { Add } from './svg'
import BottomSheet from './BottomSheet'
import InputPrimary from './InputPrimary'

const CreateProjectModal = () => {
    const [showBottomSheet, setShowBottomSheet] = useState(false)

    const onDismiss = () => {
        setShowBottomSheet(false)
        Keyboard.dismiss()
    }

    return (
        <>
            <Pressable onPress={() => setShowBottomSheet(true)} style={{
                width: 55,
                height: 55,
                backgroundColor: Variables.colors.brand.default,
                borderRadius: 55,
                justifyContent: 'center',
                alignItems: 'center',
                ...Variables.shadow,
                marginTop: -15
            }}>
                <Add width={34} height={34} />
            </Pressable>
            <BottomSheet contentContainerStyle={{}} onDismiss={onDismiss} isVisible={showBottomSheet}>
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
                    <Text style={styles.title}>Create Project</Text>
                    <InputPrimary placeholder={'Project Name'} style={{ marginTop: 30 }} />
                    <InputPrimary placeholder={'Project Description'} style={{ marginTop: 30 }} />
                </ScrollView>
            </BottomSheet>
        </>
    )
}

export default CreateProjectModal

const styles = StyleSheet.create({
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