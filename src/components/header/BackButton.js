import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowLeft } from '../svg'
import { useNavigation } from '@react-navigation/native'
import { Variables } from '../../styles/theme'

const BackButton = ({ iconColor }) => {
    const navigation = useNavigation()

    const color = iconColor ? iconColor : Variables.colors.black.dark900

    return (
        <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft width={30} height={30} color={color} />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({})