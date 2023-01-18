import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const CreateProjectScreen = ({ navigaton, route }) => {
    const [name, setName] = useState('')

    useEffect(() => {
        if (route?.params?.projectName)
            setName(route.params.projectName)
    }, [route?.params])

    return (
        <View>
            <Text>CreateProjectScreen</Text>
        </View>
    )
}

export default CreateProjectScreen

const styles = StyleSheet.create({})