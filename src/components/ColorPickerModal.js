import { Button, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker'
import PrimaryButton from './PrimaryButton'

const ColorPickerModal = ({ value, onSelectColor, showModal }) => {
    const [pickedColor, setPickedColor] = useState('')

    return (
        <Modal visible={showModal} animationType='fade'>
            <SafeAreaView style={{ flex: 1, paddingVertical: 40 }}>
                <ColorPicker style={{ width: '70%' }} value={value} onComplete={({ hex }) => setPickedColor(hex)}>
                    <Preview />
                    <Panel1 />
                    <HueSlider />
                    <OpacitySlider />
                    <Swatches />
                </ColorPicker>

                <PrimaryButton
                    text={'OK'}
                    style={{ width: '70%', alignSelf: 'center' }}
                    onPress={() => onSelectColor(pickedColor)}
                />
            </SafeAreaView>
        </Modal>
    )
}

export default ColorPickerModal

const styles = StyleSheet.create({})