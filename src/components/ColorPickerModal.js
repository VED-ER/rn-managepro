import { Button, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import React, { useState } from 'react'
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker'
import PrimaryButton from './PrimaryButton'
import { Variables } from '../styles/theme'

const ColorPickerModal = ({ value, onSelectColor, showModal, loading, onDismiss }) => {
    const [pickedColor, setPickedColor] = useState('')

    return (
        <Modal
            style={{ margin: 0 }}
            onBackButtonPress={onDismiss}
            isVisible={showModal}
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingVertical: 40 }}>
                <ColorPicker style={{ width: '70%' }} value={value} onComplete={({ hex }) => setPickedColor(hex)}>
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                    <OpacitySlider />
                </ColorPicker>

                <PrimaryButton
                    text={'OK'}
                    style={{ width: '70%', alignSelf: 'center' }}
                    onPress={() => onSelectColor(pickedColor)}
                    loading={loading}
                />
                <Pressable onPress={onDismiss} style={({ pressed }) => ([styles.cancel, pressed && { opacity: 0.5 }])}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
            </SafeAreaView>
        </Modal>
    )
}

export default ColorPickerModal

const styles = StyleSheet.create({
    cancel: {
        padding: 10,
        marginTop: 20,
        alignSelf: 'center',
        width: '70%'
    },
    cancelText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'red'
    }
})