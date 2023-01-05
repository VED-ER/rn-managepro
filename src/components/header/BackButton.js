import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowLeft } from '../svg'
import { useNavigation } from '@react-navigation/native'

const BackButton = () => {
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft width={34} height={34} />
        </Pressable>
    )
}

export default BackButton

const styles = StyleSheet.create({})